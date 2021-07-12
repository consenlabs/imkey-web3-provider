/// <reference types="node" />
import Transport from '../hw-transport/Transport';
import { Observer, DescriptorEvent, Subscription } from '../hw-transport/Transport';
import { DeviceModel } from './webusb';
import { getImKeyDevices } from './webusb';
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@imkeyhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
export default class TransportWebUSB extends Transport<any> {
    device: any;
    deviceModel: DeviceModel;
    channel: number;
    packetSize: number;
    interfaceNumber: number;
    constructor(device: any, interfaceNumber: number);
    /**
     * Check if WebUSB transport is supported.
     */
    static isSupported: () => Promise<boolean>;
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */
    static list: typeof getImKeyDevices;
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */
    static listen: (observer: Observer<DescriptorEvent<any>>) => Subscription;
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static request(): Promise<TransportWebUSB>;
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static openConnected(): Promise<TransportWebUSB>;
    /**{
      "name": "TransportInterfaceNotAvailable",
      "message": "Unable to claim interface.",
      "stack": "Error\n    at new CustomError (http://localhost:8080/main.imkey-web3-provider.js:114168:18)\n    at _callee5$ (http://localhost:8080/main.imkey-web3-provider.js:115923:23)\n    at tryCatch (http://localhost:8080/main.imkey-web3-provider.js:441:40)\n    at Generator.invoke [as _invoke] (http://localhost:8080/main.imkey-web3-provider.js:670:22)\n    at Generator.prototype.<computed> [as next] (http://localhost:8080/main.imkey-web3-provider.js:493:21)\n    at asyncGeneratorStep (http://localhost:8080/main.imkey-web3-provider.js:68:24)\n    at _next (http://localhost:8080/main.imkey-web3-provider.js:90:9)"
  }
     * Create a imkey transport with a USBDevice
     */
    static open(device: any): Promise<TransportWebUSB>;
    _disconnectEmitted: boolean;
    _emitDisconnect: (e: Error) => void;
    /**
     * Release the transport device
     */
    close(): Promise<void>;
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    exchange: (apdu: Buffer) => Promise<Buffer>;
}
