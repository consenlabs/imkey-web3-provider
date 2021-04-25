
import { splitPath, foreach } from "./utils";
import { EthAppPleaseEnableContractData } from "../errors";
import  Transport from "../hw-transport/Transport";
import { BigNumber } from "bignumber.js";
import { encode, decode } from "rlp";
import {constants} from "../common/constants";
import ethApdu  from "../common/apdu";
import { utils } from "ethers";
import secp256k1 from "secp256k1"
import BN from "bn.js";
import Web3 from "web3";
function hexBuffer(str: string): Buffer {
  return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}

function maybeHexBuffer(str: string): Buffer {
  if (!str) return null;
  return hexBuffer(str);
}
type Transaction= {
  data: string,
  gasLimit:string,
  gasPrice: string,
  nonce:string,
  to:string,
  value:string,
  chainId:string,
  path: string,
}
type Preview= {
    payment: string,
    receiver: string,
    sender: string,
    fee: string,
  }
const eth_apdu = ethApdu();
const remapTransactionRelatedErrors = (e) => {
  if (e && e.statusCode === 0x6a80) {
    return new EthAppPleaseEnableContractData(
      "Please enable Contract data on the Ethereum app Settings"
    );
  }
  return e;
};

/**
 * Ethereum API
 *
 * @example
 * import Eth from "@imkeyhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
export default class Eth {
  transport: Transport;
  constructor(transport: Transport) {
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
    await this.transport.send(eth_apdu.select_applet());
    let pubKeyResult =  await this.transport.send(eth_apdu.get_xpub(path, false))
      return {
        address: address_from_pubkey(pubKeyResult),
        pubkey:pubKeyResult.slice(0,65).toString("hex")
    };
  }



  /**
   * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
   * @example
   eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
   */


  async signTransaction(
    transaction:Transaction,
    preview:Preview
  ): Promise<{
    signature: string,
    txhash: string,
  }> {
    let rawTransaction
    if(transaction.chainId===""||transaction.chainId==="undefined")
    {
      rawTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data]);
    }else{
      rawTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data,numberToHex(transaction.chainId),0x00,0x00]);
    }
    let  data_to_sign = Buffer.concat(
      [asUInt8(1), asUInt16BE(rawTransaction.length),rawTransaction,
           asUInt8(7), asUInt8(preview.payment.length),Buffer.from(preview.payment,"ascii"),
           asUInt8(8), asUInt8(preview.receiver.length),Buffer.from(preview.receiver,"ascii"),
           asUInt8(9), asUInt8(preview.fee.length),Buffer.from(preview.fee,"ascii")]);
    // let key_manager_obj = KEY_MANAGER.lock();
    let pri_key = Buffer.from("18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725","hex");
    let ha256_hash =  utils.sha256(utils.sha256(data_to_sign)).substring(2)
    let bind_signature = secp256k1.ecdsaSign(Buffer.from(ha256_hash,"hex"),pri_key).signature
    let bind_signature_r =(bind_signature[0]>0x80) ? Buffer.concat(
      [asUInt8(2),
        asUInt8(33),
        asUInt8(0),
        Buffer.from(bind_signature.slice(0,32))]) :Buffer.concat(
      [asUInt8(2),
        asUInt8(32),
        Buffer.from(bind_signature.slice(0,32))])
    let bind_signature_s =(bind_signature[32]>0x80) ? Buffer.concat(
      [asUInt8(2),
        asUInt8(33),
        asUInt8(0),
        Buffer.from(bind_signature.slice(32,64))]) :Buffer.concat(
      [asUInt8(2),
        asUInt8(32),
        Buffer.from(bind_signature.slice(32,64))])

    let bind_signature_buf =  Buffer.concat(
      [asUInt8(48),
        asUInt8(bind_signature_r.length+bind_signature_s.length),
        bind_signature_r,
        bind_signature_s]);
    console.log("bind_signature_buf:"+bind_signature_buf.toString("hex"))
    let apdu_pack = Buffer.concat(
      [asUInt8(0),
        asUInt8(bind_signature_buf.length),
        Buffer.from(bind_signature_buf),
        data_to_sign]);
    console.log("apdu_packapdu_pack:"+apdu_pack.toString("hex"))
    let toSend = [];
    let response;
    const get_address = await this.getAddress(transaction.path)
    if(get_address.address !== preview.sender){
      throw "address not match"
    }
    const pubkey = get_address.pubkey
    toSend =  eth_apdu.prepare_sign(apdu_pack)
    toSend.push(eth_apdu.sign_digest(transaction.path))
    return foreach(toSend, (data, i) =>
      this.transport
        .send(data)
        .then((apduResponse) => {
          response = apduResponse;
        })
    ).then(() => {
      let rec_id = 0;
      let sign_compact = response.slice(1, 65);
      let normalizes_sig = secp256k1.signatureNormalize(sign_compact)
      let data_hash = Buffer.from(utils.keccak256(rawTransaction).substring(2), "hex")
      for (let i = 0; i <= 3; i++) {
        try {
          console.log(Buffer.from(secp256k1.ecdsaRecover(normalizes_sig, i, data_hash, false)).toString("hex"))
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
      const r = normalizes_sig.slice(0, 32).toString("hex");
      const s = normalizes_sig.slice(32, 32 + 32).toString("hex");
      const signedTransaction = encode([numberToHex(transaction.nonce),numberToHex(transaction.gasPrice) , numberToHex(transaction.gasLimit), transaction.to, numberToHex(transaction.value), transaction.data,Buffer.from(v,"hex"), Buffer.from(r,"hex"), Buffer.from(s,"hex")]);
      const signature = "0x"+signedTransaction.toString("hex");
      const txhash =utils.keccak256(signedTransaction)
      return { signature, txhash };
    });
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
    v: string,
    r: string,
    s: string,
  }> {
    let message_to_sign
    //判断是否是HEX
    if(is_valid_hex(message)){
      message_to_sign = Buffer.from(message.substring(2), "hex");
    }else{
      message_to_sign = Buffer.from(message, "ascii");
    }
    let data
    if (isPersonalSign) {
      let header = Buffer.from("Ethereum Signed Message:\n"+message_to_sign.length, "ascii");
      data = Buffer.concat([header, message_to_sign]);
    }else{
      data = message_to_sign;
    }
    let  data_to_sign = Buffer.concat([asUInt8(1), asUInt16BE(data.length),data]);
    // let key_manager_obj = KEY_MANAGER.lock();
    let pri_key = Buffer.from("18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725","hex");
    let ha256_hash =  utils.sha256(utils.sha256(data_to_sign)).substring(2)
    let bind_signature = secp256k1.ecdsaSign(Buffer.from(ha256_hash,"hex"),pri_key).signature
    let bind_signature_r =(bind_signature[0]>0x80) ? Buffer.concat(
      [asUInt8(2),
        asUInt8(33),
        asUInt8(0),
        Buffer.from(bind_signature.slice(0,32))]) :Buffer.concat(
      [asUInt8(2),
        asUInt8(32),
        Buffer.from(bind_signature.slice(0,32))])
    let bind_signature_s =(bind_signature[32]>0x80) ? Buffer.concat(
      [asUInt8(2),
        asUInt8(33),
        asUInt8(0),
        Buffer.from(bind_signature.slice(32,64))]) :Buffer.concat(
      [asUInt8(2),
        asUInt8(32),
        Buffer.from(bind_signature.slice(32,64))])

    let bind_signature_buf =  Buffer.concat(
      [asUInt8(48),
        asUInt8(bind_signature_r.length+bind_signature_s.length),
        bind_signature_r,
        bind_signature_s]);
    let apdu_pack = Buffer.concat(
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
    toSend =  eth_apdu.prepare_personal_sign(apdu_pack)
    toSend.push(eth_apdu.personal_sign(path))
    return foreach(toSend, (data, i) =>
      this.transport
        .send(data)
        .then((apduResponse) => {
          response = apduResponse;
        })
    ).then(() => {
      let  rec_id = 0;
      console.log(response.toString("hex"))
      let sign_compact = response.slice(1,65);
      let normalizes_sig = secp256k1.signatureNormalize(sign_compact)
      let data_hash =  Buffer.from(utils.keccak256(data).substring(2),"hex")
      console.log(data_hash.toString("hex"))
      for(let i=0;i<=3;i++){
        try {
          if(Buffer.from(secp256k1.ecdsaRecover(normalizes_sig,i,data_hash,false)).toString("hex")===pubkey){
            rec_id = i
          }
        }catch (e){
          continue
        }
      }
      let v = (rec_id + 27).toString();
      const r = normalizes_sig.slice(0, 32).toString("hex");
      const s = normalizes_sig.slice(32, 32 + 32).toString("hex");
      return { v, r, s };
    });
  }
}
function address_from_pubkey(pubkey: Buffer):string {
  let pubkey_hash = utils.keccak256(pubkey.slice(1,65));
return  utils.getAddress("0x"+pubkey_hash.substring(26));
}
function is_valid_hex(input: string) :boolean {
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
function asUInt16BE(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}
function asUInt8(value) {
  const b = Buffer.alloc(1);
  b.writeUInt8(value, 0);
  return b;
}
function numberToHex(num: string | number | BN) {
  return  Web3.utils.numberToHex(num);
}