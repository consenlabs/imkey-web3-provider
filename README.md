# imKey-web3-provider
使用imKey Provider可以使用WebUSB在DApp里实现连接imKey实现签名转账等功能。

# 使用指南
一、通过Web3集成
1. 安装依赖包
  ```
  "dependencies": {
    "@imkey/web3-provider": "^1.1.0-alpha",
    "web3": "^1.3.6",
    "web3-providers-http": "^1.3.6"
  }
  ```
2. 初始化
```
import ImKeyProvider from "@imkey/web3-provider"
import Web3 from 'web3'
import Web3HttpProvider from 'web3-providers-http'
const imKeyProvider = new ImKeyProvider({
  rpcUrl: 'put your infura address here',
  chainId: 1,
  headers: {
    "": ""
  }
})
imKeyProvider.enable()
const web3 = new Web3(
  (imKeyProvider as unknown) as Web3HttpProvider.HttpProvider
)
```
3. 使用

imKey Provider 遵循eip-1193，https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md，
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
