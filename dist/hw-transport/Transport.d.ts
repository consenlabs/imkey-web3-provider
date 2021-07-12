/// <reference types="node" />
import { $ReadOnly } from 'utility-types';
import EventEmitter from 'events';
import type { DeviceModel } from '../hw-transport-webusb/webusb';
import { TransportError, StatusCodes, TransportStatusError } from '../errors';
export { TransportError, TransportStatusError, StatusCodes };
/**
 */
export declare type Subscription = {
    unsubscribe: () => void;
};
/**
 */
export declare type Device = Record<string, any>;
/**
 * type: add or remove event
 * descriptor: a parameter that can be passed to open(descriptor)
 * deviceModel: device info on the model (is it a nano s, nano x, ...)
 * device: transport specific device info
 */
export declare type DescriptorEvent<Descriptor> = {
    type: 'add' | 'remove';
    descriptor: Descriptor;
    deviceModel?: DeviceModel | null | undefined;
    device?: Device;
};
/**
 */
export declare type Observer<Ev> = $ReadOnly<{
    next: (event: Ev) => unknown;
    error: (e: any) => unknown;
    complete: () => unknown;
}>;
export default class Transport<Descriptor> {
    exchangeTimeout: number;
    unresponsiveTimeout: number;
    deviceModel: DeviceModel | null | undefined;
    /**
     * Statically check if a transport is supported on the user's platform/browser.
     */
    static readonly isSupported: () => Promise<boolean>;
    /**
     * List once all available descriptors. For a better granularity, checkout `listen()`.
     * @return a promise of descriptors
     * @example
     * TransportFoo.list().then(descriptors => ...)
     */
    static readonly list: () => Promise<Array<any>>;
    /**
     * Listen all device events for a given Transport. The method takes an Obverver of DescriptorEvent and returns a Subscription (according to Observable paradigm https://github.com/tc39/proposal-observable )
     * a DescriptorEvent is a `{ descriptor, type }` object. type can be `"add"` or `"remove"` and descriptor is a value you can pass to `open(descriptor)`.
     * each listen() call will first emit all potential device already connected and then will emit events can come over times,
     * for instance if you plug a USB device after listen() or a bluetooth device become discoverable.
     * @param observer is an object with a next, error and complete function (compatible with observer pattern)
     * @return a Subscription object on which you can `.unsubscribe()` to stop listening descriptors.
     * @example
     const sub = TransportFoo.listen({
    next: e => {
      if (e.type==="add") {
        sub.unsubscribe();
        const transport = await TransportFoo.open(e.descriptor);
        ...
      }
    },
    error: error => {},
    complete: () => {}
    })
     */
    static readonly listen: (observer: Observer<DescriptorEvent<any>>) => Subscription;
    /**
     * attempt to create a Transport instance with potentially a descriptor.
     * @param descriptor: the descriptor to open the transport with.
     * @param timeout: an optional timeout
     * @return a Promise of Transport instance
     * @example
     TransportFoo.open(descriptor).then(transport => ...)
     */
    static readonly open: (descriptor: any, timeout?: number) => Promise<Transport<any>>;
    /**
     * low level api to communicate with the device
     * This method is for implementations to implement but should not be directly called.
     * Instead, the recommanded way is to use send() method
     * @param apdu the data to send
     * @return a Promise of response data
     */
    exchange(_apdu: Buffer): Promise<Buffer>;
    /**
     * close the exchange with the device.
     * @return a Promise that ends when the transport is closed.
     */
    close(): Promise<void>;
    _events: EventEmitter;
    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */
    on(eventName: string, cb: (...args: Array<any>) => any): void;
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName: string, cb: (...args: Array<any>) => any): void;
    emit(event: string, ...args: any[]): void;
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode(): void;
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout: number): void;
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout: number): void;
    /**
     * wrapper on top of exchange to simplify work of the implementation.
     * @param cla
     * @param ins
     * @param p1
     * @param p2
     * @param data
     * @param statusList is a list of accepted status code (shorts). [0x9000] by default
     * @return a Promise of response buffer
     */
    send: (data?: Buffer, statusList?: Array<number>) => Promise<Buffer>;
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
     TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout?: number, listenTimeout?: number): Promise<Transport<any>>;
    exchangeBusyPromise: Promise<void>;
    exchangeAtomicImpl: (f: any) => Promise<any>;
    static ErrorMessageListenTimeout: string;
    static ErrorMessageNoDeviceFound: string;
}
