import {
  asUInt16BE,
  asUInt8,
  addressFromPubkey,
  numberToHex,
  fromWei,
  toChecksumAddress,
  parseArgsNum, deleteZero
} from "../common/utils";
import type Transport from '../hw-transport/Transport'
import { encode } from 'rlp'
import { ETHApdu } from '../common/apdu'
import { ethers } from 'ethers'
import secp256k1 from 'secp256k1'
import { getTokenInfo } from "./erc20Utils";

type Transaction = {
  data: string
  gasLimit: string
  gasPrice: string
  nonce: string
  to: string
  value: string
  chainId: string
  path: string
  symbol?: string
  decimal?:string
}
type Preview = {
  payment: string
  receiver: string
  sender: string
  fee: string
}
const ethApdu = new ETHApdu()

/**
 * Ethereum API
 *
 * @example
 * import Eth from "@imkeyhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
export default class Eth {
  transport: Transport<any>
  // @ts-ignore
  constructor(transport: Transport<any>) {
    this.transport = transport
  }

  /**
   * get Ethereum address for a given BIP 32 path.
   * @param path a path in BIP 32 format
   * @option boolDisplay optionally enable or not the display
   * @option boolChaincode optionally enable or not the chaincode request
   * @return an object with a publicKey, address and (optionally) chainCode
   * @example
   * eth.getAddress("44'/60'/0'/0/0").then(o => o.address)
   */
  async getAddress(
    path: string
  ): Promise<{
    address: string
    pubkey: string
  }> {
    const toSend = []
    let response
    toSend.push(ethApdu.selectApplet())
    toSend.push(ethApdu.getXPub(path, false))
    for (let i of toSend) {
      response = await this.transport.send(i)
    }
    return {
      address: addressFromPubkey(response),
      pubkey: response.slice(0, 65).toString('hex'),
    }
  }

  /**
   * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
   * @example
   eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
   */

  async signTransaction(
    transaction: Transaction
  ): Promise<{
    signature: string
    txhash: string
  }> {
    const getAddress = await this.getAddress(transaction.path)
    const preview = genPreview(transaction, getAddress.address)
    const rawTransaction = genRawTransaction(transaction)
    const toSend = genApdu(rawTransaction, preview, transaction)
    let response
    for (let i of toSend) {
      response = await this.transport.send(i)
    }
    const pubkey = getAddress.pubkey
    const signCompact = response.slice(1, 65)
    const normalizesSig = secp256k1.signatureNormalize(signCompact)
    const recId = getRecID(rawTransaction, normalizesSig, pubkey)
    let v
    if (transaction.chainId === '' || transaction.chainId === 'undefined') {
      v = numberToHex(27)
    } else {
      v = (recId + 35 + Number(transaction.chainId) * 2).toString(16)
    }
    // @ts-ignore
    const r = normalizesSig.slice(0, 32).toString('hex')
    // @ts-ignore
    const s = normalizesSig.slice(32, 32 + 32).toString('hex')
    const signedTransaction = encode([
      numberToHex(transaction.nonce),
      numberToHex(transaction.gasPrice),
      numberToHex(transaction.gasLimit),
      transaction.to,
      numberToHex(transaction.value),
      transaction.data,
      Buffer.from(v, 'hex'),
      Buffer.from(r, 'hex'),
      Buffer.from(s, 'hex'),
    ])
    const signature = '0x' + signedTransaction.toString('hex')
    const txhash = ethers.utils.keccak256(signedTransaction)
    return { signature, txhash }
  }

  /**
  * You can sign a message according to eth_sign RPC call and retrieve v, r, s given the message and the BIP 32 path of the account to sign.
  * @example
eth.signPersonalMessage("44'/60'/0'/0/0", Buffer.from("test").toString("hex")).then(result => {
  var v = result['v'] - 27;
  v = v.toString(16);
  if (v.length < 2) {
    v = "0" + v;
  }
  console.log("Signature 0x" + result['r'] + result['s'] + v);
})
   */
  async signMessage(
    path: string,
    message: string,
    sender: string,
    isPersonalSign: boolean
  ): Promise<{
    signature: string
  }> {
    let messageToSign
    // 判断是否是HEX
    if (ethers.utils.isHexString(message)) {
      messageToSign = Buffer.from(message.substring(2), 'hex')
    } else {
      messageToSign = Buffer.from(message, 'ascii')
    }
    let data
    if (isPersonalSign) {
      const header = Buffer.from(
        'Ethereum Signed Message:\n' + messageToSign.length,
        'ascii'
      )
      data = Buffer.concat([header, messageToSign])
    } else {
      data = messageToSign
    }
    const dataToSign = Buffer.concat([
      asUInt8(1),
      asUInt16BE(data.length),
      data,
    ])
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(0), dataToSign])
    let toSend = []
    let response
    const getAddress = await this.getAddress(path)
    if (getAddress.address !== sender) {
      throw 'address not match'
    }
    const pubkey = getAddress.pubkey
    toSend = ethApdu.preparePersonalSign(apduPack)
    toSend.push(ethApdu.personalSign(path))
    for (let i of toSend) {
      response = await this.transport.send(i)
    }
    const signCompact = response.slice(1, 65)
    const normalizesSig = secp256k1.signatureNormalize(signCompact)
    const recId = getRecID(data, normalizesSig, pubkey)
    const v = (recId + 27).toString(16)
    // @ts-ignore
    const r = normalizesSig.slice(0, 32).toString('hex')
    // @ts-ignore
    const s = normalizesSig.slice(32, 32 + 32).toString('hex')
    // return { v, r, s };
    const signature ='0x' +  r + s + v
    return { signature }
  }
}
function getRecID(
  data: Buffer,
  normalizesSig: Uint8Array,
  pubkey: string
): number {
  let recId = 0

  const dataHash = Buffer.from(ethers.utils.keccak256(data).substring(2), 'hex')
  for (let i = 0; i <= 3; i++) {
    try {
      if (
        Buffer.from(
          secp256k1.ecdsaRecover(normalizesSig, i, dataHash, false)
        ).toString('hex') === pubkey
      ) {
        recId = i
        break
      }
    } catch (e) {
      continue
    }
  }
  return recId
}

