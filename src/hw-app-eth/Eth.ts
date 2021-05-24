
import {
  foreach,
  asUInt16BE,
  asUInt8,
  addressFromPubkey,
  numberToHex,
  isValidHex,
  fromWei,
  toChecksumAddress,
  parseArgsNum,
fromEther
} from "../common/utils";
import  type Transport from  "../hw-transport/Transport";
// @ts-ignore
import { encode, decode } from "rlp";
import ethApdu  from "../common/apdu";
// @ts-ignore
import { utils } from "ethers";
import secp256k1 from "secp256k1"

type Transaction= {
  data: string,
  gasLimit:string,
  gasPrice: string,
  nonce:string,
  to:string,
  value:string,
  chainId:string,
  path: string,
  symbol?:string
}
const eth_apdu = ethApdu();

/**
 * Ethereum API
 *
 * @example
 * import Eth from "@imkeyhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
export default class Eth {
  transport: Transport<any>;
  // @ts-ignore
  constructor(transport: Transport<any>) {
    this.transport = transport;
    // transport.decorateAppAPIMethods(
    //   this,
    //   [
    //     "getAddress",
    //     "signTransaction",
    //     "signMessage",
    //   ]
    // );
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
    address: string,
    pubkey:string
  }> {
    const toSend = [];
    let response;
    toSend.push(eth_apdu.selectApplet())
    toSend.push(eth_apdu.getXpub(path, false))
    for(const  i in toSend ){
      response =  await this.transport.send(toSend[i]);
    }
    return {
      address: addressFromPubkey(response),
      pubkey:response.slice(0,65).toString("hex")
    }
    // return foreach(toSend, (data, i) =>
    //   this.transport
    //     .send(data)
    //     .then((apduResponse) => {
    //       response = apduResponse;
    //     })
    // ).then(() => {
    //   return {
    //     address: addressFromPubkey(response),
    //     pubkey:response.slice(0,65).toString("hex")
    //   }
    // });
  }



  /**
   * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
   * @example
   eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
   */


  async signTransaction(
    transaction:Transaction
  ): Promise<{
    signature: string,
    txhash: string,
  }> {
    let rawTransaction
    const get_address = await this.getAddress(transaction.path)
    const symbol = !transaction.symbol ? "ETH" : transaction.symbol;
    //fee
    let fee = (BigInt(transaction.gasLimit) * BigInt(transaction.gasPrice)).toString(); //wei
    fee = fromWei(fee,'gwei'); //to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (temp * 1000000000).toString(); //to ether
    fee = fromWei(fee)+ " " + symbol;

    const to = toChecksumAddress(transaction.to);
    const value = parseArgsNum(transaction.value);
    const valueInWei = fromWei(value);
    const preview={
      payment: valueInWei + " " + symbol,
        receiver: to,
        sender: get_address.address,
        fee: fee,
    }

    if(transaction.chainId===""||transaction.chainId==="undefined")
    {
      rawTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data]);
    }else{
      rawTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data,numberToHex(transaction.chainId),0x00,0x00]);
    }
    const  data_to_sign = Buffer.concat(
      [asUInt8(1), asUInt16BE(rawTransaction.length),rawTransaction,
           asUInt8(7), asUInt8(preview.payment.length),Buffer.from(preview.payment,"ascii"),
           asUInt8(8), asUInt8(preview.receiver.length),Buffer.from(preview.receiver,"ascii"),
           asUInt8(9), asUInt8(preview.fee.length),Buffer.from(preview.fee,"ascii")]);
    const bind_signature_buf =  bindSignature(data_to_sign);
    const apdu_pack = Buffer.concat(
      [asUInt8(0),
        asUInt8(bind_signature_buf.length),
        Buffer.from(bind_signature_buf),
        data_to_sign]);
    let toSend = [];
    let response;

    const pubkey = get_address.pubkey
    toSend =  eth_apdu.prepareSign(apdu_pack)
    toSend.push(eth_apdu.signDigest(transaction.path))
    for(const  i in toSend ){
      response =  await this.transport.send(toSend[i]);
    }
    // return foreach(toSend, (data, i) =>
    //   this.transport
    //     .send(data)
    //     .then((apduResponse) => {
    //       response = apduResponse;
    //     })
    // ).then(() => {
      let rec_id = 0;
      const sign_compact = response.slice(1, 65);
      const normalizes_sig = secp256k1.signatureNormalize(sign_compact)
      const data_hash = Buffer.from(utils.keccak256(rawTransaction).substring(2), "hex")
      for (let i = 0; i <= 3; i++) {
        try {
          if (Buffer.from(secp256k1.ecdsaRecover(normalizes_sig, i, data_hash, false)).toString("hex") === pubkey) {
            rec_id = i
          }
        } catch (e) {
          continue
        }
      }
      let v;
      if(transaction.chainId===""||transaction.chainId==="undefined")
      {
        v = numberToHex(27)
      }else{
        v = (35 + parseInt(transaction.chainId)*2).toString(16);
      }
      // @ts-ignore
      const r = normalizes_sig.slice(0, 32).toString("hex");
      // @ts-ignore
      const s = normalizes_sig.slice(32, 32 + 32).toString("hex");
      const signedTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data,Buffer.from(v,"hex"), Buffer.from(r,"hex"), Buffer.from(s,"hex")]);
      const signature = "0x"+signedTransaction.toString("hex");
      const txhash =utils.keccak256(signedTransaction)
      return { signature, txhash };
    // });
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
    sender:string,
    isPersonalSign:boolean
  ): Promise<{
    signature: string,
  }> {
    console.log("path:")
    console.log(path)
    console.log("message:")
    console.log(message)
    console.log("sender:")
    console.log(sender)
    console.log("isPersonalSign:")
    console.log(isPersonalSign)
    let message_to_sign
    //判断是否是HEX
    if(isValidHex(message)){
      message_to_sign = Buffer.from(message.substring(2), "hex");
    }else{
      message_to_sign = Buffer.from(message, "ascii");
    }
    let data
    if (isPersonalSign) {
      const header = Buffer.from("Ethereum Signed Message:\n"+message_to_sign.length, "ascii");
      data = Buffer.concat([header, message_to_sign]);
    }else{
      data = message_to_sign;
    }
    const  data_to_sign = Buffer.concat([asUInt8(1), asUInt16BE(data.length),data]);
    const bind_signature_buf =  bindSignature(data_to_sign);
    const apdu_pack = Buffer.concat(
      [asUInt8(0),
        asUInt8(bind_signature_buf.length),
        Buffer.from(bind_signature_buf),
        data_to_sign]);
    let toSend = [];
    let response;
   const get_address = await this.getAddress(path)
    if(get_address.address !== sender){
      throw "address not match"
    }
    const pubkey = get_address.pubkey
    toSend =  eth_apdu.preparePersonalSign(apdu_pack)
    toSend.push(eth_apdu.personalSign(path))
    for(const  i in toSend ){
      response =  await this.transport.send(toSend[i]);
    }
    // return foreach(toSend, (data, i) =>
    //   this.transport
    //     .send(data)
    //     .then((apduResponse) => {
    //       response = apduResponse;
    //     })
    // ).then(() => {
      let  rec_id = 0;
      const sign_compact = response.slice(1,65);
      const normalizes_sig = secp256k1.signatureNormalize(sign_compact)
      const data_hash =  Buffer.from(utils.keccak256(data).substring(2),"hex")
      for(let i=0;i<=3;i++){
        try {
          if(Buffer.from(secp256k1.ecdsaRecover(normalizes_sig,i,data_hash,false)).toString("hex")===pubkey){
            rec_id = i
          }
        }catch (e){
          continue
        }
      }
      const v = (rec_id + 27).toString(16);
      // @ts-ignore
      const r = normalizes_sig.slice(0, 32).toString("hex");
      // @ts-ignore
      const s = normalizes_sig.slice(32, 32 + 32).toString("hex");
      // return { v, r, s };
      const signature = r+s+v;
      return { signature };
    // });
  }
}

function bindSignature(data: Buffer) :Buffer{
  const pri_key = Buffer.from("18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725","hex");
  const ha256_hash =  utils.sha256(utils.sha256(data)).substring(2)
  const bind_signature = secp256k1.ecdsaSign(Buffer.from(ha256_hash,"hex"),pri_key).signature
  const bind_signature_r =(bind_signature[0]>0x80) ? Buffer.concat(
    [asUInt8(2),
      asUInt8(33),
      asUInt8(0),
      Buffer.from(bind_signature.slice(0,32))]) :Buffer.concat(
    [asUInt8(2),
      asUInt8(32),
      Buffer.from(bind_signature.slice(0,32))])
  const bind_signature_s =(bind_signature[32]>0x80) ? Buffer.concat(
    [asUInt8(2),
      asUInt8(33),
      asUInt8(0),
      Buffer.from(bind_signature.slice(32,64))]) :Buffer.concat(
    [asUInt8(2),
      asUInt8(32),
      Buffer.from(bind_signature.slice(32,64))])

  const bind_signature_buf =  Buffer.concat(
    [asUInt8(48),
      asUInt8(bind_signature_r.length+bind_signature_s.length),
      bind_signature_r,
      bind_signature_s]);
  return bind_signature_buf;
}