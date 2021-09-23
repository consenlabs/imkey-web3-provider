import axios from 'axios'
import * as _ from 'lodash'
import { constants } from './constants'

// `validateStatus` defines whether to resolve or reject the promise for a given
// HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
// or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
const validateStatus = function (status: number): boolean {
  return status >= 200 && status < 300 // default
}
const getHeaders = () => {
  return {
    // production
    // Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VUb2tlbiI6IjUzZTI5N2MxMDU0ODQzYjUiLCJqdGkiOiJpbTE4TURNWVJWY0RXNGc0alRKYjFlVnU2NmlTWnR2eFh1VGNLUzQifQ.WJYWRSZ0TOr6U-RF_VN55lr1Ucn3AU4wECjzuD_LeMs',
    // staging
    // Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VUb2tlbiI6IjUzZTI5N2MxMDU0ODQzYjUiLCJqdGkiOiJpbTE4TURNWVJWY0RXNGc0alRKYjFlVnU2NmlTWnR2eFh1VGNLUzQifQ.5_Leu9W5_-ml6xjyrZ20rTQmZOKgJANiUAr7EV2VroQ',
    // 'X-IDENTIFIER': 'im18MDMYRVcDW4g4jTJb1eVu66iSZtvxXuTcKS4',
    // 'X-CLIENT-VERSION': 'android:2.9.8.1392:62',
    // 'X-DEVICE-TOKEN': '53e297c1054843b5',
    // 'X-LOCALE': 'zh-CN',
    // 'X-CURRENCY': 'CNY',
    // 'X-DEVICE-LOCALE': 'zh_CN_#Hans',
    // 'X-APP-ID': 'im.token.app',
    // 'X-API-KEY': '3bdc0a49ba634a8e8f3333f8e66e0b84',
    // 'Content-Type': 'application/json',
    //dev

    Authorization:
      'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VUb2tlbiI6IjEyMzQ1QUJDREUiLCJqdGkiOiJpbTE4TURLTThoY1R5a3ZNbWhMbm92OW0yQmFGcXNkam9BN2N3TmcifQ.MCqJBXDR2OmUrbEWXkNNtuusVUCHuVIC2gbZsH9yTO0',
    // Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VUb2tlbiI6IjUzZTI5N2MxMDU0ODQzYjUiLCJqdGkiOiJpbTE4TURNWVJWY0RXNGc0alRKYjFlVnU2NmlTWnR2eFh1VGNLUzQifQ.WJYWRSZ0TOr6U-RF_VN55lr1Ucn3AU4wECjzuD_LeMs',
    // 'X-IDENTIFIER': 'im18MDMYRVcDW4g4jTJb1eVu66iSZtvxXuTcKS4',
    // 'X-CLIENT-VERSION': 'android:2.9.8.1392:62',
    'X-DEVICE-TOKEN': '53e297c1054843b5',
    // 'X-LOCALE': 'zh-CN',
    'X-CURRENCY': 'CNY',
    // 'X-DEVICE-LOCALE': 'zh_CN_#Hans',
    // 'X-APP-ID': 'im.token.app',
    // 'X-API-KEY': '3bdc0a49ba634a8e8f3333f8e66e0b84',
    'Content-Type': 'application/json',
  }
}

const newError = (message, url: string) => {
  if (_.isObject(message) && message.message) {
    const error = message
    if (_.isObject(error.response) && _.isObject(error.response.data)) {
      if (error.response.data.error) {
        message = error.response.data.error.message
      }
    } else {
      message = `${url}: ${message.message}`
    }
  } else {
    message = `${url}: ${message}`
  }
  const error = new Error(message)
  error.message = message
  error.toString = () => message
  return error
}

// TODO add debounceTime
export const sendRequest = (config): Promise<any> => {
  console.log(config)
  const rConfig = {
    validateStatus,
    timeout: constants.REQUEST_TIMEOUT,
    ...config,
  }
  return new Promise((resolve, reject) => {
    axios(rConfig)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        } else {
          reject(newError('null response', config.url))
        }
      })
      .catch(error => {
        // console.log('request error', error)
        reject(newError(error, config.url))
      })
  })
}

export const jsonrpc = {
  get(url, header = {}, method, params, timeout: number = constants.REQUEST_TIMEOUT) {
    const headers = {
      ...getHeaders(),
      ...header,
    }
    const data = {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }
    return sendRequest({ method: 'post', url, data, timeout, headers })
      .then(data => {
        if (data.error) {
          throw newError(data.error, url)
        }

        if (_.isUndefined(data.result)) {
          throw newError('server result is undefined', url)
        }
        return data.result
      })
      .catch(err => {
        throw err
      })
  },
}
