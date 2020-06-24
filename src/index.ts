import Web3 from 'web3';

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey"
let requestId = 0;

export default class ImKeyProvider extends Web3 {
    constructor(provider: string) {
        super(Web3.givenProvider || provider);
        this.eth.requestAccounts = imKeyRequestAccounts;
        this.eth.signTransaction = imKeySignTransaction;
        this.eth.sign = imKeySignMessage;
    }
}

function imKeyRequestAccounts() {
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
            console.log("request address: ", JSON.stringify(ret));
        })
    })
}

function imKeySignTransaction() {
    return new Promise<any>((resolve, reject) => {
        postData(IMKEY_MANAGER_ENDPOINT, {
            "jsonrpc": "2.0",
            "method": "eth.signTransaction",
            "params": {
                "transaction": {
                    "data": "",
                    "gasLimit": 189000,
                    "gasPrice": 20000000008,
                    "nonce": 8,
                    "to": "0x3535353535353535353535353535353535353535",
                    "value": 512,
                    "chainId": "28",
                    "path": "m/44'/60'/0'/0/0"
                },
                "preview": {
                    "payment": "0.01 ETH",
                    "receiver": "0xE6F4142dfFA574D1d9f18770BF73814df07931F3",
                    "sender": "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
                    "fee": "0.0032 ether"
                },
                "txHash": "0x09fa41c4d6b92482506c8c56f65b217cc3398821caec7695683110997426db01"
            },
            "id": 10
        }
        ).then((ret) => {
            console.log("sign transaction: ", JSON.stringify(ret));
        })
    })
}

function imKeySignMessage() {
    return new Promise<string>((resolve, reject) => {
        postData(IMKEY_MANAGER_ENDPOINT, {
            "jsonrpc": "2.0",
            "method": "eth.signMessage",
            "params": {
                "data": "Hello imKey",
                "sender": "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
                "path": "m/44'/60'/0'/0/0"
            },
            "id": 11
        }
        ).then((ret) => {
            console.log("request address: ", JSON.stringify(ret));
        })
    })
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
        .then(response => response.json())
        .then(console.log)// parses response to JSON
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
