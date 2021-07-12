import { ethers, utils as utils$1 } from 'ethers';
import BN$2 from 'bn.js';
import * as require$$3 from 'rlp';
import require$$3__default, { encode } from 'rlp';
import EventEmitter$2 from 'event-emitter-es6';
import require$$0$4 from 'ethereum-cryptography/keccak';
import require$$0 from 'ethereum-cryptography/secp256k1';
import require$$1 from 'elliptic';
import require$$0$1 from 'object-assign';
import require$$1$1 from 'util/';
import require$$0$2 from 'crypto';
import require$$6 from 'safe-buffer';
import require$$0$3 from 'is-hex-prefixed';
import require$$1$2 from 'strip-hex-prefix';
import require$$0$5 from 'ethereumjs-util';
import secp256k1$1 from 'secp256k1';
import Web3HttpProvider from 'web3-providers-http';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var underscoreUmd = {exports: {}};

(function (module, exports) {
(function (global, factory) {
  module.exports = factory() ;
}(commonjsGlobal, (function () {
  //     Underscore.js 1.13.1
  //     https://underscorejs.org
  //     (c) 2009-2021 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  // Current version.
  var VERSION = '1.13.1';

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof commonjsGlobal == 'object' && commonjsGlobal.global === commonjsGlobal && commonjsGlobal ||
            Function('return this')() ||
            {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // Modern feature detection.
  var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
      supportsDataView = typeof DataView !== 'undefined';

  // All **ECMAScript 5+** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create,
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

  // Create references to these builtin functions because we override them.
  var _isNaN = isNaN,
      _isFinite = isFinite;

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  // The largest integer that can be represented exactly.
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }

  // Is a given variable an object?
  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  // Is a given value equal to null?
  function isNull(obj) {
    return obj === null;
  }

  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }

  // Is a given value a boolean?
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  // Is a given value a DOM element?
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  // Internal function for creating a `toString`-based type tester.
  function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }

  var isString = tagTester('String');

  var isNumber = tagTester('Number');

  var isDate = tagTester('Date');

  var isRegExp = tagTester('RegExp');

  var isError = tagTester('Error');

  var isSymbol = tagTester('Symbol');

  var isArrayBuffer = tagTester('ArrayBuffer');

  var isFunction = tagTester('Function');

  // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
  // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  var isFunction$1 = isFunction;

  var hasObjectTag = tagTester('Object');

  // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
  // In IE 11, the most common among them, this problem also applies to
  // `Map`, `WeakMap` and `Set`.
  var hasStringTagBug = (
        supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
      ),
      isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

  var isDataView = tagTester('DataView');

  // In IE 10 - Edge 13, we need a different heuristic
  // to determine whether an object is a `DataView`.
  function ie10IsDataView(obj) {
    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
  }

  var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);

  // Is a given value an array?
  // Delegates to ECMA5's native `Array.isArray`.
  var isArray = nativeIsArray || tagTester('Array');

  // Internal function to check whether `key` is an own property name of `obj`.
  function has$1(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  var isArguments = tagTester('Arguments');

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  (function() {
    if (!isArguments(arguments)) {
      isArguments = function(obj) {
        return has$1(obj, 'callee');
      };
    }
  }());

  var isArguments$1 = isArguments;

  // Is a given object a finite number?
  function isFinite$1(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }

  // Is the given value `NaN`?
  function isNaN$1(obj) {
    return isNumber(obj) && _isNaN(obj);
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function constant(value) {
    return function() {
      return value;
    };
  }

  // Common internal logic for `isArrayLike` and `isBufferLike`.
  function createSizePropertyCheck(getSizeProperty) {
    return function(collection) {
      var sizeProperty = getSizeProperty(collection);
      return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
    }
  }

  // Internal helper to generate a function to obtain property `key` from `obj`.
  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  // Internal helper to obtain the `byteLength` property of an object.
  var getByteLength = shallowProperty('byteLength');

  // Internal helper to determine whether we should spend extensive checks against
  // `ArrayBuffer` et al.
  var isBufferLike = createSizePropertyCheck(getByteLength);

  // Is a given value a typed array?
  var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
  function isTypedArray(obj) {
    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
    // Otherwise, fall back on the above regular expression.
    return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
                  isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
  }

  var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

  // Internal helper to obtain the `length` property of an object.
  var getLength = shallowProperty('length');

  // Internal helper to create a simple lookup structure.
  // `collectNonEnumProps` used to depend on `_.contains`, but this led to
  // circular imports. `emulatedSet` is a one-off solution that only works for
  // arrays of strings.
  function emulatedSet(keys) {
    var hash = {};
    for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
    return {
      contains: function(key) { return hash[key]; },
      push: function(key) {
        hash[key] = true;
        return keys.push(key);
      }
    };
  }

  // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
  // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
  // needed.
  function collectNonEnumProps(obj, keys) {
    keys = emulatedSet(keys);
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has$1(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty(obj) {
    if (obj == null) return true;
    // Skip the more expensive `toString`-based type checks if `obj` has no
    // `.length`.
    var length = getLength(obj);
    if (typeof length == 'number' && (
      isArray(obj) || isString(obj) || isArguments$1(obj)
    )) return length === 0;
    return getLength(keys(obj)) === 0;
  }

  // Returns whether an object has a given set of `key:value` pairs.
  function isMatch(object, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }

  // If Underscore is called as a function, it returns a wrapped object that can
  // be used OO-style. This wrapper holds altered versions of all functions added
  // through `_.mixin`. Wrapped objects may be chained.
  function _$1(obj) {
    if (obj instanceof _$1) return obj;
    if (!(this instanceof _$1)) return new _$1(obj);
    this._wrapped = obj;
  }

  _$1.VERSION = VERSION;

  // Extracts the result from a wrapped and chained object.
  _$1.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxies for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;

  _$1.prototype.toString = function() {
    return String(this._wrapped);
  };

  // Internal function to wrap or shallow-copy an ArrayBuffer,
  // typed array or DataView to a new view, reusing the buffer.
  function toBufferView(bufferSource) {
    return new Uint8Array(
      bufferSource.buffer || bufferSource,
      bufferSource.byteOffset || 0,
      getByteLength(bufferSource)
    );
  }

  // We use this string twice, so give it a name for minification.
  var tagDataView = '[object DataView]';

  // Internal recursive comparison function for `_.isEqual`.
  function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }

  // Internal recursive comparison function for `_.isEqual`.
  function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _$1) a = a._wrapped;
    if (b instanceof _$1) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    // Work around a bug in IE 10 - Edge 13.
    if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
      if (!isDataView$1(b)) return false;
      className = tagDataView;
    }
    switch (className) {
      // These types are compared by value.
      case '[object RegExp]':
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      case '[object ArrayBuffer]':
      case tagDataView:
        // Coerce to typed array so we can fall through.
        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays && isTypedArray$1(a)) {
        var byteLength = getByteLength(a);
        if (byteLength !== getByteLength(b)) return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
        areArrays = true;
    }
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
                               isFunction$1(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var _keys = keys(a), key;
      length = _keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = _keys[length];
        if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  }

  // Perform a deep comparison to check if two objects are equal.
  function isEqual(a, b) {
    return eq(a, b);
  }

  // Retrieve all the enumerable property names of an object.
  function allKeys(obj) {
    if (!isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Since the regular `Object.prototype.toString` type tests don't work for
  // some types in IE 11, we use a fingerprinting heuristic instead, based
  // on the methods. It's not great, but it's the best we got.
  // The fingerprint method lists are defined below.
  function ie11fingerprint(methods) {
    var length = getLength(methods);
    return function(obj) {
      if (obj == null) return false;
      // `Map`, `WeakMap` and `Set` have no enumerable keys.
      var keys = allKeys(obj);
      if (getLength(keys)) return false;
      for (var i = 0; i < length; i++) {
        if (!isFunction$1(obj[methods[i]])) return false;
      }
      // If we are testing against `WeakMap`, we need to ensure that
      // `obj` doesn't have a `forEach` method in order to distinguish
      // it from a regular `Map`.
      return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
    };
  }

  // In the interest of compact minification, we write
  // each string in the fingerprints only once.
  var forEachName = 'forEach',
      hasName = 'has',
      commonInit = ['clear', 'delete'],
      mapTail = ['get', hasName, 'set'];

  // `Map`, `WeakMap` and `Set` each have slightly different
  // combinations of the above sublists.
  var mapMethods = commonInit.concat(forEachName, mapTail),
      weakMapMethods = commonInit.concat(mapTail),
      setMethods = ['add'].concat(commonInit, forEachName, hasName);

  var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

  var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

  var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

  var isWeakSet = tagTester('WeakSet');

  // Retrieve the values of an object's properties.
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[_keys[i]];
    }
    return values;
  }

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of `_.object` with one argument.
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }

  // Invert the keys and values of an object. The values must be serializable.
  function invert(obj) {
    var result = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }
    return result;
  }

  // Return a sorted list of the function names available on the object.
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction$1(obj[key])) names.push(key);
    }
    return names.sort();
  }

  // An internal function for creating assigner functions.
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  }

  // Extend a given object with all the properties in passed-in object(s).
  var extend = createAssigner(allKeys);

  // Assigns a given object with all the own properties in the passed-in
  // object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var extendOwn = createAssigner(keys);

  // Fill in a given object with default properties.
  var defaults = createAssigner(allKeys, true);

  // Create a naked function reference for surrogate-prototype-swapping.
  function ctor() {
    return function(){};
  }

  // An internal function for creating a new object that inherits from another.
  function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    var Ctor = ctor();
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) extendOwn(result, props);
    return result;
  }

  // Create a (shallow-cloned) duplicate of an object.
  function clone(obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
  }

  // Invokes `interceptor` with the `obj` and then returns `obj`.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }

  // Normalize a (deep) property `path` to array.
  // Like `_.iteratee`, this function can be customized.
  function toPath$1(path) {
    return isArray(path) ? path : [path];
  }
  _$1.toPath = toPath$1;

  // Internal wrapper for `_.toPath` to enable minification.
  // Similar to `cb` for `_.iteratee`.
  function toPath(path) {
    return _$1.toPath(path);
  }

  // Internal function to obtain a nested property in `obj` along `path`.
  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }

  // Get the value of the (deep) property on `path` from `object`.
  // If any property in `path` does not exist or if the value is
  // `undefined`, return `defaultValue` instead.
  // The `path` is normalized through `_.toPath`.
  function get(object, path, defaultValue) {
    var value = deepGet(object, toPath(path));
    return isUndefined(value) ? defaultValue : value;
  }

  // Shortcut function for checking if an object has a given property directly on
  // itself (in other words, not on a prototype). Unlike the internal `has`
  // function, this public version can also traverse nested properties.
  function has(obj, path) {
    path = toPath(path);
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (!has$1(obj, key)) return false;
      obj = obj[key];
    }
    return !!length;
  }

  // Keep the identity function around for default iteratees.
  function identity(value) {
    return value;
  }

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  function matcher(attrs) {
    attrs = extendOwn({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indices.
  function property(path) {
    path = toPath(path);
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  }

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `_.identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  function baseIteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction$1(value)) return optimizeCb(value, context, argCount);
    if (isObject(value) && !isArray(value)) return matcher(value);
    return property(value);
  }

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only `argCount` argument.
  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }
  _$1.iteratee = iteratee;

  // The function we call internally to generate a callback. It invokes
  // `_.iteratee` if overridden, otherwise `baseIteratee`.
  function cb(value, context, argCount) {
    if (_$1.iteratee !== iteratee) return _$1.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  // Returns the results of applying the `iteratee` to each element of `obj`.
  // In contrast to `_.map` it returns an object.
  function mapObject(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = keys(obj),
        length = _keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function noop(){}

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) return noop;
    return function(path) {
      return get(obj, path);
    };
  }

  // Run a function **n** times.
  function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  }

  // Return a random integer between `min` and `max` (inclusive).
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // A (possibly faster) way to get the current timestamp as an integer.
  var now = Date.now || function() {
    return new Date().getTime();
  };

  // Internal helper to generate functions for escaping and unescaping strings
  // to/from HTML interpolation.
  function createEscaper(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }

  // Internal list of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Function for escaping strings to HTML interpolation.
  var _escape = createEscaper(escapeMap);

  // Internal list of HTML entities for unescaping.
  var unescapeMap = invert(escapeMap);

  // Function for unescaping strings from HTML interpolation.
  var _unescape = createEscaper(unescapeMap);

  // By default, Underscore uses ERB-style template delimiters. Change the
  // following template settings to use alternative delimiters.
  var templateSettings = _$1.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `_.templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  function escapeChar(match) {
    return '\\' + escapes[match];
  }

  // In order to prevent third-party code injection through
  // `_.templateSettings.variable`, we test it against the following regular
  // expression. It is intentionally a bit more liberal than just matching valid
  // identifiers, but still prevents possible loopholes through defaults or
  // destructuring assignment.
  var bareIdentifier = /^\s*(\w|\$)+\s*$/;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = defaults({}, settings, _$1.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    var argument = settings.variable;
    if (argument) {
      // Insure against third-party code injection. (CVE-2021-23358)
      if (!bareIdentifier.test(argument)) throw new Error(
        'variable is not a bare identifier: ' + argument
      );
    } else {
      // If a variable is not specified, place data values in local scope.
      source = 'with(obj||{}){\n' + source + '}\n';
      argument = 'obj';
    }

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(argument, '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _$1);
    };

    // Provide the compiled source as a convenience for precompilation.
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  }

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  function result(obj, path, fallback) {
    path = toPath(path);
    var length = path.length;
    if (!length) {
      return isFunction$1(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = isFunction$1(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // Start chaining a wrapped Underscore object.
  function chain(obj) {
    var instance = _$1(obj);
    instance._chain = true;
    return instance;
  }

  // Internal function to execute `sourceFunc` bound to `context` with optional
  // `args`. Determines whether to execute a function as a constructor or as a
  // normal function.
  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (isObject(result)) return result;
    return self;
  }

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. `_` acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  var partial = restArguments(function(func, boundArgs) {
    var placeholder = partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  partial.placeholder = _$1;

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally).
  var bind = restArguments(function(func, context, args) {
    if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Internal helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var isArrayLike = createSizePropertyCheck(getLength);

  // Internal implementation of a recursive `flatten` function.
  function flatten$1(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) {
      depth = Infinity;
    } else if (depth <= 0) {
      return output.concat(input);
    }
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
        // Flatten current level of array or arguments object.
        if (depth > 1) {
          flatten$1(value, depth - 1, strict, output);
          idx = output.length;
        } else {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  var bindAll = restArguments(function(obj, keys) {
    keys = flatten$1(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = bind(obj[key], obj);
    }
    return obj;
  });

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  var delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  var defer = partial(delay, _$1, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  // When a sequence of calls of the returned function ends, the argument
  // function is triggered. The end of a sequence is defined by the `wait`
  // parameter. If `immediate` is passed, the argument function will be
  // triggered at the beginning of the sequence instead of at the end.
  function debounce(func, wait, immediate) {
    var timeout, previous, args, result, context;

    var later = function() {
      var passed = now() - previous;
      if (wait > passed) {
        timeout = setTimeout(later, wait - passed);
      } else {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
        // This check is needed because `func` can recursively invoke `debounced`.
        if (!timeout) args = context = null;
      }
    };

    var debounced = restArguments(function(_args) {
      context = this;
      args = _args;
      previous = now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
        if (immediate) result = func.apply(context, args);
      }
      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = args = context = null;
    };

    return debounced;
  }

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  function wrap(func, wrapper) {
    return partial(wrapper, func);
  }

  // Returns a negated version of the passed-in predicate.
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  }

  // Returns a function that will only be executed on and after the Nth call.
  function after(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  // Returns a function that will only be executed up to (but not including) the
  // Nth call.
  function before(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  }

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  var once = partial(before, 2);

  // Returns the first key on an object that passes a truth test.
  function findKey(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }

  // Internal function to generate `_.findIndex` and `_.findLastIndex`.
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a truth test.
  var findIndex = createPredicateIndexFinder(1);

  // Returns the last index on an array-like that passes a truth test.
  var findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  }

  // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN$1);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  var indexOf = createIndexFinder(1, findIndex, sortedIndex);

  // Return the position of the last occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  var lastIndexOf = createIndexFinder(-1, findLastIndex);

  // Return the first value which passes a truth test.
  function find(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }

  // Convenience version of a common use case of `_.find`: getting the first
  // object containing specific `key:value` pairs.
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }

  // The cornerstone for collection functions, an `each`
  // implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  // Return the results of applying the iteratee to each element.
  function map(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Internal helper to create a reducing function, iterating left or right.
  function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  var reduce = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  var reduceRight = createReduce(-1);

  // Return all the elements that pass a truth test.
  function filter(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  // Return all the elements for which a truth test fails.
  function reject(obj, predicate, context) {
    return filter(obj, negate(cb(predicate)), context);
  }

  // Determine whether all of the elements pass a truth test.
  function every(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  }

  // Determine if at least one element in the object passes a truth test.
  function some(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  }

  // Determine if the array or object contains a given item (using `===`).
  function contains(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return indexOf(obj, item, fromIndex) >= 0;
  }

  // Invoke a method (with arguments) on every item in a collection.
  var invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (isFunction$1(path)) {
      func = path;
    } else {
      path = toPath(path);
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `_.map`: fetching a property.
  function pluck(obj, key) {
    return map(obj, property(key));
  }

  // Convenience version of a common use case of `_.filter`: selecting only
  // objects containing specific `key:value` pairs.
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }

  // Return the maximum element (or element-based computation).
  function max(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Return the minimum element (or element-based computation).
  function min(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `_.map`.
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? clone(obj) : values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  }

  // Shuffle a collection.
  function shuffle(obj) {
    return sample(obj, Infinity);
  }

  // Sort the object's values by a criterion produced by an iteratee.
  function sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return pluck(map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  }

  // An internal function used for aggregate "group by" operations.
  function group(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  }

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  var groupBy = group(function(result, value, key) {
    if (has$1(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
  // when you know that your index values will be unique.
  var indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  var countBy = group(function(result, value, key) {
    if (has$1(result, key)) result[key]++; else result[key] = 1;
  });

  // Split a collection into two arrays: one whose elements all pass the given
  // truth test, and one whose elements all do not pass the truth test.
  var partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Safely create a real, live array from anything iterable.
  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (isString(obj)) {
      // Keep surrogate pair characters together.
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return map(obj, identity);
    return values(obj);
  }

  // Return the number of elements in a collection.
  function size(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : keys(obj).length;
  }

  // Internal `_.pick` helper function to determine whether `key` is an enumerable
  // property name of `obj`.
  function keyInObj(value, key, obj) {
    return key in obj;
  }

  // Return a copy of the object only containing the allowed properties.
  var pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (isFunction$1(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten$1(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the disallowed properties.
  var omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (isFunction$1(iteratee)) {
      iteratee = negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = map(flatten$1(keys, false, false), String);
      iteratee = function(value, key) {
        return !contains(keys, key);
      };
    }
    return pick(obj, iteratee, context);
  });

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. The **guard** check allows it to work with `_.map`.
  function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
  }

  // Returns everything but the first entry of the `array`. Especially useful on
  // the `arguments` object. Passing an **n** will return the rest N values in the
  // `array`.
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  function last(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }

  // Trim out all falsy values from an array.
  function compact(array) {
    return filter(array, Boolean);
  }

  // Flatten out an array, either recursively (by default), or up to `depth`.
  // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
  function flatten(array, depth) {
    return flatten$1(array, depth, false);
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = restArguments(function(array, rest) {
    rest = flatten$1(rest, true, true);
    return filter(array, function(value){
      return !contains(rest, value);
    });
  });

  // Return a version of the array that does not contain the specified value(s).
  var without = restArguments(function(array, otherArrays) {
    return difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  function uniq(array, isSorted, iteratee, context) {
    if (!isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  var union = restArguments(function(arrays) {
    return uniq(flatten$1(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  function intersection(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  }

  // Complement of zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  function unzip(array) {
    var length = array && max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = pluck(array, index);
    }
    return result;
  }

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  var zip = restArguments(unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
  function object(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  }

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](https://docs.python.org/library/functions.html#range).
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  }

  // Helper function to continue chaining intermediate results.
  function chainResult(instance, obj) {
    return instance._chain ? _$1(obj).chain() : obj;
  }

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _$1[name] = obj[name];
      _$1.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_$1, args));
      };
    });
    return _$1;
  }

  // Add all mutator `Array` functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _$1.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) {
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0) {
          delete obj[0];
        }
      }
      return chainResult(this, obj);
    };
  });

  // Add all accessor `Array` functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _$1.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) obj = method.apply(obj, arguments);
      return chainResult(this, obj);
    };
  });

  // Named Exports

  var allExports = {
    __proto__: null,
    VERSION: VERSION,
    restArguments: restArguments,
    isObject: isObject,
    isNull: isNull,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isElement: isElement,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isRegExp: isRegExp,
    isError: isError,
    isSymbol: isSymbol,
    isArrayBuffer: isArrayBuffer,
    isDataView: isDataView$1,
    isArray: isArray,
    isFunction: isFunction$1,
    isArguments: isArguments$1,
    isFinite: isFinite$1,
    isNaN: isNaN$1,
    isTypedArray: isTypedArray$1,
    isEmpty: isEmpty,
    isMatch: isMatch,
    isEqual: isEqual,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    keys: keys,
    allKeys: allKeys,
    values: values,
    pairs: pairs,
    invert: invert,
    functions: functions,
    methods: functions,
    extend: extend,
    extendOwn: extendOwn,
    assign: extendOwn,
    defaults: defaults,
    create: create,
    clone: clone,
    tap: tap,
    get: get,
    has: has,
    mapObject: mapObject,
    identity: identity,
    constant: constant,
    noop: noop,
    toPath: toPath$1,
    property: property,
    propertyOf: propertyOf,
    matcher: matcher,
    matches: matcher,
    times: times,
    random: random,
    now: now,
    escape: _escape,
    unescape: _unescape,
    templateSettings: templateSettings,
    template: template,
    result: result,
    uniqueId: uniqueId,
    chain: chain,
    iteratee: iteratee,
    partial: partial,
    bind: bind,
    bindAll: bindAll,
    memoize: memoize,
    delay: delay,
    defer: defer,
    throttle: throttle,
    debounce: debounce,
    wrap: wrap,
    negate: negate,
    compose: compose,
    after: after,
    before: before,
    once: once,
    findKey: findKey,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    sortedIndex: sortedIndex,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    find: find,
    detect: find,
    findWhere: findWhere,
    each: each,
    forEach: each,
    map: map,
    collect: map,
    reduce: reduce,
    foldl: reduce,
    inject: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    filter: filter,
    select: filter,
    reject: reject,
    every: every,
    all: every,
    some: some,
    any: some,
    contains: contains,
    includes: contains,
    include: contains,
    invoke: invoke,
    pluck: pluck,
    where: where,
    max: max,
    min: min,
    shuffle: shuffle,
    sample: sample,
    sortBy: sortBy,
    groupBy: groupBy,
    indexBy: indexBy,
    countBy: countBy,
    partition: partition,
    toArray: toArray,
    size: size,
    pick: pick,
    omit: omit,
    first: first,
    head: first,
    take: first,
    initial: initial,
    last: last,
    rest: rest,
    tail: rest,
    drop: rest,
    compact: compact,
    flatten: flatten,
    without: without,
    uniq: uniq,
    unique: uniq,
    union: union,
    intersection: intersection,
    difference: difference,
    unzip: unzip,
    transpose: unzip,
    zip: zip,
    object: object,
    range: range,
    chunk: chunk,
    mixin: mixin,
    'default': _$1
  };

  // Default Export

  // Add all of the Underscore functions to the wrapper object.
  var _ = mixin(allExports);
  // Legacy Node.js API.
  _._ = _;

  return _;

})));

}(underscoreUmd));

var utf8 = {};

/*! https://mths.be/utf8js v3.0.0 by @mathias */

(function (exports) {
(function(root) {

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw Error(
				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
				' is not a scalar value'
			);
		}
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			checkScalarValue(codePoint);
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string) {
		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol() {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				checkScalarValue(codePoint);
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString) {
		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol()) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	root.version = '3.0.0';
	root.encode = utf8encode;
	root.decode = utf8decode;

}(exports));
}(utf8));

function addressFromPubkey(pubkey) {
    const pubkeyHash = ethers.utils.keccak256(pubkey.slice(1, 65));
    return ethers.utils.getAddress('0x' + pubkeyHash.substring(26));
}
function isValidHex(input) {
    let value = input;
    if (input.startsWith('0x') || input.startsWith('0X')) {
        value = input.substring(2);
    }
    if (value.length === 0 || value.length % 2 !== 0) {
        return false;
    }
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    return true;
}
function asUInt16BE$1(value) {
    const b = Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
function asUInt8(value) {
    const b = Buffer.alloc(1);
    b.writeUInt8(value, 0);
    return b;
}
function numberToHex(value) {
    if (underscoreUmd.exports.isNull(value) || underscoreUmd.exports.isUndefined(value)) {
        return value;
    }
    // @ts-ignore
    if (!isFinite(value) && !isHexStrict(value)) {
        throw new Error('Given input "' + value + '" is not a number.');
    }
    const numberBN = toBN(value);
    const result = numberBN.toString(16);
    return numberBN.lt(new BN$2(0)) ? '-0x' + result.substr(1) : '0x' + result;
}
function toBN(x) {
    if (isNaN(Number(x)))
        return new BN$2(0);
    if (x instanceof BN$2)
        return x;
    if (typeof x === 'string') {
        if (x.indexOf('0x') === 0 || x.indexOf('-0x') === 0) {
            return new BN$2(x.replace('0x', ''), 16);
        }
    }
    return new BN$2(x);
}
function isHexStrict(hex) {
    return (underscoreUmd.exports.isString(hex) || underscoreUmd.exports.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);
}
function isHex(value) {
    return underscoreUmd.exports.isString(value) && isHexStrict(value.toString());
}
function hexToNumber(value) {
    if (!value) {
        return value;
    }
    if (underscoreUmd.exports.isString(value) && !isHexStrict(value)) {
        throw new Error('Given value "' + value + '" is not a valid hex string.');
    }
    return toBN(value).toNumber();
}
function stringToNumber(value) {
    if (!underscoreUmd.exports.isString(value)) {
        throw new Error('Given value "' + value + '" is not a string.');
    }
    return toBN(value).toNumber();
}
function hexToNumberString(value) {
    if (underscoreUmd.exports.isString(value) && !isHexStrict(value)) {
        throw new Error('Given value "' + value + '" is not a valid hex string.');
    }
    return ethers.utils.hexValue(value);
}
function toChecksumAddress(address) {
    return ethers.utils.getAddress(address);
}
function bytesToHex(bytes) {
    const hexs = [];
    for (let i = 0; i < bytes.length; i++) {
        /* jshint ignore:start */
        hexs.push((bytes[i] >>> 4).toString(16));
        hexs.push((bytes[i] & 0xf).toString(16));
        /* jshint ignore:end */
    }
    return '0x' + hexs.join('');
}
function fromWei(value, unit) {
    return ethers.utils.formatUnits(value, unit);
}
function toUtf8$1(value) {
    return hexToUtf8(value);
}
function hexToUtf8(hexStr) {
    if (!isHexStrict(hexStr)) {
        throw new Error('The parameter "' + hexStr + '" must be a valid HEX string.');
    }
    let hex = hexStr;
    let str = '';
    let code = 0;
    hex = hex.replace(/^0x/i, '');
    // remove 00 padding from either side
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex.split('').reverse().join('');
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex.split('').reverse().join('');
    const l = hex.length;
    for (let i = 0; i < l; i += 2) {
        code = parseInt(hex.substr(i, 2), 16);
        // if (code !== 0) {
        str += String.fromCharCode(code);
        // }
    }
    return utf8.decode(str);
}
function parseArgsNum$1(num) {
    if (num instanceof BN$2) {
        return num.toNumber().toString();
    }
    else if (typeof num === 'string' && isHex(num)) {
        return hexToNumberString(num);
    }
    else {
        return num.toString();
    }
}

var dist = {};

var secp256k1Lib = {};

// This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

var BN$1 = BN$2;
var EC = require$$1.ec;

var ec = new EC('secp256k1');
var ecparams = ec.curve;

secp256k1Lib.privateKeyExport = function (privateKey, compressed) {
  var d = new BN$1(privateKey);
  if (d.ucmp(ecparams.n) >= 0) {
    throw new Error('couldn\'t export to DER format');
  }

  var point = ec.g.mul(d);
  return toPublicKey(point.getX(), point.getY(), compressed);
};

secp256k1Lib.privateKeyModInverse = function (privateKey) {
  var bn = new BN$1(privateKey);
  if (bn.ucmp(ecparams.n) >= 0 || bn.isZero()) {
    throw new Error('private key range is invalid');
  }

  return bn.invm(ecparams.n).toArrayLike(Buffer, 'be', 32);
};

secp256k1Lib.signatureImport = function (sigObj) {
  var r = new BN$1(sigObj.r);
  if (r.ucmp(ecparams.n) >= 0) {
    r = new BN$1(0);
  }

  var s = new BN$1(sigObj.s);
  if (s.ucmp(ecparams.n) >= 0) {
    s = new BN$1(0);
  }

  return Buffer.concat([r.toArrayLike(Buffer, 'be', 32), s.toArrayLike(Buffer, 'be', 32)]);
};

secp256k1Lib.ecdhUnsafe = function (publicKey, privateKey, compressed) {
  var point = ec.keyFromPublic(publicKey);

  var scalar = new BN$1(privateKey);
  if (scalar.ucmp(ecparams.n) >= 0 || scalar.isZero()) {
    throw new Error('scalar was invalid (zero or overflow)');
  }

  var shared = point.pub.mul(scalar);
  return toPublicKey(shared.getX(), shared.getY(), compressed);
};

var toPublicKey = function toPublicKey(x, y, compressed) {
  var publicKey = void 0;

  if (compressed) {
    publicKey = Buffer.alloc(33);
    publicKey[0] = y.isOdd() ? 0x03 : 0x02;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
  } else {
    publicKey = Buffer.alloc(65);
    publicKey[0] = 0x04;
    x.toArrayLike(Buffer, 'be', 32).copy(publicKey, 1);
    y.toArrayLike(Buffer, 'be', 32).copy(publicKey, 33);
  }

  return publicKey;
};

var der$1 = {};

// This file is imported from secp256k1 v3
// https://github.com/cryptocoinjs/secp256k1-node/blob/master/LICENSE

var EC_PRIVKEY_EXPORT_DER_COMPRESSED = Buffer.from([
// begin
0x30, 0x81, 0xd3, 0x02, 0x01, 0x01, 0x04, 0x20,
// private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
// middle
0xa0, 0x81, 0x85, 0x30, 0x81, 0x82, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x21, 0x02, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x24, 0x03, 0x22, 0x00,
// public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

var EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED = Buffer.from([
// begin
0x30, 0x82, 0x01, 0x13, 0x02, 0x01, 0x01, 0x04, 0x20,
// private key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
// middle
0xa0, 0x81, 0xa5, 0x30, 0x81, 0xa2, 0x02, 0x01, 0x01, 0x30, 0x2c, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x01, 0x01, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xfc, 0x2f, 0x30, 0x06, 0x04, 0x01, 0x00, 0x04, 0x01, 0x07, 0x04, 0x41, 0x04, 0x79, 0xbe, 0x66, 0x7e, 0xf9, 0xdc, 0xbb, 0xac, 0x55, 0xa0, 0x62, 0x95, 0xce, 0x87, 0x0b, 0x07, 0x02, 0x9b, 0xfc, 0xdb, 0x2d, 0xce, 0x28, 0xd9, 0x59, 0xf2, 0x81, 0x5b, 0x16, 0xf8, 0x17, 0x98, 0x48, 0x3a, 0xda, 0x77, 0x26, 0xa3, 0xc4, 0x65, 0x5d, 0xa4, 0xfb, 0xfc, 0x0e, 0x11, 0x08, 0xa8, 0xfd, 0x17, 0xb4, 0x48, 0xa6, 0x85, 0x54, 0x19, 0x9c, 0x47, 0xd0, 0x8f, 0xfb, 0x10, 0xd4, 0xb8, 0x02, 0x21, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe, 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b, 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41, 0x02, 0x01, 0x01, 0xa1, 0x44, 0x03, 0x42, 0x00,
// public key
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

der$1.privateKeyExport = function (privateKey, publicKey, compressed) {
  var result = Buffer.from(compressed ? EC_PRIVKEY_EXPORT_DER_COMPRESSED : EC_PRIVKEY_EXPORT_DER_UNCOMPRESSED);
  privateKey.copy(result, compressed ? 8 : 9);
  publicKey.copy(result, compressed ? 181 : 214);
  return result;
};

der$1.privateKeyImport = function (privateKey) {
  var length = privateKey.length;

  // sequence header
  var index = 0;
  if (length < index + 1 || privateKey[index] !== 0x30) return null;
  index += 1;

  // sequence length constructor
  if (length < index + 1 || !(privateKey[index] & 0x80)) return null;

  var lenb = privateKey[index] & 0x7f;
  index += 1;
  if (lenb < 1 || lenb > 2) return null;
  if (length < index + lenb) return null;

  // sequence length
  var len = privateKey[index + lenb - 1] | (lenb > 1 ? privateKey[index + lenb - 2] << 8 : 0);
  index += lenb;
  if (length < index + len) return null;

  // sequence element 0: version number (=1)
  if (length < index + 3 || privateKey[index] !== 0x02 || privateKey[index + 1] !== 0x01 || privateKey[index + 2] !== 0x01) {
    return null;
  }
  index += 3;

  // sequence element 1: octet string, up to 32 bytes
  if (length < index + 2 || privateKey[index] !== 0x04 || privateKey[index + 1] > 0x20 || length < index + 2 + privateKey[index + 1]) {
    return null;
  }

  return privateKey.slice(index + 2, index + 2 + privateKey[index + 1]);
};

der$1.signatureImportLax = function (signature) {
  var r = Buffer.alloc(32, 0);
  var s = Buffer.alloc(32, 0);

  var length = signature.length;
  var index = 0;

  // sequence tag byte
  if (signature[index++] !== 0x30) {
    return null;
  }

  // sequence length byte
  var lenbyte = signature[index++];
  if (lenbyte & 0x80) {
    index += lenbyte - 0x80;
    if (index > length) {
      return null;
    }
  }

  // sequence tag byte for r
  if (signature[index++] !== 0x02) {
    return null;
  }

  // length for r
  var rlen = signature[index++];
  if (rlen & 0x80) {
    lenbyte = rlen - 0x80;
    if (index + lenbyte > length) {
      return null;
    }
    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1) {}
    for (rlen = 0; lenbyte > 0; index += 1, lenbyte -= 1) {
      rlen = (rlen << 8) + signature[index];
    }
  }
  if (rlen > length - index) {
    return null;
  }
  var rindex = index;
  index += rlen;

  // sequence tag byte for s
  if (signature[index++] !== 0x02) {
    return null;
  }

  // length for s
  var slen = signature[index++];
  if (slen & 0x80) {
    lenbyte = slen - 0x80;
    if (index + lenbyte > length) {
      return null;
    }
    for (; lenbyte > 0 && signature[index] === 0x00; index += 1, lenbyte -= 1) {}
    for (slen = 0; lenbyte > 0; index += 1, lenbyte -= 1) {
      slen = (slen << 8) + signature[index];
    }
  }
  if (slen > length - index) {
    return null;
  }
  var sindex = index;
  index += slen;

  // ignore leading zeros in r
  for (; rlen > 0 && signature[rindex] === 0x00; rlen -= 1, rindex += 1) {}
  // copy r value
  if (rlen > 32) {
    return null;
  }
  var rvalue = signature.slice(rindex, rindex + rlen);
  rvalue.copy(r, 32 - rvalue.length);

  // ignore leading zeros in s
  for (; slen > 0 && signature[sindex] === 0x00; slen -= 1, sindex += 1) {}
  // copy s value
  if (slen > 32) {
    return null;
  }
  var svalue = signature.slice(sindex, sindex + slen);
  svalue.copy(s, 32 - svalue.length);

  return { r: r, s: s };
};

var secp256k1 = require$$0;

var secp256k1v3 = secp256k1Lib;
var der = der$1;

/**
 * Verify an ECDSA privateKey
 * @method privateKeyVerify
 * @param {Buffer} privateKey
 * @return {boolean}
 */
var privateKeyVerify = function privateKeyVerify(privateKey) {
  // secp256k1 v4 version throws when privateKey length is not 32
  if (privateKey.length !== 32) {
    return false;
  }

  return secp256k1.privateKeyVerify(Uint8Array.from(privateKey));
};

/**
 * Export a privateKey in DER format
 * @method privateKeyExport
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {boolean}
 */
var privateKeyExport = function privateKeyExport(privateKey, compressed) {
  // privateKeyExport method is not part of secp256k1 v4 package
  // this implementation is based on v3
  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  var publicKey = secp256k1v3.privateKeyExport(privateKey, compressed);

  return der.privateKeyExport(privateKey, publicKey, compressed);
};

/**
 * Import a privateKey in DER format
 * @method privateKeyImport
 * @param {Buffer} privateKey
 * @return {Buffer}
 */

var privateKeyImport = function privateKeyImport(privateKey) {
  // privateKeyImport method is not part of secp256k1 v4 package
  // this implementation is based on v3
  privateKey = der.privateKeyImport(privateKey);
  if (privateKey !== null && privateKey.length === 32 && privateKeyVerify(privateKey)) {
    return privateKey;
  }

  throw new Error("couldn't import from DER format");
};

/**
 * Negate a privateKey by subtracting it from the order of the curve's base point
 * @method privateKeyNegate
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var privateKeyNegate = function privateKeyNegate(privateKey) {
  return Buffer.from(secp256k1.privateKeyNegate(Uint8Array.from(privateKey)));
};

/**
 * Compute the inverse of a privateKey (modulo the order of the curve's base point).
 * @method privateKeyModInverse
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var privateKeyModInverse = function privateKeyModInverse(privateKey) {
  if (privateKey.length !== 32) {
    throw new Error('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.privateKeyModInverse(Uint8Array.from(privateKey)));
};

/**
 * Tweak a privateKey by adding tweak to it.
 * @method privateKeyTweakAdd
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */
var privateKeyTweakAdd = function privateKeyTweakAdd(privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakAdd(Uint8Array.from(privateKey), tweak));
};

/**
 * Tweak a privateKey by multiplying it by a tweak.
 * @method privateKeyTweakMul
 * @param {Buffer} privateKey
 * @param {Buffer} tweak
 * @return {Buffer}
 */
var privateKeyTweakMul = function privateKeyTweakMul(privateKey, tweak) {
  return Buffer.from(secp256k1.privateKeyTweakMul(Uint8Array.from(privateKey), Uint8Array.from(tweak)));
};

/**
 * Compute the public key for a privateKey.
 * @method publicKeyCreate
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyCreate = function publicKeyCreate(privateKey, compressed) {
  return Buffer.from(secp256k1.publicKeyCreate(Uint8Array.from(privateKey), compressed));
};

/**
 * Convert a publicKey to compressed or uncompressed form.
 * @method publicKeyConvert
 * @param {Buffer} publicKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyConvert = function publicKeyConvert(publicKey, compressed) {
  return Buffer.from(secp256k1.publicKeyConvert(Uint8Array.from(publicKey), compressed));
};

/**
 * Verify an ECDSA publicKey.
 * @method publicKeyVerify
 * @param {Buffer} publicKey
 * @return {boolean}
 */
var publicKeyVerify = function publicKeyVerify(publicKey) {
  // secp256k1 v4 version throws when publicKey length is not 33 or 65
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    return false;
  }

  return secp256k1.publicKeyVerify(Uint8Array.from(publicKey));
};

/**
 * Tweak a publicKey by adding tweak times the generator to it.
 * @method publicKeyTweakAdd
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyTweakAdd = function publicKeyTweakAdd(publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakAdd(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};

/**
 * Tweak a publicKey by multiplying it by a tweak value
 * @method publicKeyTweakMul
 * @param {Buffer} publicKey
 * @param {Buffer} tweak
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyTweakMul = function publicKeyTweakMul(publicKey, tweak, compressed) {
  return Buffer.from(secp256k1.publicKeyTweakMul(Uint8Array.from(publicKey), Uint8Array.from(tweak), compressed));
};

/**
 * Add a given publicKeys together.
 * @method publicKeyCombine
 * @param {Array<Buffer>} publicKeys
 * @param {boolean} compressed
 * @return {Buffer}
 */
var publicKeyCombine = function publicKeyCombine(publicKeys, compressed) {
  var keys = [];
  publicKeys.forEach(function (publicKey) {
    keys.push(Uint8Array.from(publicKey));
  });

  return Buffer.from(secp256k1.publicKeyCombine(keys, compressed));
};

/**
 * Convert a signature to a normalized lower-S form.
 * @method signatureNormalize
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureNormalize = function signatureNormalize(signature) {
  return Buffer.from(secp256k1.signatureNormalize(Uint8Array.from(signature)));
};

/**
 * Serialize an ECDSA signature in DER format.
 * @method signatureExport
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureExport = function signatureExport(signature) {
  return Buffer.from(secp256k1.signatureExport(Uint8Array.from(signature)));
};

/**
 * Parse a DER ECDSA signature (follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImport
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureImport = function signatureImport(signature) {
  return Buffer.from(secp256k1.signatureImport(Uint8Array.from(signature)));
};

/**
 * Parse a DER ECDSA signature (not follow by [BIP66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki)).
 * @method signatureImportLax
 * @param {Buffer} signature
 * @return {Buffer}
 */
var signatureImportLax = function signatureImportLax(signature) {
  // signatureImportLax method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure that signature is greater than 0
  if (signature.length === 0) {
    throw new RangeError('signature length is invalid');
  }

  var sigObj = der.signatureImportLax(signature);
  if (sigObj === null) {
    throw new Error("couldn't parse DER signature");
  }

  return secp256k1v3.signatureImport(sigObj);
};

/**
 * Create an ECDSA signature. Always return low-S signature.
 * @method sign
 * @param {Buffer} message
 * @param {Buffer} privateKey
 * @param {Object} options
 * @return {Buffer}
 */
var sign = function sign(message, privateKey, options) {
  if (options === null) {
    throw new TypeError('options should be an Object');
  }

  var signOptions = void 0;

  if (options) {
    signOptions = {};

    if (options.data === null) {
      throw new TypeError('options.data should be a Buffer');
    }

    if (options.data) {
      // validate option.data length
      if (options.data.length !== 32) {
        throw new RangeError('options.data length is invalid');
      }

      signOptions.data = new Uint8Array(options.data);
    }

    if (options.noncefn === null) {
      throw new TypeError('options.noncefn should be a Function');
    }

    if (options.noncefn) {
      //  convert option.noncefn function signature
      signOptions.noncefn = function (message, privateKey, algo, data, attempt) {
        var bufferAlgo = algo != null ? Buffer.from(algo) : null;
        var bufferData = data != null ? Buffer.from(data) : null;

        var buffer = Buffer.from('');

        if (options.noncefn) {
          buffer = options.noncefn(Buffer.from(message), Buffer.from(privateKey), bufferAlgo, bufferData, attempt);
        }

        return Uint8Array.from(buffer);
      };
    }
  }

  var sig = secp256k1.ecdsaSign(Uint8Array.from(message), Uint8Array.from(privateKey), signOptions);

  return {
    signature: Buffer.from(sig.signature),
    recovery: sig.recid
  };
};

/**
 * Verify an ECDSA signature.
 * @method verify
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Buffer} publicKey
 * @return {boolean}
 */
var verify = function verify(message, signature, publicKey) {
  // note: secp256k1 v4 verify method has a different argument order
  return secp256k1.ecdsaVerify(Uint8Array.from(signature), Uint8Array.from(message), publicKey);
};

/**
 * Recover an ECDSA public key from a signature.
 * @method recover
 * @param {Buffer} message
 * @param {Buffer} signature
 * @param {Number} recid
 * @param {boolean} compressed
 * @return {Buffer}
 */
var recover = function recover(message, signature, recid, compressed) {
  // note: secp256k1 v4 recover method has a different argument order
  return Buffer.from(secp256k1.ecdsaRecover(Uint8Array.from(signature), recid, Uint8Array.from(message), compressed));
};

/**
 * Compute an EC Diffie-Hellman secret and applied sha256 to compressed public key.
 * @method ecdh
 * @param {Buffer} publicKey
 * @param {Buffer} privateKey
 * @return {Buffer}
 */
var ecdh = function ecdh(publicKey, privateKey) {
  // note: secp256k1 v3 doesn't allow optional parameter
  return Buffer.from(secp256k1.ecdh(Uint8Array.from(publicKey), Uint8Array.from(privateKey), {}));
};

/**
 * Compute an EC Diffie-Hellman secret and return public key as result
 * @method ecdhUnsafe
 * @param {Buffer} publicKey
 * @param {Buffer} privateKey
 * @param {boolean} compressed
 * @return {Buffer}
 */
var ecdhUnsafe = function ecdhUnsafe(publicKey, privateKey, compressed) {
  // ecdhUnsafe method is not part of secp256k1 v4 package
  // this implementation is based on v3
  // ensure valid publicKey length
  if (publicKey.length !== 33 && publicKey.length !== 65) {
    throw new RangeError('public key length is invalid');
  }

  // ensure valid privateKey length
  if (privateKey.length !== 32) {
    throw new RangeError('private key length is invalid');
  }

  return Buffer.from(secp256k1v3.ecdhUnsafe(Uint8Array.from(publicKey), Uint8Array.from(privateKey), compressed));
};

var secp256k1Adapter = {
  privateKeyVerify: privateKeyVerify,
  privateKeyExport: privateKeyExport,
  privateKeyImport: privateKeyImport,
  privateKeyNegate: privateKeyNegate,
  privateKeyModInverse: privateKeyModInverse,
  privateKeyTweakAdd: privateKeyTweakAdd,
  privateKeyTweakMul: privateKeyTweakMul,

  publicKeyCreate: publicKeyCreate,
  publicKeyConvert: publicKeyConvert,
  publicKeyVerify: publicKeyVerify,
  publicKeyTweakAdd: publicKeyTweakAdd,
  publicKeyTweakMul: publicKeyTweakMul,
  publicKeyCombine: publicKeyCombine,

  signatureNormalize: signatureNormalize,
  signatureExport: signatureExport,
  signatureImport: signatureImport,
  signatureImportLax: signatureImportLax,

  sign: sign,
  verify: verify,
  recover: recover,

  ecdh: ecdh,
  ecdhUnsafe: ecdhUnsafe
};

var assert$1 = {exports: {}};

var objectAssign = require$$0$1;

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (commonjsGlobal.Buffer && typeof commonjsGlobal.Buffer.isBuffer === 'function') {
    return commonjsGlobal.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require$$1$1;
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof commonjsGlobal.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = assert$1.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

var createHash = require$$0$2.createHash;

var isHexPrefixed = require$$0$3;
var stripHexPrefix = require$$1$2;

/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
function padToEven(value) {
  var a = value; // eslint-disable-line

  if (typeof a !== 'string') {
    throw new Error('[ethjs-util] while padding to even, value must be string, is currently ' + typeof a + ', while padToEven.');
  }

  if (a.length % 2) {
    a = '0' + a;
  }

  return a;
}

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex(i) {
  var hex = i.toString(16); // eslint-disable-line

  return '0x' + hex;
}

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer(i) {
  var hex = intToHex(i);

  return new Buffer(padToEven(hex.slice(2)), 'hex');
}

/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */
function getBinarySize(str) {
  if (typeof str !== 'string') {
    throw new Error('[ethjs-util] while getting binary size, method getBinarySize requires input \'str\' to be type String, got \'' + typeof str + '\'.');
  }

  return Buffer.byteLength(str, 'utf8');
}

/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */
function arrayContainsArray(superset, subset, some) {
  if (Array.isArray(superset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'superset\' to be an array got type \'' + typeof superset + '\'');
  }
  if (Array.isArray(subset) !== true) {
    throw new Error('[ethjs-util] method arrayContainsArray requires input \'subset\' to be an array got type \'' + typeof subset + '\'');
  }

  return subset[Boolean(some) && 'some' || 'every'](function (value) {
    return superset.indexOf(value) >= 0;
  });
}

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toUtf8(hex) {
  var bufferValue = new Buffer(padToEven(stripHexPrefix(hex).replace(/^0+|0+$/g, '')), 'hex');

  return bufferValue.toString('utf8');
}

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toAscii(hex) {
  var str = ''; // eslint-disable-line
  var i = 0,
      l = hex.length; // eslint-disable-line

  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }

  for (; i < l; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
}

/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromUtf8(stringValue) {
  var str = new Buffer(stringValue, 'utf8');

  return '0x' + padToEven(str.toString('hex')).replace(/^0+|0+$/g, '');
}

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromAscii(stringValue) {
  var hex = ''; // eslint-disable-line
  for (var i = 0; i < stringValue.length; i++) {
    // eslint-disable-line
    var code = stringValue.charCodeAt(i);
    var n = code.toString(16);
    hex += n.length < 2 ? '0' + n : n;
  }

  return '0x' + hex;
}

/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */
function getKeys(params, key, allowEmpty) {
  if (!Array.isArray(params)) {
    throw new Error('[ethjs-util] method getKeys expecting type Array as \'params\' input, got \'' + typeof params + '\'');
  }
  if (typeof key !== 'string') {
    throw new Error('[ethjs-util] method getKeys expecting type String for input \'key\' got \'' + typeof key + '\'.');
  }

  var result = []; // eslint-disable-line

  for (var i = 0; i < params.length; i++) {
    // eslint-disable-line
    var value = params[i][key]; // eslint-disable-line
    if (allowEmpty && !value) {
      value = '';
    } else if (typeof value !== 'string') {
      throw new Error('invalid abi');
    }
    result.push(value);
  }

  return result;
}

/**
 * Is the string a hex string.
 *
 * @method check if string is hex string of specific length
 * @param {String} value
 * @param {Number} length
 * @returns {Boolean} output the string is a hex string
 */
function isHexString(value, length) {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

var lib$1 = {
  arrayContainsArray: arrayContainsArray,
  intToBuffer: intToBuffer,
  getBinarySize: getBinarySize,
  isHexPrefixed: isHexPrefixed,
  stripHexPrefix: stripHexPrefix,
  padToEven: padToEven,
  intToHex: intToHex,
  fromAscii: fromAscii,
  fromUtf8: fromUtf8,
  toAscii: toAscii,
  toUtf8: toUtf8,
  getKeys: getKeys,
  isHexString: isHexString
};

(function (exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require$$0$4,
    keccak224 = _require.keccak224,
    keccak384 = _require.keccak384,
    k256 = _require.keccak256,
    keccak512 = _require.keccak512;

var secp256k1 = secp256k1Adapter;
var assert = assert$1.exports;
var rlp = require$$3__default;
var BN = BN$2;
var createHash$1 = createHash;
var Buffer = require$$6.Buffer;
Object.assign(exports, lib$1);

/**
 * the max integer that this VM can handle (a ```BN```)
 * @var {BN} MAX_INTEGER
 */
exports.MAX_INTEGER = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16);

/**
 * 2^256 (a ```BN```)
 * @var {BN} TWO_POW256
 */
exports.TWO_POW256 = new BN('10000000000000000000000000000000000000000000000000000000000000000', 16);

/**
 * Keccak-256 hash of null (a ```String```)
 * @var {String} KECCAK256_NULL_S
 */
exports.KECCAK256_NULL_S = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
exports.SHA3_NULL_S = exports.KECCAK256_NULL_S;

/**
 * Keccak-256 hash of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_NULL
 */
exports.KECCAK256_NULL = Buffer.from(exports.KECCAK256_NULL_S, 'hex');
exports.SHA3_NULL = exports.KECCAK256_NULL;

/**
 * Keccak-256 of an RLP of an empty array (a ```String```)
 * @var {String} KECCAK256_RLP_ARRAY_S
 */
exports.KECCAK256_RLP_ARRAY_S = '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347';
exports.SHA3_RLP_ARRAY_S = exports.KECCAK256_RLP_ARRAY_S;

/**
 * Keccak-256 of an RLP of an empty array (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP_ARRAY
 */
exports.KECCAK256_RLP_ARRAY = Buffer.from(exports.KECCAK256_RLP_ARRAY_S, 'hex');
exports.SHA3_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY;

/**
 * Keccak-256 hash of the RLP of null  (a ```String```)
 * @var {String} KECCAK256_RLP_S
 */
exports.KECCAK256_RLP_S = '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
exports.SHA3_RLP_S = exports.KECCAK256_RLP_S;

/**
 * Keccak-256 hash of the RLP of null (a ```Buffer```)
 * @var {Buffer} KECCAK256_RLP
 */
exports.KECCAK256_RLP = Buffer.from(exports.KECCAK256_RLP_S, 'hex');
exports.SHA3_RLP = exports.KECCAK256_RLP;

/**
 * [`BN`](https://github.com/indutny/bn.js)
 * @var {Function}
 */
exports.BN = BN;

/**
 * [`rlp`](https://github.com/ethereumjs/rlp)
 * @var {Function}
 */
exports.rlp = rlp;

/**
 * [`secp256k1`](https://github.com/cryptocoinjs/secp256k1-node/)
 * @var {Object}
 */
exports.secp256k1 = secp256k1;

/**
 * Returns a buffer filled with 0s
 * @method zeros
 * @param {Number} bytes  the number of bytes the buffer should be
 * @return {Buffer}
 */
exports.zeros = function (bytes) {
  return Buffer.allocUnsafe(bytes).fill(0);
};

/**
  * Returns a zero address
  * @method zeroAddress
  * @return {String}
  */
exports.zeroAddress = function () {
  var addressLength = 20;
  var zeroAddress = exports.zeros(addressLength);
  return exports.bufferToHex(zeroAddress);
};

/**
 * Left Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @method lsetLength
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @param {Boolean} [right=false] whether to start padding form the left or right
 * @return {Buffer|Array}
 */
exports.setLengthLeft = exports.setLength = function (msg, length, right) {
  var buf = exports.zeros(length);
  msg = exports.toBuffer(msg);
  if (right) {
    if (msg.length < length) {
      msg.copy(buf);
      return buf;
    }
    return msg.slice(0, length);
  } else {
    if (msg.length < length) {
      msg.copy(buf, length - msg.length);
      return buf;
    }
    return msg.slice(-length);
  }
};

/**
 * Right Pads an `Array` or `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param {Buffer|Array} msg the value to pad
 * @param {Number} length the number of bytes the output should be
 * @return {Buffer|Array}
 */
exports.setLengthRight = function (msg, length) {
  return exports.setLength(msg, length, true);
};

/**
 * Trims leading zeros from a `Buffer` or an `Array`
 * @param {Buffer|Array|String} a
 * @return {Buffer|Array|String}
 */
exports.unpad = exports.stripZeros = function (a) {
  a = exports.stripHexPrefix(a);
  var first = a[0];
  while (a.length > 0 && first.toString() === '0') {
    a = a.slice(1);
    first = a[0];
  }
  return a;
};
/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
exports.toBuffer = function (v) {
  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (exports.isHexString(v)) {
        v = Buffer.from(exports.padToEven(exports.stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = exports.intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (BN.isBN(v)) {
      v = v.toArrayLike(Buffer);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else {
      throw new Error('invalid type');
    }
  }
  return v;
};

/**
 * Converts a `Buffer` to a `Number`
 * @param {Buffer} buf
 * @return {Number}
 * @throws If the input number exceeds 53 bits.
 */
exports.bufferToInt = function (buf) {
  return new BN(exports.toBuffer(buf)).toNumber();
};

/**
 * Converts a `Buffer` into a hex `String`
 * @param {Buffer} buf
 * @return {String}
 */
exports.bufferToHex = function (buf) {
  buf = exports.toBuffer(buf);
  return '0x' + buf.toString('hex');
};

/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param {Buffer} num
 * @return {BN}
 */
exports.fromSigned = function (num) {
  return new BN(num).fromTwos(256);
};

/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param {BN} num
 * @return {Buffer}
 */
exports.toUnsigned = function (num) {
  return Buffer.from(num.toTwos(256).toArray());
};

/**
 * Creates Keccak hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the Keccak width
 * @return {Buffer}
 */
exports.keccak = function (a, bits) {
  a = exports.toBuffer(a);
  if (!bits) bits = 256;

  switch (bits) {
    case 224:
      {
        return keccak224(a);
      }
    case 256:
      {
        return k256(a);
      }
    case 384:
      {
        return keccak384(a);
      }
    case 512:
      {
        return keccak512(a);
      }
    default:
      {
        throw new Error('Invald algorithm: keccak' + bits);
      }
  }
};

/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256)
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.keccak256 = function (a) {
  return exports.keccak(a);
};

/**
 * Creates SHA-3 (Keccak) hash of the input [OBSOLETE]
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Number} [bits=256] the SHA-3 width
 * @return {Buffer}
 */
exports.sha3 = exports.keccak;

/**
 * Creates SHA256 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.sha256 = function (a) {
  a = exports.toBuffer(a);
  return createHash$1('sha256').update(a).digest();
};

/**
 * Creates RIPEMD160 hash of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @param {Boolean} padded whether it should be padded to 256 bits or not
 * @return {Buffer}
 */
exports.ripemd160 = function (a, padded) {
  a = exports.toBuffer(a);
  var hash = createHash$1('rmd160').update(a).digest();
  if (padded === true) {
    return exports.setLength(hash, 32);
  } else {
    return hash;
  }
};

/**
 * Creates SHA-3 hash of the RLP encoded version of the input
 * @param {Buffer|Array|String|Number} a the input data
 * @return {Buffer}
 */
exports.rlphash = function (a) {
  return exports.keccak(rlp.encode(a));
};

/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 * @param {Buffer} privateKey
 * @return {Boolean}
 */
exports.isValidPrivate = function (privateKey) {
  return secp256k1.privateKeyVerify(privateKey);
};

/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param {Buffer} publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Boolean}
 */
exports.isValidPublic = function (publicKey, sanitize) {
  if (publicKey.length === 64) {
    // Convert to SEC1 for secp256k1
    return secp256k1.publicKeyVerify(Buffer.concat([Buffer.from([4]), publicKey]));
  }

  if (!sanitize) {
    return false;
  }

  return secp256k1.publicKeyVerify(publicKey);
};

/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param {Buffer} pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param {Boolean} [sanitize=false] Accept public keys in other formats
 * @return {Buffer}
 */
exports.pubToAddress = exports.publicToAddress = function (pubKey, sanitize) {
  pubKey = exports.toBuffer(pubKey);
  if (sanitize && pubKey.length !== 64) {
    pubKey = secp256k1.publicKeyConvert(pubKey, false).slice(1);
  }
  assert(pubKey.length === 64);
  // Only take the lower 160bits of the hash
  return exports.keccak(pubKey).slice(-20);
};

/**
 * Returns the ethereum public key of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
var privateToPublic = exports.privateToPublic = function (privateKey) {
  privateKey = exports.toBuffer(privateKey);
  // skip the type flag and use the X, Y points
  return secp256k1.publicKeyCreate(privateKey, false).slice(1);
};

/**
 * Converts a public key to the Ethereum format.
 * @param {Buffer} publicKey
 * @return {Buffer}
 */
exports.importPublic = function (publicKey) {
  publicKey = exports.toBuffer(publicKey);
  if (publicKey.length !== 64) {
    publicKey = secp256k1.publicKeyConvert(publicKey, false).slice(1);
  }
  return publicKey;
};

/**
 * ECDSA sign
 * @param {Buffer} msgHash
 * @param {Buffer} privateKey
 * @return {Object}
 */
exports.ecsign = function (msgHash, privateKey) {
  var sig = secp256k1.sign(msgHash, privateKey);

  var ret = {};
  ret.r = sig.signature.slice(0, 32);
  ret.s = sig.signature.slice(32, 64);
  ret.v = sig.recovery + 27;
  return ret;
};

/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 * @param message
 * @returns {Buffer} hash
 */
exports.hashPersonalMessage = function (message) {
  var prefix = exports.toBuffer('\x19Ethereum Signed Message:\n' + message.length.toString());
  return exports.keccak(Buffer.concat([prefix, message]));
};

/**
 * ECDSA public key recovery from signature
 * @param {Buffer} msgHash
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {Buffer} publicKey
 */
exports.ecrecover = function (msgHash, v, r, s) {
  var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64);
  var recovery = v - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};

/**
 * Convert signature parameters into the format of `eth_sign` RPC method
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {String} sig
 */
exports.toRpcSig = function (v, r, s) {
  // NOTE: with potential introduction of chainId this might need to be updated
  if (v !== 27 && v !== 28) {
    throw new Error('Invalid recovery id');
  }

  // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin
  // FIXME: this might change in the future - https://github.com/ethereum/go-ethereum/issues/2053
  return exports.bufferToHex(Buffer.concat([exports.setLengthLeft(r, 32), exports.setLengthLeft(s, 32), exports.toBuffer(v - 27)]));
};

/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 * @param {String} sig
 * @return {Object}
 */
exports.fromRpcSig = function (sig) {
  sig = exports.toBuffer(sig);

  // NOTE: with potential introduction of chainId this might need to be updated
  if (sig.length !== 65) {
    throw new Error('Invalid signature length');
  }

  var v = sig[64];
  // support both versions of `eth_sign` responses
  if (v < 27) {
    v += 27;
  }

  return {
    v: v,
    r: sig.slice(0, 32),
    s: sig.slice(32, 64)
  };
};

/**
 * Returns the ethereum address of a given private key
 * @param {Buffer} privateKey A private key must be 256 bits wide
 * @return {Buffer}
 */
exports.privateToAddress = function (privateKey) {
  return exports.publicToAddress(privateToPublic(privateKey));
};

/**
 * Checks if the address is a valid. Accepts checksummed addresses too
 * @param {String} address
 * @return {Boolean}
 */
exports.isValidAddress = function (address) {
  return (/^0x[0-9a-fA-F]{40}$/.test(address)
  );
};

/**
  * Checks if a given address is a zero address
  * @method isZeroAddress
  * @param {String} address
  * @return {Boolean}
  */
exports.isZeroAddress = function (address) {
  var zeroAddress = exports.zeroAddress();
  return zeroAddress === exports.addHexPrefix(address);
};

/**
 * Returns a checksummed address
 * @param {String} address
 * @return {String}
 */
exports.toChecksumAddress = function (address) {
  address = exports.stripHexPrefix(address).toLowerCase();
  var hash = exports.keccak(address).toString('hex');
  var ret = '0x';

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
};

/**
 * Checks if the address is a valid checksummed address
 * @param {Buffer} address
 * @return {Boolean}
 */
exports.isValidChecksumAddress = function (address) {
  return exports.isValidAddress(address) && exports.toChecksumAddress(address) === address;
};

/**
 * Generates an address of a newly created contract
 * @param {Buffer} from the address which is creating this new address
 * @param {Buffer} nonce the nonce of the from account
 * @return {Buffer}
 */
exports.generateAddress = function (from, nonce) {
  from = exports.toBuffer(from);
  nonce = new BN(nonce);

  if (nonce.isZero()) {
    // in RLP we want to encode null in the case of zero nonce
    // read the RLP documentation for an answer if you dare
    nonce = null;
  } else {
    nonce = Buffer.from(nonce.toArray());
  }

  // Only take the lower 160bits of the hash
  return exports.rlphash([from, nonce]).slice(-20);
};

/**
 * Returns true if the supplied address belongs to a precompiled account (Byzantium)
 * @param {Buffer|String} address
 * @return {Boolean}
 */
exports.isPrecompiled = function (address) {
  var a = exports.unpad(address);
  return a.length === 1 && a[0] >= 1 && a[0] <= 8;
};

/**
 * Adds "0x" to a given `String` if it does not already start with "0x"
 * @param {String} str
 * @return {String}
 */
exports.addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str;
  }

  return exports.isHexPrefixed(str) ? str : '0x' + str;
};

/**
 * Validate ECDSA signature
 * @method isValidSignature
 * @param {Buffer} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @param {Boolean} [homestead=true]
 * @return {Boolean}
 */

exports.isValidSignature = function (v, r, s, homestead) {
  var SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
  var SECP256K1_N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);

  if (r.length !== 32 || s.length !== 32) {
    return false;
  }

  if (v !== 27 && v !== 28) {
    return false;
  }

  r = new BN(r);
  s = new BN(s);

  if (r.isZero() || r.gt(SECP256K1_N) || s.isZero() || s.gt(SECP256K1_N)) {
    return false;
  }

  if (homestead === false && new BN(s).cmp(SECP256K1_N_DIV_2) === 1) {
    return false;
  }

  return true;
};

/**
 * Converts a `Buffer` or `Array` to JSON
 * @param {Buffer|Array} ba
 * @return {Array|String|null}
 */
exports.baToJSON = function (ba) {
  if (Buffer.isBuffer(ba)) {
    return '0x' + ba.toString('hex');
  } else if (ba instanceof Array) {
    var array = [];
    for (var i = 0; i < ba.length; i++) {
      array.push(exports.baToJSON(ba[i]));
    }
    return array;
  }
};

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param {*} data data to be validated against the definitions
 */
exports.defineProperties = function (self, fields, data) {
  self.raw = [];
  self._fields = [];

  // attach the `toJSON`
  self.toJSON = function (label) {
    if (label) {
      var obj = {};
      self._fields.forEach(function (field) {
        obj[field] = '0x' + self[field].toString('hex');
      });
      return obj;
    }
    return exports.baToJSON(this.raw);
  };

  self.serialize = function serialize() {
    return rlp.encode(self.raw);
  };

  fields.forEach(function (field, i) {
    self._fields.push(field.name);
    function getter() {
      return self.raw[i];
    }
    function setter(v) {
      v = exports.toBuffer(v);

      if (v.toString('hex') === '00' && !field.allowZero) {
        v = Buffer.allocUnsafe(0);
      }

      if (field.allowLess && field.length) {
        v = exports.stripZeros(v);
        assert(field.length >= v.length, 'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
      } else if (!(field.allowZero && v.length === 0) && field.length) {
        assert(field.length === v.length, 'The field ' + field.name + ' must have byte length of ' + field.length);
      }

      self.raw[i] = v;
    }

    Object.defineProperty(self, field.name, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter
    });

    if (field.default) {
      self[field.name] = field.default;
    }

    // attach alias
    if (field.alias) {
      Object.defineProperty(self, field.alias, {
        enumerable: false,
        configurable: true,
        set: setter,
        get: getter
      });
    }
  });

  // if the constuctor is passed data
  if (data) {
    if (typeof data === 'string') {
      data = Buffer.from(exports.stripHexPrefix(data), 'hex');
    }

    if (Buffer.isBuffer(data)) {
      data = rlp.decode(data);
    }

    if (Array.isArray(data)) {
      if (data.length > self._fields.length) {
        throw new Error('wrong number of fields in data');
      }

      // make sure all the items are buffers
      data.forEach(function (d, i) {
        self[self._fields[i]] = exports.toBuffer(d);
      });
    } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      var keys = Object.keys(data);
      fields.forEach(function (field) {
        if (keys.indexOf(field.name) !== -1) self[field.name] = data[field.name];
        if (keys.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
      });
    } else {
      throw new Error('invalid data');
    }
  }
};
}(dist));

/* eslint-disable no-useless-escape */

const utils = require$$0$5;
const BN = BN$2;

var ABI = function () {
};

// Convert from short to canonical names
// FIXME: optimise or make this nicer?
function elementaryName (name) {
  if (name.startsWith('int[')) {
    return 'int256' + name.slice(3)
  } else if (name === 'int') {
    return 'int256'
  } else if (name.startsWith('uint[')) {
    return 'uint256' + name.slice(4)
  } else if (name === 'uint') {
    return 'uint256'
  } else if (name.startsWith('fixed[')) {
    return 'fixed128x128' + name.slice(5)
  } else if (name === 'fixed') {
    return 'fixed128x128'
  } else if (name.startsWith('ufixed[')) {
    return 'ufixed128x128' + name.slice(6)
  } else if (name === 'ufixed') {
    return 'ufixed128x128'
  }
  return name
}

ABI.eventID = function (name, types) {
  // FIXME: use node.js util.format?
  var sig = name + '(' + types.map(elementaryName).join(',') + ')';
  return utils.keccak256(Buffer.from(sig))
};

ABI.methodID = function (name, types) {
  return ABI.eventID(name, types).slice(0, 4)
};

// Parse N from type<N>
function parseTypeN (type) {
  return parseInt(/^\D+(\d+)$/.exec(type)[1], 10)
}

// Parse N,M from type<N>x<M>
function parseTypeNxM (type) {
  var tmp = /^\D+(\d+)x(\d+)$/.exec(type);
  return [ parseInt(tmp[1], 10), parseInt(tmp[2], 10) ]
}

// Parse N in type[<N>] where "type" can itself be an array type.
function parseTypeArray (type) {
  var tmp = type.match(/(.*)\[(.*?)\]$/);
  if (tmp) {
    return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10)
  }
  return null
}

function parseNumber (arg) {
  var type = typeof arg;
  if (type === 'string') {
    if (utils.isHexPrefixed(arg)) {
      return new BN(utils.stripHexPrefix(arg), 16)
    } else {
      return new BN(arg, 10)
    }
  } else if (type === 'number') {
    return new BN(arg)
  } else if (arg.toArray) {
    // assume this is a BN for the moment, replace with BN.isBN soon
    return arg
  } else {
    throw new Error('Argument is not a number')
  }
}

// someMethod(bytes,uint)
// someMethod(bytes,uint):(boolean)
function parseSignature (sig) {
  var tmp = /^(\w+)\((.*)\)$/.exec(sig);

  if (tmp.length !== 3) {
    throw new Error('Invalid method signature')
  }

  var args = /^(.+)\):\((.+)$/.exec(tmp[2]);

  if (args !== null && args.length === 3) {
    return {
      method: tmp[1],
      args: args[1].split(','),
      retargs: args[2].split(',')
    }
  } else {
    var params = tmp[2].split(',');
    if (params.length === 1 && params[0] === '') {
      // Special-case (possibly naive) fixup for functions that take no arguments.
      // TODO: special cases are always bad, but this makes the function return
      // match what the calling functions expect
      params = [];
    }
    return {
      method: tmp[1],
      args: params
    }
  }
}

// Encodes a single item (can be dynamic array)
// @returns: Buffer
function encodeSingle (type, arg) {
  var size, num, ret, i;

  if (type === 'address') {
    return encodeSingle('uint160', parseNumber(arg))
  } else if (type === 'bool') {
    return encodeSingle('uint8', arg ? 1 : 0)
  } else if (type === 'string') {
    return encodeSingle('bytes', Buffer.from(arg, 'utf8'))
  } else if (isArray(type)) {
    // this part handles fixed-length ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    if (typeof arg.length === 'undefined') {
      throw new Error('Not an array?')
    }
    size = parseTypeArray(type);
    if (size !== 'dynamic' && size !== 0 && arg.length > size) {
      throw new Error('Elements exceed array size: ' + size)
    }
    ret = [];
    type = type.slice(0, type.lastIndexOf('['));
    if (typeof arg === 'string') {
      arg = JSON.parse(arg);
    }
    for (i in arg) {
      ret.push(encodeSingle(type, arg[i]));
    }
    if (size === 'dynamic') {
      var length = encodeSingle('uint256', arg.length);
      ret.unshift(length);
    }
    return Buffer.concat(ret)
  } else if (type === 'bytes') {
    arg = Buffer.from(arg);

    ret = Buffer.concat([ encodeSingle('uint256', arg.length), arg ]);

    if ((arg.length % 32) !== 0) {
      ret = Buffer.concat([ ret, utils.zeros(32 - (arg.length % 32)) ]);
    }

    return ret
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);
    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size)
    }

    return utils.setLengthRight(arg, 32)
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid uint<N> width: ' + size)
    }

    num = parseNumber(arg);
    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    if (num < 0) {
      throw new Error('Supplied uint is negative')
    }

    return num.toArrayLike(Buffer, 'be', 32)
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid int<N> width: ' + size)
    }

    num = parseNumber(arg);
    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    return num.toTwos(256).toArrayLike(Buffer, 'be', 32)
  } else if (type.startsWith('ufixed')) {
    size = parseTypeNxM(type);

    num = parseNumber(arg);

    if (num < 0) {
      throw new Error('Supplied ufixed is negative')
    }

    return encodeSingle('uint256', num.mul(new BN(2).pow(new BN(size[1]))))
  } else if (type.startsWith('fixed')) {
    size = parseTypeNxM(type);

    return encodeSingle('int256', parseNumber(arg).mul(new BN(2).pow(new BN(size[1]))))
  }

  throw new Error('Unsupported or invalid type: ' + type)
}

