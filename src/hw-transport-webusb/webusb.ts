const imKeyUSBVendorId = 0x096e
const imKeyDevices = [
  {
    vendorId: imKeyUSBVendorId,
  },
]

const devices = {
  imKey: {
    id: 'imKey',
    productName: 'imKey Wallet',
    productIdMM: 0x40,
    legacyUsbProductId: 0x0891,
    usbOnly: true,
    memorySize: 2 * 1024 * 1024,
    blockSize: 4 * 1024,
  },
}
export type DeviceModel = {
  id: string
  productName: string
  productIdMM: number
  legacyUsbProductId: number
  usbOnly: boolean
  memorySize: number
  blockSize: number
}
const devicesList: DeviceModel[] = Object.values(devices)

/**
 *
 */
export const identifyUSBProductId = (usbProductId: number): DeviceModel => {
  const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId)
  if (legacy) return legacy
  const mm = usbProductId >> 8
  const deviceModel = devicesList.find(d => d.productIdMM === mm)
  return deviceModel
}

export async function requestImKeyDevice(): Promise<any> {
  // @ts-ignore
  const device = await navigator.usb.requestDevice({
    filters: imKeyDevices,
  })
  console.log(device)
  return device
}
export async function getImKeyDevices(): Promise<any> {
  // @ts-ignore
  const devices = await navigator.usb.getDevices()
  console.log(devices)
  return devices.filter(d => d.vendorId === imKeyUSBVendorId)
}
export async function getFirstImKeyDevice(): Promise<any> {
  const existingDevices = await getImKeyDevices()
  console.log(existingDevices)
  if (existingDevices.length > 0) return existingDevices[0]
  return requestImKeyDevice()
}

export const isSupported = (): Promise<boolean> =>
  Promise.resolve(
    !!navigator && // @ts-ignore
    !!navigator.usb && // @ts-ignore
      typeof navigator.usb.getDevices === 'function',
  )
