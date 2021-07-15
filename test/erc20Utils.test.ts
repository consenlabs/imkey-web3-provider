
import { expect } from 'chai';
import {getTokenInfo} from "../src/hw-app-eth/erc20Utils"

describe('function getTokenInfo ', () => {
  it('should return {\n' +
    '      ticker: \'USDT\',\n' +
    '      contractAddress: \'0xdAC17F958D2ee523a2206206994597C13D831ec7\',\n' +
    '      decimals: 6\n' +
    '    }', () => {
    const result = getTokenInfo(
      "0xdac17f958d2ee523a2206206994597c13d831ec7"
    );
    const info =  {
      ticker: 'USDT',
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6
    }
    expect(result.ticker).to.equal(info.ticker);
    expect(result.contractAddress).to.equal(info.contractAddress);
    expect(result.decimals).to.equal(info.decimals);
  });
});
describe('function getTokenInfo ', () => {
  it('should return {\n' +
    '      ticker: \'SHIB\',\n' +
    '      contractAddress: \'0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE\',\n' +
    '      decimals: 18\n' +
    '    }', () => {
    const result = getTokenInfo(
      "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
    );
    const info =  {
      ticker: 'SHIB',
      contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
      decimals: 18
    }
    expect(result.ticker).to.equal(info.ticker);
    expect(result.contractAddress).to.equal(info.contractAddress);
    expect(result.decimals).to.equal(info.decimals);
  });
});
describe('function getTokenInfo ', () => {
  it('should return {\n' +
    '      ticker: \'LON\',\n' +
    '      contractAddress: \'0x0000000000095413afC295d19EDeb1Ad7B71c952\',\n' +
    '      decimals: 18\n' +
    '    }', () => {
    const result = getTokenInfo(
      "0x0000000000095413afC295d19EDeb1Ad7B71c952"
    );
    const info =  {
      ticker: 'LON',
      contractAddress: '0x0000000000095413afC295d19EDeb1Ad7B71c952',
      decimals: 18
    }
    expect(result.ticker).to.equal(info.ticker);
    expect(result.contractAddress).to.equal(info.contractAddress);
    expect(result.decimals).to.equal(info.decimals);
  });
});