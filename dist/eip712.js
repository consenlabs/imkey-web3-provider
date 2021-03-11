"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _ethereumjsUtil = _interopRequireDefault(require("ethereumjs-util"));

var _ethereumjsAbi = _interopRequireDefault(require("ethereumjs-abi"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TYPED_MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    types: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            type: {
              type: 'string'
            }
          },
          required: ['name', 'type']
        }
      }
    },
    primaryType: {
      type: 'string'
    },
    domain: {
      type: 'object'
    },
    message: {
      type: 'object'
    }
  },
  required: ['types', 'primaryType', 'domain', 'message']
};
/**
 * A collection of utility functions used for signing typed data
 */

var TypedDataUtils = {
  /**
   * Encodes an object by encoding and concatenating each of its members
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to encode
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Encoded representation of an object
   */
  encodeData: function encodeData(primaryType, data, types) {
    var _this = this;

    var useV4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var encodedTypes = ['bytes32'];
    var encodedValues = [this.hashType(primaryType, types)];

    if (useV4) {
      var encodeField = function encodeField(name, type, value) {
        if (types[type] !== undefined) {
          // eslint-disable-next-line no-eq-null
          return ['bytes32', value === null ? '0x0000000000000000000000000000000000000000000000000000000000000000' : _ethereumjsUtil["default"].sha3(_this.encodeData(type, value, types, useV4))];
        }

        if (value === undefined) {
          throw new Error("missing value for field ".concat(name, " of type ").concat(type));
        }

        if (type === 'bytes') {
          return ['bytes32', _ethereumjsUtil["default"].sha3(value)];
        }

        if (type === 'string') {
          // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
          if (typeof value === 'string') {
            value = Buffer.from(value, 'utf8');
          }

          return ['bytes32', _ethereumjsUtil["default"].sha3(value)];
        }

        if (type.lastIndexOf(']') === type.length - 1) {
          var parsedType = type.slice(0, type.lastIndexOf('['));
          var typeValuePairs = value.map(function (item) {
            return encodeField(name, parsedType, item);
          });
          return ['bytes32', _ethereumjsUtil["default"].sha3(_ethereumjsAbi["default"].rawEncode(typeValuePairs.map(function (_ref) {
            var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
                t = _ref2[0];

            return t;
          }), typeValuePairs.map(function (_ref3) {
            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                v = _ref4[1];

            return v;
          })))];
        }

        return [type, value];
      };

      var _iterator = _createForOfIteratorHelper(types[primaryType]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;

          var _encodeField = encodeField(field.name, field.type, data[field.name]),
              _encodeField2 = (0, _slicedToArray2["default"])(_encodeField, 2),
              type = _encodeField2[0],
              value = _encodeField2[1];

          encodedTypes.push(type);
          encodedValues.push(value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(types[primaryType]),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _field = _step2.value;
          var _value = data[_field.name];

          if (_value !== undefined) {
            if (_field.type === 'bytes') {
              encodedTypes.push('bytes32');
              _value = _ethereumjsUtil["default"].sha3(_value);
              encodedValues.push(_value);
            } else if (_field.type === 'string') {
              encodedTypes.push('bytes32'); // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex

              if (typeof _value === 'string') {
                _value = Buffer.from(_value, 'utf8');
              }

              _value = _ethereumjsUtil["default"].sha3(_value);
              encodedValues.push(_value);
            } else if (types[_field.type] !== undefined) {
              encodedTypes.push('bytes32');
              _value = _ethereumjsUtil["default"].sha3(this.encodeData(_field.type, _value, types, useV4));
              encodedValues.push(_value);
            } else if (_field.type.lastIndexOf(']') === _field.type.length - 1) {
              throw new Error('Arrays currently unimplemented in encodeData');
            } else {
              encodedTypes.push(_field.type);
              encodedValues.push(_value);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return _ethereumjsAbi["default"].rawEncode(encodedTypes, encodedValues);
  },

  /**
   * Encodes the type of an object by encoding a comma delimited list of its members
   *
   * @param {string} primaryType - Root type to encode
   * @param {Object} types - Type definitions
   * @returns {string} - Encoded representation of the type of an object
   */
  encodeType: function encodeType(primaryType, types) {
    var result = '';
    var deps = this.findTypeDependencies(primaryType, types).filter(function (dep) {
      return dep !== primaryType;
    });
    deps = [primaryType].concat(deps.sort());

    var _iterator3 = _createForOfIteratorHelper(deps),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var type = _step3.value;
        var children = types[type];

        if (!children) {
          throw new Error("No type definition specified: ".concat(type));
        }

        result += "".concat(type, "(").concat(types[type].map(function (_ref5) {
          var name = _ref5.name,
              t = _ref5.type;
          return "".concat(t, " ").concat(name);
        }).join(','), ")");
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return result;
  },

  /**
   * Finds all types within a type definition object
   *
   * @param {string} primaryType - Root type
   * @param {Object} types - Type definitions
   * @param {Array} results - current set of accumulated types
   * @returns {Array} - Set of all types found in the type definition
   */
  findTypeDependencies: function findTypeDependencies(primaryType, types) {
    var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    ;

    var _primaryType$match = primaryType.match(/^[0-9A-Z_a-z]*/);

    var _primaryType$match2 = (0, _slicedToArray2["default"])(_primaryType$match, 1);

    primaryType = _primaryType$match2[0];

    if (results.includes(primaryType) || types[primaryType] === undefined) {
      return results;
    }

    results.push(primaryType);

    var _iterator4 = _createForOfIteratorHelper(types[primaryType]),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var field = _step4.value;

        var _iterator5 = _createForOfIteratorHelper(this.findTypeDependencies(field.type, types, results)),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var dep = _step5.value;
            !results.includes(dep) && results.push(dep);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return results;
  },

  /**
   * Hashes an object
   *
   * @param {string} primaryType - Root type
   * @param {Object} data - Object to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashStruct: function hashStruct(primaryType, data, types) {
    var useV4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return _ethereumjsUtil["default"].sha3(this.encodeData(primaryType, data, types, useV4));
  },

  /**
   * Hashes the type of an object
   *
   * @param {string} primaryType - Root type to hash
   * @param {Object} types - Type definitions
   * @returns {Buffer} - Hash of an object
   */
  hashType: function hashType(primaryType, types) {
    return _ethereumjsUtil["default"].sha3(this.encodeType(primaryType, types));
  },

  /**
   * Removes properties from a message object that are not defined per EIP-712
   *
   * @param {Object} data - typed message object
   * @returns {Object} - typed message object with only allowed fields
   */
  sanitizeData: function sanitizeData(data) {
    var sanitizedData = {};

    for (var key in TYPED_MESSAGE_SCHEMA.properties) {
      if (data[key]) {
        sanitizedData[key] = data[key];
      }
    }

    if ('types' in sanitizedData) {
      sanitizedData.types = _objectSpread({
        EIP712Domain: []
      }, sanitizedData.types);
    }

    return sanitizedData;
  },

  /**
   * Signs a typed message as per EIP-712 and returns its sha3 hash
   *
   * @param {Object} typedData - Types message data to sign
   * @returns {Buffer} - sha3 hash of the resulting signed message
   */
  signHashHex: function signHashHex(typedData) {
    var useV4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var sanitizedData = this.sanitizeData(typedData);
    var parts = [Buffer.from('1901', 'hex')];
    parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));

    if (sanitizedData.primaryType !== 'EIP712Domain') {
      parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
    }

    return _ethereumjsUtil["default"].bufferToHex(Buffer.concat(parts));
  }
};
var _default = TypedDataUtils;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9laXA3MTIudHMiXSwibmFtZXMiOlsiVFlQRURfTUVTU0FHRV9TQ0hFTUEiLCJ0eXBlIiwicHJvcGVydGllcyIsInR5cGVzIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJpdGVtcyIsIm5hbWUiLCJyZXF1aXJlZCIsInByaW1hcnlUeXBlIiwiZG9tYWluIiwibWVzc2FnZSIsIlR5cGVkRGF0YVV0aWxzIiwiZW5jb2RlRGF0YSIsImRhdGEiLCJ1c2VWNCIsImVuY29kZWRUeXBlcyIsImVuY29kZWRWYWx1ZXMiLCJoYXNoVHlwZSIsImVuY29kZUZpZWxkIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJldGhVdGlsIiwic2hhMyIsIkVycm9yIiwiQnVmZmVyIiwiZnJvbSIsImxhc3RJbmRleE9mIiwibGVuZ3RoIiwicGFyc2VkVHlwZSIsInNsaWNlIiwidHlwZVZhbHVlUGFpcnMiLCJtYXAiLCJpdGVtIiwiZXRoQWJpIiwicmF3RW5jb2RlIiwidCIsInYiLCJmaWVsZCIsInB1c2giLCJlbmNvZGVUeXBlIiwicmVzdWx0IiwiZGVwcyIsImZpbmRUeXBlRGVwZW5kZW5jaWVzIiwiZmlsdGVyIiwiZGVwIiwiY29uY2F0Iiwic29ydCIsImNoaWxkcmVuIiwiam9pbiIsInJlc3VsdHMiLCJtYXRjaCIsImluY2x1ZGVzIiwiaGFzaFN0cnVjdCIsInNhbml0aXplRGF0YSIsInNhbml0aXplZERhdGEiLCJrZXkiLCJFSVA3MTJEb21haW4iLCJzaWduSGFzaEhleCIsInR5cGVkRGF0YSIsInBhcnRzIiwiYnVmZmVyVG9IZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CLEdBQUc7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxRQURxQjtBQUUzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLEtBQUssRUFBRTtBQUNMRixNQUFBQSxJQUFJLEVBQUUsUUFERDtBQUVMRyxNQUFBQSxvQkFBb0Is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Q0FBWSxNQUFaLEVBQW9CLEtBQXBCLENBQUQsQ0FBZDtBQUNBa0MsSUFBQUEsS0FBSyxDQUFDckIsSUFBTixDQUNFLEtBQUtjLFVBQUwsQ0FDRSxjQURGLEVBRUVFLGFBQWEsQ0FBQzdDLE1BRmhCLEVBR0U2QyxhQUFhLENBQUNuRCxLQUhoQixFQUlFVyxLQUpGLENBREY7O0FBUUEsUUFBSXdDLGFBQWEsQ0FBQzlDLFdBQWQsS0FBOEIsY0FBbEMsRUFBa0Q7QUFDaERtRCxNQUFBQSxLQUFLLENBQUNyQixJQUFOLENBQ0UsS0FBS2MsVUFBTCxDQUNFRSxhQUFhLENBQUM5QyxXQURoQixFQUVFOEMsYUFBYSxDQUFDNUMsT0FGaEIsRUFHRTRDLGFBQWEsQ0FBQ25ELEtBSGhCLEVBSUVXLEtBSkYsQ0FERjtBQVFEOztBQUNELFdBQU9PLDJCQUFRdUMsV0FBUixDQUFvQnBDLE1BQU0sQ0FBQ3FCLE1BQVAsQ0FBY2MsS0FBZCxDQUFwQixDQUFQO0FBQ0Q7QUEzT29CLENBQXZCO2VBOE9laEQsYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL0VJUHMvYmxvYi9tYXN0ZXIvRUlQUy9laXAtNzEyLm1kXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTWV0YU1hc2svZXRoLXNpZy11dGlsL2Jsb2IvMWUzNGM1ODgzNjY2YmM4MGViYTkwYzE5ZjYzOTA3ZTRkNGE4NDZlYy9pbmRleC50c1xuICovXG5pbXBvcnQgZXRoVXRpbCBmcm9tICdldGhlcmV1bWpzLXV0aWwnXG5pbXBvcnQgZXRoQWJpIGZyb20gJ2V0aGVyZXVtanMtYWJpJ1xuXG5jb25zdCBUWVBFRF9NRVNTQUdFX1NDSEVNQSA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICB0eXBlczoge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllczoge1xuICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICBpdGVtczoge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIG5hbWU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgIHR5cGU6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlcXVpcmVkOiBbJ25hbWUnLCAndHlwZSddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHByaW1hcnlUeXBlOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgZG9tYWluOiB7IHR5cGU6ICdvYmplY3QnIH0sXG4gICAgbWVzc2FnZTogeyB0eXBlOiAnb2JqZWN0JyB9LFxuICB9LFxuICByZXF1aXJlZDogWyd0eXBlcycsICdwcmltYXJ5VHlwZScsICdkb21haW4nLCAnbWVzc2FnZSddLFxufVxuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiB1dGlsaXR5IGZ1bmN0aW9ucyB1c2VkIGZvciBzaWduaW5nIHR5cGVkIGRhdGFcbiAqL1xuY29uc3QgVHlwZWREYXRhVXRpbHMgPSB7XG4gIC8qKlxuICAgKiBFbmNvZGVzIGFuIG9iamVjdCBieSBlbmNvZGluZyBhbmQgY29uY2F0ZW5hdGluZyBlYWNoIG9mIGl0cyBtZW1iZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmltYXJ5VHlwZSAtIFJvb3QgdHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIE9iamVjdCB0byBlbmNvZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHR5cGVzIC0gVHlwZSBkZWZpbml0aW9uc1xuICAgKiBAcmV0dXJucyB7QnVmZmVyfSAtIEVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgYW4gb2JqZWN0XG4gICAqL1xuICBlbmNvZGVEYXRhKFxuICAgIHByaW1hcnlUeXBlOiBzdHJpbmcsXG4gICAgZGF0YTogb2JqZWN0LFxuICAgIHR5cGVzOiBvYmplY3QsXG4gICAgdXNlVjQgPSB0cnVlXG4gICk6IEJ1ZmZlciB7XG4gICAgY29uc3QgZW5jb2RlZFR5cGVzID0gWydieXRlczMyJ11cbiAgICBjb25zdCBlbmNvZGVkVmFsdWVzID0gW3RoaXMuaGFzaFR5cGUocHJpbWFyeVR5cGUsIHR5cGVzKV1cblxuICAgIGlmICh1c2VWNCkge1xuICAgICAgY29uc3QgZW5jb2RlRmllbGQgPSAobmFtZSwgdHlwZSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbFxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnYnl0ZXMzMicsXG4gICAgICAgICAgICB2YWx1ZSA9PT0gbnVsbFxuICAgICAgICAgICAgICA/ICcweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnXG4gICAgICAgICAgICAgIDogZXRoVXRpbC5zaGEzKHRoaXMuZW5jb2RlRGF0YSh0eXBlLCB2YWx1ZSwgdHlwZXMsIHVzZVY0KSksXG4gICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1pc3NpbmcgdmFsdWUgZm9yIGZpZWxkICR7bmFtZX0gb2YgdHlwZSAke3R5cGV9YClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSAnYnl0ZXMnKSB7XG4gICAgICAgICAgcmV0dXJuIFsnYnl0ZXMzMicsIGV0aFV0aWwuc2hhMyh2YWx1ZSldXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBjb252ZXJ0IHN0cmluZyB0byBidWZmZXIgLSBwcmV2ZW50cyBldGhVdGlsIGZyb20gaW50ZXJwcmV0aW5nIHN0cmluZ3MgbGlrZSAnMHhhYmNkJyBhcyBoZXhcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWUgPSBCdWZmZXIuZnJvbSh2YWx1ZSwgJ3V0ZjgnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gWydieXRlczMyJywgZXRoVXRpbC5zaGEzKHZhbHVlKV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlLmxhc3RJbmRleE9mKCddJykgPT09IHR5cGUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZFR5cGUgPSB0eXBlLnNsaWNlKDAsIHR5cGUubGFzdEluZGV4T2YoJ1snKSlcbiAgICAgICAgICBjb25zdCB0eXBlVmFsdWVQYWlycyA9IHZhbHVlLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICAgIGVuY29kZUZpZWxkKG5hbWUsIHBhcnNlZFR5cGUsIGl0ZW0pXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAnYnl0ZXMzMicsXG4gICAgICAgICAgICBldGhVdGlsLnNoYTMoXG4gICAgICAgICAgICAgIGV0aEFiaS5yYXdFbmNvZGUoXG4gICAgICAgICAgICAgICAgdHlwZVZhbHVlUGFpcnMubWFwKChbdF0pID0+IHQpLFxuICAgICAgICAgICAgICAgIHR5cGVWYWx1ZVBhaXJzLm1hcCgoWywgdl0pID0+IHYpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFt0eXBlLCB2YWx1ZV1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiB0eXBlc1twcmltYXJ5VHlwZV0pIHtcbiAgICAgICAgY29uc3QgW3R5cGUsIHZhbHVlXSA9IGVuY29kZUZpZWxkKFxuICAgICAgICAgIGZpZWxkLm5hbWUsXG4gICAgICAgICAgZmllbGQudHlwZSxcbiAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdXG4gICAgICAgIClcbiAgICAgICAgZW5jb2RlZFR5cGVzLnB1c2godHlwZSlcbiAgICAgICAgZW5jb2RlZFZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIHR5cGVzW3ByaW1hcnlUeXBlXSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBkYXRhW2ZpZWxkLm5hbWVdXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdieXRlcycpIHtcbiAgICAgICAgICAgIGVuY29kZWRUeXBlcy5wdXNoKCdieXRlczMyJylcbiAgICAgICAgICAgIHZhbHVlID0gZXRoVXRpbC5zaGEzKHZhbHVlKVxuICAgICAgICAgICAgZW5jb2RlZFZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGVuY29kZWRUeXBlcy5wdXNoKCdieXRlczMyJylcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgc3RyaW5nIHRvIGJ1ZmZlciAtIHByZXZlbnRzIGV0aFV0aWwgZnJvbSBpbnRlcnByZXRpbmcgc3RyaW5ncyBsaWtlICcweGFiY2QnIGFzIGhleFxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBCdWZmZXIuZnJvbSh2YWx1ZSwgJ3V0ZjgnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBldGhVdGlsLnNoYTModmFsdWUpXG4gICAgICAgICAgICBlbmNvZGVkVmFsdWVzLnB1c2godmFsdWUpXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlc1tmaWVsZC50eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbmNvZGVkVHlwZXMucHVzaCgnYnl0ZXMzMicpXG4gICAgICAgICAgICB2YWx1ZSA9IGV0aFV0aWwuc2hhMyhcbiAgICAgICAgICAgICAgdGhpcy5lbmNvZGVEYXRhKGZpZWxkLnR5cGUsIHZhbHVlLCB0eXBlcywgdXNlVjQpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBlbmNvZGVkVmFsdWVzLnB1c2godmFsdWUpXG4gICAgICAgICAgfSBlbHNlIGlmIChmaWVsZC50eXBlLmxhc3RJbmRleE9mKCddJykgPT09IGZpZWxkLnR5cGUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheXMgY3VycmVudGx5IHVuaW1wbGVtZW50ZWQgaW4gZW5jb2RlRGF0YScpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuY29kZWRUeXBlcy5wdXNoKGZpZWxkLnR5cGUpXG4gICAgICAgICAgICBlbmNvZGVkVmFsdWVzLnB1c2godmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV0aEFiaS5yYXdFbmNvZGUoZW5jb2RlZFR5cGVzLCBlbmNvZGVkVmFsdWVzKVxuICB9LFxuXG4gIC8qKlxuICAgKiBFbmNvZGVzIHRoZSB0eXBlIG9mIGFuIG9iamVjdCBieSBlbmNvZGluZyBhIGNvbW1hIGRlbGltaXRlZCBsaXN0IG9mIGl0cyBtZW1iZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmltYXJ5VHlwZSAtIFJvb3QgdHlwZSB0byBlbmNvZGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHR5cGVzIC0gVHlwZSBkZWZpbml0aW9uc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIEVuY29kZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHR5cGUgb2YgYW4gb2JqZWN0XG4gICAqL1xuICBlbmNvZGVUeXBlKHByaW1hcnlUeXBlOiBzdHJpbmcsIHR5cGVzOiBvYmplY3QpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIGxldCBkZXBzID0gdGhpcy5maW5kVHlwZURlcGVuZGVuY2llcyhwcmltYXJ5VHlwZSwgdHlwZXMpLmZpbHRlcihcbiAgICAgIChkZXApID0+IGRlcCAhPT0gcHJpbWFyeVR5cGVcbiAgICApXG4gICAgZGVwcyA9IFtwcmltYXJ5VHlwZV0uY29uY2F0KGRlcHMuc29ydCgpKVxuICAgIGZvciAoY29uc3QgdHlwZSBvZiBkZXBzKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHR5cGVzW3R5cGVdXG4gICAgICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdHlwZSBkZWZpbml0aW9uIHNwZWNpZmllZDogJHt0eXBlfWApXG4gICAgICB9XG4gICAgICByZXN1bHQgKz0gYCR7dHlwZX0oJHt0eXBlc1t0eXBlXVxuICAgICAgICAubWFwKCh7IG5hbWUsIHR5cGU6IHQgfSkgPT4gYCR7dH0gJHtuYW1lfWApXG4gICAgICAgIC5qb2luKCcsJyl9KWBcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgdHlwZXMgd2l0aGluIGEgdHlwZSBkZWZpbml0aW9uIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJpbWFyeVR5cGUgLSBSb290IHR5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHR5cGVzIC0gVHlwZSBkZWZpbml0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fSByZXN1bHRzIC0gY3VycmVudCBzZXQgb2YgYWNjdW11bGF0ZWQgdHlwZXNcbiAgICogQHJldHVybnMge0FycmF5fSAtIFNldCBvZiBhbGwgdHlwZXMgZm91bmQgaW4gdGhlIHR5cGUgZGVmaW5pdGlvblxuICAgKi9cbiAgZmluZFR5cGVEZXBlbmRlbmNpZXMoXG4gICAgcHJpbWFyeVR5cGU6IHN0cmluZyxcbiAgICB0eXBlczogb2JqZWN0LFxuICAgIHJlc3VsdHM6IHN0cmluZ1tdID0gW11cbiAgKTogc3RyaW5nW10ge1xuICAgIDtbcHJpbWFyeVR5cGVdID0gcHJpbWFyeVR5cGUubWF0Y2goL15cXHcqL3UpXG4gICAgaWYgKHJlc3VsdHMuaW5jbHVkZXMocHJpbWFyeVR5cGUpIHx8IHR5cGVzW3ByaW1hcnlUeXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1xuICAgIH1cbiAgICByZXN1bHRzLnB1c2gocHJpbWFyeVR5cGUpXG4gICAgZm9yIChjb25zdCBmaWVsZCBvZiB0eXBlc1twcmltYXJ5VHlwZV0pIHtcbiAgICAgIGZvciAoY29uc3QgZGVwIG9mIHRoaXMuZmluZFR5cGVEZXBlbmRlbmNpZXMoZmllbGQudHlwZSwgdHlwZXMsIHJlc3VsdHMpKSB7XG4gICAgICAgICFyZXN1bHRzLmluY2x1ZGVzKGRlcCkgJiYgcmVzdWx0cy5wdXNoKGRlcClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHNcbiAgfSxcblxuICAvKipcbiAgICogSGFzaGVzIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJpbWFyeVR5cGUgLSBSb290IHR5cGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBPYmplY3QgdG8gaGFzaFxuICAgKiBAcGFyYW0ge09iamVjdH0gdHlwZXMgLSBUeXBlIGRlZmluaXRpb25zXG4gICAqIEByZXR1cm5zIHtCdWZmZXJ9IC0gSGFzaCBvZiBhbiBvYmplY3RcbiAgICovXG4gIGhhc2hTdHJ1Y3QoXG4gICAgcHJpbWFyeVR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBvYmplY3QsXG4gICAgdHlwZXM6IG9iamVjdCxcbiAgICB1c2VWNCA9IHRydWVcbiAgKTogQnVmZmVyIHtcbiAgICByZXR1cm4gZXRoVXRpbC5zaGEzKHRoaXMuZW5jb2RlRGF0YShwcmltYXJ5VHlwZSwgZGF0YSwgdHlwZXMsIHVzZVY0KSlcbiAgfSxcblxuICAvKipcbiAgICogSGFzaGVzIHRoZSB0eXBlIG9mIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJpbWFyeVR5cGUgLSBSb290IHR5cGUgdG8gaGFzaFxuICAgKiBAcGFyYW0ge09iamVjdH0gdHlwZXMgLSBUeXBlIGRlZmluaXRpb25zXG4gICAqIEByZXR1cm5zIHtCdWZmZXJ9IC0gSGFzaCBvZiBhbiBvYmplY3RcbiAgICovXG4gIGhhc2hUeXBlKHByaW1hcnlUeXBlOiBzdHJpbmcsIHR5cGVzOiBvYmplY3QpOiBCdWZmZXIge1xuICAgIHJldHVybiBldGhVdGlsLnNoYTModGhpcy5lbmNvZGVUeXBlKHByaW1hcnlUeXBlLCB0eXBlcykpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgcHJvcGVydGllcyBmcm9tIGEgbWVzc2FnZSBvYmplY3QgdGhhdCBhcmUgbm90IGRlZmluZWQgcGVyIEVJUC03MTJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0eXBlZCBtZXNzYWdlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIHR5cGVkIG1lc3NhZ2Ugb2JqZWN0IHdpdGggb25seSBhbGxvd2VkIGZpZWxkc1xuICAgKi9cbiAgc2FuaXRpemVEYXRhKGRhdGEpIHtcbiAgICBjb25zdCBzYW5pdGl6ZWREYXRhOiBhbnkgPSB7fVxuICAgIGZvciAoY29uc3Qga2V5IGluIFRZUEVEX01FU1NBR0VfU0NIRU1BLnByb3BlcnRpZXMpIHtcbiAgICAgIGlmIChkYXRhW2tleV0pIHtcbiAgICAgICAgc2FuaXRpemVkRGF0YVtrZXldID0gZGF0YVtrZXldXG4gICAgICB9XG4gICAgfVxuICAgIGlmICgndHlwZXMnIGluIHNhbml0aXplZERhdGEpIHtcbiAgICAgIHNhbml0aXplZERhdGEudHlwZXMgPSB7IEVJUDcxMkRvbWFpbjogW10sIC4uLnNhbml0aXplZERhdGEudHlwZXMgfVxuICAgIH1cbiAgICByZXR1cm4gc2FuaXRpemVkRGF0YVxuICB9LFxuXG4gIC8qKlxuICAgKiBTaWducyBhIHR5cGVkIG1lc3NhZ2UgYXMgcGVyIEVJUC03MTIgYW5kIHJldHVybnMgaXRzIHNoYTMgaGFzaFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdHlwZWREYXRhIC0gVHlwZXMgbWVzc2FnZSBkYXRhIHRvIHNpZ25cbiAgICogQHJldHVybnMge0J1ZmZlcn0gLSBzaGEzIGhhc2ggb2YgdGhlIHJlc3VsdGluZyBzaWduZWQgbWVzc2FnZVxuICAgKi9cbiAgc2lnbkhhc2hIZXgodHlwZWREYXRhLCB1c2VWNCA9IHRydWUpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNhbml0aXplZERhdGEgPSB0aGlzLnNhbml0aXplRGF0YSh0eXBlZERhdGEpXG4gICAgY29uc3QgcGFydHMgPSBbQnVmZmVyLmZyb20oJzE5MDEnLCAnaGV4JyldXG4gICAgcGFydHMucHVzaChcbiAgICAgIHRoaXMuaGFzaFN0cnVjdChcbiAgICAgICAgJ0VJUDcxMkRvbWFpbicsXG4gICAgICAgIHNhbml0aXplZERhdGEuZG9tYWluLFxuICAgICAgICBzYW5pdGl6ZWREYXRhLnR5cGVzLFxuICAgICAgICB1c2VWNFxuICAgICAgKVxuICAgIClcbiAgICBpZiAoc2FuaXRpemVkRGF0YS5wcmltYXJ5VHlwZSAhPT0gJ0VJUDcxMkRvbWFpbicpIHtcbiAgICAgIHBhcnRzLnB1c2goXG4gICAgICAgIHRoaXMuaGFzaFN0cnVjdChcbiAgICAgICAgICBzYW5pdGl6ZWREYXRhLnByaW1hcnlUeXBlLFxuICAgICAgICAgIHNhbml0aXplZERhdGEubWVzc2FnZSxcbiAgICAgICAgICBzYW5pdGl6ZWREYXRhLnR5cGVzLFxuICAgICAgICAgIHVzZVY0XG4gICAgICAgIClcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGV0aFV0aWwuYnVmZmVyVG9IZXgoQnVmZmVyLmNvbmNhdChwYXJ0cykpXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR5cGVkRGF0YVV0aWxzXG4iXX0=