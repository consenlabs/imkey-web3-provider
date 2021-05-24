# imkey-web3-provider
使用imkey provider可以使用WebUsb在dapp里实现连接imkey实现签名转账等功能。

# Usage
一、通过web3集成
1. install package
  ```
  "dependencies": {
    "@imkey/web3-provider": "https://github.com/consenlabs/imkey-web3-provider.git#63cb7f6",
    "web3": "1.2.9",
    "web3-utils": "1.0.0-beta.36"
  }
  ```
2. 初始化
```
var ImKeyProvider = require('@imkey/web3-provider').default
var Web3 = require('web3')

const imkeyProvider = new ImKeyProvider({
  rpcUrl: 'put your infura address here',
  chainId: 1,
  headers: {
    "": ""
  }
})
imkeyProvider.enable();
const web3 = new Web3(imkeyProvider as any);
```
3. 使用

imkey provider 遵循eip-1193，https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md，
因为遵守标准，可以直接参考https://web3js.readthedocs.io/en/v1.3.0/ 来使用接口，下面是消息签名和发送交易示例

```
//消息签名

web3.eth.personal.sign(hexMsg, address, '', (err, txHash) => {
  if (!err) {
    
  } else {
  
  }
})

//发送交易
web3.eth
  .sendTransaction({
    from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
    // gasPrice: "20000000008",
    // nonce: 8,
    // gas: "21000",
    to: "0x3535353535353535353535353535353535353535",
    value: "100000000000000000",
    // chainId: 3,
    // data: "",
  })
  .then(console.log)
```
二、直接使用webUsb
```
import TransportWebUSB from "./hw-transport-webusb/TransportWebUSB";
import ETH  from "./hw-app-eth/Eth";

const  transport = await TransportWebUSB.create();
const eth = new ETH(transport)
//获取地址
await eth.getAddress("m/44'/60'/0'/0/0").then((ethres)=>{
console.log("eth.getAddress:"+ethres.address)
console.log("eth.pubkey:"+ethres.pubkey)
});
//消息签名
await eth.signMessage("m/44'/60'/0'/0/0","Hello imKey","0x6031564e7b2F5cc33737807b2E58DaFF870B590b",true).then((ethres)=>{
console.log("eth.signPersonalMessage:"+ethres)
console.log(ethres)
});

const transaction= {
data: "",
gasLimit: "189000",
gasPrice: "20000000008",
nonce: "8",
to: "0x3535353535353535353535353535353535353535",
value: "512",
chainId: "28",
path: "m/44'/60'/0'/0/0",
symbol:'ETH'
}
//Transaction签名
await eth.signTransaction(transaction).then(
(ethres)=>{
console.log("ethres.signature:"+ethres.signature)
console.log("ethres.txhash:"+ethres.txhash)
}
)
});
```