// Decodes a single item (can be dynamic array)
// @returns: array
// FIXME: this method will need a lot of attention at checking limits and validation
function decodeSingle (parsedType, data, offset) {
  if (typeof parsedType === 'string') {
    parsedType = parseType(parsedType);
  }
  var size, num, ret, i;

  if (parsedType.name === 'address') {
    return decodeSingle(parsedType.rawType, data, offset).toArrayLike(Buffer, 'be', 20).toString('hex')
  } else if (parsedType.name === 'bool') {
    return decodeSingle(parsedType.rawType, data, offset).toString() === new BN(1).toString()
  } else if (parsedType.name === 'string') {
    var bytes = decodeSingle(parsedType.rawType, data, offset);
    return Buffer.from(bytes, 'utf8').toString()
  } else if (parsedType.isArray) {
    // this part handles fixed-length arrays ([2]) and variable length ([]) arrays
    // NOTE: we catch here all calls to arrays, that simplifies the rest
    ret = [];
    size = parsedType.size;

    if (parsedType.size === 'dynamic') {
      offset = decodeSingle('uint256', data, offset).toNumber();
      size = decodeSingle('uint256', data, offset).toNumber();
      offset = offset + 32;
    }
    for (i = 0; i < size; i++) {
      var decoded = decodeSingle(parsedType.subArray, data, offset);
      ret.push(decoded);
      offset += parsedType.subArray.memoryUsage;
    }
    return ret
  } else if (parsedType.name === 'bytes') {
    offset = decodeSingle('uint256', data, offset).toNumber();
    size = decodeSingle('uint256', data, offset).toNumber();
    return data.slice(offset + 32, offset + 32 + size)
  } else if (parsedType.name.startsWith('bytes')) {
    return data.slice(offset, offset + parsedType.size)
  } else if (parsedType.name.startsWith('uint')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be');
    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded int exceeds width: ' + parsedType.size + ' vs ' + num.bitLength())
    }
    return num
  } else if (parsedType.name.startsWith('int')) {
    num = new BN(data.slice(offset, offset + 32), 16, 'be').fromTwos(256);
    if (num.bitLength() > parsedType.size) {
      throw new Error('Decoded uint exceeds width: ' + parsedType.size + ' vs ' + num.bitLength())
    }

    return num
  } else if (parsedType.name.startsWith('ufixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]));
    num = decodeSingle('uint256', data, offset);
    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet')
    }
    return num.div(size)
  } else if (parsedType.name.startsWith('fixed')) {
    size = new BN(2).pow(new BN(parsedType.size[1]));
    num = decodeSingle('int256', data, offset);
    if (!num.mod(size).isZero()) {
      throw new Error('Decimals not supported yet')
    }
    return num.div(size)
  }
  throw new Error('Unsupported or invalid type: ' + parsedType.name)
}

