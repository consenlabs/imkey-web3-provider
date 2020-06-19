import Web3 from 'web3';

export default class ImKeyProvider extends Web3 {
    constructor(provider: string) {
        super(Web3.givenProvider || provider);
        this.eth.requestAccounts = imKeyRequestAccounts;
    }
}

function imKeyRequestAccounts() {
    return new Promise<string[]>((resolve, reject) => {
        console.log('自动编译测试2');

        resolve(["0x32D7b16d736897c310f79020a464D4EC47D07430"]);
    })
}
