import Web3 from "web3";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";

import * as rlp from "rlp";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
import BN from "bn.js";

interface IProviderOptions {
  rpcUrl?: string;
  infuraId?: string;
  chainId?: number;
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

function createJsonRpcResponse(id: string | number | undefined, ret: any) {
  return {
    id: id,
    jsonrpc: "2.0",
    result: ret,
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
    return Web3.utils.hexToNumber(num).toString();
  } else {
    return num.toString();
  }
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  #infuraProvider: Web3.providers.HttpProvider;
  #chainId: number;

  constructor(config: IProviderOptions) {
    super();
    let rpcUrl = config.rpcUrl;
    this.#chainId = config.chainId ?? 1;
    if (config.infuraId) {
      const network = chainId2InfuraNetwork(this.#chainId);
      rpcUrl = `https://${network}.infura.io/v3/${config.infuraId}`;
    }
    // @ts-ignore
    this.#infuraProvider = new Web3.providers.HttpProvider(rpcUrl);
  }

  callInnerProviderApi(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.#infuraProvider.send(
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
    let accounts = await this.imKeyRequestAccounts(requestId++);
    let chainId = await this.callInnerProviderApi(
      createJsonRpcRequest("eth_getChainId")
    );
    if (chainId !== this.#chainId) {
      throw new Error("chain id and rpc endpoint don't match");
    } else {
      this.emit("connect", { chainId });
      return accounts;
    }
  }

  async request(args: RequestArguments): Promise<any> {
    switch (args.method) {
      case "eth_getChainId": {
        return this.#chainId;
      }
      case "personal_listAccounts":
      case "eth_accounts":
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
      case "eth_sendSignedTransaction": {
        const ret = await this.imKeySignTransaction(
          requestId++,
          args.params![0]
        );
        const req = createJsonRpcRequest("eth_sendRawTransaction", [ret.raw]);
        return await this.callInnerProviderApi(req);
      }
      case "eth_sign":
      // https://docs.metamask.io/guide/signing-data.html#a-brief-history
      case "eth_signTypedData":
      // case 'eth_signTypedData_v1':
      case "eth_signTypedData_v3":
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
      .then((ret) => callback(null, ret))
      .catch((err) => callback(err, null));
  }

  imKeyRequestAccounts(
    id: string | number | undefined,
    callback?: (error: Error, ret: any) => void
  ) {
    return new Promise<string[]>((resolve, reject) => {
      callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.getAddress",
        params: {
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      })
        .then((ret) => {
          callback?.(
            ret.error,
            createJsonRpcResponse(id, [ret.result?.address])
          );
          resolve([ret.result?.address]);
        })
        .catch((error) => {
          callback?.(error, createJsonRpcResponse(id, [""]));
          reject(createProviderRpcError(4001, error));
        });
    });
  }

  async imKeySignTransaction(
    id: string | number | undefined,
    transactionConfig: TransactionConfig,
    callback?: (error: Error, ret: any) => void
  ) {
    if (
      !transactionConfig.gasPrice ||
      !transactionConfig.nonce ||
      !transactionConfig.to ||
      !transactionConfig.value ||
      !transactionConfig.from
    ) {
      throw createProviderRpcError(
        4001,
        "Need pass gasPrice,nonce,to,value,chainId,from"
      );
    }

    if (
      transactionConfig.chainId &&
      transactionConfig.chainId !== this.#chainId
    ) {
      throw createProviderRpcError(4001, "");
    }

    let fee = (
      BigInt(transactionConfig.gas) * BigInt(transactionConfig.gasPrice)
    ).toString(); //wei
    fee = Web3.utils.fromWei(fee, "Gwei"); //to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (temp * 1000000000).toString(); //to ether
    fee = Web3.utils.fromWei(fee) + " ether";

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

    const from = Web3.utils.toChecksumAddress(transactionConfig.from as string);
    const gasPrice = parseArgsNum(transactionConfig.gasPrice);
    const nonce = parseArgsNum(transactionConfig.nonce);
    const to = Web3.utils.toChecksumAddress(transactionConfig.to);
    const value = parseArgsNum(transactionConfig.value);

    return new Promise<RLPEncodedTransaction>((resolve, reject) => {
      callImKeyApi({
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
            chainId: transactionConfig.chainId,
            path: IMKEY_ETH_PATH,
          },
          preview: {
            payment: value + " ETH",
            receiver: to,
            sender: from,
            fee: fee,
          },
        },
        id: requestId++,
      })
        .then((ret) => {
          let txData = ret.result?.txData;
          if (!ret.result?.txData?.startsWith("0x")) {
            txData = "0x" + txData;
          }

          const decoded = rlp.decode(txData, true);

          const rlpTX: RLPEncodedTransaction = {
            raw: ret.result?.txData,
            tx: {
              nonce: transactionConfig.nonce!.toString(),
              gasPrice: transactionConfig.gasPrice!.toString(),
              gas: transactionConfig.gas!.toString(),
              to: transactionConfig.to!.toString(),
              value: transactionConfig.value!.toString(),
              input: transactionConfig.data!.toString(),
              // @ts-ignore
              r: Web3.utils.bytesToHex(decoded.data[7]),
              // @ts-ignore
              s: Web3.utils.bytesToHex(decoded.data[8]),
              // @ts-ignore
              v: Web3.utils.bytesToHex(decoded.data[6]),
              hash: ret.result?.txHash,
            },
          };
          callback?.(ret.eror, createJsonRpcResponse(id, rlpTX));
          resolve(rlpTX);
        })
        .catch((error) => {
          callback?.(error, createJsonRpcResponse(id, null));
          reject(createProviderRpcError(4001, error));
          // this.emit('disconnect', createProviderRpcError(error.name, error.message));
        });
    });
  }

  imKeyPersonalSign(
    id: string | number | undefined,
    dataToSign: string,
    address: string | number,
    callback?: (error: Error, ret: any) => void
  ) {
    if (Number.isInteger(address)) {
      return Promise.reject(
        createProviderRpcError(
          4001,
          "Pass the address to sign data with for now"
        )
      );
    }

    const checksumAddress = Web3.utils.toChecksumAddress(address as string);

    return new Promise<string>((resolve, reject) => {
      callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.signMessage",
        params: {
          data: Web3.utils.toUtf8(dataToSign),
          sender: checksumAddress,
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      })
        .then((ret) => {
          callback?.(
            ret.error,
            createJsonRpcResponse(id, ret.result?.signature)
          );
          return resolve(ret.result?.signature);
        })
        .catch((error) => {
          callback?.(error, createJsonRpcResponse(id, ""));
          reject(createProviderRpcError(4001, error));
          // this.emit('disconnect', createProviderRpcError(error.name, error.message));
        });
    });
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
