import { serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer } from './helpers';
export { serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer, };
export declare const DisconnectedDevice: (message?: string, fields?: Record<string, any>) => void;
export declare const DisconnectedDeviceDuringOperation: (message?: string, fields?: Record<string, any>) => void;
export declare const TransportOpenUserCancelled: (message?: string, fields?: Record<string, any>) => void;
export declare const TransportInterfaceNotAvailable: (message?: string, fields?: Record<string, any>) => void;
export declare const TransportRaceCondition: (message?: string, fields?: Record<string, any>) => void;
export declare const TransportWebUSBGestureRequired: (message?: string, fields?: Record<string, any>) => void;
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the devices for various reason.
 */
export declare function TransportError(this: any, message: string, id: string): void;
export declare namespace TransportError {
    var prototype: Error;
}
export declare const StatusCodes: {
    OK: number;
    APDU_RSP_SUCCESS: number;
    APDU_RSP_USER_NOT_CONFIRMED: number;
    APDU_CONDITIONS_NOT_SATISFIED: number;
    APDU_RSP_APPLET_NOT_EXIST: number;
    APDU_RSP_INCORRECT_P1P2: number;
    APDU_RSP_CLA_NOT_SUPPORTED: number;
    APDU_RSP_APPLET_WRONG_DATA: number;
    APDU_RSP_WRONG_LENGTH: number;
    APDU_RSP_SIGNATURE_VERIFY_FAILED: number;
    APDU_RSP_FUNCTION_NOT_SUPPORTED: number;
    APDU_RSP_EXCEEDED_MAX_UTXO_NUMBER: number;
    APDU_RSP_WALLET_NOT_CREATED: number;
    APDU_RSP_IN_MENU_PAGE: number;
    APDU_RSP_PIN_NOT_VERIFIED: number;
    APDU_BLUETOOTH_CHANNEL_ERROR: number;
    APDU_RSP_SWITCH_BL_STATUS_SUCCESS: number;
};
export declare function getAltStatusMessage(code: number): string | undefined | null;
/**
 * Error thrown when a devices returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
export declare function TransportStatusError(this: any, statusCode: number): void;
export declare namespace TransportStatusError {
    var prototype: Error;
}