// Parse the given type
// @returns: {} containing the type itself, memory usage and (including size and subArray if applicable)
function parseType (type) {
  var size;
  var ret;
  if (isArray(type)) {
    size = parseTypeArray(type);
    var subArray = type.slice(0, type.lastIndexOf('['));
    subArray = parseType(subArray);
    ret = {
      isArray: true,
      name: type,
      size: size,
      memoryUsage: size === 'dynamic' ? 32 : subArray.memoryUsage * size,
      subArray: subArray
    };
    return ret
  } else {
    var rawType;
    switch (type) {
      case 'address':
        rawType = 'uint160';
        break
      case 'bool':
        rawType = 'uint8';
        break
      case 'string':
        rawType = 'bytes';
        break
    }
    ret = {
      rawType: rawType,
      name: type,
      memoryUsage: 32
    };

    if ((type.startsWith('bytes') && type !== 'bytes') || type.startsWith('uint') || type.startsWith('int')) {
      ret.size = parseTypeN(type);
    } else if (type.startsWith('ufixed') || type.startsWith('fixed')) {
      ret.size = parseTypeNxM(type);
    }

    if (type.startsWith('bytes') && type !== 'bytes' && (ret.size < 1 || ret.size > 32)) {
      throw new Error('Invalid bytes<N> width: ' + ret.size)
    }
    if ((type.startsWith('uint') || type.startsWith('int')) && (ret.size % 8 || ret.size < 8 || ret.size > 256)) {
      throw new Error('Invalid int/uint<N> width: ' + ret.size)
    }
    return ret
  }
}

