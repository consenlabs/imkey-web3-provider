import { utils } from "ethers";
import _  from 'underscore';
import BN  from 'bn.js';
import numberToBN  from 'number-to-bn';
import utf8 from'utf8';
import { formatUnits } from "@ethersproject/units/src.ts/index";
type Defer<T> = {
  promise: Promise<T>;
  resolve: (arg0: T) => void;
  reject: (arg0: any) => void;
};

export function foreach<T, A>(
  arr: T[],
  callback: (arg0: T, arg1: number) => Promise<A>,
): Promise<A[]> {
  function iterate(index, array, result) {
    if (index >= array.length) {
      return result;
    } else
      return callback(array[index], index).then(function (res) {
        result.push(res);
        return iterate(index + 1, array, result);
      });
  }

  return Promise.resolve().then(() => iterate(0, arr, []));
}
export function doIf(
  condition: boolean,
  callback: () => any | Promise<any>,
): Promise<void> {
  return Promise.resolve().then(() => {
    if (condition) {
      return callback();
    }
  });
}
export function asyncWhile<T>(
  predicate: () => boolean,
  callback: () => Promise<T>,
): Promise<Array<T>> {
  function iterate(result) {
    if (!predicate()) {
      return result;
    } else {
      return callback().then(res => {
        result.push(res);
        return iterate(result);
      });
    }
  }

  return Promise.resolve([]).then(iterate);
}

