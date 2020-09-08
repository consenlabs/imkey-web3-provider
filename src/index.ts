import Web3 from "web3";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";

import * as rlp from "rlp";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
import BN from "bn.js";
import * as HttpHeaderProvider from "httpheaderprovider"


interface IProviderOptions {
  rpcUrl?: string;
  infuraId?: string;
  chainId?: number;
  headers?: any;
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
  } else if (typeof num === "string") {
    return Web3.utils.hexToNumberString(num);
  } else {
    return num.toString();
  }
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  private infuraProvider: Web3.providers.HttpProvider;
  private chainId: number;
  private configProvider?: HttpHeaderProvider;

  constructor(config: IProviderOptions) {
    super();
    let rpcUrl = config.rpcUrl;
    this.chainId = config.chainId ?? 1;
    if (config.infuraId) {
      const network = chainId2InfuraNetwork(this.chainId);
      rpcUrl = `https://${network}.infura.io/v3/${config.infuraId}`;
    }
    // @ts-ignore
    this.infuraProvider = new Web3.providers.HttpProvider(rpcUrl);
    if(config.headers){
      this.configProvider = new HttpHeaderProvider(rpcUrl, config.headers);
    }
  }

  async callInnerProviderApi(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.infuraProvider.send(
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

  async callProviderApiWithHeader(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.configProvider.send(
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
        return await this.imKeyPersonalSign(
          requestId++,
          args.params![0],
          args.params![1]
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
        if(this.configProvider){
          return await this.callProviderApiWithHeader(req);
        }else{
          return await this.callInnerProviderApi(req);
        }
      }
      /* eslint-disable no-fallthrough */
      case "eth_sign":
      // https://docs.metamask.io/guide/signing-data.html#a-brief-history
      //
      /* eslint-disable no-fallthrough */
      case "eth_signTypedData":
      // case 'eth_signTypedData_v1':
      /* eslint-disable no-fallthrough */
      case "eth_signTypedData_v3":
      /* eslint-disable no-fallthrough */
      case "eth_signTypedData_v4": {
        return createProviderRpcError(
          4200,
          `${args.method} is not support now`
        );
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
    if (
      !transactionConfig.to ||
      !transactionConfig.value
    ) {
      throw createProviderRpcError(
        -32602,
        "expected to,value"
      );
    }
    
    //from
    let from: string;
    if (!transactionConfig.from ||
      typeof transactionConfig.from === "number") {
      const accounts = await this.imKeyRequestAccounts(requestId++);
      from = accounts[0] as string;
    }else{
      from = Web3.utils.toChecksumAddress(transactionConfig.from as string);
    }

    //gas price
    let gasPrice: string;
    if(gasPrice){
      gasPrice = parseArgsNum(transactionConfig.gasPrice);
    }else{
      gasPrice = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_gasPrice", [])
      );
      gasPrice = Web3.utils.hexToNumberString(gasPrice);
    }

    //chain id
    let chainId: number;
    if(transactionConfig.chainId){
      if (transactionConfig.chainId !== this.chainId) {
        throw createProviderRpcError(
          -32602,
          "expected chainId and connected chainId are mismatched"
        );
      }
      chainId = transactionConfig.chainId
    }else{
      chainId = this.chainId
    }

    //nonce
    let nonce: string;
    if(transactionConfig.nonce){
      nonce = parseArgsNum(transactionConfig.nonce);
    }else{
      nonce = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_getTransactionCount", [transactionConfig.from,"pending"])
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
            gasPrice: transactionConfig.gasPrice,
            value: transactionConfig.value,
            data: transactionConfig.data,
          },
        ])
      );
      gasLimit = parseArgsNum(gasRet);
    }

    //fee
    let fee = (
      BigInt(gasLimit) * BigInt(gasPrice)
    ).toString(); //wei
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
            gasPrice,
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
      let txData = ret.result?.txData;
      if (!ret.result?.txData?.startsWith("0x")) {
        txData = "0x" + txData;
      }

      const decoded = rlp.decode(txData, true);

      const rlpTX: RLPEncodedTransaction = {
        raw: txData,
        tx: {
          nonce: nonce,
          gasPrice: gasPrice,
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

  async imKeyPersonalSign(
    id: string | number | undefined,
    dataToSign: string,
    address: string | number,
    callback?: (error: Error, ret: any) => void
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
          sender: checksumAddress,
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      });

      let sigRet = ret.result?.signature.toLowerCase();
      if(!sigRet.startsWith("0x")){
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
