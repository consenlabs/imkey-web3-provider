import { JsonRpcPayload } from "web3-core-helpers";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
interface IProviderOptions {
    rpcUrl?: string;
    infuraId?: string;
    chainId?: number;
    headers?: Record<string, string>;
    apirouter?: any;
    dialog?: any;
}
interface RequestArguments {
    method: string;
    params: any[];
}
export declare function test33(): Promise<string>;
export default class ImKeyProvider extends EventEmitter {
    private httpProvider;
    private chainId;
    constructor(config: IProviderOptions);
    callInnerProviderApi(req: JsonRpcPayload): Promise<any>;
    enable(): Promise<any[]>;
    test22(): Promise<string>;
    request2(args: RequestArguments): Promise<any>;
    request: (args: RequestArguments) => Promise<any>;
    sendAsync(args: JsonRpcPayload, callback: (err: Error | null, ret: any) => void): void;
    requestTransactionReceipt(paload: JsonRpcPayload): Promise<any>;
    imKeyRequestAccounts(id: string | number | undefined, callback?: (error: Error, ret: any) => void): Promise<any[]>;
    imKeySignTransaction(id: string | number | undefined, transactionConfig: TransactionConfig, callback?: (error: Error, ret: any) => void): Promise<RLPEncodedTransaction>;
    imKeySign(id: string | number | undefined, dataToSign: string, address: string | number, isPersonalSign: boolean, callback?: (error: Error, ret: any) => void): Promise<any>;
}
export {};
