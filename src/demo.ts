import ImKeyProvider from "./index"

import Web3 from 'web3'
import Web3HttpProvider from 'web3-providers-http'
import TransportWebUSB from './hw-transport-webusb/TransportWebUSB'
import ETH from './hw-app-eth/Eth'
import { addPreZero, deleteZero, RLPEncodedTransaction } from "./common/utils";
// import ImKeyProvider from "@imkey/web3-provider"
interface ProviderConnectInfo {
  readonly chainId: string
}

const imKeyProvider = new ImKeyProvider({
  rpcUrl: 'https://kovan.infura.io/v3/2012498d93094f5f939f580516a92236',
  chainId: 42,
  symbol: 'ETH',
  // headers: {
  //   agent: "ios:2.4.2:2",
  // },
})
imKeyProvider.enable()
const web3 = new Web3(
  (imKeyProvider as unknown) as Web3HttpProvider.HttpProvider
)

// allowanceTest();
imKeyProvider.on('disconnect', (code: any, reason: any) => {
  console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`)
})

imKeyProvider.on('connect', (connectInfo: ProviderConnectInfo) => {
  console.log(
    `Ethereum Provider connected success, chainId: ${connectInfo.chainId}`
  )
})

const webUsbBtn = document.createElement('button')
webUsbBtn.innerText = 'WebUSB Test'
webUsbBtn.addEventListener('click', async (e) => {
  // 0xa9059cbb
  const address = "0000000000000000000000003b11f5CAB8362807273e1680890A802c5F1B15a8"
  const amount = "0000000000000000000000000000000000000000000000000de0b6b3a7640000"
  console.log("address:"+deleteZero(address))
  console.log("amount:"+deleteZero(amount))
  const transport = await TransportWebUSB.create()
  const eth = new ETH(transport)
  await eth.getAddress("m/44'/60'/0'/0/0").then((response) => {
    console.log('response.getAddress:' + response.address)
    console.log('response.pubkey:' + response.pubkey)
  })
  await eth
    .signMessage(
      "m/44'/60'/0'/0/0",
      'Hello imKey',
      '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      false
    )
    .then((response) => {
      console.log('response.signature:' + response.signature)
    })

  const transaction = {
        to: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        // 调用合约转账value这里留空
        value: '0x00',
        // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
        data: '0x' + 'b9059cbb' + addPreZero('3b11f5CAB8362807273e1680890A802c5F1B15a8') + addPreZero(web3.utils.toHex(1000000000000000000).substr(2)),
    gasLimit: '21000',
    gasPrice: '6000000000',
    nonce: '8',
    chainId: '28',
    path: "m/44'/60'/0'/0/0",
    symbol: 'ETH',
  }
  await eth.signTransaction(transaction).then((response) => {
    console.log('response.signature:' + response.signature)
    console.log('response.txhash:' + response.txhash)
    console.log(response)
  })
  const transaction1 = {
    to: "0x3535353535353535353535353535353535353535",
    value: '1000000000000000000',
    data: '',
    gasLimit: '21000',
    gasPrice: '6000000000',
    nonce: '8',
    chainId: '28',
    path: "m/44'/60'/0'/0/0",
    symbol: 'ETH',
  }
  await eth.signTransaction(transaction1).then((response) => {
    console.log('response.signature:' + response.signature)
    console.log('response.txhash:' + response.txhash)
    console.log(response)
  })
})
const btnChangeChain = document.createElement('button')
btnChangeChain.innerText = 'changeChain'
btnChangeChain.addEventListener('click', async (e) => {
  imKeyProvider
    .request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: 42,
          nativeCurrency: {
            name: "BSC",
            symbol: "BNB",
            decimals: 18
          },
          rpcUrls: "https://kovan.infura.io/v3/2012498d93094f5f939f580516a92236"
        },
      ],
    })
    .then((ret) => {
      console.log(ret)
    })
    .catch((error) => {
      console.log(error)
    })
})

const btn = document.createElement('button')
btn.innerText = 'requestAccounts'
btn.addEventListener('click', async (e) => {
  function showResult(error: Error, result: string[]) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', result)
    }
  }

  web3.eth.requestAccounts(showResult).then(console.log)
})

const btnSignTransaction = document.createElement('button')
btnSignTransaction.innerText = 'Sign Transaction'
btnSignTransaction.addEventListener('click', (e) => {
  function showResult(error: Error, result: RLPEncodedTransaction) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', result)
    }
  }

  web3.eth
    .signTransaction(
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
      showResult
    )
    .then(console.log)
})

const btnSendTransaction = document.createElement('button')
btnSendTransaction.innerText = 'Send Transaction'
btnSendTransaction.addEventListener('click', (e) => {
  function showResult(error: Error, result: RLPEncodedTransaction) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', result)
    }
  }

  web3.eth
    .sendTransaction({
      from: '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      // gasPrice: "20000000008",
      // nonce: 8,
      // gas: "21000",
      to: '0x3535353535353535353535353535353535353535',
      value: '200000000000000000',
      // chainId: 3,
      // data: "",
    })
    .then(console.log)
})

const btnSignPersonalMessage = document.createElement('button')
btnSignPersonalMessage.innerText = 'Sign Personal Message'
btnSignPersonalMessage.addEventListener('click', (e) => {
  function showResult(error: Error, signature: string) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', signature)
    }
  }

  web3.eth.personal
    .sign(
      'Hello imKey',
      '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      '',
      showResult
    )
    .then(console.log)
    // @ts-ignore
    .catch((error) => {
      console.log('error message: ', error.message)
    })
})

const btnSignMessage = document.createElement('button')
btnSignMessage.innerText = 'Sign Message'
btnSignMessage.addEventListener('click', (e) => {
  function showResult(error: Error, signature: string) {
    if (error !== null) {
      console.log('show error: ', error)
    } else {
      console.log('show result: ', signature)
    }
  }

  web3.eth
    .sign(
      '😊',
      '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      showResult
    )
    .then(console.log)
    // @ts-ignore
    .catch((error) => {
      console.log('error message: ', error.message)
    })

})

const btnRequestEthRequestAccounts = document.createElement('button')
btnRequestEthRequestAccounts.innerText = 'request eth_requestAccounts'
btnRequestEthRequestAccounts.addEventListener('click', async (e) => {
  imKeyProvider
    .request({ method: 'eth_requestAccounts', params: [] })
    .then((ret) => {
      console.log(ret)
    })
    .catch((error) => {
      console.log(error)
    })
})

const btnRequestEthSign = document.createElement('button')
btnRequestEthSign.innerText = 'request eth_sign'
btnRequestEthSign.addEventListener('click', async (e) => {
  imKeyProvider
    .request({
      method: 'eth_sign',
      params: [
        '0x3535353535353535353535353535353535353535',
        '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      ],
    })
    .then((ret) => {
      console.log(ret)
    })
    .catch((error) => {
      console.log(error)
    })
})

const btnRequestEthSignTransaction = document.createElement('button')
btnRequestEthSignTransaction.innerText = 'request eth_signTransaction'
btnRequestEthSignTransaction.addEventListener('click', async (e) => {
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
    .then((ret) => {
      console.log(ret)
    })
    .catch((error) => {
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

document.body.append(document.createElement('br'))
document.body.append(btnRequestEthRequestAccounts)
document.body.append(btnRequestEthSign)
document.body.append(btnRequestEthSignTransaction)
