# imKey-web3-provider    
English | [简体中文](./README.zh.md)    

------   

imkey-web3-provider (aka imKey ConnectJS) is a library for easy integration of imKey Pro into dApps. It follows the [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md), so you can use it as a `Web3 Provider` or `ethers Provider`.

## Getting Started

1. Installing 
```shell
yarn add @imkey/web3-provider
```

2. Importing and Creating `imKeyProvider`
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
3. Using with Web3
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

4. Or using it with ethers
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
