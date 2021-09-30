# imKey-web3-provider
[English](./README.md) | 简体中文    

------   

imkey-web3-provider (imKey ConnectJS) 是一个用来让 dApp 快速集成 imKey Pro 的开源项目。 imkey-web3-provider 遵从 [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) 实现。你可以将其作为 `Web3 Provider` 或者 `Ethers Provider` 使用。

## 快速开始

1. 添加依赖
```shell
yarn add @imkey/web3-provider
```

2. 导入及创建 `imKeyProvider`
```js
import ImKeyProvider from "@imkey/web3-provider"

const imKeyProvider = new ImKeyProvider({
  rpcUrl: 'put your infura address here',
  chainId: 1,
  headers: {
    "": ""
  }
})
// must enable before call any API
imKeyProvider.enable()

```
3. 配合 `Web3` 中使用
```js
import Web3 from 'web3'

const web3 = new Web3(imKeyProvider)

web3.eth.personal.sign(hexMsg, address, '', (err, txHash) => {
  if (!err) {
    
  } else {
  
  }
})

// send a transaction
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

4. 配合 `Ethers` 使用
```js
import { ethers } from 'ethers'

const provider = new ethers.providers.Web3Provider(imKeyProvider)
const singer = provider.getSigner();
```

## Copyright and License
```
  Copyright 2021 imToken PTE. LTD.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
```