import Web3 from "web3";
import { JsonRpcPayload } from "web3-core-helpers";

import * as rlp from "rlp";
import { TransactionConfig, RLPEncodedTransaction } from "web3-eth";
import EventEmitter from "event-emitter-es6";

interface RequestArguments {
  method: string;
  params: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;

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

interface ImKeyProviderConfig {
  rpcUrl: string;
}

//
// interface ProviderRpcError extends Error {
//     message: string;
//     code: number;
//     data?: unknown;
// }

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  #infuraProvider: Web3.providers.HttpProvider;

  constructor(config: ImKeyProviderConfig) {
    super();
    // @ts-ignore
    this.#infuraProvider = new Web3.providers.HttpProvider(config.rpcUrl);
  }

  enable() {
    this.imKeyRequestAccounts(requestId++).then(() => {
      this.emit("connect");
    });
  }

  async request(args: RequestArguments): Promise<any> {
    // Promise
    switch (args.method) {
      case "eth_requestAccounts": {
        const address = await this.imKeyRequestAccounts(requestId++);
        return Promise.resolve(address);
      }
      case "eth_sign": {
        const signature = await this.imKeySignMessage(
          requestId++,
          args.params![0],
          args.params![1]
        );
        return Promise.resolve(signature);
      }
      case "eth_signTransaction": {
        const ret = await this.imKeySignTransaction(
          requestId++,
          args.params![0]
        );
        return Promise.resolve(ret);
      }
      default: {
        const payload = {
          jsonrpc: "2.0",
          method: args.method,
          params: args.params,
          id: requestId++,
        };
        this.#infuraProvider.send(payload, (err, ret) => {
          if (err != null) {
            return Promise.reject(err);
          } else {
            return Promise.resolve(ret);
          }
        });
      }
    }
  }

  sendAsync(
    args: JsonRpcPayload,
    callback: (err: Error | null, ret: any) => void
  ) {
    switch (args.method) {
      case "eth_requestAccounts":
        return this.imKeyRequestAccounts(args.id, callback);
      case "eth_sign":
        return this.imKeySignMessage(
          args.id,
          args.params![1],
          args.params![0],
          callback
        );
      case "eth_signTransaction":
        return this.imKeySignTransaction(args.id, args.params![0], callback);
      default:
        this.#infuraProvider.send(args, callback);
    }
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
      !transactionConfig.chainId ||
      !transactionConfig.from
    ) {
      return Promise.reject(
        createProviderRpcError(
          4001,
          "Need pass gasPrice,nonce,to,value,chainId,from"
        )
      );
    }

    let fee = (
      BigInt(transactionConfig.gas) * BigInt(transactionConfig.gasPrice)
    ).toString(); //wei
    fee = Web3.utils.fromWei(fee, "Gwei"); //to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (temp * 1000000000).toString(); //to ether
    fee = Web3.utils.fromWei(fee) + " ether";

    //estimate gas
    let gasLimit = 0;
    this.#infuraProvider.send(
      {
        jsonrpc: "2.0",
        method: "eth_estimateGas",
        params: [
          {
            from: transactionConfig.from,
            to: transactionConfig.to,
            gas: transactionConfig.gas,
            gasPrice: transactionConfig.gasPrice,
            value: transactionConfig.value,
            data: transactionConfig.data,
          },
        ],
        id: requestId++,
      },
      (err, ret) => {
        if (err != null) {
          return Promise.reject(createProviderRpcError(4001, err));
        } else {
          if (ret) {
            gasLimit = Web3.utils.hexToNumber(ret.result);
          }
        }
      }
    );

    const from = Web3.utils.toChecksumAddress(transactionConfig.from as string);
    const gasPrice = Web3.utils.hexToNumber(
      transactionConfig.gasPrice as string
    );
    const nonce = Web3.utils.hexToNumber(transactionConfig.nonce);
    const to = Web3.utils.toChecksumAddress(transactionConfig.to);
    const value = Web3.utils.hexToNumber(transactionConfig.value as string);

    return new Promise<RLPEncodedTransaction>((resolve, reject) => {
      callImKeyApi({
        jsonrpc: "2.0",
        method: "eth.signTransaction",
        params: {
          transaction: {
            data: transactionConfig.data,
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            nonce: nonce,
            to: to,
            value: value,
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

  imKeySignMessage(
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