// Is a type dynamic?
function isDynamic (type) {
  // FIXME: handle all types? I don't think anything is missing now
  return (type === 'string') || (type === 'bytes') || (parseTypeArray(type) === 'dynamic')
}

// Is a type an array?
function isArray (type) {
  return type.lastIndexOf(']') === type.length - 1
}

// Encode a method/event with arguments
// @types an array of string type names
// @args  an array of the appropriate values
ABI.rawEncode = function (types, values) {
  var output = [];
  var data = [];

  var headLength = 0;

  types.forEach(function (type) {
    if (isArray(type)) {
      var size = parseTypeArray(type);

      if (size !== 'dynamic') {
        headLength += 32 * size;
      } else {
        headLength += 32;
      }
    } else {
      headLength += 32;
    }
  });

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];
    var cur = encodeSingle(type, value);

    // Use the head/tail method for storing dynamic data
    if (isDynamic(type)) {
      output.push(encodeSingle('uint256', headLength));
      data.push(cur);
      headLength += cur.length;
    } else {
      output.push(cur);
    }
  }

  return Buffer.concat(output.concat(data))
};

ABI.rawDecode = function (types, data) {
  var ret = [];
  data = Buffer.from(data);
  var offset = 0;
  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var parsed = parseType(type);
    var decoded = decodeSingle(parsed, data, offset);
    offset += parsed.memoryUsage;
    ret.push(decoded);
  }
  return ret
};

