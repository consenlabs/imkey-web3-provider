
const imkeyUSBVendorId = 0x096e;
const imkeyDevices = [
  {
    vendorId: imkeyUSBVendorId,
  },
];

const devices = {
  imKey: {
    id: "imKey",
    productName: "JuBiter Wallet",
    productIdMM: 0x40,
    legacyUsbProductId: 0x0891,
    usbOnly: true,
    memorySize: 2 * 1024 * 1024,
    blockSize: 4 * 1024,
  },
};
export type DeviceModel = {
  id: string;
  productName: string;
  productIdMM: number;
  legacyUsbProductId: number;
  usbOnly: boolean;
  memorySize: number;
  blockSize: number
};
const devicesList: DeviceModel[] = Object.values(devices);

// export const getDeviceModel = (id: DeviceModelId): DeviceModel => {
//   const info = devices[id];
//   if (!info) throw new Error("devices '" + id + "' does not exist");
//   return info;
// };

/**
 *
 */
export const identifyUSBProductId = (usbProductId: number): DeviceModel => {
  const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
  if (legacy) return legacy;
  const mm = usbProductId >> 8;
  console.log("mmmmmmmm:" + mm);
  const deviceModel = devicesList.find(d => d.productIdMM === mm);
  return deviceModel;
};
// export const identifyProductName = (productName: string): DeviceModel => {
//   const productId = productMap[productName];
//   const deviceModel = devicesList.find(d => d.id === productId);
//   return deviceModel;
// };
export async function requestimkeyDevice(): Promise<any> {
  // @ts-ignore
  const device = await navigator.usb.requestDevice({
    filters: imkeyDevices,
  });
  return device;
}
export async function getimkeyDevices(): Promise<any> {
  // @ts-ignore
  const devices = await navigator.usb.getDevices();
  return devices.filter(d => d.vendorId === imkeyUSBVendorId);
}
export async function getFirstimkeyDevice(): Promise<any> {
  const existingDevices = await getimkeyDevices();
  if (existingDevices.length > 0) return existingDevices[0];
  return requestimkeyDevice();
}

export const isSupported = (): Promise<boolean> =>
  Promise.resolve(
    !!navigator && // @ts-ignore
    !!navigator.usb && // @ts-ignore
    typeof navigator.usb.getDevices === "function",
  );
