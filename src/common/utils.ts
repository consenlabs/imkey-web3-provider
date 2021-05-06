import { utils } from "ethers";
import _  from 'underscore';
import BN  from 'bn.js';
import numberToBN  from 'number-to-bn';
import { Unit } from "web3-utils";
import utf8 from'utf8';
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
  let pubkey_hash = utils.keccak256(pubkey.slice(1,65));
  return  utils.getAddress("0x"+pubkey_hash.substring(26));
}
export function isValidHex(input: string) :boolean {
  let value =  input
  if (input.startsWith("0x") || input.startsWith("0X") ){
    value = input.substring(2)
  };

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

  var number = toBN(value);
  var result = number.toString(16);

  return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
}
export function hexBuffer(str: string): Buffer {
  return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}

export function maybeHexBuffer(str: string): Buffer {
  if (!str) return null;
  return hexBuffer(str);
}


var toBN = function(number){
  try {
    return numberToBN.apply(null, arguments);
  } catch(e) {
    throw new Error(e + ' Given value: "'+ number +'"');
  }
};


var isHexStrict = function (hex) {
  return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};


export function isHex(value: string | number ) : boolean{
  return ((_.isString(value) || _.isNumber(value)) && /^(-0x|0x)?[0-9a-f]*$/i.test(<string>value));
}

export function  hexToNumber (value: string) :number|string {
  if (!value) {
    return value;
  }

  if (_.isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "'+value+'" is not a valid hex string.');
  }

  return toBN(value).toNumber();
};
export function  hexToNumberString (value: string) :string{
  if (!value) {
    return value;
  }

  if (_.isString(value) && !isHexStrict(value)) {
    throw new Error('Given value "'+value+'" is not a valid hex string.');
  }

  return toBN(value).toNumber().toString();
};
export function  toChecksumAddress (address: string) :string{
  return utils.getAddress(address);
}

var isBN = function (object) {
  return BN.isBN(object);
};
var hexToBytes = function(hex) {
  hex = hex.toString(16);

  if (!isHexStrict(hex)) {
    throw new Error('Given value "'+ hex +'" is not a valid hex string.');
  }

  hex = hex.replace(/^0x/i,'');

  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

export function  fromWei (value: string | number, unit?: Unit) :string{
  return utils.formatUnits(value,unit);
}
export function  toUtf8 (value: string ) :string{
  return hexToUtf8(value);
}
var hexToUtf8 = function(hex) {
  if (!isHexStrict(hex))
    throw new Error('The parameter "'+ hex +'" must be a valid HEX string.');

  var str = "";
  var code = 0;
  hex = hex.replace(/^0x/i,'');

  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/,'');
  hex = hex.split("").reverse().join("");
  hex = hex.replace(/^(?:00)*/,'');
  hex = hex.split("").reverse().join("");

  var l = hex.length;

  for (var i=0; i < l; i+=2) {
    code = parseInt(hex.substr(i, 2), 16);
    // if (code !== 0) {
    str += String.fromCharCode(code);
    // }
  }

  return utf8.decode(str);
};


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