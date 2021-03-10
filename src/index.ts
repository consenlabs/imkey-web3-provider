import Web3 from "web3";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";

import * as rlp from "rlp";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
import BN from "bn.js";
import * as sigutil from "eth-sig-util";
import * as ethUtil from 'ethereumjs-util'
import imTokenEip712Utils from './eip712';

interface IProviderOptions {
  rpcUrl?: string;
  infuraId?: string;
  chainId?: number;
  headers?: Record<string, string>;
}

interface RequestArguments {
  method: string;
  params: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;

function createJsonRpcRequest(method: string, params: any[] = []) {
  return {
    id: requestId++,
    jsonrpc: "2.0",
    method,
    params,
  };
}

function createJsonRpcResponse(id: string | number, result: any) {
  return {
    id,
    jsonrpc: "2.0",
    result,
  };
}

function createProviderRpcError(code: number, message: string) {
  return {
    message,
    code,
  };
}

function chainId2InfuraNetwork(chainId: number) {
  switch (chainId) {
    case 3:
      return "ropsten";
    case 4:
      return "rinkeby";
    case 5:
      return "goerli";
    case 42:
      return "kovan";
    default:
      return "mainnet";
  }
}

function parseArgsNum(num: string | number | BN) {
  if (num instanceof BN) {
    return num.toNumber().toString();
  } else if (typeof num === "string" && Web3.utils.isHex(num)) {
    return Web3.utils.hexToNumberString(num);
  } else {
    return num.toString();
  }
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  private httpProvider: Web3.providers.HttpProvider;
  private chainId: number;

  constructor(config: IProviderOptions) {
    super();
    let rpcUrl = config.rpcUrl;
    this.chainId = config.chainId ?? 1;
    if (config.infuraId) {
      const network = chainId2InfuraNetwork(this.chainId);
      rpcUrl = `https://${network}.infura.io/v3/${config.infuraId}`;
    }
    // @ts-ignore
    let headers = null;
    if (config.headers) {
      headers = [];
      for (const idx in config.headers) {
        headers.push({ name: idx, value: config.headers[idx] });
      }
    }

    this.httpProvider = new Web3.providers.HttpProvider(rpcUrl, {
      headers,
    });
  }

  async callInnerProviderApi(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpProvider.send(
        req,
        (error: Error | null, result?: JsonRpcResponse) => {
          if (error) {
            reject(createProviderRpcError(4001, error.message));
          } else {
            resolve(result.result);
          }
        }
      );
    });
  }

  async enable() {
    const accounts = await this.imKeyRequestAccounts(requestId++);
    const chainIdHex = await this.callInnerProviderApi(
      createJsonRpcRequest("eth_chainId")
    );
    const chainId = Web3.utils.hexToNumber(chainIdHex);
    if (chainId !== this.chainId) {
      throw new Error("chain id and rpc endpoint don't match");
    } else {
      this.emit("connect", { chainId });
      return accounts;
    }
  }

  async request(args: RequestArguments): Promise<any> {
    console.log("request: ",args)
    switch (args.method) {
      case "eth_getChainId": {
        return this.chainId;
      }
      /* eslint-disable no-fallthrough */
      case "personal_listAccounts":
      /* eslint-disable no-fallthrough */
      case "eth_accounts":
      /* eslint-disable no-fallthrough */
      case "eth_requestAccounts": {
        return await this.imKeyRequestAccounts(requestId++);
      }
      case "personal_sign": {
        return await this.imKeySign(
          requestId++,
          args.params![0],
          args.params![1],
          true
        );
      }
      case "eth_signTransaction": {
        return await this.imKeySignTransaction(requestId++, args.params![0]);
      }
      case "eth_sendTransaction": {
        const ret = await this.imKeySignTransaction(
          requestId++,
          args.params![0]
        );
        const req = createJsonRpcRequest("eth_sendRawTransaction", [ret.raw]);
        return await this.callInnerProviderApi(req);
      }
      case "eth_sign": {
        return await this.imKeySign(
          requestId++,
          args.params![1],
          args.params![0],
          false
        );
      }
      /* eslint-disable no-fallthrough */
      case "eth_signTypedData":
      // case 'eth_signTypedData_v1':
      /* eslint-disable no-fallthrough */
      case "eth_signTypedData_v3":
      /* eslint-disable no-fallthrough */
      return createProviderRpcError(
        4200,
        `${args.method} is not support now`
      );
      case "eth_signTypedData_v4": {
        console.log('eth_signTypedData_v4 args:',args)
        const typedData = {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            Person: [
              { name: 'name', type: 'string' },
              { name: 'wallets', type: 'address[]' },
            ],
            Mail: [
              { name: 'from', type: 'Person' },
              { name: 'to', type: 'Person[]' },
              { name: 'contents', type: 'string' },
            ],
            Group: [
              { name: 'name', type: 'string' },
              { name: 'members', type: 'Person[]' },
            ],
          },
          domain: {
            name: 'Ether Mail',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
          },
          primaryType: 'Mail' as const,
          message: {
            from: {
              name: 'Cow',
              wallets: [
                '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
              ],
            },
            to: [
              {
                name: 'Bob',
                wallets: [
                  '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                  '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                  '0xB0B0b0b0b0b0B000000000000000000000000000',
                ],
              },
            ],
            contents: 'Hello, Bob!',
          },
        };
        const test_buffer = sigutil.TypedDataUtils.sign(typedData);
        const test_hash = ethUtil.bufferToHex(test_buffer)
        console.log('eth_signTypedData_v4 test hash:',test_hash)

        const privateKey = Buffer.from('cce64585e3b15a0e4ee601a467e050c9504a0db69a559d7ec416fa25ad3410c2', 'hex')
        const test_sig = ethUtil.ecsign(test_buffer, privateKey);
        console.log('eth_signTypedData_v4 test sig:',ethUtil.bufferToHex(sigutil.concatSig(test_sig.v, test_sig.r, test_sig.s)))

        const eip712HashHexWithoutSha3 = imTokenEip712Utils.signHashHex(
          typedData,
          true
        )
        console.log("eth_signTypedData_v4 imtoken eip712HashHexWithoutSha3: ",eip712HashHexWithoutSha3)
        const eip712HashHex = ethUtil.bufferToHex(
          ethUtil.sha3(eip712HashHexWithoutSha3)
        )
        console.log("eth_signTypedData_v4 imtoken hash: ",eip712HashHex)

        const jsonobj = JSON.parse(args.params![1])
        const buffer = sigutil.TypedDataUtils.sign(jsonobj);
        const hash = ethUtil.bufferToHex(buffer)

        console.log("eth_signTypedData_v4 hash: ",hash)
        const withoutsha3 = imTokenEip712Utils.signHashHex(
          jsonobj,
          true
        )
        console.log("eth_signTypedData_v4 withoutsha3: ",withoutsha3)

        const sig = await this.imKeySign(
          requestId++,
          withoutsha3,
          args.params![0],
          false
        );
        console.log("eth_signTypedData_v4 sign: ",sig)
        // const sig = ethUtil.ecsign(buffer, privateKey);
        // console.log("eth_signTypedData_v4 sig:",ethUtil.bufferToHex(sigutil.concatSig(sig.v, sig.r, sig.s)))
        return sig
        // return await this.imKeySign(
        //   requestId++,
        //   message,
        //   args.params![0],
        //   false
        // );
      }
      default: {
        const payload = {
          jsonrpc: "2.0",
          method: args.method,
          params: args.params,
          id: requestId++,
        };
        return await this.callInnerProviderApi(payload);
      }
    }
  }

  sendAsync(
    args: JsonRpcPayload,
    callback: (err: Error | null, ret: any) => void
  ) {
    this.request(args)
      .then((ret) => callback(null, createJsonRpcResponse(args.id, ret)))
      .catch((err) => callback(err, null));
  }

  async imKeyRequestAccounts(
    id: string | number | undefined,
    callback?: (error: Error, ret: any) => void
  ) {
    try {
      const ret = await callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.getAddress",
        params: {
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      });
      callback?.(null, [ret.result?.address]);
      return [ret.result?.address];
    } catch (error) {
      callback?.(error, null);
      throw createProviderRpcError(4001, error);
    }
  }

  async imKeySignTransaction(
    id: string | number | undefined,
    transactionConfig: TransactionConfig,
    callback?: (error: Error, ret: any) => void
  ) {
    if (!transactionConfig.to || !transactionConfig.value) {
      throw createProviderRpcError(-32602, "expected to,value");
    }

    //from
    let from: string;
    if (!transactionConfig.from || typeof transactionConfig.from === "number") {
      const accounts = await this.imKeyRequestAccounts(requestId++);
      from = accounts[0] as string;
    } else {
      from = Web3.utils.toChecksumAddress(transactionConfig.from as string);
    }

    //gas price
    let gasPriceDec: string;
    if (transactionConfig.gasPrice) {
      gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
    } else {
      const gasPriceRet = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_gasPrice", [])
      );
      gasPriceDec = Web3.utils.hexToNumberString(gasPriceRet);
    }

    //chain id
    let chainId: number;
    if (transactionConfig.chainId) {
      if (transactionConfig.chainId !== this.chainId) {
        throw createProviderRpcError(
          -32602,
          "expected chainId and connected chainId are mismatched"
        );
      }
      chainId = transactionConfig.chainId;
    } else {
      chainId = this.chainId;
    }

    //nonce
    let nonce: string;
    if (transactionConfig.nonce) {
      nonce = parseArgsNum(transactionConfig.nonce);
    } else {
      nonce = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_getTransactionCount", [
          transactionConfig.from,
          "pending",
        ])
      );
      nonce = Web3.utils.hexToNumber(nonce).toString();
    }

    //estimate gas
    let gasLimit: string;
    if (transactionConfig.gas) {
      gasLimit = parseArgsNum(transactionConfig.gas);
    } else {
      const gasRet: string = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_estimateGas", [
          {
            from: transactionConfig.from,
            to: transactionConfig.to,
            gas: transactionConfig.gas,
            gasPrice: Web3.utils.numberToHex(gasPriceDec),
            value: transactionConfig.value,
            data: transactionConfig.data,
          },
        ])
      );
      gasLimit = parseArgsNum(gasRet);
    }

    //fee
    let fee = (BigInt(gasLimit) * BigInt(gasPriceDec)).toString(); //wei
    fee = Web3.utils.fromWei(fee, "Gwei"); //to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (temp * 1000000000).toString(); //to ether
    fee = Web3.utils.fromWei(fee) + " ether";

    const to = Web3.utils.toChecksumAddress(transactionConfig.to);
    const value = parseArgsNum(transactionConfig.value);
    const valueInWei = Web3.utils.fromWei(value);

    try {
      const ret = await callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.signTransaction",
        params: {
          transaction: {
            data: transactionConfig.data,
            gasLimit,
            gasPrice: gasPriceDec,
            nonce,
            to,
            value,
            chainId,
            path: IMKEY_ETH_PATH,
          },
          preview: {
            payment: valueInWei + " ETH",
            receiver: to,
            sender: from,
            fee: fee,
          },
        },
        id: requestId++,
      });
      let signature = ret.result?.signature;
      if (!signature.startsWith("0x")) {
        signature = "0x" + signature;
      }

      const decoded = rlp.decode(signature, true);

      const rlpTX: RLPEncodedTransaction = {
        raw: signature,
        tx: {
          nonce: nonce,
          gasPrice: gasPriceDec,
          gas: gasLimit,
          to: to,
          value: valueInWei,
          input: transactionConfig.data,
          // @ts-ignore
          r: Web3.utils.bytesToHex(decoded.data[7]),
          // @ts-ignore
          s: Web3.utils.bytesToHex(decoded.data[8]),
          // @ts-ignore
          v: Web3.utils.bytesToHex(decoded.data[6]),
          hash: ret.result?.txHash,
        },
      };
      callback?.(null, rlpTX);
      return rlpTX;
    } catch (error) {
      callback?.(error, null);
      throw createProviderRpcError(4001, error);
    }
  }

  async imKeySign(
    id: string | number | undefined,
    dataToSign: string,
    address: string | number,
    isPersonalSign: boolean,
    callback?: (error: Error, ret: any) => void,
  ) {
    if (Number.isInteger(address)) {
      const error = createProviderRpcError(
        -32602,
        "Pass the address to sign data with for now"
      );
      callback?.(
        {
          name: "address invalid",
          message: "Pass the address to sign data with for now",
        },
        null
      );
      throw error;
    }

    let data = "";
    try {
      data = Web3.utils.toUtf8(dataToSign);
    } catch (error) {
      data = dataToSign;
    }

    const checksumAddress = Web3.utils.toChecksumAddress(address as string);

    try {
      const ret = await callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.signMessage",
        params: {
          data: data,
          isPersonalSign,
          sender: checksumAddress,
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      });

      let sigRet = ret.result?.signature.toLowerCase();
      if (!sigRet.startsWith("0x")) {
        sigRet = "0x" + sigRet;
      }

      callback?.(null, sigRet);
      return sigRet;
    } catch (error) {
      callback?.(error, null);
      throw createProviderRpcError(4001, error);
    }
  }
}

function callImKeyApi(arg: Record<string, unknown>) {
  return postData(IMKEY_MANAGER_ENDPOINT, arg).then((json) => {
    if (json.error) {
      if (json.error.message.includes("ImkeyUserNotConfirmed")) {
        throw new Error("user not confirmed");
      } else {
        throw new Error(json.error.message);
      }
    } else {
      return json;
    }
  });
}

function postData(url: string, data: Record<string, unknown>) {
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error("HttpError");
    }
  });
}
