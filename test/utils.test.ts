
import { expect } from 'chai';
import { numberToHex, toBN ,asUInt16BE} from "../src/common/utils";
import ImKeyProvider from '../src/index'
import {byContractAddress} from "../src/hw-app-eth/erc20Utils"
import Web3 from 'web3'
import Web3HttpProvider from 'web3-providers-http'
import TransportWebUSB from '../src/hw-transport-webusb/TransportWebUSB'
import ETH from '../src/hw-app-eth/Eth'


// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('numberToHex function', () => {
  it('should return hex string', () => {
    let result = numberToHex("111111");
    expect(result).to.equal("0x1b207");
    result = numberToHex(111111);
    expect(result).to.equal("0x1b207");
    result = numberToHex(toBN(111111));
    expect(result).to.equal("0x1b207");
    const zrxInfo = byContractAddress(
      "0xe41d2489571d322189246dafa5ebde1f4699f498"
    );
    console.log(zrxInfo)
  });
});
describe('asUInt16BE function', () => {
  it('should return hex string', () => {
    let result = asUInt16BE(1);
    expect(result).to.equal(Buffer.from("A","hex"));

  });
});
describe('WebUSB sign', () => {
  it('should return hex string', async () => {
    const transport = await TransportWebUSB.create()
    const eth = new ETH(transport)
    await eth.getAddress("m/44'/60'/0'/0/0").then((response) => {
      console.log('response.getAddress:' + response.address)
      console.log('response.pubkey:' + response.pubkey)
    })
  });
});