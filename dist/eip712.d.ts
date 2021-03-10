/// <reference types="node" />
/**
 * A collection of utility functions used for signing typed data
 */
declare const TypedDataUtils: {
    /**
     * Encodes an object by encoding and concatenating each of its members
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to encode
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Encoded representation of an object
     */
    encodeData(primaryType: string, data: object, types: object, useV4?: boolean): Buffer;
    /**
     * Encodes the type of an object by encoding a comma delimited list of its members
     *
     * @param {string} primaryType - Root type to encode
     * @param {Object} types - Type definitions
     * @returns {string} - Encoded representation of the type of an object
     */
    encodeType(primaryType: string, types: object): string;
    /**
     * Finds all types within a type definition object
     *
     * @param {string} primaryType - Root type
     * @param {Object} types - Type definitions
     * @param {Array} results - current set of accumulated types
     * @returns {Array} - Set of all types found in the type definition
     */
    findTypeDependencies(primaryType: string, types: object, results?: string[]): string[];
    /**
     * Hashes an object
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    hashStruct(primaryType: string, data: object, types: object, useV4?: boolean): Buffer;
    /**
     * Hashes the type of an object
     *
     * @param {string} primaryType - Root type to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    hashType(primaryType: string, types: object): Buffer;
    /**
     * Removes properties from a message object that are not defined per EIP-712
     *
     * @param {Object} data - typed message object
     * @returns {Object} - typed message object with only allowed fields
     */
    sanitizeData(data: any): any;
    /**
     * Signs a typed message as per EIP-712 and returns its sha3 hash
     *
     * @param {Object} typedData - Types message data to sign
     * @returns {Buffer} - sha3 hash of the resulting signed message
     */
    signHashHex(typedData: any, useV4?: boolean): string;
};
export default TypedDataUtils;