export function addressFromPubkey(pubkey: Buffer):string {
  const pubkey_hash = utils.keccak256(pubkey.slice(1,65));
  return  utils.getAddress("0x"+pubkey_hash.substring(26));
}
export function isValidHex(input: string) :boolean {
  let value =  input
  if (input.startsWith("0x") || input.startsWith("0X") ){
    value = input.substring(2)
  }

  if (value.length == 0 || value.length % 2 != 0 ){
    return false;
  }
  if (typeof(value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }
  return true;
}
export function asUInt16BE(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}
export function asUInt8(value) {
  const b = Buffer.alloc(1);
  b.writeUInt8(value, 0);
  return b;
}
export function numberToHex(value: string | number |BN) {
  if (_.isNull(value) || _.isUndefined(value)) {
    return value;
  }

  // @ts-ignore
  if (!isFinite(value) && !isHexStrict(value)) {
    throw new Error('Given input "'+value+'" is not a number.');
  }

  const number = toBN(value);
  const result = number.toString(16);

  return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
}
export function hexBuffer(str: string): Buffer {
  return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}

export function maybeHexBuffer(str: string): Buffer {
  if (!str) return null;
  return hexBuffer(str);
}


// const toBN = function(number){
//   try {
//     return numberToBN.apply(null, number);
//   } catch(e) {
//     throw new Error(e + ' Given value: "'+ number +'"');
//   }
// };
const toBN = (x): BN => {
  if (isNaN(Number(x))) return new BN(0);
  if (x instanceof BN) return x;

  if (typeof x === "string") {
    if (x.indexOf("0x") === 0 || x.indexOf("-0x") === 0) {
      return new BN(x.replace("0x", ""), 16);
    }
  }
  return new BN(x);
};

const isHexStrict = function (hex) {
  return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};


export function isHex(value: string | number ) : boolean{
  return (_.isString(value) && isHexStrict(value));
  // return ((_.isString(value) || _.isNumber(value)) && /^(-0x|0x)?[0-9a-f]*$/i.test(<string>value));
}

export function  hexToNumber (value: string) :number|string {
  if (!value) {
    return value;
  }

  if (_.isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "'+value+'" is not a valid hex string.');
  }

  return toBN(value).toNumber();
}
export function  stringToNumber (value: string) :number {

  if (_.isString(value)) {
    throw new Error('Given value "'+value+'" is not a valid hex string.');
  }

  return toBN(value).toNumber();
}
export function  hexToNumberString (value: string) :string{
  if (!value) {
    return value;
  }

  if (_.isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "'+value+'" is not a valid hex string.');
  }

  return utils.hexValue(value);
}
export function  toChecksumAddress (address: string) :string{
  return utils.getAddress(address);
}

const isBN = function (object) {
  return BN.isBN(object);
};
const hexToBytes = function(hex) {
  hex = hex.toString(16);

  if (!isHexStrict(hex)) {
    throw new Error('Given value "'+ hex +'" is not a valid hex string.');
  }

  hex = hex.replace(/^0x/i,'');
  const bytes = []
  for (let byte = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

export function  bytesToHex (bytes) {
  const hexs = [];
  for (let hex = [], i = 0; i < bytes.length; i++) {
    /* jshint ignore:start */
    hexs.push((bytes[i] >>> 4).toString(16));
    hexs.push((bytes[i] & 0xF).toString(16));
    /* jshint ignore:end */
  }
  return '0x'+ hexs.join("");
}

export function  fromWei (value: string | number, unit?: string) :string{
  return utils.formatUnits(value,unit);
}
export function  fromEther (value: string | number, unit?: string) :string{
  return utils.formatEther(value);
}
// complete ethereum unit map
const unitMap = {
  'noether': '0', // eslint-disable-line
  'wei': '1', // eslint-disable-line
  'kwei': '1000', // eslint-disable-line
  'Kwei': '1000', // eslint-disable-line
  'babbage': '1000', // eslint-disable-line
  'femtoether': '1000', // eslint-disable-line
  'mwei': '1000000', // eslint-disable-line
  'Mwei': '1000000', // eslint-disable-line
  'lovelace': '1000000', // eslint-disable-line
  'picoether': '1000000', // eslint-disable-line
  'gwei': '1000000000', // eslint-disable-line
  'Gwei': '1000000000', // eslint-disable-line
  'shannon': '1000000000', // eslint-disable-line
  'nanoether': '1000000000', // eslint-disable-line
  'nano': '1000000000', // eslint-disable-line
  'szabo': '1000000000000', // eslint-disable-line
  'microether': '1000000000000', // eslint-disable-line
  'micro': '1000000000000', // eslint-disable-line
  'finney': '1000000000000000', // eslint-disable-line
  'milliether': '1000000000000000', // eslint-disable-line
  'milli': '1000000000000000', // eslint-disable-line
  'ether': '1000000000000000000', // eslint-disable-line
  'kether': '1000000000000000000000', // eslint-disable-line
  'grand': '1000000000000000000000', // eslint-disable-line
  'mether': '1000000000000000000000000', // eslint-disable-line
  'gether': '1000000000000000000000000000', // eslint-disable-line
  'tether': '1000000000000000000000000000000' };
export function  toUtf8 (value: string ) :string{
  return hexToUtf8(value);
}
const hexToUtf8 = function(hex) {
  if (!isHexStrict(hex))
    throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

  let str = "";
  let code = 0;
  hex = hex.replace(/^0x/i,'');

  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/,'');
  hex = hex.split("").reverse().join("");
  hex = hex.replace(/^(?:00)*/,'');
  hex = hex.split("").reverse().join("");

  const l = hex.length;

  for (let i=0; i < l; i+=2) {
    code = parseInt(hex.substr(i, 2), 16);
    // if (code !== 0) {
    str += String.fromCharCode(code);
    // }
  }

  return utf8.decode(str);
}

export function parseArgsNum(num: string | number | BN) {
  if (num instanceof BN) {
    return num.toNumber().toString();
  } else if (typeof num === "string" && isHex(num)) {
    return hexToNumberString(num);
  } else {
    return num.toString();
  }
}
export interface JsonRpcPayload {
  jsonrpc: string;
  method: string;
  params: any[];
  id?: string | number;
}

export interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: string;
}
export interface RLPEncodedTransaction {
  raw: string;
  tx: {
    nonce: string;
    gasPrice: string;
    gas: string;
    to: string;
    value: string;
    input: string;
    r: string;
    s: string;
    v: string;
    hash: string;
  };
}
export interface TransactionConfig {
  from?: string | number;
  to?: string;
  value?: number | string | BN;
  gas?: number | string;
  gasPrice?: number | string | BN;
  data?: string;
  nonce?: number;
  chainId?: number;
  common?: Common;
  chain?: string;
  hardfork?: string;
}
export type chain =
  | 'mainnet'
  | 'goerli'
  | 'kovan'
  | 'rinkeby'
  | 'ropsten';

export type hardfork =
  | 'chainstart'
  | 'homestead'
  | 'dao'
  | 'tangerineWhistle'
  | 'spuriousDragon'
  | 'byzantium'
  | 'constantinople'
  | 'petersburg'
  | 'istanbul';

export interface Common {
  customChain: CustomChainParams;
  baseChain?: chain;
  hardfork?: hardfork;
}

export interface CustomChainParams {
  name?: string;
  networkId: number;
  chainId: number;
}
export type Unit =
  | 'noether'
  | 'wei'
  | 'kwei'
  | 'Kwei'
  | 'babbage'
  | 'femtoether'
  | 'mwei'
  | 'Mwei'
  | 'lovelace'
  | 'picoether'
  | 'gwei'
  | 'Gwei'
  | 'shannon'
  | 'nanoether'
  | 'nano'
  | 'szabo'
  | 'microether'
  | 'micro'
  | 'finney'
  | 'milliether'
  | 'milli'
  | 'ether'
  | 'kether'
  | 'grand'
  | 'mether'
  | 'gether'
  | 'tether';