/// <reference types="node" />
import BN from 'bn.js';
export declare function addressFromPubkey(pubkey: Buffer): string;
export declare function isValidHex(input: string): boolean;
export declare function asUInt16BE(value: any): Buffer;
export declare function asUInt8(value: any): Buffer;
export declare function numberToHex(value: string | number | BN): string | number | BN;
export declare function hexBuffer(str: string): Buffer;
export declare function maybeHexBuffer(str: string): Buffer;
export declare function toBN(x: any): BN;
export declare function isHex(value: string | number): boolean;
export declare function hexToNumber(value: string): number | string;
export declare function stringToNumber(value: string): number;
export declare function hexToNumberString(value: string): string;
export declare function toChecksumAddress(address: string): string;
export declare function bytesToHex(bytes: []): string;
export declare function fromWei(value: string | number, unit?: string): string;
export declare function toUtf8(value: string): string;
export declare function parseArgsNum(num: string | number | BN): string;
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
export declare type chain = 'mainnet' | 'goerli' | 'kovan' | 'rinkeby' | 'ropsten';
export declare type hardfork = 'chainstart' | 'homestead' | 'dao' | 'tangerineWhistle' | 'spuriousDragon' | 'byzantium' | 'constantinople' | 'petersburg' | 'istanbul';
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
