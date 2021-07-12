/// <reference types="node" />
export declare type ResponseAcc = {
    data: Buffer;
    dataLength: number;
};
/**
 *
 */
declare const createHIDframing: (channel: number, packetSize: number) => {
    makeBlocks(apdu: Buffer): Buffer[];
    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc;
    getReducedResult(acc: ResponseAcc): Buffer | null | undefined;
};
export default createHIDframing;
