import TransportWebUSB from '../hw-transport-webusb/TransportWebUSB'
import ETH, { Transaction } from './Eth'
import type Transport from '../hw-transport/Transport'
import EventEmitter from 'event-emitter-es6'
/**
 * The ETHSingleton class defines the `getInstance` method that lets clients access
 * the unique ETHSingleton instance.
 */

export class ETHSingleton {
  private static instance: ETHSingleton
  transport: Transport
  private eth: ETH
  private isClose: boolean = true

  /**
   * The ETHSingleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the ETHSingleton instance.
   *
   * This implementation let you subclass the ETHSingleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ETHSingleton {
    if (!ETHSingleton.instance) {
      const instance = new ETHSingleton()
      ETHSingleton.instance = instance
    }

    return ETHSingleton.instance
  }

  /**
   * Finally, any ETHSingleton should define some business logic, which can be
   * executed on its instance.
   */
  public async init() {
    if (this.isClose) {
      try {
        this.transport = await TransportWebUSB.create()
        this.eth = new ETH(this.transport)
        this.isClose = false
      } catch (error) {
        throw error
      }
    }
  }
  public async close() {
    await this.transport.close()
    this.transport = null
    this.eth = null
    this.isClose = true
  }

  public async getAddress(
    path: string,
  ): Promise<{
    address: string
    pubkey: string
  }> {
    return await this.eth.getAddress(path)
  }

  public async signMessage(
    path: string,
    message: string,
    sender: string,
    isPersonalSign: boolean,
  ): Promise<{
    signature: string
  }> {
    return await this.eth.signMessage(path, message, sender, isPersonalSign)
  }
  public async signTransaction(
    transaction: Transaction,
  ): Promise<{
    signature: string
    txhash: string
  }> {
    return await this.eth.signTransaction(transaction)
  }
}
