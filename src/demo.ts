import ImKeyProvider from './index'

// import Web3 from 'web3'
import Web3HttpProvider from 'web3-providers-http'
import TransportWebUSB from './hw-transport-webusb/TransportWebUSB'
import ETH from './hw-app-eth/Eth'
import { ethers } from 'ethers'
import { addPreZero, RLPEncodedTransaction } from './common/utils'
// import ImKeyProvider from "@imkey/web3-provider"
interface ProviderConnectInfo {
  readonly chainId: string
}

const imKeyProvider = new ImKeyProvider({
  // rpcUrl: 'https://kovan.infura.io/v3/2012498d93094f5f939f580516a92236',
  rpcUrl: 'https://eth-goerli.alchemyapi.io/v2/ZnE2yvX8X2kxvjF040aj5cWcimA3QxwA',
  chainId: 5,
  symbol: 'ETH',
  // headers: {
  //   agent: "ios:2.4.2:2",
  // },
})
imKeyProvider.enable()
const web3 = new ethers.providers.Web3Provider(
  (imKeyProvider as unknown) as Web3HttpProvider.HttpProvider,
)

// allowanceTest();
imKeyProvider.on('disconnect', (code: any, reason: any) => {
  console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`)
})

imKeyProvider.on('connect', (connectInfo: ProviderConnectInfo) => {
  console.log(`Ethereum Provider connected success, chainId: ${connectInfo.chainId}`)
})

const webUsbBtn = document.createElement('button')
webUsbBtn.innerText = 'WebUSB Test'
webUsbBtn.addEventListener('click', async () => {
  const transport = await TransportWebUSB.create()
  const eth = new ETH(transport)
  await eth.getAddress("m/44'/60'/0'/0/0").then(response => {
    console.log('response.getAddress:' + response.address)
    console.log('response.pubkey:' + response.pubkey)
  })
  // await eth
  //   .signMessage(
  //     "m/44'/60'/0'/0/0",
  //     'Hello imKey',
  //     '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
  //     false,
  //   )
  //   .then(response => {
  //     console.log('response.signature:' + response.signature)
  //   })

  // const transaction = {
  //   to: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  //   // 调用合约转账value这里留空
  //   value: '0x00',
  //   // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
  //   data:
  //     '0x' +
  //     'b9059cbb' +
  //     addPreZero('3b11f5CAB8362807273e1680890A802c5F1B15a8') +
  //     addPreZero(web3.utils.toHex(1000000000000000000).substr(2)),
  //   gasLimit: '21000',
  //   gasPrice: '6000000000',
  //   nonce: '8',
  //   chainId: '28',
  //   path: "m/44'/60'/0'/0/0",
  //   symbol: 'ETH',
  // }
  // await eth.signTransaction(transaction).then(response => {
  //   console.log('response.signature:' + response.signature)
  //   console.log('response.txhash:' + response.txhash)
  //   console.log(response)
  // })
  // const transaction1 = {
  //   to: '0x3535353535353535353535353535353535353535',
  //   value: '1000000000000000000',
  //   data: '',
  //   gasLimit: '21000',
  //   gasPrice: '6000000000',
  //   nonce: '8',
  //   chainId: '28',
  //   path: "m/44'/60'/0'/0/0",
  //   symbol: 'ETH',
  // }
  // await eth.signTransaction(transaction1).then(response => {
  //   console.log('response.signature:' + response.signature)
  //   console.log('response.txhash:' + response.txhash)
  //   console.log(response)
  // })

  // const crashTransaction = {
  //   data:
  //     '0xe47d166c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000020403ad2aa00000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000006da0e6abd44175f50c563cd8b860dd988a7c34330000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000017d3f6a2a163ccab580000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000068e866a5b6a968599c353ee359442ec7bbc9b61000000000000000000000000068e866a5b6a968599c353ee359442ec7bbc9b612dca8ddfd1f655490b07f5c7c5e4ac41365b408e5b280a50ef559fc096448d0f000000000000000000000000000000000000000000000000000000006131db0500000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000062b11fa034be6fdf57ccfc41819a2ab272fb3567a1237a9b16315fcc25757896d67e82e3bee77dfb42d7c9252bf2341b86c82210c4a4f1223c697b497955641a161b00000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  //   gasLimit: '0x4de38',
  //   gasPrice: '0x197ff6ee27',
  //   nonce: '15',
  //   to: '0x25657705a6be20511687D483f2fCCfb2d92f6033',
  //   value: '0xde0b6b3a7640000',
  //   chainId: '5',
  //   path: "m/44'/60'/0'/0/0",
  //   symbol: 'ETH',
  //   decimal: '18',
  // }

  // let path = "m/44'/60'/0'/0/0".to_string();
  // let payment = "0.01 ETH".to_string();
  // let receiver = "0xE6F4142dfFA574D1d9f18770BF73814df07931F3".to_string();
  // let sender = "0x6031564e7b2F5cc33737807b2E58DaFF870B590b".to_string();
  // let fee = "0.0032 ether".to_string();

  const transactionEip1559_test1 = {
    to: '0x03e2B0f5369297a2E7A13d6F8e6d4BFbB9cf7dC7',
    value: '500000000000000',
    data: '',
    gasLimit: '21000',
    maxFeePerGas: '2000000000',
    maxPriorityFeePerGas: '2000000000',
    accessList: [],
    nonce: '549',
    chainId: '42',
    path: "m/44'/60'/0'/0/0",
    symbol: 'ETH',
    type: '0x02',
  }
  const transactionEip1559_test2 = {
    to: '0xd5539a0e4d27ebf74515fc4acb38adcc3c513f25',
    value: '64',
    data: '0xf579eebd8a5295c6f9c86e',
    gasLimit: '54',
    maxFeePerGas: '963240322143',
    maxPriorityFeePerGas: '28710',
    accessList: [
      {
        address: '0x70b361fc3a4001e4f8e4e946700272b51fe4f0c4',
        storageKeys: [
          '0x8419643489566e30b68ce5bc642e166f86e844454c99a03ed4a3d4a2b9a96f63',
          '0x8a2a020581b8f3142a9751344796fb1681a8cde503b6662d43b8333f863fb4d3',
          '0x897544db13bf6cd166ce52498d894fe6ce5a8d2096269628e7f971e818bf9ab9',
        ],
      },
    ],
    nonce: '4',
    chainId: '276',
    path: "m/44'/60'/0'/0/0",
    symbol: 'ETH',
    type: '0x02',
  }

  await eth.signTransaction(transactionEip1559_test2).then(response => {
    console.log('response.signature:' + response.signature)
    console.log('response.txhash:' + response.txHash)
    console.log(response)
  })
})
const btnChangeChain = document.createElement('button')
btnChangeChain.innerText = 'changeChain'
btnChangeChain.addEventListener('click', async () => {
  imKeyProvider
    .request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: 42,
          nativeCurrency: {
            name: 'BSC',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: 'https://kovan.infura.io/v3/2012498d93094f5f939f580516a92236',
        },
      ],
    })
    .then(ret => {
      console.log(ret)
    })
    .catch(error => {
      console.log(error)
    })
})

const btn = document.createElement('button')
btn.innerText = 'requestAccounts'
btn.addEventListener('click', async () => {
  function showResult(error: Error, result: string[]) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', result)
    }
  }

  web3.send('eth_requestAccounts', []).then(console.log)
})

const btnSignTransaction = document.createElement('button')
btnSignTransaction.innerText = 'Sign Transaction'
btnSignTransaction.addEventListener('click', () => {
  function showResult(error: Error, result: RLPEncodedTransaction) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', result)
    }
  }

  web3
    .send('eth_signTransaction', [
      {
        from: '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
        // gasPrice: "20000000008",
        // nonce: 8,
        // gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: '100000000000000000',
        // chainId: 3,
        // data: "",
      },
    ])
    .then(console.log)
})

const btnSendTransaction = document.createElement('button')
btnSendTransaction.innerText = 'Send Transaction'
btnSendTransaction.addEventListener('click', () => {
  web3
    .send('eth_sendTransaction', [
      {
        from: '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
        // gasPrice: "20000000008",
        // nonce: 8,
        // gas: "21000",
        to: '0x63bF955208Ae6A8dae3d9516eDe7D38040db7356',
        value: '200000000000000',
        // chainId: 3,
        // data: "",
      },
    ])
    .then(console.log)
})
const btnSendTransactionEip1559 = document.createElement('button')
btnSendTransactionEip1559.innerText = 'Send Eip1559 Transaction'
btnSendTransactionEip1559.addEventListener('click', () => {
  web3
    .send('eth_sendTransaction', [
      {
        from: '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
        // gasPrice: "20000000008",
        // nonce: 8,
        // gas: "21000",
        // maxPriorityFeePerGas:'0x87ffb644',
        // maxFeePerGas:'0x88ffb64b',
        to: '0x63bF955208Ae6A8dae3d9516eDe7D38040db7356',
        value: '200000000000000',
        accessList: [],
        type: '0x02',
        // chainId: 3,
        // data: "",
      },
    ])
    .then(console.log)
})
const btnSignPersonalMessage = document.createElement('button')
btnSignPersonalMessage.innerText = 'Sign Personal Message'
btnSignPersonalMessage.addEventListener('click', () => {
  function showResult(error: Error, signature: string) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', signature)
    }
  }

  web3
    .send('personal_sign', ['Hello imKey', '0x6031564e7b2F5cc33737807b2E58DaFF870B590b', ''])
    .then(console.log)
    // @ts-ignore
    .catch(error => {
      console.log('error message: ', error.message)
    })
})

const btnSignMessage = document.createElement('button')
btnSignMessage.innerText = 'Sign Message'
btnSignMessage.addEventListener('click', () => {
  function showResult(error: Error, signature: string) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', signature)
    }
  }

  web3
    .send('eth_sign', ['0x6031564e7b2F5cc33737807b2E58DaFF870B590b', '😊'])
    .then(console.log)
    // @ts-ignore
    .catch(error => {
      console.log('error message: ', error.message)
    })
})

const btnRequestEthRequestAccounts = document.createElement('button')
btnRequestEthRequestAccounts.innerText = 'request eth_requestAccounts'
btnRequestEthRequestAccounts.addEventListener('click', async () => {
  imKeyProvider
    .request({ method: 'eth_requestAccounts', params: [] })
    .then(ret => {
      console.log(ret)
    })
    .catch(error => {
      console.log(error)
    })
})

const btnRequestEthSign = document.createElement('button')
btnRequestEthSign.innerText = 'request eth_sign'
btnRequestEthSign.addEventListener('click', async () => {
  imKeyProvider
    .request({
      method: 'eth_sign',
      params: ['0x6031564e7b2F5cc33737807b2E58DaFF870B590b', '😊'],
    })
    .then(ret => {
      console.log(ret)
    })
    .catch(error => {
      console.log(error)
    })
})

const btnRequestEthSignTransaction = document.createElement('button')
btnRequestEthSignTransaction.innerText = 'request eth_signTransaction'
btnRequestEthSignTransaction.addEventListener('click', async () => {
  imKeyProvider
    .request({
      method: 'eth_signTransaction',
      params: [
        {
          from: '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
          gasPrice: '0x4a817c808',
          nonce: 8,
          gas: '0x5208',
          to: '0x3535353535353535353535353535353535353535',
          value: '0x200',
          chainId: 42,
          data: '',
        },
      ],
    })
    .then(ret => {
      console.log(ret)
    })
    .catch(error => {
      console.log(error)
    })
})

// document.appendChild(btn);

document.body.append(webUsbBtn)
document.body.append(btn)
document.body.append(btnChangeChain)
document.body.append(btnSignTransaction)
document.body.append(btnSignPersonalMessage)
document.body.append(btnSignMessage)
document.body.append(btnSendTransaction)
document.body.append(btnSendTransactionEip1559)

document.body.append(document.createElement('br'))
document.body.append(btnRequestEthRequestAccounts)
document.body.append(btnRequestEthSign)
document.body.append(btnRequestEthSignTransaction)
