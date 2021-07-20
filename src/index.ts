// @ts-ignore
import {
  hexToNumber,
  numberToHex,
  hexToNumberString,
  isHex,
  toChecksumAddress,
  fromWei,
  toUtf8,
  stringToNumber,
  bytesToHex,
} from './common/utils'
import { JsonRpcPayload, JsonRpcResponse } from './common/utils'
import { RLPEncodedTransaction, TransactionConfig } from './common/utils'
// @ts-ignore
import * as rlp from 'rlp'
import EventEmitter from 'event-emitter-es6'
import BN from 'bn.js'
import imTokenEip712Utils from './eip712'
import Eth from './hw-app-eth/Eth'
import TransportWebUSB from './hw-transport-webusb/TransportWebUSB'

// @ts-ignore
import Web3HttpProvider from 'web3-providers-http'
interface IProviderOptions {
  rpcUrl?: string
  infuraId?: string
  chainId?: number
  headers?: Record<string, string>
  symbol?: string
  decimals?: number
}
interface AddEthereumChainParameter {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}

interface RequestArguments {
  method: string
  params: any[]
}

const IMKEY_MANAGER_ENDPOINT = 'http://localhost:8081/api/imkey'
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0"
let requestId = 0
let ETH
let transport
function createJsonRpcRequest(method: string, params: any[] = []) {
  return {
    id: requestId++,
    jsonrpc: '2.0',
    method,
    params,
  }
}

function createJsonRpcResponse(id: string | number, result: any) {
  return {
    id,
    jsonrpc: '2.0',
    result,
  }
}

function createProviderRpcError(code: number, message: string) {
  return {
    message,
    code,
  }
}

function chainId2InfuraNetwork(chainId: number) {
  switch (chainId) {
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 5:
      return 'goerli'
    case 42:
      return 'kovan'
    default:
      return 'mainnet'
  }
}

function parseArgsNum(num: string | number | BN) {
  if (num instanceof BN) {
    return num.toNumber().toString()
  } else if (typeof num === 'string' && isHex(num)) {
    return hexToNumberString(num)
  } else {
    return num.toString()
  }
}

export default class ImKeyProvider extends EventEmitter {
  // @ts-ignore
  private httpProvider: Web3HttpProvider.HttpProvider
  private chainId: number
  private headers: []
  private symbol: string
  private decimals: number
  constructor(config: IProviderOptions) {
    super()
    let rpcUrl = config.rpcUrl
    this.chainId = config.chainId ?? 1
    if (config.infuraId) {
      const network = chainId2InfuraNetwork(this.chainId)
      rpcUrl = `https://${network}.infura.io/v3/${config.infuraId}`
    }

    let headers = null
    if (config.headers) {
      headers = []
      for (const idx in config.headers) {
        headers.push({ name: idx, value: config.headers[idx] })
      }
      this.headers = headers
    }
    // this.httpProvider = new providers.Web3Provider({
    //   host:rpcUrl
    // },{name:chainId2InfuraNetwork(this.chainId),chainId:this.chainId});
    // @ts-ignore
    this.httpProvider = new Web3HttpProvider(rpcUrl, {
      headers,
    })
    this.symbol = !config.symbol ? 'ETH' : config.symbol
    this.decimals = !config.decimals ? 18 : config.decimals
  }

