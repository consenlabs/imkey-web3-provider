import Web3 from 'web3';
import { TransactionConfig, RLPEncodedTransaction } from "web3-eth"

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey"
let requestId = 0;

export default class ImKeyProvider extends Web3 {
    constructor(provider: string) {
        super(Web3.givenProvider || provider);
        this.eth.requestAccounts = this.imKeyRequestAccounts;
        this.eth.signTransaction = this.imKeySignTransaction.bind(this);
        this.eth.sign = this.imKeySignMessage;
    }

    imKeyRequestAccounts() {
        return new Promise<string[]>((resolve, reject) => {
            postData(IMKEY_MANAGER_ENDPOINT, {
                "jsonrpc": "2.0",
                "method": "eth.getAddress",
                "params": {
                    "path": "m/44'/60'/0'/0/0"
                },
                "id": requestId++
            }
            ).then((ret) => {
                if (ret.result == null) {
                    reject(ret.error)
                } else {
                    resolve([ret.result.address])
                }
            })
        })
    }

    async imKeySignTransaction(transactionConfig: TransactionConfig) {
        // if (!transactionConfig.gasPrice || !transactionConfig.nonce || !transactionConfig.to || !transactionConfig.value
        //     !transactionConfig

        let v = Web3.utils.fromWei(transactionConfig.value!.toString()) + " ETH";
        console.log("v: ", v);

        var fee = (BigInt(transactionConfig.gas) * BigInt(transactionConfig.gasPrice)).toString();//wei
        fee = Web3.utils.fromWei(fee,"Gwei");//to Gwei
        let temp = Math.ceil(Number(fee));
        fee = (temp * 1000000000).toString();//to ether
        fee = Web3.utils.fromWei(fee) + " ether";
        console.log("fee: " + fee);

        let cloneConfig = Object.assign(Object.create(Object.getPrototypeOf(transactionConfig)), transactionConfig);
        let gasLimit = await this.eth.estimateGas(cloneConfig);
        console.log('gasLimit: ', gasLimit);
        console.log(transactionConfig);

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
                        "path": "m/44'/60'/0'/0/0"
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
                    console.log("sign transaction: ", ret);
                    let rlpTX: RLPEncodedTransaction = {
                        raw: ret.result.txData,
                        tx: {
                            nonce: transactionConfig.nonce!.toString(),
                            gasPrice: transactionConfig.gasPrice!.toString(),
                            gas: transactionConfig.gas!.toString(),
                            to: transactionConfig.to!.toString(),
                            value: transactionConfig.value!.toString(),
                            input: transactionConfig.data!.toString(),//??
                            r: "r",
                            s: "s",
                            v: "v",
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
        return new Promise<string>((resolve, reject) => {
            console.log("datatosign", dataToSign);
            console.log("address", address);
            postData(IMKEY_MANAGER_ENDPOINT, {
                "jsonrpc": "2.0",
                "method": "eth.signMessage",
                "params": {
                    "data": dataToSign,
                    "sender": address,
                    "path": "m/44'/60'/0'/0/0"
                },
                "id": requestId++
            }
            ).then((ret) => {
                if (ret.result == null) {
                    reject(ret.error)
                } else {
                    resolve(ret.result.signature)
                }
            }).catch((error) => {
                reject(error)
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
        }).catch(console.log)
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
    .then(rsp => console.log(rsp))
