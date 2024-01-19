/**
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md
 * https://github.com/MetaMask/eth-sig-util/blob/1e34c5883666bc80eba90c19f63907e4d4a846ec/index.ts
 */
import ethUtil from 'ethereumjs-util'
import ethAbi from 'ethereumjs-abi'
import { Buffer } from 'buffer'

const TYPED_MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    types: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string' },
          },
          required: ['name', 'type'],
        },
      },
    },
    primaryType: { type: 'string' },
    domain: { type: 'object' },
    message: { type: 'object' },
  },
  required: ['types', 'primaryType', 'domain', 'message'],
}

/**
 * A collection of utility functions used for signing typed data
 */
const TypedDataUtils = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Encoded representation of an object
   */
  encodeData(primaryType: string, data: object, types: object, useV4 = true): Buffer {
    const encodedTypes = ['bytes32']
    const encodedValues = [this.hashType(primaryType, types)]

    if (useV4) {
      const encodeField = (name, type, value) => {
        if (types[type] !== undefined) {
          // eslint-disable-next-line no-eq-null
          return [
            'bytes32',
            value === null
              ? '0x0000000000000000000000000000000000000000000000000000000000000000'
              : ethUtil.sha3(this.encodeData(type, value, types, useV4)),
          ]
        }

        if (value === undefined) {
          throw new Error(`missing value for field ${name} of type ${type}`)
        }

        if (type === 'bytes') {
          return ['bytes32', ethUtil.sha3(value)]
        }

        if (type === 'string') {
          // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
          if (typeof value === 'string') {
            value = Buffer.from(value, 'utf8')
          }
          return ['bytes32', ethUtil.sha3(value)]
        }

        if (type.lastIndexOf(']') === type.length - 1) {
          const parsedType = type.slice(0, type.lastIndexOf('['))
          const typeValuePairs = value.map(item => encodeField(name, parsedType, item))
          return [
            'bytes32',
            ethUtil.sha3(
              ethAbi.rawEncode(
                typeValuePairs.map(([t]) => t),
                typeValuePairs.map(([, v]) => v),
              ),
            ),
          ]
        }

        return [type, value]
      }

      for (const field of types[primaryType]) {
        const [type, value] = encodeField(field.name, field.type, data[field.name])
        encodedTypes.push(type)
        encodedValues.push(value)
      }
    } else {
      for (const field of types[primaryType]) {
        let value = data[field.name]
        if (value !== undefined) {
          if (field.type === 'bytes') {
            encodedTypes.push('bytes32')
            value = ethUtil.sha3(value)
            encodedValues.push(value)
          } else if (field.type === 'string') {
            encodedTypes.push('bytes32')
            // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
            if (typeof value === 'string') {
              value = Buffer.from(value, 'utf8')
            }
            value = ethUtil.sha3(value)
            encodedValues.push(value)
          } else if (types[field.type] !== undefined) {
            encodedTypes.push('bytes32')
            value = ethUtil.sha3(this.encodeData(field.type, value, types, useV4))
            encodedValues.push(value)
          } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw new Error('Arrays currently unimplemented in encodeData')
          } else {
            encodedTypes.push(field.type)
            encodedValues.push(value)
          }
        }
      }
    }

    return ethAbi.rawEncode(encodedTypes, encodedValues)
  },

  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType(primaryType: string, types: object): string {
    let result = ''
    let deps = this.findTypeDependencies(primaryType, types).filter(dep => dep !== primaryType)
    deps = [primaryType].concat(deps.sort())
    for (const type of deps) {
      const children = types[type]
      if (!children) {
        throw new Error(`No type definition specified: ${type}`)
      }
      result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(',')})`
    }
    return result
  },

  /**
   * Finds all types within a type definition object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies(primaryType: string, types: object, results: string[] = []): string[] {
    ;[primaryType] = primaryType.match(/^\w*/u)
    if (results.includes(primaryType) || types[primaryType] === undefined) {
      return results
    }
    results.push(primaryType)
    for (const field of types[primaryType]) {
      for (const dep of this.findTypeDependencies(field.type, types, results)) {
        !results.includes(dep) && results.push(dep)
      }
    }
    return results
  },

  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashStruct(primaryType: string, data: object, types: object, useV4 = true): Buffer {
    return ethUtil.sha3(this.encodeData(primaryType, data, types, useV4))
  },

  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashType(primaryType: string, types: object): Buffer {
    return ethUtil.sha3(this.encodeType(primaryType, types))
  },

  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData(data) {
    const sanitizedData: any = {}
    for (const key in TYPED_MESSAGE_SCHEMA.properties) {
      if (data[key]) {
        sanitizedData[key] = data[key]
      }
    }
    if ('types' in sanitizedData) {
      sanitizedData.types = { EIP712Domain: [], ...sanitizedData.types }
    }
    return sanitizedData
  },

  /**
   * Signs a typed message as per EIP-712 and returns its sha3 hash
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {Buffer} - sha3 hash of the resulting signed message
   */
  signHashHex(typedData, useV4 = true): string {
    const sanitizedData = this.sanitizeData(typedData)
    const parts = [Buffer.from('1901', 'hex')]
    parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4))
    if (sanitizedData.primaryType !== 'EIP712Domain') {
      parts.push(
        this.hashStruct(
          sanitizedData.primaryType,
          sanitizedData.message,
          sanitizedData.types,
          useV4,
        ),
      )
    }
    return ethUtil.bufferToHex(Buffer.concat(parts))
  },
}

export default TypedDataUtils