ABI.simpleEncode = function (method) {
  var args = Array.prototype.slice.call(arguments).slice(1);
  var sig = parseSignature(method);

  // FIXME: validate/convert arguments
  if (args.length !== sig.args.length) {
    throw new Error('Argument count mismatch')
  }

  return Buffer.concat([ ABI.methodID(sig.method, sig.args), ABI.rawEncode(sig.args, args) ])
};

ABI.simpleDecode = function (method, data) {
  var sig = parseSignature(method);

  // FIXME: validate/convert arguments
  if (!sig.retargs) {
    throw new Error('No return values in method')
  }

  return ABI.rawDecode(sig.retargs, data)
};

function stringify (type, value) {
  if (type.startsWith('address') || type.startsWith('bytes')) {
    return '0x' + value.toString('hex')
  } else {
    return value.toString()
  }
}

ABI.stringify = function (types, values) {
  var ret = [];

  for (var i in types) {
    var type = types[i];
    var value = values[i];

    // if it is an array type, concat the items
    if (/^[^\[]+\[.*\]$/.test(type)) {
      value = value.map(function (item) {
        return stringify(type, item)
      }).join(', ');
    } else {
      value = stringify(type, value);
    }

    ret.push(value);
  }

  return ret
};

ABI.solidityHexValue = function (type, value, bitsize) {
  // pass in bitsize = null if use default bitsize
  var size, num;
  if (isArray(type)) {
    var subType = type.replace(/\[.*?\]/, '');
    if (!isArray(subType)) {
      var arraySize = parseTypeArray(type);
      if (arraySize !== 'dynamic' && arraySize !== 0 && value.length > arraySize) {
        throw new Error('Elements exceed array size: ' + arraySize)
      }
    }
    var arrayValues = value.map(function (v) {
      return ABI.solidityHexValue(subType, v, 256)
    });
    return Buffer.concat(arrayValues)
  } else if (type === 'bytes') {
    return value
  } else if (type === 'string') {
    return Buffer.from(value, 'utf8')
  } else if (type === 'bool') {
    bitsize = bitsize || 8;
    var padding = Array((bitsize) / 4).join('0');
    return Buffer.from(value ? padding + '1' : padding + '0', 'hex')
  } else if (type === 'address') {
    var bytesize = 20;
    if (bitsize) {
      bytesize = bitsize / 8;
    }
    return utils.setLengthLeft(value, bytesize)
  } else if (type.startsWith('bytes')) {
    size = parseTypeN(type);
    if (size < 1 || size > 32) {
      throw new Error('Invalid bytes<N> width: ' + size)
    }

    return utils.setLengthRight(value, size)
  } else if (type.startsWith('uint')) {
    size = parseTypeN(type);
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid uint<N> width: ' + size)
    }

    num = parseNumber(value);
    if (num.bitLength() > size) {
      throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    bitsize = bitsize || size;
    return num.toArrayLike(Buffer, 'be', bitsize / 8)
  } else if (type.startsWith('int')) {
    size = parseTypeN(type);
    if ((size % 8) || (size < 8) || (size > 256)) {
      throw new Error('Invalid int<N> width: ' + size)
    }

    num = parseNumber(value);
    if (num.bitLength() > size) {
      throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength())
    }

    bitsize = bitsize || size;
    return num.toTwos(size).toArrayLike(Buffer, 'be', bitsize / 8)
  } else {
    // FIXME: support all other types
    throw new Error('Unsupported or invalid type: ' + type)
  }
};

ABI.solidityPack = function (types, values) {
  if (types.length !== values.length) {
    throw new Error('Number of types are not matching the values')
  }

  var ret = [];

  for (var i = 0; i < types.length; i++) {
    var type = elementaryName(types[i]);
    var value = values[i];
    ret.push(ABI.solidityHexValue(type, value, null));
  }

  return Buffer.concat(ret)
};

ABI.soliditySHA3 = function (types, values) {
  return utils.keccak256(ABI.solidityPack(types, values))
};

