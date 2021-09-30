import { Class } from 'utility-types'
import Transport from '../hw-transport/Transport'
import { RecordStore } from './RecordStore'

/**
 * create a transport replayer with a record store.
 * @param recordStore
 */
export const createTransportReplayer = (recordStore: RecordStore): Class<Transport> => {
  class TransportReplayer extends Transport {
    static isSupported = () => Promise.resolve(true)
    static list = () => Promise.resolve([null])
    static listen = o => {
      let unsubscribed
      setTimeout(() => {
        if (unsubscribed) return
        o.next({
          type: 'add',
          descriptor: null,
        })
        o.complete()
      }, 0)
      return {
        unsubscribe: () => {
          unsubscribed = true
        },
      }
    }
    static open = () => Promise.resolve(new TransportReplayer())

    close() {
      return Promise.resolve()
    }

    exchange(apdu: Buffer): Promise<Buffer> {
      try {
        const buffer = recordStore.replayExchange(apdu)
        return Promise.resolve(buffer)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  return TransportReplayer
}