function genPreview(transaction: Transaction, address: string): Preview {
  let symbol = !transaction.symbol ? 'ETH' : transaction.symbol
  let decimal = !transaction.decimal ? '18': transaction.decimal

  const gasLimit = parseArgsNum(transaction.gasLimit)
  const gasPrice = parseArgsNum(transaction.gasPrice)
  // fee
  let fee = (BigInt(gasLimit) * BigInt(gasPrice)).toString() // wei
  fee = fromWei(fee, 'gwei') // to Gwei
  const temp = Math.ceil(Number(fee))
  fee = (BigInt(temp) * BigInt(1000000000)).toString() // to ether
  fee = fromWei(fee) + ' ' + "ETH"  //fee 默认就是显示ETH
  let to = toChecksumAddress(transaction.to)
  let value = parseArgsNum(transaction.value)
  let valueInWei = fromWei(value,decimal)
  if(transaction.value==="0"||transaction.value==="0x00"){
    //代币转账
    //通过transaction.to 合约地址 查询代币的代币名称和decimal
    const zrxInfo = getTokenInfo(transaction.to);
    decimal = zrxInfo.decimals.toString()
    symbol = zrxInfo.ticker.toString()
    //解析data数据获取要转账的地址和金额
    //  data: '0x' + 'a9059cbb' + addPreZero('3b11f5CAB8362807273e1680890A802c5F1B15a8') + addPreZero(web3.utils.toHex(1000000000000000000).substr(2)),
    if(transaction.data.startsWith("0xa9059cbb")){
      to = "0x"+deleteZero(transaction.data.substring(10,10+64))
      value = "0x"+deleteZero(transaction.data.substring(10+64,10+64+64))
      valueInWei =  fromWei(parseArgsNum(value),decimal)
    }else{
      //如果不是转账交易，就后续当signMessage处理
      return null
    }

  }

  const preview = {
    payment: valueInWei + ' ' + symbol,
    receiver: to,
    sender: address,
    fee: fee,
  }
console.log(preview)
  return preview
}
function genRawTransaction(transaction: Transaction): Buffer {
  let rawTransaction
  if (transaction.chainId === '' || transaction.chainId === 'undefined') {
    rawTransaction = encode([
      numberToHex(transaction.nonce),
      numberToHex(transaction.gasPrice),
      numberToHex(transaction.gasLimit),
      transaction.to,
      numberToHex(transaction.value),
      transaction.data,
    ])
  } else {
    rawTransaction = encode([
      numberToHex(transaction.nonce),
      numberToHex(transaction.gasPrice),
      numberToHex(transaction.gasLimit),
      transaction.to,
      numberToHex(transaction.value),
      transaction.data,
      numberToHex(transaction.chainId),
      0x00,
      0x00,
    ])
  }
  return rawTransaction
}
function genApdu(
  rawTransaction: Buffer,
  preview: Preview,
  transaction: Transaction
): any[] {
  let apduList = []
  if(preview == null){//说明是合约交易的非转账交易，不显示签名信息，直接显示确认签名，调用signMessage接口
    const dataToSign = Buffer.concat([
      asUInt8(1),
      asUInt16BE(rawTransaction.length),
      rawTransaction,
    ])
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(0), dataToSign])
    apduList = ethApdu.preparePersonalSign(apduPack)
    apduList.push(ethApdu.personalSign(transaction.path))
  }else{
    console.log(rawTransaction.toString("hex"))
    const data = Buffer.concat([
      asUInt8(1),
      asUInt16BE(rawTransaction.length),
      rawTransaction,
      asUInt8(7),
      asUInt8(preview.payment.length),
      Buffer.from(preview.payment, 'ascii'),
      asUInt8(8),
      asUInt8(preview.receiver.length),
      Buffer.from(preview.receiver, 'ascii'),
      asUInt8(9),
      asUInt8(preview.fee.length),
      Buffer.from(preview.fee, 'ascii'),
    ])
    console.log(data.toString("hex"))
    console.log(transaction.path)
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(1), asUInt8(0), data])
    apduList = ethApdu.prepareSign(apduPack)
    apduList.push(ethApdu.signDigest(transaction.path))
  }

  return apduList
}
