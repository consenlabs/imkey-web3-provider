
import { expect } from 'chai';
import {
  numberToHex,
  toBN,
  asUInt16BE,
  asUInt8,
  addressFromPubkey,
  isHex,
  hexToNumber,
  hexToNumberString,
  stringToNumber,
  toChecksumAddress,
  bytesToHex,
  fromWei,
  toUtf8,
  parseArgsNum,
  addPreZero,
  deleteZero
} from "../src/common/utils";
import BN from "bn.js";


describe('function addressFromPubkey ', () => {
  it('should return hex string 0x6031564e7b2F5cc33737807b2E58DaFF870B590b', () => {
    const pubkey = Buffer.from("0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd30440220096d270ad3138d70beb7e7844ad6757ba23a01148c42a2e75cae2c337513d5b4022068be8de613f8ea17e63c4bb0d8cbcdca2ac0f01f5f8434987c076b769c740cc29000","hex")
    let result = addressFromPubkey(pubkey);
    expect(result).to.equal("0x6031564e7b2F5cc33737807b2E58DaFF870B590b");

  });
});
describe('function asUInt8 ', () => {
  it('should return <Buffer 01>', () => {
    let result = asUInt8(1);
    const resultBoolean =Buffer.compare(result,Buffer.from("01","hex"))
    expect(resultBoolean).to.equal(0);

  });
});
describe('function asUInt16BE ', () => {
  it('should return <Buffer 00 01>', () => {
    let result = asUInt16BE(1);
    const resultBoolean =Buffer.compare(result,Buffer.from("0001","hex"))
    expect(resultBoolean).to.equal(0);

  });
});
describe('function numberToHex ', () => {
  it('should return hex string', () => {
    let result = numberToHex("111111");
    expect(result).to.equal("0x1b207");
    result = numberToHex(111111);
    expect(result).to.equal("0x1b207");
    result = numberToHex(toBN(111111));
    expect(result).to.equal("0x1b207");
  });
});
describe('function toBN ', () => {
  it('should return BN', () => {
    let result = toBN("111111");
    expect(result.toString()).to.equal(new BN(111111).toString());
    result = toBN("0x111111");
    expect(result.toString()).to.equal("1118481");
    result = toBN(111111);
    expect(result.toString()).to.equal(new BN(111111).toString());
    result = toBN("");
    expect(result.toString()).to.equal("0");
  });
});
describe('function isHex ', () => {
  it('should return true or false', () => {
    let result = isHex("0x111111");
    expect(result).to.equal(true);
    result = isHex("0x1");
    expect(result).to.equal(true);
    result = isHex(111111);
    expect(result).to.equal(false);
    result = isHex("");
    expect(result).to.equal(false);
  });
});
describe('function hexToNumber ', () => {
  it('should return number', () => {
    let result = hexToNumber("0x111111");
    expect(result).to.equal(1118481);
    result = hexToNumber("0x1");
    expect(result).to.equal(1);
    try {
      result = hexToNumber("111111");
    }catch (e){
      expect(e.message.toString()).to.equal("Given value \"111111\" is not a valid hex string.");
    }
    try {
      result = hexToNumber("");
    }catch (e){
      expect(e.message.toString()).to.equal("Given value \"\" is not a valid hex string.");
    }

  });
});
describe('function stringToNumber ', () => {
  it('should return number', () => {
    let result = stringToNumber("0x111111");
    expect(result).to.equal(1118481);
    result = stringToNumber("0x1");
    expect(result).to.equal(1);
    result = stringToNumber("111111");
    expect(result).to.equal(111111);
    try {
      result = stringToNumber("");
    }catch (e){
      expect(e.message.toString()).to.equal("Given value \"\" is not a string.");
    }
  });
});
describe('function hexToNumberString ', () => {
  it('should return hex string', () => {
    let result = hexToNumberString("0x111111");
    expect(result).to.equal("0x111111");
    result = hexToNumberString("0x1");
    expect(result).to.equal("0x1");
    try {
      result = hexToNumberString("111111");
    }catch (e){
      expect(e.message.toString()).to.equal("Given value \"111111\" is not a valid hex string.");
    }
    try {
      result = hexToNumberString("");
    }catch (e){
      expect(e.message.toString()).to.equal("Given value \"\" is not a valid hex string.");
    }
  });
});
describe('function toChecksumAddress ', () => {
  it('should return hex string', () => {
    let result = toChecksumAddress("0x6031564e7b2F5cc33737807b2E58DaFF870B590b");
    expect(result).to.equal("0x6031564e7b2F5cc33737807b2E58DaFF870B590b");
    try {
    result = toChecksumAddress("0x6031564e7b2F5cc33737807b2E58DaFF870B590C");
    }catch (e){
      expect(e.message.toString()).to.equal("bad address checksum (argument=\"address\", value=\"0x6031564e7b2F5cc33737807b2E58DaFF870B590C\", code=INVALID_ARGUMENT, version=address/5.4.0)");
    }
    try {
      result = toChecksumAddress("0x111111");
    }catch (e){
      expect(e.message.toString()).to.equal("invalid address (argument=\"address\", value=\"0x111111\", code=INVALID_ARGUMENT, version=address/5.4.0)");
    }
    try {
      result = toChecksumAddress("");
    }catch (e){
      expect(e.message.toString()).to.equal("invalid address (argument=\"address\", value=\"\", code=INVALID_ARGUMENT, version=address/5.4.0)");
    }
  });
});

