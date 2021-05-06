
import { TransportError } from "../errors";

export type ResponseAcc = {
  data: Buffer,
  dataLength: number
};

const Tag = 0x4654;

function asUInt16BE(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16BE(value, 0);
  return b;
}

const initialAcc = {
  data: Buffer.alloc(0),
  dataLength: 0
};
/**
 *
 */
const createHIDframing = (channel: number, packetSize: number) => {
  return {
    makeBlocks(apdu: Buffer): Buffer[] {
      const data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
      const blockSize = packetSize - 3;
      const nbBlocks = Math.ceil(data.length / blockSize);
      const blocks = [];
      let chunk ;
      let dataIndex = 0;
      for (let i = 0; i < nbBlocks; i++) {
        let head;
        if(i == 0) {
          head = Buffer.alloc(3);
          head.writeUInt8(channel, 0);
          head.writeUInt16BE(Tag, 1);
          chunk = data.slice(0, blockSize);
          dataIndex += blockSize
        }else{
          head = Buffer.alloc(1);
          head.writeUInt8(channel, 0);
          chunk = data.slice(dataIndex, dataIndex+(blockSize+2));
          dataIndex += (blockSize+2)
        }
        blocks.push(Buffer.concat([head, chunk]));
        if(dataIndex>=data.length){
          break;
        }
      }
      return blocks;
    },

    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc {
      let { data, dataLength } = acc || initialAcc;
      if (chunk.readUInt8(0) !== channel) {
        throw new TransportError("Invalid channel", "InvalidChannel");
      }
      // if (chunk.readUInt8(1) !== Tag) {
      //   throw new TransportError("Invalid tag", "InvalidTag");
      // }
      if (!acc) {
        dataLength = chunk.readUInt16BE(3);
      }
      const chunkData = chunk.slice(acc ? 1 : 5);
      data = Buffer.concat([data, chunkData]);
      if (data.length > dataLength) {
        data = data.slice(0, dataLength);
      }
      return {
        data,
        dataLength
      };
    },

    getReducedResult(acc: ResponseAcc): Buffer {
      if (acc && acc.dataLength === acc.data.length) {
        return acc.data;
      }
    },
  };
};

export default createHIDframing;
