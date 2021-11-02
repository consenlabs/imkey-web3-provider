import {
  serializeError,
  deserializeError,
  createCustomErrorClass,
  addCustomErrorDeserializer,
} from './helpers'

export { serializeError, deserializeError, createCustomErrorClass, addCustomErrorDeserializer }

export const DisconnectedDevice = createCustomErrorClass('DisconnectedDevice')
export const DisconnectedDeviceDuringOperation = createCustomErrorClass(
  'DisconnectedDeviceDuringOperation',
)

export const TransportOpenUserCancelled = createCustomErrorClass('TransportOpenUserCancelled')
export const TransportInterfaceNotAvailable = createCustomErrorClass(
  'TransportInterfaceNotAvailable',
)
export const TransportRaceCondition = createCustomErrorClass('TransportRaceCondition')
export const TransportWebUSBGestureRequired = createCustomErrorClass(
  'TransportWebUSBGestureRequired',
)

/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the devices for various reason.
 */
export function TransportError(this: any, message: string, id: string): void {
  this.name = 'TransportError'
  this.message = message
  this.stack = new Error().stack
  this.id = id
}
TransportError.prototype = new Error()

addCustomErrorDeserializer('TransportError', e => new TransportError(e.message, e.id))

export const StatusCodes = {
  OK: 0x9000,
  APDU_RSP_SUCCESS: 0x9000,
  APDU_RSP_USER_NOT_CONFIRMED: 0x6940,
  APDU_CONDITIONS_NOT_SATISFIED: 0x6985,
  APDU_RSP_APPLET_NOT_EXIST: 0x6a82,
  APDU_RSP_INCORRECT_P1P2: 0x6a86,
  APDU_RSP_CLA_NOT_SUPPORTED: 0x6e00,
  APDU_RSP_APPLET_WRONG_DATA: 0x6a80,
  APDU_RSP_WRONG_LENGTH: 0x6700,
  APDU_RSP_SIGNATURE_VERIFY_FAILED: 0x6942,
  APDU_RSP_FUNCTION_NOT_SUPPORTED: 0x6d00,
  APDU_RSP_EXCEEDED_MAX_UTXO_NUMBER: 0x6941,
  APDU_RSP_WALLET_NOT_CREATED: 0xf000,
  APDU_RSP_IN_MENU_PAGE: 0xf080,
  APDU_RSP_PIN_NOT_VERIFIED: 0xf081,
  APDU_BLUETOOTH_CHANNEL_ERROR: 0x6f01,
  APDU_RSP_SWITCH_BL_STATUS_SUCCESS: 0x905a,
}

export function getAltStatusMessage(code: number): string | undefined | null {
  switch (code) {
    case 0x9000:
      return 'Success'
    case 0x6700:
      return 'IncorrectLength'
    case 0x6940:
      return 'UserNotConfirmed'
    case 0x6941:
      return 'ExceededMaxUTXONumber'
    case 0x6942:
      return 'SignatureVerifyFailed'
    case 0x6982:
      return 'Security not satisfied (dongle locked or have invalid access rights)'
    case 0x6985:
      return 'Condition of use not satisfied (denied by the user?)'
    case 0x6a80:
      return 'InvalidDataReceived'
    case 0x6a82:
      return 'AppletNotExist'
    case 0x6a86:
      return 'IncorrectP1OrP2'
    case 0x6d00:
      return 'FunctionNotSupport'
    case 0x6e00:
      return 'CLANotSupport'
    case 0x6f01:
      return 'BluetoothChannelError'
    case 0xf000:
      return 'WalletNotCreate'
    case 0xf080:
      return 'ImKeyInMenuPage '
    case 0xf081:
      return 'PINNotVerify'
    case 0x905a:
      return 'SwitchBLStatusSuccess'
    case 0xf001:
      return 'address read error, Please replug imkey.'
    case 0xf002:
      return 'imKey Device is busy.'
    case 0xf003:
      return 'imKey not found.'
    default:
      break
  }

  return 'Internal error, please report'
}

/**
 * Error thrown when a devices returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
export function TransportStatusError(this: any, statusCode: number): void {
  this.name = 'TransportStatusError'
  const statusText =
    Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || 'UNKNOWN_ERROR'
  const smsg = getAltStatusMessage(statusCode) || statusText
  const statusCodeStr = statusCode.toString(16)
  this.message = smsg
  this.stack = new Error().stack
  this.statusCode = statusCodeStr
}
TransportStatusError.prototype = new Error()

addCustomErrorDeserializer('TransportStatusError', e => new TransportStatusError(e.statusCode))
