import Web3 from 'web3';

class ImKeyProvider {

    // endpoint: string;

    constructor(public provider: string) {
        let web3 = new Web3(provider);
        web3.eth.requestAccounts = imKeyRequestAccounts;
    }
}

function imKeyRequestAccounts(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        console.log('初始化');

        resolve(["0x32D7b16d736897c310f79020a464D4EC47D07430"]);
    })
}
