import {Class} from "utility-types";
import Transport from "../hw-transport/Transport";
import  {RecordStore} from "./RecordStore";

/**
 * create a transport replayer with a record store.
 * @param recordStore
 */
export const createTransportReplayer = (
  recordStore: RecordStore,
): Class<Transport<any>> => {
  class TransportReplayer extends Transport<any> {
    static isSupported = () => Promise.resolve(true);
    static list = () => Promise.resolve([null]);
    static listen = o => {
      let unsubscribed;
      setTimeout(() => {
        if (unsubscribed) return;
        o.next({
          type: "add",
          descriptor: null,
        });
        o.complete();
      }, 0);
      return {
        unsubscribe: () => {
          unsubscribed = true;
        },
      };
    };
    static open = () => Promise.resolve(new TransportReplayer());

    close() {
      return Promise.resolve();
    }

    exchange(apdu: Buffer): Promise<Buffer> {
      console.log("apdu", apdu.toString("hex"));

      try {
        const buffer = recordStore.replayExchange(apdu);
        console.log("apdu", buffer.toString("hex"));
        return Promise.resolve(buffer);
      } catch (e) {
        console.log("apdu-error", String(e));
        return Promise.reject(e);
      }
    }
  }

  return TransportReplayer;
};
