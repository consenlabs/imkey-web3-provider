import Web3 from 'web3';

import * as rlp from 'rlp';
import { TransactionConfig, RLPEncodedTransaction } from "web3-eth"

const EventEmitter = require('alpeventemitter');

interface RequestArguments {
    method: string;
    params?: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;

function createJsonRpcResponse(id: number, ret: any) {
    return {
        "id": id,
        "jsonrpc": "2.0",
        "result": ret
    }
}

function createJsonRpcError(id: number, error: Error) {
    return {
        "id": id,
        "jsonrpc": "2.0",
        "error": {
            "code": -32002,
            "message": error.message
        }
    }
}

function createProviderRpcError(name: string, message: string) {
    let e: ProviderRpcError = {
        name: name,
        message: message,
        code: 4900
    }
    return e;
}

interface ImKeyProviderConfig {
    provider: string
}

interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export default class ImKeyProvider extends EventEmitter {
    // @ts-ignore
    #infuraProvider: Web3.providers.HttpProvider

    constructor() {
        super()
        // @ts-ignore
        this.#infuraProvider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/819049aeadbe494c80bdb815cf41242e");
        this.emit('connect');
        this.emit('accountsChanged', ["0x78643FE682df12651d5aF3DD30fB02B828B9f111"]);
    }

    async request(args: RequestArguments): Promise<any> {
        console.log(args.params);
        // Promise
        switch (args.method) {
            case 'eth_requestAccounts':
                let address = await this.imKeyRequestAccounts(requestId++);
                return Promise.resolve(address);
            case 'eth_sign':
                let ret = await this.imKeySignMessage(requestId++, args.params![1], args.params![0]);
                console.log(ret);
                return Promise.resolve("fucc");
            case 'eth_signTransaction':
                return this.imKeySignTransaction(requestId++, args.params![0]);
            default:
                let payload = {
                    jsonrpc: "2.0",
                    method: args.method,
                    params: args.params,
                    id: requestId++
                };
                // @ts-ignore
                this.#infuraProvider.send(payload, (err, ret) => {
                    if (err != null) {
                        return Promise.reject(err);
                    } else {
                        return Promise.resolve(ret);
                    }
                })
        }
    }

    sendAsync(args: RequestArguments & { id: number }, callback: (err: Error | null, ret: any) => void) {
        switch (args.method) {
            case 'eth_requestAccounts':
                return this.imKeyRequestAccounts(args.id, callback);
            case 'eth_sign':
                return this.imKeySignMessage(args.id, args.params![1], args.params![0], callback);
            case 'eth_signTransaction':
                return this.imKeySignTransaction(args.id, args.params![0], callback);
            default:
                // @ts-ignore
                this.#infuraProvider.send(args, callback)
        }
    }

    imKeyRequestAccounts(id: number, callback?: (error: Error, ret: any) => void) {
        return new Promise<string[]>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                "jsonrpc": "2.0",
                "method": "eth.getAddress",
                "params": {
                    "path": IMKEY_ETH_PATH
                },
                "id": requestId++
            }
            ).then((ret) => {
                callback?.(ret.error, createJsonRpcResponse(id, [ret.result?.address]));
                resolve([ret.result?.address]);
            }).catch((error) => {
                callback?.(error, createJsonRpcResponse(id, [""]));
                reject(error);
                this.emit('disconnect', createProviderRpcError(error.name, error.message));
            })
        })
    }

    async imKeySignTransaction(id: number, transactionConfig: TransactionConfig, callback?: (error: Error, ret: any) => void) {
        if (!transactionConfig.gasPrice || !transactionConfig.nonce || !transactionConfig.to || !transactionConfig.value
            || !transactionConfig.chainId || !transactionConfig.from) {
            throw new Error("Need pass gasPrice,nonce,to,value,chainId,from");
        }

        var fee = (BigInt(transactionConfig.gas) * BigInt(transactionConfig.gasPrice)).toString();//wei
        fee = Web3.utils.fromWei(fee, "Gwei");//to Gwei
        let temp = Math.ceil(Number(fee));
        fee = (temp * 1000000000).toString();//to ether
        fee = Web3.utils.fromWei(fee) + " ether";

        let cloneConfig = Object.assign(Object.create(Object.getPrototypeOf(transactionConfig)), transactionConfig);
        const web3 = new Web3(this.#infuraProvider);
        let gasLimit = await web3.eth.estimateGas(cloneConfig);

        let from = Web3.utils.toChecksumAddress(transactionConfig.from as string);
        let gasPrice = Web3.utils.hexToNumber(transactionConfig.gasPrice as string);
        let nonce = Web3.utils.hexToNumber(transactionConfig.nonce);
        let gas = Web3.utils.hexToNumber(transactionConfig.gas as string);
        let to = Web3.utils.toChecksumAddress(transactionConfig.to);
        let value = Web3.utils.hexToNumber(transactionConfig.value as string);


        return new Promise<RLPEncodedTransaction>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                "jsonrpc": "2.0",
                "method": "eth.signTransaction",
                "params": {
                    "transaction": {
                        "data": transactionConfig.data,
                        "gasLimit": gasLimit,
                        "gasPrice": gasPrice,
                        "nonce": nonce,
                        "to": to,
                        "value": value,
                        "chainId": transactionConfig.chainId,
                        "path": IMKEY_ETH_PATH
                    },
                    "preview": {
                        "payment": value + " ETH",
                        "receiver": to,
                        "sender": from,
                        "fee": fee
                    }
                },
                "id": requestId++
            }
            ).then((ret) => {
                var txData = ret.result?.txData;
                if (!ret.result?.txData?.startsWith("0x")) {
                    txData = "0x" + txData;
                }

                const decoded = rlp.decode(txData, true);

                let rlpTX: RLPEncodedTransaction = {
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
                    }
                };
                callback?.(ret.eror, createJsonRpcResponse(id, rlpTX));
                resolve(rlpTX);
            }).catch((error) => {
                callback?.(error, createJsonRpcResponse(id, null));
                reject(error);
                this.emit('disconnect', createProviderRpcError(error.name, error.message));
            })
        })
    }

    imKeySignMessage(id: number, dataToSign: string, address: string | number, callback?: (error: Error, ret: any) => void) {
        console.log("datatosign:", dataToSign);
        if (Number.isInteger(address)) {
            throw new Error("Pass the address to sign data with for now");
        }

        const checksumAddress = Web3.utils.toChecksumAddress(address as string);

        return new Promise<string>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                "jsonrpc": "2.0",
                "method": "eth.signMessage",
                "params": {
                    "data": Web3.utils.toUtf8(dataToSign),
                    "sender": checksumAddress,
                    "path": IMKEY_ETH_PATH
                },
                "id": requestId++
            }
            ).then((ret) => {
                callback?.(ret.error, createJsonRpcResponse(id, ret.result?.signature));
                resolve(ret.result?.signature);
            }).catch((error) => {
                callback?.(error, createJsonRpcResponse(id, ""));
                reject(error);
                this.emit('disconnect', createProviderRpcError(error.name, error.message));
            })
        })
    }
}

function postData(url: string, data: object) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error("HttpError");
            }
        }).catch((error) => {
            throw new Error("HttpError");
        })
}

//
//
// fetch("http://localhost:8081/api/imkey", {
//     body: JSON.stringify({
//         "jsonrpc": "2.0",
//         "method": "eth.getAddress",
//         "params": {
//             "path": "m/44'/60'/0'/0/0"
//         },
//         "id": 1
//     }), // must match 'Content-Type' header
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, same-origin, *omit
//     headers: {
//         'user-agent': 'Mozilla/4.0 MDN Example',
//         'content-type': 'application/json'
//     },
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // *client, no-referrer
// })
