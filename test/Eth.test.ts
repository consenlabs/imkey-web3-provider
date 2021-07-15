
import { expect } from 'chai';
import { numberToHex, addPreZero } from "../src/common/utils";
import { createTransportReplayer } from '../src/hw-transport-mocker/createTransportReplayer'
import ETH from '../src/hw-app-eth/Eth'
import { RecordStore } from "../src/hw-transport-mocker/RecordStore";


describe('function  eth.getAddress ', () => {
  it('should return hex string', async () => {
    const Transport = createTransportReplayer(
      RecordStore.fromString(`
    => 00a4040005695f65746800
    <= 9000
    => 80530000106d2f3434272f3630272f30272f302f3000
    <= 0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd3046022100e74aa3af22668a3175057da0010afeb7f2e574bd9b656d40bb2bd62938a16716022100fe4f62d53f0e0b38e6316ab2c1eef273039687fcefa60b669b475a434ae0e9379000
        `)
    );
    // @ts-ignore
    const transport = await Transport.open();
    const eth = new ETH(transport)
    await eth.getAddress("m/44'/60'/0'/0/0").then((response) => {
      expect(response.address).to.equal("0x6031564e7b2F5cc33737807b2E58DaFF870B590b");
      expect(response.pubkey).to.equal("0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c");
    })
  });
});
describe('function  eth.signTransaction ', () => {
  it('should return hex string', async () => {
    const Transport = createTransportReplayer(
      RecordStore.fromString(`
    => 00a4040005695f65746800
    <= 9000
    => 80530000106d2f3434272f3630272f30272f302f3000
    <= 0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd304502210094f8a1ad591d2223706b12b03a3caf83e311d2929cc6eb325f9730b8987c4b72022031eda0f76d482d8a5516a5a166c8f5ec4d153ad6c4f54853f5d80d78a998c3d69000
    => 8054008070000001006bf86908850165a0bc008252089495ad61b0a150d79219dcf64e1e6cc01f0b64c4ce00b844b9059cbb0000000000000000000000003b11f5cab8362807273e1680890a802c5f1b15a80000000000000000000000000000000000000000000000000de0b6b3a76400001c808000
    <= 9000
    => 80550000106d2f3434272f3630272f30272f302f3000
    <= 41deb0311b44ee8edaf760799016172cf0b02b276ea8f5724f4f37fa57c2e697af153e51b60c437a20bfef8db7beae7588207e550514d8b818faad5aad92ead630009000
   
        `)
    );
    // @ts-ignore
    const transport = await Transport.open();
    const eth = new ETH(transport)
    const transaction = {
      to: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
      // 调用合约转账value这里留空
      value: '0x00',
      // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
      data: '0x' + 'b9059cbb' + addPreZero('3b11f5CAB8362807273e1680890A802c5F1B15a8') + addPreZero(numberToHex("1000000000000000000").toString().substr(2)),
      gasLimit: '21000',
      gasPrice: '6000000000',
      nonce: '8',
      chainId: '28',
      path: "m/44'/60'/0'/0/0",
      symbol: 'ETH',
    }

    await eth.signTransaction(transaction).then((response) => {
      expect(response.signature).to.equal("0xf8a908850165a0bc008252089495ad61b0a150d79219dcf64e1e6cc01f0b64c4ce00b844b9059cbb0000000000000000000000003b11f5cab8362807273e1680890a802c5f1b15a80000000000000000000000000000000000000000000000000de0b6b3a76400005ba0deb0311b44ee8edaf760799016172cf0b02b276ea8f5724f4f37fa57c2e697afa0153e51b60c437a20bfef8db7beae7588207e550514d8b818faad5aad92ead630");
      expect(response.txhash).to.equal("0x3025c1bc8432f29519f2ac9291c0bbc21f71f9e6d376f5acb1eb79a7f757103e");
    })
  });
});
describe('function  eth.signTransaction ', () => {
  it('should return hex string', async () => {
    const Transport = createTransportReplayer(
      RecordStore.fromString(`
    => 00a4040005695f65746800
    <= 9000
    => 80530000106d2f3434272f3630272f30272f302f3000
    <= 0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd304502210094f8a1ad591d2223706b12b03a3caf83e311d2929cc6eb325f9730b8987c4b72022031eda0f76d482d8a5516a5a166c8f5ec4d153ad6c4f54853f5d80d78a998c3d69000
    => 805100807600010001002dec08850165a0bc00825208943535353535353535353535353535353535353535880de0b6b3a7640000801c80800707312e3020455448082a307833353335333533353335333533353335333533353335333533353335333533353335333533353335090c302e3030303132362045544800
    <= 9000
    => 80520000106d2f3434272f3630272f30272f302f3000
    <= 41c6fcc6e02d1bc1b2bcab02277d1b817bcacc4e11abe6afe2ed1d121b819a4a70b4ad9a55ead456f21052c3bbb12e95817882214415bb7c86d3e61c20f906826a019000
    `));
    // @ts-ignore
    const transport = await Transport.open();
    const eth = new ETH(transport)
    const transaction = {
      to: "0x3535353535353535353535353535353535353535",
      value: '1000000000000000000',
      data: '',
      gasLimit: '21000',
      gasPrice: '6000000000',
      nonce: '8',
      chainId: '28',
      path: "m/44'/60'/0'/0/0",
      symbol: 'ETH',
    }

    await eth.signTransaction(transaction).then((response) => {
      expect(response.signature).to.equal("0xf86c08850165a0bc00825208943535353535353535353535353535353535353535880de0b6b3a7640000805ba0c6fcc6e02d1bc1b2bcab02277d1b817bcacc4e11abe6afe2ed1d121b819a4a70a04b5265aa152ba90defad3c444ed16a7d422cbba2998d23b4ebec426bd72fbed7");
      expect(response.txhash).to.equal("0x22a0a6208a971a82055336b5aec6843b6457e5b0208f533b90701d145c44fcf5");
    })
  });
});
describe('function  eth.signMessage isPersonalSign=true', () => {
  it('should return hex string', async () => {
    const Transport = createTransportReplayer(
      RecordStore.fromString(`
    => 00a4040005695f65746800
    <= 9000
    => 80530000106d2f3434272f3630272f30272f302f3000
    <= 0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd304502210094f8a1ad591d2223706b12b03a3caf83e311d2929cc6eb325f9730b8987c4b72022031eda0f76d482d8a5516a5a166c8f5ec4d153ad6c4f54853f5d80d78a998c3d69000
    => 805400802c000001002719457468657265756d205369676e6564204d6573736167653a0a313148656c6c6f20696d4b657900
    <= 9000
    => 80550000106d2f3434272f3630272f30272f302f3000
    <= 41d928f76ad80d63003c189b095078d94ae068dc2f18a5cafd97b3a630d7bc4746a4290e18b21d1773fa4d8e1e3a5746c955d5046283282bb90dcc29b64108ec5c019000
           `)
    );
    // @ts-ignore
    const transport = await Transport.open();
    const eth = new ETH(transport)
    await eth.signMessage(
      "m/44'/60'/0'/0/0",
      'Hello imKey',
      '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      true
    ).then((response) => {
      expect(response.signature).to.equal("0xd928f76ad80d63003c189b095078d94ae068dc2f18a5cafd97b3a630d7bc47465bd6f1e74de2e88c05b271e1c5a8b93564d9d8842c207482b20634d68f2d54e51b");
    })
  });
});
describe('function  eth.signMessage isPersonalSign=false', () => {
  it('should return <signature 57c976d1fa15c7e833fd340bcb3a96974060ed555369d443449ac4429c1933433afa5304d1cfcb6799403f2b97a1e83309b98fae8ad5fade62335664d90e819f1b>', async () => {
    const Transport = createTransportReplayer(
      RecordStore.fromString(`
    => 00a4040005695f65746800
    <= 9000
    => 80530000106d2f3434272f3630272f30272f302f3000
    <= 0480c98b8ea7cab630defb0c09a4295c2193cdee016c1d5b9b0cb18572b9c370fefbc790fc3291d3cb6441ac94c3952035c409f4374d1780f400c1ed92972ce83c2025573329d4f232d4b04c4d83cc4f7c27e56f262ff266a78c19495fb6325afd304502210094f8a1ad591d2223706b12b03a3caf83e311d2929cc6eb325f9730b8987c4b72022031eda0f76d482d8a5516a5a166c8f5ec4d153ad6c4f54853f5d80d78a998c3d69000
    => 8054008010000001000b48656c6c6f20696d4b657900
    <= 9000
    => 80550000106d2f3434272f3630272f30272f302f3000
    <= 4157c976d1fa15c7e833fd340bcb3a96974060ed555369d443449ac4429c193343c505acfb2e30349866bfc0d4685e17cbb0f54d382472a55d5d9f0827f727bfa2019000
           `)
    );
    // @ts-ignore
    const transport = await Transport.open();
    const eth = new ETH(transport)
    await eth.signMessage(
      "m/44'/60'/0'/0/0",
      'Hello imKey',
      '0x6031564e7b2F5cc33737807b2E58DaFF870B590b',
      false
    ).then((response) => {
      expect(response.signature).to.equal("0x57c976d1fa15c7e833fd340bcb3a96974060ed555369d443449ac4429c1933433afa5304d1cfcb6799403f2b97a1e83309b98fae8ad5fade62335664d90e819f1b");
    })
  });
});