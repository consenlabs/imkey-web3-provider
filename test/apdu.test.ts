
import { expect } from 'chai';
import { ETHApdu} from "../src/common/apdu";
import { asUInt16BE, asUInt8 } from "../src/common/utils";

const ethApdu = new ETHApdu()

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('function ethApdu.selectApplet() ', () => {
  it('should return <Buffer 00 a4 04 00 05 69 5f 65 74 68 00>', () => {
    const result =ethApdu.selectApplet()
    const resultBoolean =Buffer.compare(result,Buffer.from("00A4040005695F65746800","hex"))
    expect(resultBoolean).to.equal(0);

  });
});
describe('function ethApdu.getXPub() ', () => {
  it('should return <Buffer 80 53 00 00 10 6d 2f 34 34 27 2f 36 30 27 2f 30 27 2f 30 2f 30 00>', () => {
    const result =ethApdu.getXPub("m/44'/60'/0'/0/0",false)
    const resultBoolean =Buffer.compare(result,Buffer.from("80530000106d2f3434272f3630272f30272f302f3000","hex"))
    expect(resultBoolean).to.equal(0);
  });
});
describe('function ethApdu.registerAddress() ', () => {
  it('should return <Buffer 80 56 00 00 28 36 30 33 31 35 36 34 65 37 62 32 46 35 63 63 33 33 37 33 37 38 30 37 62 32 45 35 38 44 61 46 46 38 37 30 42 35 39 30 62 00>\n', () => {
    const result =ethApdu.registerAddress(Buffer.from("6031564e7b2F5cc33737807b2E58DaFF870B590b","ascii"))
    const resultBoolean =Buffer.compare(result,Buffer.from("80560000283630333135363465376232463563633333373337383037623245353844614646383730423539306200","hex"))
    expect(resultBoolean).to.equal(0);
  });
});
describe('function ethApdu.prepareSign() ', () => {
  it('should return <Buffer 805100807700010001002fee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a80800707302e3120455448082a307833353335333533353335333533353335333533353335333533353335333533353335333533353335090b302e30303032312045544800>', () => {
    const rawTransaction = Buffer.from("ee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a8080","hex")
    const preview = {
      payment:"0.1 ETH",
      receiver:'0x3535353535353535353535353535353535353535',
      fee:'0.00021 ETH'
    }
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
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(1), asUInt8(0), data])
    const result =ethApdu.prepareSign(apduPack)
    const resultBoolean =Buffer.compare(result[0],Buffer.from("805100807700010001002fee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a80800707302e3120455448082a307833353335333533353335333533353335333533353335333533353335333533353335333533353335090b302e30303032312045544800","hex"))
    expect(resultBoolean).to.equal(0);
  });
});
describe('function ethApdu.signDigest() ', () => {
  it('should return <Buffer 80 52 00 00 10 6d 2f 34 34 27 2f 36 30 27 2f 30 27 2f 30 2f 30 00>', () => {
    const result =ethApdu.signDigest("m/44'/60'/0'/0/0")
    const resultBoolean =Buffer.compare(result,Buffer.from("80520000106d2f3434272f3630272f30272f302f3000","hex"))
    expect(resultBoolean).to.equal(0);
  });
});
describe('function ethApdu.preparePersonalSign() ', () => {
  it('should return <Buffer 8054008034000001002fee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a808000>', () => {
    const rawTransaction = Buffer.from("ee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a8080","hex")

    const dataToSign = Buffer.concat([
      asUInt8(1),
      asUInt16BE(rawTransaction.length),
      rawTransaction,
    ])
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(0), dataToSign])
    const result =ethApdu.preparePersonalSign(apduPack)
    const resultBoolean =Buffer.compare(result[0],Buffer.from("8054008034000001002fee8202238502540be40082520894353535353535353535353535353535353535353588016345785d8a0000802a808000","hex"))
    expect(resultBoolean).to.equal(0);
  });
});
describe('function ethApdu.personalSign() ', () => {
  it('should return <Buffer 80 55 00 00 10 6d 2f 34 34 27 2f 36 30 27 2f 30 27 2f 30 2f 30 00>', () => {
    const result =ethApdu.personalSign("m/44'/60'/0'/0/0")
    const resultBoolean =Buffer.compare(result,Buffer.from("80550000106d2f3434272f3630272f30272f302f3000","hex"))
    expect(resultBoolean).to.equal(0);
  });
});