ABI.soliditySHA256 = function (types, values) {
  return utils.sha256(ABI.solidityPack(types, values))
};

ABI.solidityRIPEMD160 = function (types, values) {
  return utils.ripemd160(ABI.solidityPack(types, values), true)
};

// Serpent's users are familiar with this encoding
// - s: string
// - b: bytes
// - b<N>: bytes<N>
// - i: int256
// - a: int256[]

function isNumeric (c) {
  // FIXME: is this correct? Seems to work
  return (c >= '0') && (c <= '9')
}

// For a "documentation" refer to https://github.com/ethereum/serpent/blob/develop/preprocess.cpp
ABI.fromSerpent = function (sig) {
  var ret = [];
  for (var i = 0; i < sig.length; i++) {
    var type = sig[i];
    if (type === 's') {
      ret.push('bytes');
    } else if (type === 'b') {
      var tmp = 'bytes';
      var j = i + 1;
      while ((j < sig.length) && isNumeric(sig[j])) {
        tmp += sig[j] - '0';
        j++;
      }
      i = j - 1;
      ret.push(tmp);
    } else if (type === 'i') {
      ret.push('int256');
    } else if (type === 'a') {
      ret.push('int256[]');
    } else {
      throw new Error('Unsupported or invalid type: ' + type)
    }
  }
  return ret
};

ABI.toSerpent = function (types) {
  var ret = [];
  for (var i = 0; i < types.length; i++) {
    var type = types[i];
    if (type === 'bytes') {
      ret.push('s');
    } else if (type.startsWith('bytes')) {
      ret.push('b' + parseTypeN(type));
    } else if (type === 'int256') {
      ret.push('i');
    } else if (type === 'int256[]') {
      ret.push('a');
    } else {
      throw new Error('Unsupported or invalid type: ' + type)
    }
  }
  return ret.join('')
};

var lib = ABI;

var ethereumjsAbi = lib;

/**
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md
 * https://github.com/MetaMask/eth-sig-util/blob/1e34c5883666bc80eba90c19f63907e4d4a846ec/index.ts
 */
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
};
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
    encodeData(primaryType, data, types, useV4 = true) {
        const encodedTypes = ['bytes32'];
        const encodedValues = [this.hashType(primaryType, types)];
        if (useV4) {
            const encodeField = (name, type, value) => {
                if (types[type] !== undefined) {
                    // eslint-disable-next-line no-eq-null
                    return [
                        'bytes32',
                        value === null
                            ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                            : dist.sha3(this.encodeData(type, value, types, useV4)),
                    ];
                }
                if (value === undefined) {
                    throw new Error(`missing value for field ${name} of type ${type}`);
                }
                if (type === 'bytes') {
                    return ['bytes32', dist.sha3(value)];
                }
                if (type === 'string') {
                    // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                    if (typeof value === 'string') {
                        value = Buffer.from(value, 'utf8');
                    }
                    return ['bytes32', dist.sha3(value)];
                }
                if (type.lastIndexOf(']') === type.length - 1) {
                    const parsedType = type.slice(0, type.lastIndexOf('['));
                    const typeValuePairs = value.map((item) => encodeField(name, parsedType, item));
                    return [
                        'bytes32',
                        dist.sha3(ethereumjsAbi.rawEncode(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v))),
                    ];
                }
                return [type, value];
            };
            for (const field of types[primaryType]) {
                const [type, value] = encodeField(field.name, field.type, data[field.name]);
                encodedTypes.push(type);
                encodedValues.push(value);
            }
        }
        else {
            for (const field of types[primaryType]) {
                let value = data[field.name];
                if (value !== undefined) {
                    if (field.type === 'bytes') {
                        encodedTypes.push('bytes32');
                        value = dist.sha3(value);
                        encodedValues.push(value);
                    }
                    else if (field.type === 'string') {
                        encodedTypes.push('bytes32');
                        // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                        if (typeof value === 'string') {
                            value = Buffer.from(value, 'utf8');
                        }
                        value = dist.sha3(value);
                        encodedValues.push(value);
                    }
                    else if (types[field.type] !== undefined) {
                        encodedTypes.push('bytes32');
                        value = dist.sha3(this.encodeData(field.type, value, types, useV4));
                        encodedValues.push(value);
                    }
                    else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                        throw new Error('Arrays currently unimplemented in encodeData');
                    }
                    else {
                        encodedTypes.push(field.type);
                        encodedValues.push(value);
                    }
                }
            }
        }
        return ethereumjsAbi.rawEncode(encodedTypes, encodedValues);
    },
    /**
     * Encodes the type of an object by encoding a comma delimited list of its members
     *
     * @param {string} primaryType - Root type to encode
     * @param {Object} types - Type definitions
     * @returns {string} - Encoded representation of the type of an object
     */
    encodeType(primaryType, types) {
        let result = '';
        let deps = this.findTypeDependencies(primaryType, types).filter((dep) => dep !== primaryType);
        deps = [primaryType].concat(deps.sort());
        for (const type of deps) {
            const children = types[type];
            if (!children) {
                throw new Error(`No type definition specified: ${type}`);
            }
            result += `${type}(${types[type]
                .map(({ name, type: t }) => `${t} ${name}`)
                .join(',')})`;
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
    findTypeDependencies(primaryType, types, results = []) {
        [primaryType] = primaryType.match(/^\w*/u);
        if (results.includes(primaryType) || types[primaryType] === undefined) {
            return results;
        }
        results.push(primaryType);
        for (const field of types[primaryType]) {
            for (const dep of this.findTypeDependencies(field.type, types, results)) {
                !results.includes(dep) && results.push(dep);
            }
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
    hashStruct(primaryType, data, types, useV4 = true) {
        return dist.sha3(this.encodeData(primaryType, data, types, useV4));
    },
    /**
     * Hashes the type of an object
     *
     * @param {string} primaryType - Root type to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    hashType(primaryType, types) {
        return dist.sha3(this.encodeType(primaryType, types));
    },
    /**
     * Removes properties from a message object that are not defined per EIP-712
     *
     * @param {Object} data - typed message object
     * @returns {Object} - typed message object with only allowed fields
     */
    sanitizeData(data) {
        const sanitizedData = {};
        for (const key in TYPED_MESSAGE_SCHEMA.properties) {
            if (data[key]) {
                sanitizedData[key] = data[key];
            }
        }
        if ('types' in sanitizedData) {
            sanitizedData.types = Object.assign({ EIP712Domain: [] }, sanitizedData.types);
        }
        return sanitizedData;
    },
    /**
     * Signs a typed message as per EIP-712 and returns its sha3 hash
     *
     * @param {Object} typedData - Types message data to sign
     * @returns {Buffer} - sha3 hash of the resulting signed message
     */
    signHashHex(typedData, useV4 = true) {
        const sanitizedData = this.sanitizeData(typedData);
        const parts = [Buffer.from('1901', 'hex')];
        parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));
        if (sanitizedData.primaryType !== 'EIP712Domain') {
            parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
        }
        return dist.bufferToHex(Buffer.concat(parts));
    },
};

const constants = {
    VERSION: '2.3.0',
    LC_MAX: 245,
    ETH_AID: '695F657468',
    EOS_AID: '695F656F73',
    BTC_AID: '695F627463',
    COSMOS_AID: '695F636F736D6F73',
    FILECOIN_AID: '695F6B315F66696C',
    IMK_AID: '695F696D6B',
    POLKADOT_AID: '695F65645F646F74',
    KUSAMA_AID: '695F65645F6B736D',
    TRON_AID: '695F6B315F747278',
    BCH_AID: '695F626368',
    LTC_AID: '695F6C7463',
    APDU_RSP_SUCCESS: '9000',
    APDU_RSP_USER_NOT_CONFIRMED: '6940',
    APDU_CONDITIONS_NOT_SATISFIED: '6985',
    APDU_RSP_APPLET_NOT_EXIST: '6A82',
    APDU_RSP_INCORRECT_P1P2: '6A86',
    APDU_RSP_CLA_NOT_SUPPORTED: '6E00',
    APDU_RSP_APPLET_WRONG_DATA: '6A80',
    APDU_RSP_WRONG_LENGTH: '6700',
    APDU_RSP_SIGNATURE_VERIFY_FAILED: '6942',
    APDU_RSP_FUNCTION_NOT_SUPPORTED: '6D00',
    APDU_RSP_EXCEEDED_MAX_UTXO_NUMBER: '6941',
    APDU_RSP_WALLET_NOT_CREATED: 'F000',
    APDU_RSP_IN_MENU_PAGE: 'F080',
    APDU_RSP_PIN_NOT_VERIFIED: 'F081',
    APDU_BLUETOOTH_CHANNEL_ERROR: '6F01',
    APDU_RSP_SWITCH_BL_STATUS_SUCCESS: '905A',
    DEVICE_MODEL_NAME: 'imKey Pro',
};

class ETHApdu {
    selectApplet() {
        return genApdu$1(0x00, 0xa4, 0x04, 0x00, Buffer.from(constants.ETH_AID, 'hex'));
    }
    getXPub(path, isVerify) {
        return getPubkey(path, 0x53, isVerify);
    }
    registerAddress(address = Buffer.alloc(0)) {
        return registerAddress(0x56, address);
    }
    prepareSign(data = Buffer.alloc(0)) {
        return prepareSign(0x51, data);
    }
    signDigest(path) {
        return signDigest(0x52, 0x00, 0x00, path);
    }
    preparePersonalSign(data = Buffer.alloc(0)) {
        return prepareSign(0x54, data);
    }
    personalSign(path) {
        return signDigest(0x55, 0x00, 0x00, path);
    }
}
function genApdu$1(cla, ins, p1, p2, data = Buffer.alloc(0)) {
    const response = Buffer.concat([
        Buffer.from([cla, ins, p1, p2]),
        Buffer.from([data.length]),
        data,
        Buffer.from([0x00]),
    ]);
    return response;
}
function getPubkey(path, ins, isVerify) {
    const p1 = isVerify ? 0x01 : 0x00;
    return genApdu$1(0x80, ins, p1, 0x00, Buffer.from(path, 'ascii'));
}
function registerAddress(ins, data = Buffer.alloc(0)) {
    return genApdu$1(0x80, ins, 0x00, 0x00, data);
}
function signDigest(ins, index, hashType, path) {
    return genApdu$1(0x80, ins, index, hashType, Buffer.from(path, 'ascii'));
}
function prepareSign(ins, data) {
    const apduList = [];
    const size = Math.ceil(data.length / constants.LC_MAX);
    for (let i = 0; i < size; i++) {
        const p1 = i === 0 ? 0x00 : 0x80;
        let p2, lc;
        if (i === size - 1) {
            p2 = 0x80;
            lc = data.length - constants.LC_MAX * (size - 1);
        }
        else {
            p2 = 0x00;
            lc = 0xf5;
        }
        apduList.push(genApdu$1(0x80, ins, p1, p2, data.slice(i * constants.LC_MAX, i * constants.LC_MAX + lc)));
    }
    return apduList;
}

const ethApdu = new ETHApdu();
/**
 * Ethereum API
 *
 * @example
 * import Eth from "@imkeyhq/hw-app-eth";
 * const eth = new Eth(transport)
 */
class Eth {
    // @ts-ignore
    constructor(transport) {
        this.transport = transport;
    }
    /**
     * get Ethereum address for a given BIP 32 path.
     * @param path a path in BIP 32 format
     * @option boolDisplay optionally enable or not the display
     * @option boolChaincode optionally enable or not the chaincode request
     * @return an object with a publicKey, address and (optionally) chainCode
     * @example
     * eth.getAddress("44'/60'/0'/0/0").then(o => o.address)
     */
    getAddress(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const toSend = [];
            let response;
            toSend.push(ethApdu.selectApplet());
            toSend.push(ethApdu.getXPub(path, false));
            for (const i in toSend) {
                response = yield this.transport.send(toSend[i]);
            }
            return {
                address: addressFromPubkey(response),
                pubkey: response.slice(0, 65).toString('hex'),
            };
        });
    }
    /**
     * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
     * @example
     eth.signTransaction("44'/60'/0'/0/0", "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080").then(result => ...)
     */
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('transaction:');
            console.log(transaction);
            const getAddress = yield this.getAddress(transaction.path);
            const preview = genPreview(transaction, getAddress.address);
            const rawTransaction = genRawTransaction(transaction);
            const toSend = genApdu(rawTransaction, preview, transaction);
            let response;
            for (const i in toSend) {
                response = yield this.transport.send(toSend[i]);
            }
            const pubkey = getAddress.pubkey;
            const signCompact = response.slice(1, 65);
            const normalizesSig = secp256k1$1.signatureNormalize(signCompact);
            const recId = getRecID(rawTransaction, normalizesSig, pubkey);
            let v;
            if (transaction.chainId === '' || transaction.chainId === 'undefined') {
                v = numberToHex(27);
            }
            else {
                v = (recId + 35 + Number(transaction.chainId) * 2).toString(16);
            }
            // @ts-ignore
            const r = normalizesSig.slice(0, 32).toString('hex');
            // @ts-ignore
            const s = normalizesSig.slice(32, 32 + 32).toString('hex');
            const signedTransaction = encode([
                numberToHex(transaction.nonce),
                numberToHex(transaction.gasPrice),
                numberToHex(transaction.gasLimit),
                transaction.to,
                numberToHex(transaction.value),
                transaction.data,
                Buffer.from(v, 'hex'),
                Buffer.from(r, 'hex'),
                Buffer.from(s, 'hex'),
            ]);
            const signature = '0x' + signedTransaction.toString('hex');
            const txhash = utils$1.keccak256(signedTransaction);
            return { signature, txhash };
        });
    }
    /**
    * You can sign a message according to eth_sign RPC call and retrieve v, r, s given the message and the BIP 32 path of the account to sign.
    * @example
  eth.signPersonalMessage("44'/60'/0'/0/0", Buffer.from("test").toString("hex")).then(result => {
    var v = result['v'] - 27;
    v = v.toString(16);
    if (v.length < 2) {
      v = "0" + v;
    }
    console.log("Signature 0x" + result['r'] + result['s'] + v);
  })
     */
    signMessage(path, message, sender, isPersonalSign) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('path:');
            console.log(path);
            console.log('message:');
            console.log(message);
            console.log('sender:');
            console.log(sender);
            console.log('isPersonalSign:');
            console.log(isPersonalSign);
            let messageToSign;
            // 判断是否是HEX
            if (isValidHex(message)) {
                messageToSign = Buffer.from(message.substring(2), 'hex');
            }
            else {
                messageToSign = Buffer.from(message, 'ascii');
            }
            let data;
            if (isPersonalSign) {
                const header = Buffer.from('Ethereum Signed Message:\n' + messageToSign.length, 'ascii');
                data = Buffer.concat([header, messageToSign]);
            }
            else {
                data = messageToSign;
            }
            const dataToSign = Buffer.concat([
                asUInt8(1),
                asUInt16BE$1(data.length),
                data,
            ]);
            // const bindSignatureBuf = bindSignature(dataToSign)
            const apduPack = Buffer.concat([asUInt8(0), asUInt8(0), dataToSign]);
            let toSend = [];
            let response;
            const getAddress = yield this.getAddress(path);
            if (getAddress.address !== sender) {
                throw 'address not match';
            }
            const pubkey = getAddress.pubkey;
            toSend = ethApdu.preparePersonalSign(apduPack);
            toSend.push(ethApdu.personalSign(path));
            for (const i in toSend) {
                response = yield this.transport.send(toSend[i]);
            }
            const signCompact = response.slice(1, 65);
            const normalizesSig = secp256k1$1.signatureNormalize(signCompact);
            const recId = getRecID(data, normalizesSig, pubkey);
            const v = (recId + 27).toString(16);
            // @ts-ignore
            const r = normalizesSig.slice(0, 32).toString('hex');
            // @ts-ignore
            const s = normalizesSig.slice(32, 32 + 32).toString('hex');
            // return { v, r, s };
            const signature = r + s + v;
            return { signature };
        });
    }
}
function getRecID(data, normalizesSig, pubkey) {
    let recId = 0;
    const dataHash = Buffer.from(utils$1.keccak256(data).substring(2), 'hex');
    for (let i = 0; i <= 3; i++) {
        try {
            if (Buffer.from(secp256k1$1.ecdsaRecover(normalizesSig, i, dataHash, false)).toString('hex') === pubkey) {
                recId = i;
                break;
            }
        }
        catch (e) {
            continue;
        }
    }
    return recId;
}
function genPreview(transaction, address) {
    const symbol = !transaction.symbol ? 'ETH' : transaction.symbol;
    const gasLimit = parseArgsNum$1(transaction.gasLimit);
    const gasPrice = parseArgsNum$1(transaction.gasPrice);
    // fee
    let fee = (BigInt(gasLimit) * BigInt(gasPrice)).toString(); // wei
    fee = fromWei(fee, 'gwei'); // to Gwei
    const temp = Math.ceil(Number(fee));
    fee = (BigInt(temp) * BigInt(1000000000)).toString(); // to ether
    fee = fromWei(fee) + ' ' + symbol;
    const to = toChecksumAddress(transaction.to);
    const value = parseArgsNum$1(transaction.value);
    const valueInWei = fromWei(value);
    const preview = {
        payment: valueInWei + ' ' + symbol,
        receiver: to,
        sender: address,
        fee: fee,
    };
    return preview;
}
function genRawTransaction(transaction) {
    let rawTransaction;
    if (transaction.chainId === '' || transaction.chainId === 'undefined') {
        rawTransaction = encode([
            numberToHex(transaction.nonce),
            numberToHex(transaction.gasPrice),
            numberToHex(transaction.gasLimit),
            transaction.to,
            numberToHex(transaction.value),
            transaction.data,
        ]);
    }
    else {
        rawTransaction = encode([
            numberToHex(transaction.nonce),
            numberToHex(transaction.gasPrice),
            numberToHex(transaction.gasLimit),
            transaction.to,
            numberToHex(transaction.value),
            transaction.data,
            numberToHex(transaction.chainId),
            0x00,
            0x00,
        ]);
    }
    return rawTransaction;
}
function genApdu(rawTransaction, preview, transaction) {
    let apduList = [];
    const data = Buffer.concat([
        asUInt8(1),
        asUInt16BE$1(rawTransaction.length),
        rawTransaction,
        asUInt8(7),
        asUInt8(preview.payment.length),
        Buffer.from(preview.payment, 'ascii'),
        asUInt8(8),
        asUInt8(preview.receiver.length),
        Buffer.from(preview.receiver, 'ascii'),
        asUInt8(9),
        asUInt8(preview.fee.length),
        Buffer.from(preview.fee, 'ascii'),
    ]);
    const apduPack = Buffer.concat([asUInt8(0), asUInt8(1), asUInt8(0), data]);
    apduList = ethApdu.prepareSign(apduPack);
    apduList.push(ethApdu.signDigest(transaction.path));
    return apduList;
}

