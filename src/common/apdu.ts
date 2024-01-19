import { constants } from './constants'
import { Buffer } from 'buffer'
export class ETHApdu {
  selectApplet(): Buffer {
    return genApdu(0x00, 0xa4, 0x04, 0x00, Buffer.from(constants.ETH_AID, 'hex'))
  }
  getXPub(path: string, isVerify: boolean): Buffer {
    return getPubkey(path, 0x53, isVerify)
  }
  registerAddress(address: Buffer = Buffer.alloc(0)): Buffer {
    return registerAddress(0x56, address)
  }
  prepareSign(data: Buffer = Buffer.alloc(0)): Buffer[] {
    return prepareSign(0x51, data)
  }
  signDigest(path: string): Buffer {
    return signDigest(0x52, 0x00, 0x00, path)
  }
  preparePersonalSign(data: Buffer = Buffer.alloc(0)): Buffer[] {
    return prepareSign(0x54, data)
  }
  personalSign(path: string): Buffer {
    return signDigest(0x55, 0x00, 0x00, path)
  }
}
function genApdu(
  cla: number,
  ins: number,
  p1: number,
  p2: number,
  data: Buffer = Buffer.alloc(0),
): Buffer {
  const response = Buffer.concat([
    Buffer.from([cla, ins, p1, p2]),
    Buffer.from([data.length]),
    data,
    Buffer.from([0x00]),
  ])
  return response
}
function getPubkey(path: string, ins: number, isVerify: boolean): Buffer {
  const p1 = isVerify ? 0x01 : 0x00
  return genApdu(0x80, ins, p1, 0x00, Buffer.from(path, 'ascii'))
}
function registerAddress(ins: number, data: Buffer = Buffer.alloc(0)): Buffer {
  return genApdu(0x80, ins, 0x00, 0x00, data)
}
function signDigest(ins: number, index: number, hashType: number, path: string): Buffer {
  return genApdu(0x80, ins, index, hashType, Buffer.from(path, 'ascii'))
}
function prepareSign(ins: number, data: Buffer): Buffer[] {
  const apduList = []
  const size = Math.ceil(data.length / constants.LC_MAX)
  for (let i = 0; i < size; i++) {
    const p1 = i === 0 ? 0x00 : 0x80
    let p2, lc
    if (i === size - 1) {
      p2 = 0x80
      lc = data.length - constants.LC_MAX * (size - 1)
    } else {
      p2 = 0x00
      lc = 0xf5
    }
    apduList.push(
      genApdu(0x80, ins, p1, p2, data.slice(i * constants.LC_MAX, i * constants.LC_MAX + lc)),
    )
  }
  return apduList
}
