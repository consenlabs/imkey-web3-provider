import type Transport from '../hw-transport/Transport';
declare type Transaction = {
    data: string;
    gasLimit: string;
    gasPrice: string;
    nonce: string;
    to: string;
    value: string;
    chainId: string;
    path: string;
    symbol?: string;
};
/**
 * Ethereum API
 *
 * @example
 * import Eth from "@imkeyhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
export default class Eth {
    transport: Transport<any>;
    constructor(transport: Transport<any>);
    /**
     * get Ethereum address for a given BIP 32 path.
     * @param path a path in BIP 32 format
     * @option boolDisplay optionally enable or not the display
     * @option boolChaincode optionally enable or not the chaincode request
     * @return an object with a publicKey, address and (optionally) chainCode
     * @example
     * eth.getAddress("44'/60'/0'/0/0").then(o => o.address)
     */
    getAddress(path: string): Promise<{
        address: string;
        pubkey: string;
    }>;
    /**
     * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
     * @example
     eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
     */
    signTransaction(transaction: Transaction): Promise<{
        signature: string;
        txhash: string;
    }>;
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
    signMessage(path: string, message: string, sender: string, isPersonalSign: boolean): Promise<{
        signature: string;
    }>;
}
export {};
