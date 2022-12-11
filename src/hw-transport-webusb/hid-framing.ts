import { TransportError, TransportStatusError } from "../errors";
export type ResponseAcc =
  | {
      data: Buffer
      dataLength: number
      sequence: number
    }
  | null
  | undefined

const COMMAND_TYPE_MESSAGE  = 0x43|0x80
const COMMAND_TYPE_CANCEL   = 0x51|0x80
const COMMAND_TYPE_ERROR    = 0x7F|0x80
const COMMAND_TYPE_KEEPALIVE= 0x7B|0x80

const ERR_INVALID_CMD = 0x01
const ERR_INVALID_PAR = 0x02
const ERR_INVALID_LEN = 0x03
const ERR_INVALID_SEQ = 0x04

const ERR_DEVICE_BUSY = 0x06
const ERR_DEVICE_CANCEL = 0xFE
const ERR_OTHER       = 0x07
function asUInt16BE(value) {
  const b = Buffer.alloc(2)
  b.writeUInt16BE(value, 0)
  return b
}

const initialAcc = {
  data: Buffer.alloc(0),
  dataLength: 0,
  sequence: 0,
}
/**
 *
 */
const createHIDframing = (channel: number, packetSize: number) => {
  return {
    makeBlocks(apdu: Buffer): Buffer[] {
      const data = Buffer.concat([asUInt16BE(apdu.length), apdu])
      const blockSize = packetSize - 5
      const nbBlocks = Math.ceil(data.length / blockSize)
      const blocks = []
      let chunk
      let dataIndex = 0
      for (let i = 0; i < nbBlocks; i++) {
        let head
        if (i === 0) {
          if(apdu.length === 2 && apdu.toString("hex") === "0000"){
            head = Buffer.alloc(5)
            head.writeUInt8(COMMAND_TYPE_CANCEL, 4)
            blocks.push(Buffer.concat([head], 64))
            return blocks
          }
          head = Buffer.alloc(5)
          head.writeUInt8(COMMAND_TYPE_MESSAGE, 4)
          chunk = data.slice(0, blockSize)
          dataIndex += blockSize
        } else {
          head = Buffer.alloc(5)
          head.writeUInt8(i-1, 4)
          chunk = data.slice(dataIndex, dataIndex + blockSize)
          dataIndex += blockSize
        }
        blocks.push(Buffer.concat([head, chunk], 64))
        if (dataIndex >= data.length) {
          break
        }
      }
      return blocks
    },

    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc {
      let { data, dataLength, sequence } = acc || initialAcc
      console.log('apdu', '<= ' + chunk.toString('hex').toUpperCase())
      if (chunk.readUInt8(4) === COMMAND_TYPE_KEEPALIVE) {
        return
      }
      if (chunk.readUInt8(4) === COMMAND_TYPE_ERROR) {
        if(chunk.readUInt8(7) === ERR_INVALID_CMD){

          throw new TransportStatusError(0xf001)
          // throw new TransportError('ERR_INVALID_CMD', 'ERR_INVALID_CMD')
        }
        if(chunk.readUInt8(7) === ERR_INVALID_PAR){
          throw new TransportError('ERR_INVALID_PAR', 'ERR_INVALID_PAR')
        }
        if(chunk.readUInt8(7) === ERR_INVALID_LEN){
          throw new TransportError('ERR_INVALID_LEN', 'ERR_INVALID_LEN')
        }
        if(chunk.readUInt8(7) === ERR_INVALID_SEQ){
          throw new TransportError('ERR_INVALID_SEQ', 'ERR_INVALID_SEQ')
        }
        if(chunk.readUInt8(7) === ERR_DEVICE_BUSY){
          throw new TransportStatusError(0xf002)
          // throw new TransportError('ERR_DEVICE_BUSY', 'ERR_DEVICE_BUSY')
        }
        if(chunk.readUInt8(7) === ERR_DEVICE_CANCEL){
          throw new TransportStatusError(0xf002)
          // throw new TransportError('ERR_DEVICE_BUSY', 'ERR_DEVICE_BUSY')
        }
        if(chunk.readUInt8(7) === ERR_OTHER){
          // throw new TransportStatusError(0xf001)
          console.log('apdu1', '<= ' + chunk.toString('hex').toUpperCase())
          return
          // throw new TransportError('ERR_OTHER', 'ERR_OTHER')
        }
      }
      if (chunk.readUInt8(4) === COMMAND_TYPE_MESSAGE) {
        if (!acc) {
          dataLength = chunk.readUInt16BE(5)
        }
        sequence++
      }
      const chunkData = chunk.slice(acc ? 5 : 7)
      data = Buffer.concat([data, chunkData])
      if (data.length > dataLength) {
        data = data.slice(0, dataLength)
      }
      return {
        data,
        dataLength,
        sequence,
      }
    },

    getReducedResult(acc: ResponseAcc): Buffer | null | undefined {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data
      }
    },
  }
}

export default createHIDframing