var events = {exports: {}};

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

var EventEmitter$1 = events.exports;

/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
const errorClasses = {};
const deserializers = {};
const addCustomErrorDeserializer = (name, deserializer) => {
    deserializers[name] = deserializer;
};
const createCustomErrorClass = (name) => {
    const C = function CustomError(message, fields) {
        Object.assign(this, fields);
        this.name = name;
        this.message = message || name;
        this.stack = new Error().stack;
    };
    C.prototype = new Error();
    errorClasses[name] = C;
    return C;
};

const DisconnectedDevice = createCustomErrorClass('DisconnectedDevice');
const DisconnectedDeviceDuringOperation = createCustomErrorClass('DisconnectedDeviceDuringOperation');
const TransportOpenUserCancelled = createCustomErrorClass('TransportOpenUserCancelled');
const TransportInterfaceNotAvailable = createCustomErrorClass('TransportInterfaceNotAvailable');
const TransportRaceCondition = createCustomErrorClass('TransportRaceCondition');
const TransportWebUSBGestureRequired = createCustomErrorClass('TransportWebUSBGestureRequired');
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the devices for various reason.
 */
function TransportError(message, id) {
    this.name = 'TransportError';
    this.message = message;
    this.stack = new Error().stack;
    this.id = id;
}
TransportError.prototype = new Error();
addCustomErrorDeserializer('TransportError', (e) => new TransportError(e.message, e.id));
const StatusCodes = {
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
};
function getAltStatusMessage(code) {
    switch (code) {
        case 0x9000:
            return 'Success';
        case 0x6700:
            return 'Incorrect length';
        case 0x6940:
            return 'User not confirmed';
        case 0x6941:
            return 'Exceeded max UTXO number';
        case 0x6942:
            return 'Signature verify failed';
        case 0x6982:
            return 'Security not satisfied (dongle locked or have invalid access rights)';
        case 0x6985:
            return 'Condition of use not satisfied (denied by the user?)';
        case 0x6a80:
            return 'Invalid data received';
        case 0x6a82:
            return 'Applet not exist';
        case 0x6a86:
            return 'Incorrect p1 or p2';
        case 0x6d00:
            return 'Function not support';
        case 0x6e00:
            return 'CLA not support';
        case 0x6f01:
            return 'Bluetooth channel error';
        case 0xf000:
            return 'Wallet  not create';
        case 0xf080:
            return 'ImKey in menu page ';
        case 0xf081:
            return 'PIN not verify';
        case 0x905a:
            return 'Switch BL status success';
    }
    return 'Internal error, please report';
}
/**
 * Error thrown when a devices returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
function TransportStatusError(statusCode) {
    this.name = 'TransportStatusError';
    const statusText = Object.keys(StatusCodes).find((k) => StatusCodes[k] === statusCode) ||
        'UNKNOWN_ERROR';
    const smsg = getAltStatusMessage(statusCode) || statusText;
    const statusCodeStr = statusCode.toString(16);
    this.message = `imKey device: ${smsg} (0x${statusCodeStr})`;
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
TransportStatusError.prototype = new Error();
addCustomErrorDeserializer('TransportStatusError', (e) => new TransportStatusError(e.statusCode));

class Transport {
    constructor() {
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        // @ts-ignore
        this._events = new EventEmitter$1();
        /**
         * wrapper on top of exchange to simplify work of the implementation.
         * @param cla
         * @param ins
         * @param p1
         * @param p2
         * @param data
         * @param statusList is a list of accepted status code (shorts). [0x9000] by default
         * @return a Promise of response buffer
         */
        this.send = (data = Buffer.alloc(0), statusList = [StatusCodes.OK]) => __awaiter(this, void 0, void 0, function* () {
            if (data.length >= 256) {
                throw new TransportError('data.length exceed 256 bytes limit. Got: ' + data.length, 'DataLengthTooBig');
            }
            const response = yield this.exchange(data);
            const sw = response.readUInt16BE(response.length - 2);
            if (!statusList.some((s) => s === sw)) {
                throw new TransportStatusError(sw);
            }
            return response;
        });
        // $FlowFixMe
        this.exchangeAtomicImpl = (f) => __awaiter(this, void 0, void 0, function* () {
            if (this.exchangeBusyPromise) {
                throw new TransportRaceCondition('An action was already pending on the imkey device. Please deny or reconnect.');
            }
            let resolveBusy;
            const busyPromise = new Promise((r) => {
                resolveBusy = r;
            });
            // @ts-ignore
            this.exchangeBusyPromise = busyPromise;
            let unresponsiveReached = false;
            const timeout = setTimeout(() => {
                unresponsiveReached = true;
                this.emit('unresponsive');
            }, this.unresponsiveTimeout);
            try {
                const res = yield f();
                if (unresponsiveReached) {
                    this.emit('responsive');
                }
                return res;
            }
            finally {
                clearTimeout(timeout);
                if (resolveBusy)
                    resolveBusy();
                this.exchangeBusyPromise = null;
            }
        });
    }
    /**
     * low level api to communicate with the device
     * This method is for implementations to implement but should not be directly called.
     * Instead, the recommanded way is to use send() method
     * @param apdu the data to send
     * @return a Promise of response data
     */
    exchange(_apdu) {
        throw new Error('exchange not implemented');
    }
    /**
     * close the exchange with the device.
     * @return a Promise that ends when the transport is closed.
     */
    close() {
        return Promise.resolve();
    }
    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */
    on(eventName, cb) {
        this._events.on(eventName, cb);
    }
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName, cb) {
        this._events.removeListener(eventName, cb);
    }
    emit(event, ...args) {
        this._events.emit(event, ...args);
    }
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode() {
        console.warn('setDebugMode is deprecated. use @imkeyhq/logs instead. No logs are emitted in this anymore.');
    }
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    }
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    }
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
     TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout, listenTimeout) {
        return new Promise((resolve, reject) => {
            let found = false;
            const sub = this.listen({
                next: (e) => {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    openTimeout = 3000;
                    this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: (e) => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: () => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new TransportError(this.ErrorMessageNoDeviceFound, 'NoDeviceFound'));
                    }
                },
            });
            const listenTimeoutId = listenTimeout
                ? setTimeout(() => {
                    sub.unsubscribe();
                    reject(new TransportError(this.ErrorMessageListenTimeout, 'ListenTimeout'));
                }, listenTimeout)
                : null;
        });
    }
}
Transport.ErrorMessageListenTimeout = 'No imKey device found (timeout)';
Transport.ErrorMessageNoDeviceFound = 'No imKey device found';

const Tag = 0x4654;
function asUInt16BE(value) {
    const b = Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
const initialAcc = {
    data: Buffer.alloc(0),
    dataLength: 0,
};
/**
 *
 */
const createHIDframing = (channel, packetSize) => {
    return {
        makeBlocks(apdu) {
            const data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
            const blockSize = packetSize - 3;
            const nbBlocks = Math.ceil(data.length / blockSize);
            const blocks = [];
            let chunk;
            let dataIndex = 0;
            for (let i = 0; i < nbBlocks; i++) {
                let head;
                if (i === 0) {
                    head = Buffer.alloc(3);
                    head.writeUInt8(channel, 0);
                    head.writeUInt16BE(Tag, 1);
                    chunk = data.slice(0, blockSize);
                    dataIndex += blockSize;
                }
                else {
                    head = Buffer.alloc(1);
                    head.writeUInt8(channel, 0);
                    chunk = data.slice(dataIndex, dataIndex + (blockSize + 2));
                    dataIndex += blockSize + 2;
                }
                blocks.push(Buffer.concat([head, chunk]));
                if (dataIndex >= data.length) {
                    break;
                }
            }
            return blocks;
        },
        reduceResponse(acc, chunk) {
            let { data, dataLength } = acc || initialAcc;
            if (chunk.readUInt8(0) !== channel) {
                throw new TransportError('Invalid channel', 'InvalidChannel');
            }
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
                dataLength,
            };
        },
        getReducedResult(acc) {
            if (acc && acc.dataLength === acc.data.length) {
                return acc.data;
            }
        },
    };
};

const imKeyUSBVendorId = 0x096e;
const imKeyDevices = [
    {
        vendorId: imKeyUSBVendorId,
    },
];
const devices = {
    imKey: {
        id: 'imKey',
        productName: 'imKey Wallet',
        productIdMM: 0x40,
        legacyUsbProductId: 0x0891,
        usbOnly: true,
        memorySize: 2 * 1024 * 1024,
        blockSize: 4 * 1024,
    },
};
const devicesList = Object.values(devices);
/**
 *
 */
const identifyUSBProductId = (usbProductId) => {
    const legacy = devicesList.find((d) => d.legacyUsbProductId === usbProductId);
    if (legacy)
        return legacy;
    const mm = usbProductId >> 8;
    const deviceModel = devicesList.find((d) => d.productIdMM === mm);
    return deviceModel;
};
function requestImKeyDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const device = yield navigator.usb.requestDevice({
            filters: imKeyDevices,
        });
        return device;
    });
}
function getImKeyDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const devices = yield navigator.usb.getDevices();
        return devices.filter((d) => d.vendorId === imKeyUSBVendorId);
    });
}
function getFirstImKeyDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDevices = yield getImKeyDevices();
        if (existingDevices.length > 0)
            return existingDevices[0];
        return requestImKeyDevice();
    });
}
const isSupported = () => Promise.resolve(!!navigator && // @ts-ignore
    !!navigator.usb && // @ts-ignore
    typeof navigator.usb.getDevices === 'function');

const configurationValue = 1;
const endpointNumberIn = 5;
const endpointNumberOut = 4;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@imkeyhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
class TransportWebUSB extends Transport {
    constructor(device, interfaceNumber) {
        super();
        this.channel = 0x3f;
        this.packetSize = 64;
        this._disconnectEmitted = false;
        this._emitDisconnect = (e) => {
            if (this._disconnectEmitted)
                return;
            this._disconnectEmitted = true;
            this.emit('disconnect', e);
        };
        /**
         * Exchange with the device using APDU protocol.
         * @param apdu
         * @returns a promise of apdu response
         */
        this.exchange = (apdu) => __awaiter(this, void 0, void 0, function* () {
            // console.log("apdu", "=> " + apdu.toString("hex").toUpperCase());
            return this.exchangeAtomicImpl(() => __awaiter(this, void 0, void 0, function* () {
                const { channel, packetSize } = this;
                const framing = createHIDframing(channel, packetSize);
                // Write...
                const blocks = framing.makeBlocks(apdu);
                for (let i = 0; i < blocks.length; i++) {
                    console.log('apdu', '=> ' + blocks[i].toString('hex').toUpperCase());
                    yield this.device.transferOut(endpointNumberOut, blocks[i]);
                }
                // Read...
                let result;
                let acc;
                while (!(result = framing.getReducedResult(acc))) {
                    const r = yield this.device.transferIn(endpointNumberIn, packetSize);
                    const buffer = Buffer.from(r.data.buffer);
                    acc = framing.reduceResponse(acc, buffer);
                }
                console.log('apdu', '<= ' + result.toString('hex').toUpperCase());
                return result;
            })).catch((e) => {
                if (e && e.message && e.message.includes('disconnected')) {
                    this._emitDisconnect(e);
                    throw new DisconnectedDeviceDuringOperation(e.message);
                }
                throw e;
            });
        });
        this.device = device;
        this.interfaceNumber = interfaceNumber;
        this.deviceModel = identifyUSBProductId(device.productId);
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static request() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield requestImKeyDevice();
            return TransportWebUSB.open(device);
        });
    }
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static openConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield getImKeyDevices();
            if (devices.length === 0)
                return null;
            return TransportWebUSB.open(devices[0]);
        });
    }
    /**{
      "name": "TransportInterfaceNotAvailable",
      "message": "Unable to claim interface.",
      "stack": "Error\n    at new CustomError (http://localhost:8080/main.imkey-web3-provider.js:114168:18)\n    at _callee5$ (http://localhost:8080/main.imkey-web3-provider.js:115923:23)\n    at tryCatch (http://localhost:8080/main.imkey-web3-provider.js:441:40)\n    at Generator.invoke [as _invoke] (http://localhost:8080/main.imkey-web3-provider.js:670:22)\n    at Generator.prototype.<computed> [as next] (http://localhost:8080/main.imkey-web3-provider.js:493:21)\n    at asyncGeneratorStep (http://localhost:8080/main.imkey-web3-provider.js:68:24)\n    at _next (http://localhost:8080/main.imkey-web3-provider.js:90:9)"
  }
     * Create a imkey transport with a USBDevice
     */
    static open(device) {
        return __awaiter(this, void 0, void 0, function* () {
            yield device.open();
            if (device.configuration === null) {
                yield device.selectConfiguration(configurationValue);
            }
            yield gracefullyResetDevice(device);
            const iface = device.configurations[0].interfaces.find(({ alternates }) => alternates.some((a) => a.interfaceClass === 255));
            if (!iface) {
                throw new TransportInterfaceNotAvailable('No WebUSB interface found for your imkey device. Please upgrade firmware or contact techsupport.');
            }
            const interfaceNumber = iface.interfaceNumber;
            // console.log(iface.alternates[0].endpoints)
            // iface.alternates[0].endpoints.forEach(elementendpoint => {
            //   if (elementendpoint.direction === "out") {
            //     endpointNumber_out = elementendpoint;
            //   }
            //   if (elementendpoint.direction === "in" ) {
            //     endpointNumber_in = elementendpoint;
            //   }
            // })
            try {
                // console.log("interfaceNumber:" + interfaceNumber)
                yield device.claimInterface(interfaceNumber);
            }
            catch (e) {
                yield device.close();
                throw new TransportInterfaceNotAvailable(e.message);
            }
            const transport = new TransportWebUSB(device, interfaceNumber);
            const onDisconnect = (e) => {
                if (device === e.device) {
                    // @ts-ignore
                    navigator.usb.removeEventListener('disconnect', onDisconnect);
                    transport._emitDisconnect(new DisconnectedDevice());
                }
            };
            // @ts-ignore
            navigator.usb.addEventListener('disconnect', onDisconnect);
            return transport;
        });
    }
    /**
     * Release the transport device
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchangeBusyPromise;
            yield this.device.releaseInterface(this.interfaceNumber);
            yield gracefullyResetDevice(this.device);
            yield this.device.close();
        });
    }
}
/**
 * Check if WebUSB transport is supported.
 */
