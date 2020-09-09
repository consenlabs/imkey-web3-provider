import BN from "bignumber.js";
export declare const toBN: (x: any) => BN;
export declare function isHexPrefixed(str: any): boolean;
export declare function addHexPrefix(str: string): string;
export declare const setUnlimitedAllowanceAsync: ({ from, spender, token }: {
    from: any;
    spender: any;
    token: any;
}) => Promise<unknown>;
