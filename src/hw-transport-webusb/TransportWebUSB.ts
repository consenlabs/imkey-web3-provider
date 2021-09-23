import Transport from '../hw-transport/Transport'
import { Observer, DescriptorEvent, Subscription } from '../hw-transport/Transport'
import hidFraming from './hid-framing'
import { identifyUSBProductId } from './imKeyDevice'
import { DeviceModel } from './imKeyDevice'

import {
  TransportOpenUserCancelled,
  TransportInterfaceNotAvailable,
  TransportWebUSBGestureRequired,
  DisconnectedDeviceDuringOperation,
  DisconnectedDevice,
} from '../errors'
import {
  getImKeyDevices,
  getFirstImKeyDevice,
  requestImKeyDevice,
  isSupported,
} from './imKeyDevice'

const configurationValue = 1
const endpointNumberIn = 5
const endpointNumberOut = 4
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@imkeyhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
export default class TransportWebUSB extends Transport {
  device: any
  deviceModel: DeviceModel
  channel = 0x3f
  packetSize = 64
  interfaceNumber: number

  constructor(device: any, interfaceNumber: number) {
    super()
    this.device = device
    this.interfaceNumber = interfaceNumber
    this.deviceModel = identifyUSBProductId(device.productId)
  }

  /**
   * Check if WebUSB transport is supported.
   */
  static isSupported = isSupported

  /**
   * List the WebUSB devices that was previously authorized by the user.
   */
  static list = getImKeyDevices

  /**
   * Actively listen to WebUSB devices and emit ONE device
   * that was either accepted before, if not it will trigger the native permission UI.
   *
   * Important: it must be called in the context of a UI click!
   */
  static listen = (observer: Observer<DescriptorEvent<any>>): Subscription => {
    let unsubscribed = false
    getFirstImKeyDevice().then(
      device => {
        if (!unsubscribed) {
          const deviceModel = identifyUSBProductId(device.productId)
          observer.next({ type: 'add', descriptor: device, deviceModel })
          observer.complete()
        }
      },
      error => {
        if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
          observer.error(new TransportWebUSBGestureRequired(error.message))
        } else {
          observer.error(new TransportOpenUserCancelled(error.message))
        }
      },
    )

    function unsubscribe() {
      unsubscribed = true
    }

    return { unsubscribe }
  }

  /**
   * Similar to create() except it will always display the device permission (even if some devices are already accepted).
   */
  static async request() {
    const device = await requestImKeyDevice()
    return TransportWebUSB.open(device)
  }

  /**
   * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
   */
  static async openConnected() {
    const devices = await getImKeyDevices()
    if (devices.length === 0) return null
    return TransportWebUSB.open(devices[0])
  }

  /**{
    "name": "TransportInterfaceNotAvailable",
    "message": "Unable to claim interface.",
    "stack": "Error\n    at new CustomError (http://localhost:8080/main.imkey-web3-provider.js:114168:18)\n    at _callee5$ (http://localhost:8080/main.imkey-web3-provider.js:115923:23)\n    at tryCatch (http://localhost:8080/main.imkey-web3-provider.js:441:40)\n    at Generator.invoke [as _invoke] (http://localhost:8080/main.imkey-web3-provider.js:670:22)\n    at Generator.prototype.<computed> [as next] (http://localhost:8080/main.imkey-web3-provider.js:493:21)\n    at asyncGeneratorStep (http://localhost:8080/main.imkey-web3-provider.js:68:24)\n    at _next (http://localhost:8080/main.imkey-web3-provider.js:90:9)"
}
   * Create a imkey transport with a USBDevice
   */
  static async open(device: any) {
    await device.open()
    if (device.configuration === null) {
      await device.selectConfiguration(configurationValue)
    }
    // await gracefullyResetDevice(device)
    const iface = device.configurations[0].interfaces.find(({ alternates }) =>
      alternates.some(a => a.interfaceClass === 255),
    )
    if (!iface) {
      throw new TransportInterfaceNotAvailable(
        'No WebUSB interface found for your imkey device. Please upgrade firmware or contact techsupport.',
      )
    }
    const interfaceNumber = iface.interfaceNumber

    try {
      await device.claimInterface(interfaceNumber)
    } catch (e) {
      // await device.close()
      // @ts-ignore
      throw new TransportInterfaceNotAvailable(e.message)
    }
    const transport = new TransportWebUSB(device, interfaceNumber)
    const onDisconnect = e => {
      if (device === e.device) {
        // @ts-ignore
        navigator.usb.removeEventListener('disconnect', onDisconnect)
        transport._emitDisconnect(new DisconnectedDevice())
      }
    }
    // @ts-ignore
    navigator.usb.addEventListener('disconnect', onDisconnect)
    return transport
  }

  _disconnectEmitted = false
  _emitDisconnect = (e: Error) => {
    if (this._disconnectEmitted) return
    this._disconnectEmitted = true
    this.emit('disconnect', e)
  }

  /**
   * Release the transport device
   */
  async close(): Promise<void> {
    await this.exchangeBusyPromise
    await this.device.releaseInterface(this.interfaceNumber)
    await gracefullyResetDevice(this.device)
    await this.device.close()
  }

  /**
   * Exchange with the device using APDU protocol.
   * @param apdu
   * @returns a promise of apdu response
   */
  exchange = async (apdu: Buffer): Promise<Buffer> => {
    const b = await this.exchangeAtomicImpl(async () => {
      const { channel, packetSize } = this
      const framing = hidFraming(channel, packetSize)

      // Write...
      const blocks = framing.makeBlocks(apdu)
      for (let i = 0; i < blocks.length; i++) {
        console.log('apdu', '=> ' + blocks[i].toString('hex').toUpperCase())
        await this.device.transferOut(endpointNumberOut, blocks[i])
      }

      // Read...
      let result
      let acc
      while (!(result = framing.getReducedResult(acc))) {
        const r = await this.device.transferIn(endpointNumberIn, packetSize)
        const buffer = Buffer.from(r.data.buffer)
        acc = framing.reduceResponse(acc, buffer)
      }
      console.log('apdu', '<= ' + result.toString('hex').toUpperCase())
      return result
    }).catch(async e => {
      if (e && e.message && e.message.includes('disconnected')) {
        this._emitDisconnect(e)
        throw new DisconnectedDeviceDuringOperation(e.message)
      }

      throw e
    })
    return b as Buffer
  }
}
async function gracefullyResetDevice(device: any) {
  try {
    await device.reset()
  } catch (err) {
    console.warn(err)
  }
}
