// @flow

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
  console.log("packetSize:"+packetSize)
  return {
    makeBlocks(apdu: Buffer): Buffer[] {
      console.log("apdu1:"+apdu.toString("hex"))
      let data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
      let blockSize = packetSize - 3;
      const nbBlocks = Math.ceil(data.length / blockSize);
      data = Buffer.concat([
        data, // fill data with padding
        Buffer.alloc(blockSize+((nbBlocks-1) * (blockSize+2)) - data.length).fill(0),
      ]);
      console.log("data:"+data.toString("hex"))
      const blocks = [];
      let chunk ;
      for (let i = 0; i < nbBlocks; i++) {
        let head;
        if(i == 0) {
          head = Buffer.alloc(3);
          head.writeUInt8(channel, 0);
          head.writeUInt16BE(Tag, 1);
          chunk = data.slice(i * blockSize, (i + 1) * blockSize);
        }else{
          head = Buffer.alloc(1);
          head.writeUInt8(channel, 0);
          chunk = data.slice(blockSize+((i-1) * (blockSize+2)), (i + 1) * (blockSize+2));
        }
        console.log("chuck:"+chunk.toString("hex"))
        blocks.push(Buffer.concat([head, chunk]));
      }
      return blocks;
    },

    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc {
      let { data, dataLength } = acc || initialAcc;
      console.log("chunkchunkchunk111:"+chunk.toString("hex"))
      console.log("accaccaccacc1111:"+acc)
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
      console.log("chunkDatachunkDatachunkDatachunkData:"+chunkData.toString("hex"))
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
