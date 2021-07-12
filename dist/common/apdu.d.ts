/// <reference types="node" />
export declare class ETHApdu {
    selectApplet(): Buffer;
    getXPub(path: string, isVerify: boolean): Buffer;
    registerAddress(address?: Buffer): Buffer;
    prepareSign(data?: Buffer): Buffer[];
    signDigest(path: string): Buffer;
    preparePersonalSign(data?: Buffer): Buffer[];
    personalSign(path: string): Buffer;
}
