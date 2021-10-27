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
  arrayEquals,
  EIP1559RLPEncodedTransaction,
} from './common/utils'
import { JsonRpcPayload, JsonRpcResponse } from './common/utils'
import { RLPEncodedTransaction, TransactionConfig } from './common/utils'
// @ts-ignore
import * as rlp from 'rlp'
import EventEmitter from 'event-emitter-es6'
import BN from 'bn.js'
import imTokenEip712Utils from './eip712'

// @ts-ignore
import Web3HttpProvider from 'web3-providers-http'
import { ETHSingleton } from './hw-app-eth/EHTSingleton'
import { TransportError, TransportStatusError } from './errors'
import { constants } from './common/constants'
import { ethers } from 'ethers'
export const EVENT_KEY: string = 'deviceStatus'

interface IProviderOptions {
  rpcUrl?: string
  infuraId?: string
  chainId?: number
  headers?: Record<string, string>
  symbol?: string
  decimals?: number
  msgAlert?: (msg: string) => void
  language?: string
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
  params?: any[] | undefined
}

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

function createProviderRpcError(code: number | unknown, message: string | unknown) {
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
  private accounts: string[]
  private msgAlert: (message?: any) => void;
  private language: string
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

    this.msgAlert = config.msgAlert
    
    if (config.language) {
      this.language = config.language.includes("zh") ? "zh" : "en"
    } else {
      this.language = this.getLang().includes("zh") ? "zh" : "en"
    }
  }

  async callInnerProviderApi(req: JsonRpcPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpProvider.send(req, (error: Error | null, result?: JsonRpcResponse) => {
        if (error) {
          reject(createProviderRpcError(4001, error.message))
        } else if (result.error) {
          reject(createProviderRpcError(4001, result.error.message))
        } else {
          resolve(result.result)
        }
      })
    })
  }

  async enable() {
    this.accounts = await this.imKeyRequestAccounts(requestId++)
    const chainIdHex = await this.callInnerProviderApi(createJsonRpcRequest('eth_chainId'))
    const chainId = hexToNumber(chainIdHex)
    if (chainId !== this.chainId) {
      const errMsg = "chain id and rpc endpoint don't match"
      this.msgAlert(errMsg)
      throw new Error(errMsg)
    } else {
      this.emit('connect', { chainId })
      return this.accounts
    }
  }

  async stop() {
    let eth = await ETHSingleton.getInstance()
    await eth.close()
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
    this.emit('chainChanged', { chainId: parseArgsNum(args.chainId) })
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
    callback?: (error: Error | unknown, ret: any) => void,
  ) {
    try {
      const ret = await this.callImKeyApi({
        jsonrpc: '2.0',
        method: 'eth.getAddress',
        params: {
          path: IMKEY_ETH_PATH,
        },
        id: requestId++,
      })
      let accounts = [ret.result?.address as string]
      if (!arrayEquals(this.accounts, accounts)) {
        this.emit('accountsChanged', { accounts: accounts })
      }
      callback?.(null, accounts)
      return accounts
    } catch (error) {
      callback?.(error, null)
      throw createProviderRpcError(4001, error)
    }
  }

  async imKeySignTransaction(
    id: string | number | undefined,
    transactionConfig: TransactionConfig,
    callback?: (error: Error | unknown, ret: any) => void,
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
    let maxFeePerGas: string
    let maxPriorityFeePerGas: string
    if (numberToHex(transactionConfig.type) === numberToHex(constants.TRANSACTION_TYPE_EIP1559)) {
      if (transactionConfig.maxFeePerGas && transactionConfig.maxPriorityFeePerGas) {
        maxFeePerGas = parseArgsNum(transactionConfig.maxFeePerGas)
        maxPriorityFeePerGas = parseArgsNum(transactionConfig.maxPriorityFeePerGas)
      } else {
        const maxFeePerGasRet = await this.callInnerProviderApi(
          createJsonRpcRequest('eth_gasPrice', []),
        )
        maxFeePerGas = hexToNumberString(maxFeePerGasRet)
        const maxPriorityFeePerGasRet = await this.callInnerProviderApi(
          createJsonRpcRequest('eth_maxPriorityFeePerGas', []),
        )
        maxPriorityFeePerGas = hexToNumberString(maxPriorityFeePerGasRet)
      }
    } else {
      if (transactionConfig.gasPrice) {
        gasPriceDec = parseArgsNum(transactionConfig.gasPrice)
      } else {
        const gasPriceRet = await this.callInnerProviderApi(
          createJsonRpcRequest('eth_gasPrice', []),
        )
        gasPriceDec = hexToNumberString(gasPriceRet)
      }
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
      let valueInHex = numberToHex(transactionConfig.value);
      // infura cannot accept 0x value
      const value = valueInHex === '0x' ? '0x0' : valueInHex;
      const gasRet: string = await this.callInnerProviderApi(
        createJsonRpcRequest('eth_estimateGas', [
          {
            from: transactionConfig.from,
            to: transactionConfig.to,
            gas: transactionConfig.gas,
            gasPrice: numberToHex(gasPriceDec),
            value,
            data: transactionConfig.data,
          },
        ]),
      )
      gasLimit = parseArgsNum(gasRet)
    }
    const to = toChecksumAddress(transactionConfig.to)
    const value = parseArgsNum(transactionConfig.value)
    const valueInWei = fromWei(value)

    try {
      let ret
      if (numberToHex(transactionConfig.type) === numberToHex(constants.TRANSACTION_TYPE_EIP1559)) {
        ret = await this.callImKeyApi({
          jsonrpc: '2.0',
          method: 'eth.signTransaction',
          params: {
            transaction: {
              data: transactionConfig.data,
              gasLimit,
              type: transactionConfig.type,
              maxFeePerGas: numberToHex(maxFeePerGas),
              maxPriorityFeePerGas: numberToHex(maxPriorityFeePerGas),
              accessList: transactionConfig.accessList,
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
      } else {
        ret = await this.callImKeyApi({
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
      }

      let signature = ret.result?.signature
      if (!signature.startsWith('0x')) {
        signature = '0x' + signature
      }
      let decoded
      let rlpTX: RLPEncodedTransaction | EIP1559RLPEncodedTransaction
      if (numberToHex(transactionConfig.type) === numberToHex(constants.TRANSACTION_TYPE_EIP1559)) {
        decoded = rlp.decode('0x' + signature.substring(4), true)
        rlpTX = {
          raw: signature,
          tx: {
            chainId: parseArgsNum(chainId),
            nonce: parseArgsNum(nonce),
            maxPriorityFeePerGas: parseArgsNum(maxPriorityFeePerGas),
            maxFeePerGas: parseArgsNum(maxFeePerGas),
            gas: gasLimit,
            to: to,
            value: valueInWei,
            input: transactionConfig.data,
            accessList:
              transactionConfig.accessList !== undefined
                ? ethers.utils.accessListify(transactionConfig.accessList)
                : [],
            // @ts-ignore
            r: bytesToHex(decoded.data[10]),
            // @ts-ignore
            s: bytesToHex(decoded.data[11]),
            // @ts-ignore
            v: bytesToHex(decoded.data[9]),
            hash: ret.result?.txHash,
          },
        }
      } else {
        decoded = rlp.decode(signature, true)
        rlpTX = {
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
    callback?: (error: Error | unknown, ret: any) => void,
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
      const ret = await this.callImKeyApi({
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

  async callImKeyApi(arg: Record<string, unknown>) {
    let eth: ETHSingleton
    try {
      eth = await ETHSingleton.getInstance()
      await eth.init()
      this.subscribeTransportEvents(eth)
      let param = JSON.parse(JSON.stringify(arg)).params
      let json
      if (arg.method === 'eth.signMessage') {
        json = await eth.signMessage(param.path, param.data, param.sender, param.isPersonalSign)
      }
      if (arg.method === 'eth.signTransaction') {
        json = await eth.signTransaction(param.transaction)
      }
      if (arg.method === 'eth.getAddress') {
        json = await eth.getAddress(param.path)
      }
      await eth.close()
      return { result: json }
    } catch (e) {
      if (e instanceof TransportStatusError) {
        this.emit(EVENT_KEY, e.message)
        this.replugWarning();
        console.error("imkey transport error: ", e)
        // window.alert("请重新打开项目")
        throw e.message
      } else if (e instanceof TransportError) {
        this.usbChannelOccupyWarning()
        console.error("imkey transport error: ", e)
        throw e
      }
    } finally {
      if (eth) {
        this.unsubscribeTransportEvents(eth)
      }
    }
  }

  private getLang() {
    if (navigator.languages != undefined) 
      return navigator.languages[0]; 
    return navigator.language;
  }

  private replugWarning() {
    let msg: string
    if (this.language === "zh") {
      msg = "imKey 通讯出错，请拔掉 imKey 重新插入"
    } else {
      msg = "Some errors occur, please replug imKey"
    }
    this.warningAlert(msg)
  }

  private usbChannelOccupyWarning() {
    let msg: string
    if (this.language === "zh") {
      msg = "imKey 有未完成操作，请检查其他网页是否因为未完成的操作"
    } else {
      msg = "There are incomplete operations on imKey, please check if other pages are using imKey."
    }

    this.warningAlert(msg)
  }

  private warningAlert(msg: string) {
    if (this.msgAlert) {
      this.msgAlert(msg);
    } else {
      window.alert(msg)
    }
  }

  private subscribeTransportEvents(eth: ETHSingleton) {
    if (eth && eth.transport) {
      eth.transport.on('unresponsive', this.imKeyUnresponsiveEmitter)
      eth.transport.on('responsive', this.imKeyResponsiveEmitter)
    }
  }

  private unsubscribeTransportEvents(eth) {
    if (eth && eth.transport) {
      eth.transport.off('unresponsive', this.imKeyUnresponsiveEmitter)
      eth.transport.off('responsive', this.imKeyResponsiveEmitter)
    }
  }

  imKeyResponsiveEmitter = () => {
    this.emit(EVENT_KEY, 'ImKeyResponsive')
  }

  imKeyUnresponsiveEmitter = () => {
    console.log('imkey unresponsive')
    this.emit(EVENT_KEY, 'ImKeyUnresponsive')
  }
}



async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
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