  async callInnerProviderApi(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpProvider.send(req, (error: Error | null, result?: JsonRpcResponse) => {
        if (error) {
          reject(createProviderRpcError(4001, error.message))
        } else {
          resolve(result.result)
        }
      })
    })
  }

  async enable() {
    transport = await TransportWebUSB.create()
    ETH = new Eth(transport)
    const accounts = await this.imKeyRequestAccounts(requestId++)
    const chainIdHex = await this.callInnerProviderApi(createJsonRpcRequest('eth_chainId'))
    const chainId = hexToNumber(chainIdHex)
    if (chainId !== this.chainId) {
      throw new Error("chain id and rpc endpoint don't match")
    } else {
      this.emit('connect', { chainId })
      return accounts
    }
  }
  
  stop() {
    transport.close()
  }

  request = async (args: RequestArguments): Promise<any> => {
    switch (args.method) {
      case 'eth_getChainId': {
        return this.chainId
      }
      /* eslint-disable no-fallthrough */
      case 'personal_listAccounts':
      /* eslint-disable no-fallthrough */
      case 'eth_accounts':
      /* eslint-disable no-fallthrough */
      case 'eth_requestAccounts': {
        return await this.imKeyRequestAccounts(requestId++)
      }
      case 'eth_coinbase': {
        let ret = await this.imKeyRequestAccounts(requestId++)
        return String(ret[0])
      }
      case 'personal_sign': {
        return await this.imKeySign(requestId++, args.params![0], args.params![1], true)
      }
      case 'eth_signTransaction': {
        return await this.imKeySignTransaction(requestId++, args.params![0])
      }
      case 'eth_sendTransaction': {
        const ret = await this.imKeySignTransaction(requestId++, args.params![0])
        const req = createJsonRpcRequest('eth_sendRawTransaction', [ret.raw])
        return await this.callInnerProviderApi(req)
      }
      case 'eth_sign': {
        return await this.imKeySign(requestId++, args.params![1], args.params![0], false)
      }
      /* eslint-disable no-fallthrough */
      case 'eth_signTypedData':
      // case 'eth_signTypedData_v1':
      /* eslint-disable no-fallthrough */
      case 'eth_signTypedData_v3':
        /* eslint-disable no-fallthrough */
        return createProviderRpcError(4200, `${args.method} is not support now`)
      case 'eth_signTypedData_v4': {
        const jsonobj = JSON.parse(args.params![1])
        const eip712HashHexWithoutSha3 = imTokenEip712Utils.signHashHex(jsonobj, true)
        return await this.imKeySign(requestId++, eip712HashHexWithoutSha3, args.params![0], false)
      }
      case 'eth_getTransactionReceipt': {
        const payload = {
          jsonrpc: '2.0',
          method: args.method,
          params: args.params,
          id: requestId++,
        }
        return await this.requestTransactionReceipt(payload)
      }
      case 'wallet_addEthereumChain': {
        this.changeChain(args.params[0])
        return null
      }
      default: {
        const payload = {
          jsonrpc: '2.0',
          method: args.method,
          params: args.params,
          id: requestId++,
        }
        return await this.callInnerProviderApi(payload)
      }
    }
  }
  changeChain(args: AddEthereumChainParameter) {
    this.chainId = stringToNumber(parseArgsNum(args.chainId))
    this.decimals = args.nativeCurrency.decimals
    this.symbol = args.nativeCurrency.symbol
    if (args.rpcUrls) {
      let headers = this.headers
      // this.httpProvider = new providers.Web3Provider({
      //   host:args.rpcUrls[0]
      // },{name:chainId2InfuraNetwork(this.chainId),chainId:this.chainId});
      // @ts-ignore
      this.httpProvider = new Web3HttpProvider(args.rpcUrls, {
        headers,
      })
    }
  }
  sendAsync(args: JsonRpcPayload, callback: (err: Error | null, ret: any) => void) {
    this.request(args)
      .then(ret => {
        callback(null, createJsonRpcResponse(args.id, ret))
      })
      .catch(err => {
        callback(err, null)
      })
  }

  async requestTransactionReceipt(paload: JsonRpcPayload) {
    for (let i = 0; i < 10; i++) {
      await sleep(1000)
      let ret = await this.callInnerProviderApi(paload)
      if (ret) {
        return ret
      }
    }
  }

  async imKeyRequestAccounts(
    id: string | number | undefined,
    callback?: (error: Error, ret: any) => void,
  ) {
    try {
      const ret = await callImKeyApi({
        jsonrpc: '2.0',
        method: 'eth.getAddress',
        params: {
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      })
      callback?.(null, [ret.result?.address])
      return [ret.result?.address]
    } catch (error) {
      callback?.(error, null)
      throw createProviderRpcError(4001, error)
    }
  }

  async imKeySignTransaction(
    id: string | number | undefined,
    transactionConfig: TransactionConfig,
    callback?: (error: Error, ret: any) => void,
  ) {
    if (!transactionConfig.value) {
      transactionConfig.value = '0x0'
    }
    if (!transactionConfig.to || !transactionConfig.value) {
      throw createProviderRpcError(-32602, 'expected to,value')
    }

    // from
    let from: string
    if (!transactionConfig.from || typeof transactionConfig.from === 'number') {
      const accounts = await this.imKeyRequestAccounts(requestId++)
      from = accounts[0] as string
    } else {
      from = toChecksumAddress(transactionConfig.from as string)
    }

    // gas price
    let gasPriceDec: string
    if (transactionConfig.gasPrice) {
      gasPriceDec = parseArgsNum(transactionConfig.gasPrice)
    } else {
      const gasPriceRet = await this.callInnerProviderApi(createJsonRpcRequest('eth_gasPrice', []))
      gasPriceDec = hexToNumberString(gasPriceRet)
    }

    // chain id
    let chainId: number
    if (transactionConfig.chainId) {
      if (transactionConfig.chainId !== this.chainId) {
        throw createProviderRpcError(
          -32602,
          'expected chainId and connected chainId are mismatched',
        )
      }
      chainId = transactionConfig.chainId
    } else {
      chainId = this.chainId
    }

    // nonce
    let nonce: string
    if (transactionConfig.nonce) {
      nonce = parseArgsNum(transactionConfig.nonce)
    } else {
      nonce = await this.callInnerProviderApi(
        createJsonRpcRequest('eth_getTransactionCount', [transactionConfig.from, 'pending']),
      )
      nonce = hexToNumber(nonce).toString()
    }

    // estimate gas
    let gasLimit: string

    if (transactionConfig.gas) {
      gasLimit = parseArgsNum(transactionConfig.gas)
    } else {
      // console.log('transactionConfig.gas:' + transactionConfig.gas)
      const gasRet: string = await this.callInnerProviderApi(
        createJsonRpcRequest('eth_estimateGas', [
          {
            from: transactionConfig.from,
            to: transactionConfig.to,
            gas: transactionConfig.gas,
            gasPrice: numberToHex(gasPriceDec),
            value: transactionConfig.value,
            data: transactionConfig.data,
          },
        ]),
      )
      // console.log('gasRet:' + gasRet)
      gasLimit = parseArgsNum(gasRet)
    }

    const to = toChecksumAddress(transactionConfig.to)
    const value = parseArgsNum(transactionConfig.value)
    const valueInWei = fromWei(value)

    try {
      const ret = await callImKeyApi({
        jsonrpc: '2.0',
        method: 'eth.signTransaction',
        params: {
          transaction: {
            data: transactionConfig.data,
            gasLimit,
            gasPrice: gasPriceDec,
            nonce,
            to,
            value,
            chainId,
            path: IMKEY_ETH_PATH,
            symbol: this.symbol,
            decimal: this.decimals.toString(),
          },
        },
        id: requestId++,
      })
      let signature = ret.result?.signature
      if (!signature.startsWith('0x')) {
        signature = '0x' + signature
      }

      const decoded = rlp.decode(signature, true)

      const rlpTX: RLPEncodedTransaction = {
        raw: signature,
        tx: {
          nonce: nonce,
          gasPrice: gasPriceDec,
          gas: gasLimit,
          to: to,
          value: valueInWei,
          input: transactionConfig.data,
          // @ts-ignore
          r: bytesToHex(decoded.data[7]),
          // @ts-ignore
          s: bytesToHex(decoded.data[8]),
          // @ts-ignore
          v: bytesToHex(decoded.data[6]),
          hash: ret.result?.txHash,
        },
      }
      callback?.(null, rlpTX)
      return rlpTX
    } catch (error) {
      callback?.(error, null)
      throw createProviderRpcError(4001, error)
    }
  }

  async imKeySign(
    id: string | number | undefined,
    dataToSign: string,
    address: string | number,
    isPersonalSign: boolean,
    callback?: (error: Error, ret: any) => void,
  ) {
    if (Number.isInteger(address)) {
      const error = createProviderRpcError(-32602, 'Pass the address to sign data with for now')
      callback?.(
        {
          name: 'address invalid',
          message: 'Pass the address to sign data with for now',
        },
        null,
      )
      throw error
    }

    let data = ''
    try {
      data = toUtf8(dataToSign)
    } catch (error) {
      data = dataToSign
    }

    const checksumAddress = toChecksumAddress(address as string)

    try {
      const ret = await callImKeyApi({
        jsonrpc: '2.0',
        method: 'eth.signMessage',
        params: {
          data: data,
          isPersonalSign,
          sender: checksumAddress,
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      })
      let sigRet = ret.result?.signature.toLowerCase()
      if (!sigRet.startsWith('0x')) {
        sigRet = '0x' + sigRet
      }

      callback?.(null, sigRet)
      return sigRet
    } catch (error) {
      callback?.(error, null)
      throw createProviderRpcError(4001, error)
    }
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function callImKeyApi(arg: Record<string, unknown>) {
  // console.log('native222')
  // console.log(JSON.stringify(arg))
  transport = await TransportWebUSB.create()
  ETH = new Eth(transport)
  let param = JSON.parse(JSON.stringify(arg)).params
  let json
  if (arg.method === 'eth.signMessage') {
    // console.log('param:')
    // console.log(param)
    json = await ETH.signMessage(param.path, param.data, param.sender, param.isPersonalSign)
  }
  if (arg.method === 'eth.signTransaction') {
    // console.log('param:')
    // console.log(param)
    json = await ETH.signTransaction(param.transaction)
  }
  if (arg.method === 'eth.getAddress') {
    json = await ETH.getAddress(param.path)
  }
  await transport.close()
  // console.log('返回的数据：')
  // console.log(json)
  if (json.error) {
    if (json.error.message.includes('ImkeyUserNotConfirmed')) {
      throw new Error('user not confirmed')
    } else {
      throw new Error(json.error.message)
    }
  } else {
    return { result: json }
  }
}

function postData(url: string, data: Record<string, unknown>) {
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('HttpError')
    }
  })
}
