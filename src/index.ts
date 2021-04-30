// @ts-ignore
import Web3Utils from "web3-utils";
// @ts-ignore
import { JsonRpcPayload, JsonRpcResponse } from "web3-core-helpers";
import Web3HttpProvider from "web3-providers-http";
// @ts-ignore
import * as rlp from "rlp";
// @ts-ignore
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
import BN from "bn.js";
// import * as sigutil from "eth-sig-util";
// import * as ethUtil from 'ethereumjs-util'
import imTokenEip712Utils from './eip712';
import Eth  from "./hw-app-eth/Eth";
import TransportWebUSB from "./hw-transport-webusb/TransportWebUSB";
interface IProviderOptions {
  rpcUrl?: string;
  infuraId?: string;
  chainId?: number;
  headers?: Record<string, string>;
  apirouter?:any;
  dialog?:any;
}

interface RequestArguments {
  method: string;
  params: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;
let apirouter;
var dialog;
let ETH;
let transport;
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
  } else if (typeof num === "string" && Web3Utils.isHex(num)) {
    return Web3Utils.hexToNumberString(num);
  } else {
    return num.toString();
  }
}

export async function test33(){
  console.log('test33')
  return 'test33'
}

function isNative(){
  return true
  // if(apirouter&&dialog){
  //   console.log('isNative true')
  //   return true
  // }else{
  //   console.log('isNative false')
  //   return false
  // }
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  private httpProvider: Web3HttpProvider.HttpProvider;
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

    // @ts-ignore
    this.httpProvider = new Web3HttpProvider(rpcUrl, {
      headers
    });

    apirouter = config.apirouter
    dialog = config.dialog

    console.log(this)
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
    console.log('enable')
    transport = await TransportWebUSB.create();
    ETH =  new Eth(transport )
    const accounts = await this.imKeyRequestAccounts(requestId++);
    const chainIdHex = await this.callInnerProviderApi(
      createJsonRpcRequest("eth_chainId")
    );
    const chainId = Web3Utils.hexToNumber(chainIdHex);
    if (chainId !== this.chainId) {
      throw new Error("chain id and rpc endpoint don't match");
    } else {
      this.emit("connect", { chainId });
      return accounts;
    }
  }
  stop(){
    transport.close()
  }
  async test22(){
    console.log('test22')
    return '22'
  }

  request2(args: RequestArguments): Promise<any>{
    console.log(args)
    return new Promise(function(resolve, reject){
      return resolve('0x6031564e7b2F5cc33737807b2E58DaFF870B590b')
    });
  }

  request = async (args: RequestArguments): Promise<any> => {
    console.log('request:\n' + JSON.stringify(args))
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
        return String(ret[0])
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
        const jsonobj = JSON.parse(args.params![1])
        const eip712HashHexWithoutSha3 = imTokenEip712Utils.signHashHex(
          jsonobj,
          true
        )
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
        return await this.requestTransactionReceipt(payload)
      }
      default: {
        console.log('request default')
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
    console.log('sendAsync:\n' + JSON.stringify(args));
    // if(args.method !== 'eth_call' && args.method !== 'eth_accounts'){
    //   console.log('return ' + args.method)
    //   return
    // }
    // if(args.method === 'eth_coinbase'){
    //   callback(null, createJsonRpcResponse(args.id, '0x407d73d8a49eeb85d32cf465507dd71d507100c1'))
    // }else{
      this.request(args)
      .then((ret) => {
        console.log('request ret:' + ret + ' method:' + args.method)
        console.log(JSON.stringify(ret))
        // if(args.method === 'eth_getTransactionReceipt'){
        //   console.log('diff ret:' + typeof ret)
          
        //   callback(null, createJsonRpcResponse(args.id, {"blockHash":"0x09e5d45158e71a6c07ac10142c3abfb24078de838bf8d3b5b6641fac67f42684","blockNumber":"0x15f56e4","contractAddress":null,"cumulativeGasUsed":"0xb64b5","from":"0x6031564e7b2f5cc33737807b2e58daff870b590b","gasUsed":"0x5208","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x2","to":"0xd6a6bc087d12ae864491240bf457856c71d48eb8","transactionHash":"0xbc86e19ae2856061b4fa38bba6aa0e60d02e7d54be738de088241df820c6ee24","transactionIndex":"0x2"}))
        //   // callback(null, createJsonRpcResponse(args.id, ret + ''))
        // }else{
          callback(null, createJsonRpcResponse(args.id, ret))
        // }
      })
      .catch((err) => {
        console.log('request err' + err)
        callback(err, null)
      });
    // }
    
    // this.request(args)
    // .then((ret) => callback(null, createJsonRpcResponse(args.id, ret)))
    // .catch((err) => callback(err, null));
  }

  async requestTransactionReceipt(paload: JsonRpcPayload){
    for (let i=0; i<10; i++){
      await sleep(1000)
      console.log('requestTransactionReceipt ' + i)
      let ret =  await this.callInnerProviderApi(paload);
      if(ret){
        return ret
      }
    }
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
      }, isNative());
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
      from = Web3Utils.toChecksumAddress(transactionConfig.from as string);
    }

    //gas price
    let gasPriceDec: string;
    if (transactionConfig.gasPrice) {
      gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
    } else {
      const gasPriceRet = await this.callInnerProviderApi(
        createJsonRpcRequest("eth_gasPrice", [])
      );
      gasPriceDec = Web3Utils.hexToNumberString(gasPriceRet);
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
      nonce = Web3Utils.hexToNumber(nonce).toString();
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
            gasPrice: Web3Utils.numberToHex(gasPriceDec),
            value: transactionConfig.value,
            data: transactionConfig.data,
          },
        ])
      );
      gasLimit = parseArgsNum(gasRet);
    }

    //fee
    let fee = (BigInt(gasLimit) * BigInt(gasPriceDec)).toString(); //wei
    fee = Web3Utils.fromWei(fee, "Gwei"); //to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (temp * 1000000000).toString(); //to ether
    fee = Web3Utils.fromWei(fee) + " ether";

    const to = Web3Utils.toChecksumAddress(transactionConfig.to);
    const value = parseArgsNum(transactionConfig.value);
    const valueInWei = Web3Utils.fromWei(value);

    const msg = transactionConfig.value + ' ETH\n'
    + '收款地址：' + to + '\n'
    + '付款地址：' + from + '\n'
    + '矿工费：' + fee + '\n';
    
    if(isNative){
      const ret = dialog.showMessageBoxSync({
      type: 'info',
      title: '访问说明',
      message: msg,
      buttons: ['OK', 'Cancel']
      })
    }

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
      }, isNative());
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
          r: Web3Utils.bytesToHex(decoded.data[7]),
          // @ts-ignore
          s: Web3Utils.bytesToHex(decoded.data[8]),
          // @ts-ignore
          v: Web3Utils.bytesToHex(decoded.data[6]),
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
      data = Web3Utils.toUtf8(dataToSign);
    } catch (error) {
      data = dataToSign;
    }

    const checksumAddress = Web3Utils.toChecksumAddress(address as string);

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
      },isNative());
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

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function callImKeyApi(arg: Record<string, unknown>, isNative = false) {
    if(isNative){
      console.log('native222')
      console.log(JSON.stringify(arg))
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
        return  await callNativeApi(arg)
    }else{
      console.log('rpc')
      return callRpcApi(arg)
    }
}

function callRpcApi(arg: Record<string, unknown>){
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

async function callNativeApi(arg: Record<string, unknown>){
  // const json = apirouter.api(arg)
  let param=  JSON.parse(JSON.stringify(arg)).params
  let json;
  if(arg.method ==="eth.signMessage"){
    console.log("param:")
    console.log(param)
     json = await ETH.signMessage(param.path,param.data,param.sender,param.isPersonalSign)
  }
  if(arg.method ==="eth.signTransaction"){
    console.log("param:")
    console.log(param)
    json = await ETH.signTransaction(param.transaction,param.preview)
  }
  if(arg.method ==="eth.getAddress"){
    json = await ETH.getAddress(param.path)
  }
  await transport.close()
  console.log("返回的数据：")
  console.log(json)
  if (json.error) {
    if (json.error.message.includes("ImkeyUserNotConfirmed")) {
      throw new Error("user not confirmed");
    } else {
      throw new Error(json.error.message);
    }
  } else {
    return {result:json};
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
