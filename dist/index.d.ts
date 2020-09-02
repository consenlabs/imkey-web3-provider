import { JsonRpcPayload } from "web3-core-helpers";
import { RLPEncodedTransaction, TransactionConfig } from "web3-eth";
import EventEmitter from "event-emitter-es6";
interface IProviderOptions {
    rpcUrl?: string;
    infuraId?: string;
    chainId?: number;
}
interface RequestArguments {
    method: string;
    params: any[];
}
export default class ImKeyProvider extends EventEmitter {
    private infuraProvider;
    private chainId;
    constructor(config: IProviderOptions);
    callInnerProviderApi(req: JsonRpcPayload): Promise<any>;
    enable(): Promise<any[]>;
    request(args: RequestArguments): Promise<any>;
    sendAsync(args: JsonRpcPayload, callback: (err: Error | null, ret: any) => void): void;
    imKeyRequestAccounts(id: string | number | undefined, callback?: (error: Error, ret: any) => void): Promise<any[]>;
    imKeySignTransaction(id: string | number | undefined, transactionConfig: TransactionConfig, callback?: (error: Error, ret: any) => void): Promise<RLPEncodedTransaction>;
    imKeyPersonalSign(id: string | number | undefined, dataToSign: string, address: string | number, callback?: (error: Error, ret: any) => void): Promise<any>;
}
export {};
