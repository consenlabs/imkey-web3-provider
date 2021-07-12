export declare type DeviceModel = {
    id: string;
    productName: string;
    productIdMM: number;
    legacyUsbProductId: number;
    usbOnly: boolean;
    memorySize: number;
    blockSize: number;
};
/**
 *
 */
export declare const identifyUSBProductId: (usbProductId: number) => DeviceModel;
export declare function requestImKeyDevice(): Promise<any>;
export declare function getImKeyDevices(): Promise<any>;
export declare function getFirstImKeyDevice(): Promise<any>;
export declare const isSupported: () => Promise<boolean>;
