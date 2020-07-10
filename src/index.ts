import Web3 from 'web3';
import * as rlp from 'rlp';
import {TransactionConfig, RLPEncodedTransaction} from "web3-eth"
import {HttpProvider, WebsocketProvider} from "web3-core";


interface RequestArguments {
    method: string;
    params?: any[];
}

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;

export default class ImKeyProvider{
    infuraProvider: WebsocketProvider

    constructor(provider: string) {
        // super(Web3.givenProvider || provider);
        this.infuraProvider = new WebsocketProvider(provider);
        // this.eth.requestAccounts = this.imKeyRequestAccounts;
        // this.eth.signTransaction = this.imKeySignTransaction.bind(this);
        // this.eth.sign = this.imKeySignMessage;
    }

    request(args: RequestArguments): Promise<any> {
        switch (args.method) {
            case 'eth_requestAccounts':
                return this.imKeyRequestAccounts()
            default:

                return new Promise<unknown>(((resolve, reject) => {

                    let payload = {
                        jsonrpc: "2.0",
                        method: args.method,
                        params: args.params,
                        id: requestId++
                    };
                    this.infuraProvider.send(payload, (err, ret) => {
                        if (err!=null) {
                            reject(err);
                        } else {
                            resolve(ret);
                        }
                    })
                }))

        }
    }

    imKeyRequestAccounts(callback?: (error: Error, result: string[]) => void) {
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
                callback?.(ret.error, ret.result.address);
                if (ret.result == null) {
                    reject(ret.error);
                } else {
                    resolve([ret.result.address]);
                }
            }).catch((error) => {
                callback?.(error, [""]);
                reject(error);
            })
        })
    }

    async imKeySignTransaction(transactionConfig: TransactionConfig) {
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
        let gasLimit = await this.eth.estimateGas(cloneConfig);

        return new Promise<RLPEncodedTransaction>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                    "jsonrpc": "2.0",
                    "method": "eth.signTransaction",
                    "params": {
                        "transaction": {
                            "data": transactionConfig.data,
                            "gasLimit": gasLimit,
                            "gasPrice": transactionConfig.gasPrice,
                            "nonce": transactionConfig.nonce,
                            "to": transactionConfig.to,
                            "value": transactionConfig.value,
                            "chainId": transactionConfig.chainId,
                            "path": IMKEY_ETH_PATH
                        },
                        "preview": {
                            "payment": transactionConfig.value!.toString() + " ETH",
                            "receiver": transactionConfig.to,
                            "sender": transactionConfig.from,
                            "fee": fee
                        }
                    },
                    "id": requestId++
                }
            ).then((ret) => {
                if (ret.result == null) {
                    reject(ret.error);
                } else {
                    var txData = ret.result.txData;
                    if (!ret.result.txData.startsWith("0x")) {
                        txData = "0x" + txData;
                    }
                    const decoded = rlp.decode(txData, true);

                    let rlpTX: RLPEncodedTransaction = {
                        raw: ret.result.txData,
                        tx: {
                            nonce: transactionConfig.nonce!.toString(),
                            gasPrice: transactionConfig.gasPrice!.toString(),
                            gas: transactionConfig.gas!.toString(),
                            to: transactionConfig.to!.toString(),
                            value: transactionConfig.value!.toString(),
                            input: transactionConfig.data!.toString(),
                            // @ts-ignore
                            r: this.utils.bytesToHex(decoded.data[7]),
                            // @ts-ignore
                            s: this.utils.bytesToHex(decoded.data[8]),
                            // @ts-ignore
                            v: Number(this.utils.bytesToHex(decoded.data[6])).toString(),
                            hash: ret.result.hash,
                        }
                    };

                    resolve(rlpTX);
                }
            }).catch((error) => {
                reject(error);
            })
        })
    }

    imKeySignMessage(dataToSign: string, address: string | number, callback?: (error: Error, signature: string) => void) {
        if (Number.isInteger(address)) {
            throw new Error("Pass the address to sign data with for now");
        }

        return new Promise<string>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                    "jsonrpc": "2.0",
                    "method": "eth.signMessage",
                    "params": {
                        "data": dataToSign,
                        "sender": address,
                        "path": IMKEY_ETH_PATH
                    },
                    "id": requestId++
                }
            ).then((ret) => {
                callback?.(ret.error, ret.result.signature);
                if (ret.result == null) {
                    reject(ret.error);
                } else {
                    resolve(ret.result.signature);
                }
            }).catch((error) => {
                callback?.(error, "");
                reject(error);
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


fetch("http://localhost:8081/api/imkey", {
    body: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "eth.getAddress",
        "params": {
            "path": "m/44'/60'/0'/0/0"
        },
        "id": 1
    }), // must match 'Content-Type' header
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
