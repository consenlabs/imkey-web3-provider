import Web3 from "web3";
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";

import * as rlp from "rlp";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
import BN from "bn.js";
import * as sigutil from "eth-sig-util";
import * as ethUtil from "ethereumjs-util";
import imTokenEip712Utils from "./eip712";

interface IProviderOptions {
  rpcUrl?: string;
  infuraId?: string;
  chainId?: number;
  headers?: Record<string, string>;
  accounts?: string[];
  symbol?: string;
}
interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

interface RequestArguments {
  method: string;
  params: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;
// let apirouter;
// var dialog;

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

export async function test33() {
  console.log("test33");
  return "test33";
}

function isNative() {
  // if(apirouter&&dialog){
  //   console.log('isNative true')
  //   return true
  // }else{
  //   console.log('isNative false')
  //   return false
  // }
  return true;
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  private httpProvider: Web3.providers.HttpProvider;
  private chainId: number;
  private accounts: string[];
  private headers: [];
  private symbol: string;

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
      this.headers = headers;
    }

    this.httpProvider = new Web3.providers.HttpProvider(rpcUrl, {
      headers,
    });

    if (config.accounts.length > 0) {
      this.accounts = config.accounts;
    }

    this.symbol = !config.symbol ? "ETH" : config.symbol;
    console.log(this);
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
    console.log("enable");

    // const accounts = await this.imKeyRequestAccounts(requestId++);
    const accounts = this.accounts;
    // const chainIdHex = await this.callInnerProviderApi(
    //   createJsonRpcRequest("eth_chainId")
    // );
    // const chainId = Web3.utils.hexToNumber(chainIdHex);
    // if (chainId !== this.chainId) {
    //   throw new Error("chain id and rpc endpoint don't match");
    // } else {
    this.emit("connect", { chainId: this.chainId });
    // Promise.resolve(accounts);
    return accounts;
    // }
  }

  request = async (args: RequestArguments): Promise<any> => {
    console.log("request:\n" + JSON.stringify(args));
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
      case "eth_coinbase": {
        let ret = await this.imKeyRequestAccounts(requestId++);
        return String(ret[0]);
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
        const jsonobj = JSON.parse(args.params![1]);
        const eip712HashHexWithoutSha3 = imTokenEip712Utils.signHashHex(
          jsonobj,
          true
        );
        return await this.imKeySign(
          requestId++,
          eip712HashHexWithoutSha3,
          args.params![0],
          false
        );
      }
      case "eth_getTransactionReceipt": {
        const payload = {
          jsonrpc: "2.0",
          method: args.method,
          params: args.params,
          id: requestId++,
        };
        return await this.requestTransactionReceipt(payload);
      }

      case "wallet_addEthereumChain": {
        this.changeChain(args.params[0])
        return null;
      }
      default: {
        console.log("request default");
        const payload = {
          jsonrpc: "2.0",
          method: args.method,
          params: args.params,
          id: requestId++,
        };
        return await this.callInnerProviderApi(payload);
      }
    }
  };

  changeChain(args: AddEthereumChainParameter) {
    console.log("wallet_addEthereumChain: ", JSON.stringify(args));
    this.chainId = parseArgsNum(args.chainId);

    if (args.rpcUrls) {
      let headers = this.headers;
      this.httpProvider = new Web3.providers.HttpProvider(args.rpcUrls, {
        headers,
      });
    }
  }

  public sendAsync(
    args: JsonRpcPayload,
    callback: (err: Error | null, ret: any) => void
  ) {
    console.log("sendAsync:\n" + JSON.stringify(args));
    // if(args.method !== 'eth_call' && args.method !== 'eth_accounts'){
    //   console.log('return ' + args.method)
    //   return
    // }
    // if (args.method === "eth_accounts") {
    //   callback(
    //     null,
    //     createJsonRpcResponse(args.id, [
    //       "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    //     ])
    //   );
    //   this.emit("accountsChanged", [
    //     "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    //   ]);
    //   return ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"];
    // }
    // if(args.method === 'eth_coinbase'){
    //   callback(null, createJsonRpcResponse(args.id, '0x407d73d8a49eeb85d32cf465507dd71d507100c1'))
    // }else{
    this.request(args)
      .then((ret) => {
        console.log("request ret:" + ret + " method:" + args.method);
        console.log(JSON.stringify(ret));
        // if(args.method === 'eth_getTransactionReceipt'){
        //   console.log('diff ret:' + typeof ret)

        //   callback(null, createJsonRpcResponse(args.id, {"blockHash":"0x09e5d45158e71a6c07ac10142c3abfb24078de838bf8d3b5b6641fac67f42684","blockNumber":"0x15f56e4","contractAddress":null,"cumulativeGasUsed":"0xb64b5","from":"0x6031564e7b2f5cc33737807b2e58daff870b590b","gasUsed":"0x5208","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x2","to":"0xd6a6bc087d12ae864491240bf457856c71d48eb8","transactionHash":"0xbc86e19ae2856061b4fa38bba6aa0e60d02e7d54be738de088241df820c6ee24","transactionIndex":"0x2"}))
        //   // callback(null, createJsonRpcResponse(args.id, ret + ''))
        // }else{
        callback(null, createJsonRpcResponse(args.id, ret));
        // }
      })
      .catch((err) => {
        console.log("request err" + err);
        callback(err, null);
      });
    // }

    // this.request(args)
    // .then((ret) => callback(null, createJsonRpcResponse(args.id, ret)))
    // .catch((err) => callback(err, null));
  }

  // send(args) {
  //   console.log("send be called, args: ", JSON.stringify(args));
  // }

  public async requestTransactionReceipt(paload: JsonRpcPayload) {
    for (let i = 0; i < 10; i++) {
      await sleep(1000);
      console.log("requestTransactionReceipt " + i);
      let ret = await this.callInnerProviderApi(paload);
      if (ret) {
        return ret;
      }
    }
  }

  public async imKeyRequestAccounts(
    id: string | number | undefined,
    callback?: (error: Error, ret: any) => void
  ) {
    let address;
    if (this.accounts.length == 0) {
      try {
        const ret = await callImKeyApi(
          {
            jsonrpc: "2.0",
            method: "eth.getAddress",
            params: {
              path: IMKEY_ETH_PATH,
            },
            id: requestId++,
          },
          isNative()
        );
        address = ret.result?.address;
      } catch (error) {
        callback?.(error, null);
        throw createProviderRpcError(4001, error);
      }
    } else {
      address = this.accounts[0];
    }
    callback?.(null, [address]);
    return [address];
  }

  async imKeySignTransaction(
    id: string | number | undefined,
    transactionConfig: TransactionConfig,
    callback?: (error: Error, ret: any) => void
  ) {
    if(!transactionConfig.value){
      transactionConfig.value = "0x0"
    }
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
    fee = Web3.utils.fromWei(fee) + " " + this.symbol;

    const to = Web3.utils.toChecksumAddress(transactionConfig.to);
    const value = parseArgsNum(transactionConfig.value);
    const valueInWei = Web3.utils.fromWei(value);

    const msg =
      transactionConfig.value +
      " ETH\n" +
      "收款地址：" +
      to +
      "\n" +
      "付款地址：" +
      from +
      "\n" +
      "矿工费：" +
      fee +
      "\n";

    // if(isNative){
    //   const ret = dialog.showMessageBoxSync({
    //   type: 'info',
    //   title: '访问说明',
    //   message: msg,
    //   buttons: ['OK', 'Cancel']
    //   })
    // }

    try {
      const ret = await callImKeyApi(
        {
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
              payment: valueInWei + " " + this.symbol,
              receiver: to,
              sender: from,
              fee: fee,
            },
          },
          id: requestId++,
        },
        isNative()
      );
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
      const ret = await callImKeyApi(
        {
          jsonrpc: "2.0",
          method: "eth.signMessage",
          params: {
            data: data,
            isPersonalSign,
            sender: checksumAddress,
            path: IMKEY_ETH_PATH,
          },
          id: requestId++,
        },
        isNative()
      );

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

