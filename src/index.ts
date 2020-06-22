import Web3 from 'web3';

const IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey"
let requestId = 0;

export default class ImKeyProvider extends Web3 {
    constructor(provider: string) {
        super(Web3.givenProvider || provider);
        this.eth.requestAccounts = imKeyRequestAccounts;
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
