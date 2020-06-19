import Web3 from 'web3';

export default class ImKeyProvider {

    // endpoint: string;

    constructor(provider: string) {
        let web3 = new Web3(provider);
        web3.eth.requestAccounts = imKeyRequestAccounts;
        return web3;
    }
}

function imKeyRequestAccounts() {
    return new Promise<string[]>((resolve, reject) => {
        console.log('自动编译测试2');

        resolve(["0x32D7b16d736897c310f79020a464D4EC47D07430"]);
    })
}

// interface Window {
//     imKeyProvider: ImKeyProvider;
// }
//
//
// window.imKeyProvider = new ImKeyProvider("");
//

// window.ImKeyProvider = ImKeyProvider;