describe('function bytesToHex ', () => {
  it('should return hex string', () => {
    let arr =Array.from("111122222333344444555")
    let result = bytesToHex(arr);
    expect(result).to.equal("0x010101010202020202030303030404040404050505");
     arr =Array.from("11")
     result = bytesToHex(arr);
    expect(result).to.equal("0x0101");
  });
});
describe('function fromWei ', () => {
  it('should return  string', () => {
    let result = fromWei("1000000000000000000","18");
    expect(result).to.equal("1.0");
    result = fromWei("1234000000000000000","18");
    expect(result).to.equal("1.234");
    result = fromWei("123400000000000000","18");
    expect(result).to.equal("0.1234");
     result = fromWei("1000000000000000000","8");
    expect(result).to.equal("10000000000.0");
    result = fromWei("1234000000000000000","8");
    expect(result).to.equal("12340000000.0");
    result = fromWei("123400000000000000","8");
    expect(result).to.equal("1234000000.0");
  });
});
describe('function toUtf8 ', () => {
  it('should return  string', () => {
    let result = toUtf8("0x1");
    expect(result).to.equal("\u0001");
    result = toUtf8("0x111111");
    expect(result).to.equal("\u0011\u0011\u0011");
    result = toUtf8("0x2");
    expect(result).to.equal("\u0002");
  });
});

describe('function parseArgsNum ', () => {
  it('should return  string', () => {
    let result = parseArgsNum("111111");
    expect(result).to.equal("111111");
    result = parseArgsNum(111111);
    expect(result).to.equal("111111");
    result = parseArgsNum(toBN(111111));
    expect(result).to.equal("111111");
  });
});
describe('function addPreZero ', () => {
  it('should return  string', () => {
    let result = addPreZero("0000000000000000111111");
    expect(result).to.equal("0000000000000000000000000000000000000000000000000000000000111111");
    result = addPreZero("123456");
    expect(result).to.equal("0000000000000000000000000000000000000000000000000000000000123456");
    result = addPreZero(123456);
    expect(result).to.equal("0000000000000000000000000000000000000000000000000000000000123456");
  });
});
describe('function deleteZero ', () => {
  it('should return  string', () => {
    let result = deleteZero("0000000000000000111111");
    expect(result).to.equal("111111");
    result = deleteZero("0000000000000000000000000000000000000000000000000000000000111111");
    expect(result).to.equal("111111");
    result = deleteZero("00000010000011111111");
    expect(result).to.equal("10000011111111");
  });
});