TransportWebUSB.isSupported = isSupported;
/**
 * List the WebUSB devices that was previously authorized by the user.
 */
TransportWebUSB.list = getImKeyDevices;
/**
 * Actively listen to WebUSB devices and emit ONE device
 * that was either accepted before, if not it will trigger the native permission UI.
 *
 * Important: it must be called in the context of a UI click!
 */
TransportWebUSB.listen = (observer) => {
    let unsubscribed = false;
    getFirstImKeyDevice().then((device) => {
        if (!unsubscribed) {
            const deviceModel = identifyUSBProductId(device.productId);
            observer.next({ type: 'add', descriptor: device, deviceModel });
            observer.complete();
        }
    }, (error) => {
        if (window.DOMException &&
            error instanceof window.DOMException &&
            error.code === 18) {
            observer.error(new TransportWebUSBGestureRequired(error.message));
        }
        else {
            observer.error(new TransportOpenUserCancelled(error.message));
        }
    });
    function unsubscribe() {
        unsubscribed = true;
    }
    return { unsubscribe };
};
function gracefullyResetDevice(device) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield device.reset();
        }
        catch (err) {
            console.warn(err);
        }
    });
}

const IMKEY_MANAGER_ENDPOINT = 'http://localhost:8081/api/imkey';
const IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
let requestId = 0;
let ETH;
let transport;
function createJsonRpcRequest(method, params = []) {
    return {
        id: requestId++,
        jsonrpc: '2.0',
        method,
        params,
    };
}
function createJsonRpcResponse(id, result) {
    return {
        id,
        jsonrpc: '2.0',
        result,
    };
}
function createProviderRpcError(code, message) {
    return {
        message,
        code,
    };
}
function chainId2InfuraNetwork(chainId) {
    switch (chainId) {
        case 3:
            return 'ropsten';
        case 4:
            return 'rinkeby';
        case 5:
            return 'goerli';
        case 42:
            return 'kovan';
        default:
            return 'mainnet';
    }
}
function parseArgsNum(num) {
    if (num instanceof BN$2) {
        return num.toNumber().toString();
    }
    else if (typeof num === 'string' && isHex(num)) {
        return hexToNumberString(num);
    }
    else {
        return num.toString();
    }
}
function isNative() {
    return true;
    // if(apirouter&&dialog){
    //   console.log('isNative true')
    //   return true
    // }else{
    //   console.log('isNative false')
    //   return false
    // }
}
class ImKeyProvider extends EventEmitter$2 {
    constructor(config) {
        var _a;
        super();
        this.request = (args) => __awaiter(this, void 0, void 0, function* () {
            console.log('request:\n' + JSON.stringify(args));
            switch (args.method) {
                case 'eth_getChainId': {
                    return this.chainId;
                }
                /* eslint-disable no-fallthrough */
                case 'personal_listAccounts':
                /* eslint-disable no-fallthrough */
                case 'eth_accounts':
                /* eslint-disable no-fallthrough */
                case 'eth_requestAccounts': {
                    return yield this.imKeyRequestAccounts(requestId++);
                }
                case 'eth_coinbase': {
                    let ret = yield this.imKeyRequestAccounts(requestId++);
                    return String(ret[0]);
                }
                case 'personal_sign': {
                    return yield this.imKeySign(requestId++, args.params[0], args.params[1], true);
                }
                case 'eth_signTransaction': {
                    return yield this.imKeySignTransaction(requestId++, args.params[0]);
                }
                case 'eth_sendTransaction': {
                    const ret = yield this.imKeySignTransaction(requestId++, args.params[0]);
                    const req = createJsonRpcRequest('eth_sendRawTransaction', [ret.raw]);
                    return yield this.callInnerProviderApi(req);
                }
                case 'eth_sign': {
                    return yield this.imKeySign(requestId++, args.params[1], args.params[0], false);
                }
                /* eslint-disable no-fallthrough */
                case 'eth_signTypedData':
                // case 'eth_signTypedData_v1':
                /* eslint-disable no-fallthrough */
                case 'eth_signTypedData_v3':
                    /* eslint-disable no-fallthrough */
                    return createProviderRpcError(4200, `${args.method} is not support now`);
                case 'eth_signTypedData_v4': {
                    const jsonobj = JSON.parse(args.params[1]);
                    const eip712HashHexWithoutSha3 = TypedDataUtils.signHashHex(jsonobj, true);
                    return yield this.imKeySign(requestId++, eip712HashHexWithoutSha3, args.params[0], false);
                }
                case 'eth_getTransactionReceipt': {
                    const payload = {
                        jsonrpc: '2.0',
                        method: args.method,
                        params: args.params,
                        id: requestId++,
                    };
                    return yield this.requestTransactionReceipt(payload);
                }
                case 'wallet_addEthereumChain': {
                    this.changeChain(args.params[0]);
                    return null;
                }
                default: {
                    console.log('request default');
                    const payload = {
                        jsonrpc: '2.0',
                        method: args.method,
                        params: args.params,
                        id: requestId++,
                    };
                    return yield this.callInnerProviderApi(payload);
                }
            }
        });
        let rpcUrl = config.rpcUrl;
        this.chainId = (_a = config.chainId) !== null && _a !== void 0 ? _a : 1;
        if (config.infuraId) {
            const network = chainId2InfuraNetwork(this.chainId);
            rpcUrl = `https://${network}.infura.io/v3/${config.infuraId}`;
        }
        let headers = null;
        if (config.headers) {
            headers = [];
            for (const idx in config.headers) {
                headers.push({ name: idx, value: config.headers[idx] });
            }
            this.headers = headers;
        }
        // this.httpProvider = new providers.Web3Provider({
        //   host:rpcUrl
        // },{name:chainId2InfuraNetwork(this.chainId),chainId:this.chainId});
        // @ts-ignore
        this.httpProvider = new Web3HttpProvider(rpcUrl, {
            headers,
        });
        this.symbol = !config.symbol ? 'ETH' : config.symbol;
        console.log(this);
    }
    callInnerProviderApi(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('req:' + req);
            console.log(JSON.stringify(req));
            return new Promise((resolve, reject) => {
                this.httpProvider.send(req, (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(createProviderRpcError(4001, error.message));
                    }
                    else {
                        console.log(result);
                        resolve(result.result);
                    }
                });
            });
        });
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('enable');
            transport = yield TransportWebUSB.create();
            ETH = new Eth(transport);
            const accounts = yield this.imKeyRequestAccounts(requestId++);
            const chainIdHex = yield this.callInnerProviderApi(createJsonRpcRequest('eth_chainId'));
            const chainId = hexToNumber(chainIdHex);
            if (chainId !== this.chainId) {
                throw new Error("chain id and rpc endpoint don't match");
            }
            else {
                this.emit('connect', { chainId });
                return accounts;
            }
        });
    }
    stop() {
        transport.close();
    }
    changeChain(args) {
        console.log('wallet_addEthereumChain: ', JSON.stringify(args));
        this.chainId = stringToNumber(parseArgsNum(args.chainId));
        if (args.rpcUrls) {
            let headers = this.headers;
            // this.httpProvider = new providers.Web3Provider({
            //   host:args.rpcUrls[0]
            // },{name:chainId2InfuraNetwork(this.chainId),chainId:this.chainId});
            // @ts-ignore
            this.httpProvider = new Web3HttpProvider(args.rpcUrls, {
                headers,
            });
        }
    }
    sendAsync(args, callback) {
        console.log('sendAsync:\n' + JSON.stringify(args));
        // if(args.method !== 'eth_call' && args.method !== 'eth_accounts'){
        //   console.log('return ' + args.method)
        //   return
        // }
        // if(args.method === 'eth_coinbase'){
        //   callback(null, createJsonRpcResponse(args.id, '0x407d73d8a49eeb85d32cf465507dd71d507100c1'))
        // }else{
        this.request(args)
            .then((ret) => {
            console.log('request ret:' + ret + ' method:' + args.method);
            console.log(JSON.stringify(ret));
            // if(args.method === 'eth_getTransactionReceipt'){
            //   console.log('diff ret:' + typeof ret)
            //   callback(null, createJsonRpcResponse(args.id, {"blockHash":"0x09e5d45158e71a6c07ac10142c3abfb24078de838bf8d3b5b6641fac67f42684","blockNumber":"0x15f56e4","contractAddress":null,"cumulativeGasUsed":"0xb64b5","from":"0x6031564e7b2f5cc33737807b2e58daff870b590b","gasUsed":"0x5208","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x2","to":"0xd6a6bc087d12ae864491240bf457856c71d48eb8","transactionHash":"0xbc86e19ae2856061b4fa38bba6aa0e60d02e7d54be738de088241df820c6ee24","transactionIndex":"0x2"}))
            //   // callback(null, createJsonRpcResponse(args.id, ret + ''))
            // }else{
            callback(null, createJsonRpcResponse(args.id, ret));
            // }
        })
            .catch((err) => {
            console.log('request err' + err);
            callback(err, null);
        });
        // }
        // this.request(args)
        // .then((ret) => callback(null, createJsonRpcResponse(args.id, ret)))
        // .catch((err) => callback(err, null));
    }
    requestTransactionReceipt(paload) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                yield sleep(1000);
                console.log('requestTransactionReceipt ' + i);
                let ret = yield this.callInnerProviderApi(paload);
                if (ret) {
                    return ret;
                }
            }
        });
    }
    imKeyRequestAccounts(id, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ret = yield callImKeyApi({
                    jsonrpc: '2.0',
                    method: 'eth.getAddress',
                    params: {
                        path: IMKEY_ETH_PATH,
                    },
                    id: requestId++,
                }, isNative());
                callback === null || callback === void 0 ? void 0 : callback(null, [(_a = ret.result) === null || _a === void 0 ? void 0 : _a.address]);
                return [(_b = ret.result) === null || _b === void 0 ? void 0 : _b.address];
            }
            catch (error) {
                callback === null || callback === void 0 ? void 0 : callback(error, null);
                throw createProviderRpcError(4001, error);
            }
        });
    }
    imKeySignTransaction(id, transactionConfig, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!transactionConfig.to || !transactionConfig.value) {
                throw createProviderRpcError(-32602, 'expected to,value');
            }
            if (!transactionConfig.from || typeof transactionConfig.from === 'number') {
                yield this.imKeyRequestAccounts(requestId++);
            }
            else {
                toChecksumAddress(transactionConfig.from);
            }
            // gas price
            let gasPriceDec;
            if (transactionConfig.gasPrice) {
                gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
            }
            else {
                const gasPriceRet = yield this.callInnerProviderApi(createJsonRpcRequest('eth_gasPrice', []));
                gasPriceDec = hexToNumberString(gasPriceRet);
            }
            // chain id
            let chainId;
            if (transactionConfig.chainId) {
                if (transactionConfig.chainId !== this.chainId) {
                    throw createProviderRpcError(-32602, 'expected chainId and connected chainId are mismatched');
                }
                chainId = transactionConfig.chainId;
            }
            else {
                chainId = this.chainId;
            }
            // nonce
            let nonce;
            if (transactionConfig.nonce) {
                nonce = parseArgsNum(transactionConfig.nonce);
            }
            else {
                nonce = yield this.callInnerProviderApi(createJsonRpcRequest('eth_getTransactionCount', [
                    transactionConfig.from,
                    'pending',
                ]));
                nonce = hexToNumber(nonce).toString();
            }
            // estimate gas
            let gasLimit;
            if (transactionConfig.gas) {
                gasLimit = parseArgsNum(transactionConfig.gas);
            }
            else {
                console.log('transactionConfig.gas:' + transactionConfig.gas);
                const gasRet = yield this.callInnerProviderApi(createJsonRpcRequest('eth_estimateGas', [
                    {
                        from: transactionConfig.from,
                        to: transactionConfig.to,
                        gas: transactionConfig.gas,
                        gasPrice: numberToHex(gasPriceDec),
                        value: transactionConfig.value,
                        data: transactionConfig.data,
                    },
                ]));
                console.log('gasRet:' + gasRet);
                gasLimit = parseArgsNum(gasRet);
            }
            const to = toChecksumAddress(transactionConfig.to);
            const value = parseArgsNum(transactionConfig.value);
            const valueInWei = fromWei(value);
            try {
                const ret = yield callImKeyApi({
                    jsonrpc: '2.0',
                    method: 'eth.signTransaction',
                    params: {
                        transaction: {
                            data: transactionConfig.data,
                            gasLimit,
                            gasPrice: gasPriceDec,
                            nonce,
                            to,
                            value,
                            chainId,
                            path: IMKEY_ETH_PATH,
                            symbol: this.symbol,
                        },
                    },
                    id: requestId++,
                }, isNative());
                let signature = (_a = ret.result) === null || _a === void 0 ? void 0 : _a.signature;
                if (!signature.startsWith('0x')) {
                    signature = '0x' + signature;
                }
                const decoded = require$$3.decode(signature, true);
                const rlpTX = {
                    raw: signature,
                    tx: {
                        nonce: nonce,
                        gasPrice: gasPriceDec,
                        gas: gasLimit,
                        to: to,
                        value: valueInWei,
                        input: transactionConfig.data,
                        // @ts-ignore
                        r: bytesToHex(decoded.data[7]),
                        // @ts-ignore
                        s: bytesToHex(decoded.data[8]),
                        // @ts-ignore
                        v: bytesToHex(decoded.data[6]),
                        hash: (_b = ret.result) === null || _b === void 0 ? void 0 : _b.txHash,
                    },
                };
                callback === null || callback === void 0 ? void 0 : callback(null, rlpTX);
                return rlpTX;
            }
            catch (error) {
                callback === null || callback === void 0 ? void 0 : callback(error, null);
                throw createProviderRpcError(4001, error);
            }
        });
    }
    imKeySign(id, dataToSign, address, isPersonalSign, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (Number.isInteger(address)) {
                const error = createProviderRpcError(-32602, 'Pass the address to sign data with for now');
                callback === null || callback === void 0 ? void 0 : callback({
                    name: 'address invalid',
                    message: 'Pass the address to sign data with for now',
                }, null);
                throw error;
            }
            let data = '';
            try {
                data = toUtf8$1(dataToSign);
            }
            catch (error) {
                data = dataToSign;
            }
            const checksumAddress = toChecksumAddress(address);
            try {
                const ret = yield callImKeyApi({
                    jsonrpc: '2.0',
                    method: 'eth.signMessage',
                    params: {
                        data: data,
                        isPersonalSign,
                        sender: checksumAddress,
                        path: IMKEY_ETH_PATH,
                    },
                    id: requestId++,
                }, isNative());
                let sigRet = (_a = ret.result) === null || _a === void 0 ? void 0 : _a.signature.toLowerCase();
                if (!sigRet.startsWith('0x')) {
                    sigRet = '0x' + sigRet;
                }
                callback === null || callback === void 0 ? void 0 : callback(null, sigRet);
                return sigRet;
            }
            catch (error) {
                callback === null || callback === void 0 ? void 0 : callback(error, null);
                throw createProviderRpcError(4001, error);
            }
        });
    }
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
function callImKeyApi(arg, isNative = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNative) {
            console.log('native222');
            console.log(JSON.stringify(arg));
            transport = yield TransportWebUSB.create();
            ETH = new Eth(transport);
            let param = JSON.parse(JSON.stringify(arg)).params;
            let json;
            if (arg.method === 'eth.signMessage') {
                console.log('param:');
                console.log(param);
                json = yield ETH.signMessage(param.path, param.data, param.sender, param.isPersonalSign);
            }
            if (arg.method === 'eth.signTransaction') {
                console.log('param:');
                console.log(param);
                json = yield ETH.signTransaction(param.transaction);
            }
            if (arg.method === 'eth.getAddress') {
                json = yield ETH.getAddress(param.path);
            }
            yield transport.close();
            console.log('返回的数据：');
            console.log(json);
            if (json.error) {
                if (json.error.message.includes('ImkeyUserNotConfirmed')) {
                    throw new Error('user not confirmed');
                }
                else {
                    throw new Error(json.error.message);
                }
            }
            else {
                return { result: json };
            }
        }
        else {
            console.log('rpc');
            return callRpcApi(arg);
        }
    });
}
function callRpcApi(arg) {
    return postData(IMKEY_MANAGER_ENDPOINT, arg).then((json) => {
        if (json.error) {
            if (json.error.message.includes('ImkeyUserNotConfirmed')) {
                throw new Error('user not confirmed');
            }
            else {
                throw new Error(json.error.message);
            }
        }
        else {
            return json;
        }
    });
}
function postData(url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer', // *client, no-referrer
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        else {
            throw new Error('HttpError');
        }
    });
}

export default ImKeyProvider;
