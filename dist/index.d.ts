import { JsonRpcPayload } from './common/utils';
import { RLPEncodedTransaction, TransactionConfig } from './common/utils';
import EventEmitter from 'event-emitter-es6';
interface IProviderOptions {
    rpcUrl?: string;
    infuraId?: string;
    chainId?: number;
    headers?: Record<string, string>;
    symbol?: string;
}
interface AddEthereumChainParameter {
    chainId: string;
    blockExplorerUrls?: string[];
    chainName?: string;
    iconUrls?: string[];
    nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls?: string[];
}
interface RequestArguments {
    method: string;
    params: any[];
}
export default class ImKeyProvider extends EventEmitter {
    private httpProvider;
    private chainId;
    private headers;
    private symbol;
    constructor(config: IProviderOptions);
    callInnerProviderApi(req: JsonRpcPayload): Promise<any>;
    enable(): Promise<any[]>;
    stop(): void;
    request: (args: RequestArguments) => Promise<any>;
    changeChain(args: AddEthereumChainParameter): void;
    sendAsync(args: JsonRpcPayload, callback: (err: Error | null, ret: any) => void): void;
    requestTransactionReceipt(paload: JsonRpcPayload): Promise<any>;
    imKeyRequestAccounts(id: string | number | undefined, callback?: (error: Error, ret: any) => void): Promise<any[]>;
    imKeySignTransaction(id: string | number | undefined, transactionConfig: TransactionConfig, callback?: (error: Error, ret: any) => void): Promise<RLPEncodedTransaction>;
    imKeySign(id: string | number | undefined, dataToSign: string, address: string | number, isPersonalSign: boolean, callback?: (error: Error, ret: any) => void): Promise<any>;
}
export {};
