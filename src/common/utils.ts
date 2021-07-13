import { ethers } from 'ethers'
import _, {isNull, isUndefined, isString, isNumber} from 'underscore'
import BN from 'bn.js'
import utf8 from 'utf8'

export function addressFromPubkey(pubkey: Buffer): string {
  const pubkeyHash = ethers.utils.keccak256(pubkey.slice(1, 65))
  return ethers.utils.getAddress('0x' + pubkeyHash.substring(26))
}

export function asUInt16BE(value:number) {
  const b = Buffer.alloc(2)
  b.writeUInt16BE(value, 0)
  return b
}
export function asUInt8(value:number) {
  const b = Buffer.alloc(1)
  b.writeUInt8(value, 0)
  return b
}
export function numberToHex(value: string | number | BN) {
  if (isNull(value) || isUndefined(value)) {
    return value
  }

  // @ts-ignore
  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error('Given input "' + value + '" is not a number.')
  }

  const numberBN = toBN(value)
  const result = numberBN.toString(16)
  if(numberBN.lt(new BN(0))){
    throw new Error('number "' + result + '" is -0x.')
  }
  return '0x' + result
}

export function toBN(x): BN {
  if (isNaN(Number(x))) return new BN(0)
  if (x instanceof BN) return x

  if (typeof x === 'string') {
    if (x.indexOf('0x') === 0 ) {
      return new BN(x.replace('0x', ''), 16)
    }
  }
  return new BN(x)
}

function isHexStrict(hex: string): boolean {
  return (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex)
}

export function isHex(value: string | number): boolean {
  return isString(value) && isHexStrict(value.toString())
}

export function hexToNumber(value: string): number | string {
  if (!value) {
    return value
  }

  if (isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "' + value + '" is not a valid hex string.')
  }

  return toBN(value).toNumber()
}
export function stringToNumber(value: string): number {
  if (!isString(value)) {
    throw new Error('Given value "' + value + '" is not a string.')
  }

  return toBN(value).toNumber()
}
export function hexToNumberString(value: string): string {
  if (isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "' + value + '" is not a valid hex string.')
  }

  return ethers.utils.hexValue(value)
}

export function toChecksumAddress(address: string): string {
  return ethers.utils.getAddress(address)
}

export function bytesToHex(bytes: []): string {
  const hexs = []
  for (let hex = [], i = 0; i < bytes.length; i++) {
    /* jshint ignore:start */
    hexs.push((bytes[i] >>> 4).toString(16))
    hexs.push((bytes[i] & 0xf).toString(16))
    /* jshint ignore:end */
  }
  return '0x' + hexs.join('')
}

export function fromWei(value: string | number, unit?: string): string {
  return ethers.utils.formatUnits(value, unit)
}

export function toUtf8(value: string): string {
  return hexToUtf8(value)
}
function hexToUtf8(hexStr:string) {
  if (!isHexStrict(hexStr)){
    throw new Error('The parameter "' + hexStr + '" must be a valid HEX string.')
  }
  let hex = hexStr
  let str = ''
  let code = 0
  hex = hex.replace(/^0x/i, '')

  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/, '')
  hex = hex.split('').reverse().join('')
  hex = hex.replace(/^(?:00)*/, '')
  hex = hex.split('').reverse().join('')

  const l = hex.length

  for (let i = 0; i < l; i += 2) {
    code = parseInt(hex.substr(i, 2), 16)
    // if (code !== 0) {
    str += String.fromCharCode(code)
    // }
  }

  return utf8.decode(str)
}

export function parseArgsNum(num: string | number | BN): string {
  if (num instanceof BN) {
    return num.toNumber().toString()
  } else if (typeof num === 'string' && isHex(num)) {
    return hexToNumberString(num)
  } else {
    return num.toString()
  }
}
export interface JsonRpcPayload {
  jsonrpc: string
  method: string
  params: any[]
  id?: string | number
}

export interface JsonRpcResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: string
}
export interface RLPEncodedTransaction {
  raw: string
  tx: {
    nonce: string
    gasPrice: string
    gas: string
    to: string
    value: string
    input: string
    r: string
    s: string
    v: string
    hash: string
  }
}
export interface TransactionConfig {
  from?: string | number
  to?: string
  value?: number | string | BN
  gas?: number | string
  gasPrice?: number | string | BN
  data?: string
  nonce?: number
  chainId?: number
  common?: Common
  chain?: string
  hardfork?: string
}
export type chain = 'mainnet' | 'goerli' | 'kovan' | 'rinkeby' | 'ropsten'

export type hardfork =
  | 'chainstart'
  | 'homestead'
  | 'dao'
  | 'tangerineWhistle'
  | 'spuriousDragon'
  | 'byzantium'
  | 'constantinople'
  | 'petersburg'
  | 'istanbul'

export interface Common {
  customChain: CustomChainParams
  baseChain?: chain
  hardfork?: hardfork
}

export interface CustomChainParams {
  name?: string
  networkId: number
  chainId: number
}