// (function(window) {
//   'use strict';
//   function define_library() {
//       var Library = {};
//       var name = "Candy";
//       Library.greet = function() {
//           alert("Hello from the " + name + " library.");
//       }
//       return Library;
//   }

//   if (typeof(Library) === "undefined") {
//       window.library = define_library();
//   } else {
//       console.log("Library is already defined.");
//   }
// })(window);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function callImKeyApi(arg: Record<string, unknown>, isNative = false) {
  if (isNative) {
    console.log("native222");
    console.log(JSON.stringify(arg));
    // const ret = dialog.showMessageBoxSync({
    //   type: 'info',
    //   title: '访问说明',
    //   message: '你正在访问第三方DAPP\n' + JSON.stringify(arg),
    //   buttons: ['OK', 'Cancel']
    // })
    // console.log(ret)
    // console.log('dialog')
    // if(ret === 0){
    //   console.log(0)
    // }else{
    //   console.log('callNativeApi(arg)')
    // }
    return callNativeApi(arg);
  } else {
    console.log("rpc");
    return callRpcApi(arg);
  }
}

function callRpcApi(arg: Record<string, unknown>) {
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

async function callNativeApi(arg: Record<string, unknown>) {
  console.log("call native api in imkey-web3-provider: ", JSON.stringify(arg));
  const json = await window.imKeyManager.callNativeApi(arg);
  if (json.error) {
    if (json.error.message.includes("ImkeyUserNotConfirmed")) {
      throw new Error("user not confirmed");
    } else {
      throw new Error(json.error.message);
    }
  } else {
    return json;
  }
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

declare global {
  interface Window {
    imKeyManager: any;
    ImKeyProvider: ImKeyProvider;
  }
}
