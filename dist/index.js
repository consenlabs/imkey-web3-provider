"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _web = _interopRequireDefault(require("web3"));

var rlp = _interopRequireWildcard(require("rlp"));

var _eventEmitterEs = _interopRequireDefault(require("event-emitter-es6"));

var _bn = _interopRequireDefault(require("bn.js"));

var sigutil = _interopRequireWildcard(require("eth-sig-util"));

var ethUtil = _interopRequireWildcard(require("ethereumjs-util"));

var _eip = _interopRequireDefault(require("./eip712"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
var IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
var requestId = 0;

function createJsonRpcRequest(method) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    id: requestId++,
    jsonrpc: "2.0",
    method: method,
    params: params
  };
}

function createJsonRpcResponse(id, result) {
  return {
    id: id,
    jsonrpc: "2.0",
    result: result
  };
}

function createProviderRpcError(code, message) {
  return {
    message: message,
    code: code
  };
}

function chainId2InfuraNetwork(chainId) {
  switch (chainId) {
    case 3:
      return "ropsten";

    case 4:
      return "rinkeby";

    case 5:
      return "goerli";

    case 42:
      return "kovan";

    default:
      return "mainnet";
  }
}

function parseArgsNum(num) {
  if (num instanceof _bn["default"]) {
    return num.toNumber().toString();
  } else if (typeof num === "string" && _web["default"].utils.isHex(num)) {
    return _web["default"].utils.hexToNumberString(num);
  } else {
    return num.toString();
  }
}

var ImKeyProvider = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(ImKeyProvider, _EventEmitter);

  var _super = _createSuper(ImKeyProvider);

  // @ts-ignore
  function ImKeyProvider(config) {
    var _config$chainId;

    var _this;

    (0, _classCallCheck2["default"])(this, ImKeyProvider);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "httpProvider", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "chainId", void 0);
    var rpcUrl = config.rpcUrl;
    _this.chainId = (_config$chainId = config.chainId) !== null && _config$chainId !== void 0 ? _config$chainId : 1;

    if (config.infuraId) {
      var network = chainId2InfuraNetwork(_this.chainId);
      rpcUrl = "https://".concat(network, ".infura.io/v3/").concat(config.infuraId);
    } // @ts-ignore


    var headers = null;

    if (config.headers) {
      headers = [];

      for (var idx in config.headers) {
        headers.push({
          name: idx,
          value: config.headers[idx]
        });
      }
    }

    _this.httpProvider = new _web["default"].providers.HttpProvider(rpcUrl, {
      headers: headers
    });
    return _this;
  }

  (0, _createClass2["default"])(ImKeyProvider, [{
    key: "callInnerProviderApi",
    value: function () {
      var _callInnerProviderApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.httpProvider.send(req, function (error, result) {
                    if (error) {
                      reject(createProviderRpcError(4001, error.message));
                    } else {
                      resolve(result.result);
                    }
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function callInnerProviderApi(_x) {
        return _callInnerProviderApi.apply(this, arguments);
      }

      return callInnerProviderApi;
    }()
  }, {
    key: "enable",
    value: function () {
      var _enable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var accounts, chainIdHex, chainId;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.imKeyRequestAccounts(requestId++);

              case 2:
                accounts = _context2.sent;
                _context2.next = 5;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_chainId"));

              case 5:
                chainIdHex = _context2.sent;
                chainId = _web["default"].utils.hexToNumber(chainIdHex);

                if (!(chainId !== this.chainId)) {
                  _context2.next = 11;
                  break;
                }

                throw new Error("chain id and rpc endpoint don't match");

              case 11:
                this.emit("connect", {
                  chainId: chainId
                });
                return _context2.abrupt("return", accounts);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enable() {
        return _enable.apply(this, arguments);
      }

      return enable;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(args) {
        var _ret, req, typedData, test_buffer, test_hash, privateKey, test_sig, eip712HashHexWithoutSha3, eip712HashHex, jsonobj, buffer, hash, sig, payload;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("request: ", args);
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 4 : _context3.t0 === "personal_listAccounts" ? 5 : _context3.t0 === "eth_accounts" ? 5 : _context3.t0 === "eth_requestAccounts" ? 5 : _context3.t0 === "personal_sign" ? 8 : _context3.t0 === "eth_signTransaction" ? 11 : _context3.t0 === "eth_sendTransaction" ? 14 : _context3.t0 === "eth_sign" ? 21 : _context3.t0 === "eth_signTypedData" ? 24 : _context3.t0 === "eth_signTypedData_v3" ? 24 : _context3.t0 === "eth_signTypedData_v4" ? 25 : 45;
                break;

              case 4:
                return _context3.abrupt("return", this.chainId);

              case 5:
                _context3.next = 7;
                return this.imKeyRequestAccounts(requestId++);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 8:
                _context3.next = 10;
                return this.imKeySign(requestId++, args.params[0], args.params[1], true);

              case 10:
                return _context3.abrupt("return", _context3.sent);

              case 11:
                _context3.next = 13;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 13:
                return _context3.abrupt("return", _context3.sent);

              case 14:
                _context3.next = 16;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 16:
                _ret = _context3.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret.raw]);
                _context3.next = 20;
                return this.callInnerProviderApi(req);

              case 20:
                return _context3.abrupt("return", _context3.sent);

              case 21:
                _context3.next = 23;
                return this.imKeySign(requestId++, args.params[1], args.params[0], false);

              case 23:
                return _context3.abrupt("return", _context3.sent);

              case 24:
                return _context3.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 25:
                console.log('eth_signTypedData_v4 args:', args);
                typedData = {
                  types: {
                    EIP712Domain: [{
                      name: 'name',
                      type: 'string'
                    }, {
                      name: 'version',
                      type: 'string'
                    }, {
                      name: 'chainId',
                      type: 'uint256'
                    }, {
                      name: 'verifyingContract',
                      type: 'address'
                    }],
                    Person: [{
                      name: 'name',
                      type: 'string'
                    }, {
                      name: 'wallets',
                      type: 'address[]'
                    }],
                    Mail: [{
                      name: 'from',
                      type: 'Person'
                    }, {
                      name: 'to',
                      type: 'Person[]'
                    }, {
                      name: 'contents',
                      type: 'string'
                    }],
                    Group: [{
                      name: 'name',
                      type: 'string'
                    }, {
                      name: 'members',
                      type: 'Person[]'
                    }]
                  },
                  domain: {
                    name: 'Ether Mail',
                    version: '1',
                    chainId: 1,
                    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
                  },
                  primaryType: 'Mail',
                  message: {
                    from: {
                      name: 'Cow',
                      wallets: ['0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF']
                    },
                    to: [{
                      name: 'Bob',
                      wallets: ['0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57', '0xB0B0b0b0b0b0B000000000000000000000000000']
                    }],
                    contents: 'Hello, Bob!'
                  }
                };
                test_buffer = sigutil.TypedDataUtils.sign(typedData);
                test_hash = ethUtil.bufferToHex(test_buffer);
                console.log('eth_signTypedData_v4 test hash:', test_hash);
                privateKey = Buffer.from('cce64585e3b15a0e4ee601a467e050c9504a0db69a559d7ec416fa25ad3410c2', 'hex');
                test_sig = ethUtil.ecsign(test_buffer, privateKey);
                console.log('eth_signTypedData_v4 test sig:', ethUtil.bufferToHex(sigutil.concatSig(test_sig.v, test_sig.r, test_sig.s)));
                eip712HashHexWithoutSha3 = _eip["default"].signHashHex(typedData, true);
                eip712HashHex = ethUtil.bufferToHex(ethUtil.sha3(eip712HashHexWithoutSha3));
                console.log("eth_signTypedData_v4 imtoken hash: ", eip712HashHex);
                jsonobj = JSON.parse(args.params[1]);
                buffer = sigutil.TypedDataUtils.sign(jsonobj);
                hash = ethUtil.bufferToHex(buffer);
                console.log("eth_signTypedData_v4 hash: ", hash);
                _context3.next = 42;
                return this.imKeySign(requestId++, hash, args.params[0], false);

              case 42:
                sig = _context3.sent;
                console.log("eth_signTypedData_v4 sign: ", sig); // const sig = ethUtil.ecsign(buffer, privateKey);
                // console.log("eth_signTypedData_v4 sig:",ethUtil.bufferToHex(sigutil.concatSig(sig.v, sig.r, sig.s)))

                return _context3.abrupt("return", sig);

              case 45:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 48;
                return this.callInnerProviderApi(payload);

              case 48:
                return _context3.abrupt("return", _context3.sent);

              case 49:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function request(_x2) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "sendAsync",
    value: function sendAsync(args, callback) {
      this.request(args).then(function (ret) {
        return callback(null, createJsonRpcResponse(args.id, ret));
      })["catch"](function (err) {
        return callback(err, null);
      });
    }
  }, {
    key: "imKeyRequestAccounts",
    value: function () {
      var _imKeyRequestAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, callback) {
        var _ret2$result, _ret2$result2, _ret2;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.getAddress",
                  params: {
                    path: IMKEY_ETH_PATH
                  },
                  id: requestId++
                });

              case 3:
                _ret2 = _context4.sent;
                callback === null || callback === void 0 ? void 0 : callback(null, [(_ret2$result = _ret2.result) === null || _ret2$result === void 0 ? void 0 : _ret2$result.address]);
                return _context4.abrupt("return", [(_ret2$result2 = _ret2.result) === null || _ret2$result2 === void 0 ? void 0 : _ret2$result2.address]);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                callback === null || callback === void 0 ? void 0 : callback(_context4.t0, null);
                throw createProviderRpcError(4001, _context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function imKeyRequestAccounts(_x3, _x4) {
        return _imKeyRequestAccounts.apply(this, arguments);
      }

      return imKeyRequestAccounts;
    }()
  }, {
    key: "imKeySignTransaction",
    value: function () {
      var _imKeySignTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, transactionConfig, callback) {
        var from, accounts, gasPriceDec, gasPriceRet, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret3$result, _ret3$result2, _ret3, signature, decoded, rlpTX;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!transactionConfig.to || !transactionConfig.value)) {
                  _context5.next = 2;
                  break;
                }

                throw createProviderRpcError(-32602, "expected to,value");

              case 2:
                if (!(!transactionConfig.from || typeof transactionConfig.from === "number")) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 5;
                return this.imKeyRequestAccounts(requestId++);

              case 5:
                accounts = _context5.sent;
                from = accounts[0];
                _context5.next = 10;
                break;

              case 9:
                from = _web["default"].utils.toChecksumAddress(transactionConfig.from);

              case 10:
                if (!transactionConfig.gasPrice) {
                  _context5.next = 14;
                  break;
                }

                gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
                _context5.next = 18;
                break;

              case 14:
                _context5.next = 16;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 16:
                gasPriceRet = _context5.sent;
                gasPriceDec = _web["default"].utils.hexToNumberString(gasPriceRet);

              case 18:
                if (!transactionConfig.chainId) {
                  _context5.next = 24;
                  break;
                }

                if (!(transactionConfig.chainId !== this.chainId)) {
                  _context5.next = 21;
                  break;
                }

                throw createProviderRpcError(-32602, "expected chainId and connected chainId are mismatched");

              case 21:
                chainId = transactionConfig.chainId;
                _context5.next = 25;
                break;

              case 24:
                chainId = this.chainId;

              case 25:
                if (!transactionConfig.nonce) {
                  _context5.next = 29;
                  break;
                }

                nonce = parseArgsNum(transactionConfig.nonce);
                _context5.next = 33;
                break;

              case 29:
                _context5.next = 31;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_getTransactionCount", [transactionConfig.from, "pending"]));

              case 31:
                nonce = _context5.sent;
                nonce = _web["default"].utils.hexToNumber(nonce).toString();

              case 33:
                if (!transactionConfig.gas) {
                  _context5.next = 37;
                  break;
                }

                gasLimit = parseArgsNum(transactionConfig.gas);
                _context5.next = 41;
                break;

              case 37:
                _context5.next = 39;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.to,
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 39:
                gasRet = _context5.sent;
                gasLimit = parseArgsNum(gasRet);

              case 41:
                //fee
                fee = (BigInt(gasLimit) * BigInt(gasPriceDec)).toString(); //wei

                fee = _web["default"].utils.fromWei(fee, "Gwei"); //to Gwei

                temp = Math.ceil(Number(fee));
                fee = (temp * 1000000000).toString(); //to ether

                fee = _web["default"].utils.fromWei(fee) + " ether";
                to = _web["default"].utils.toChecksumAddress(transactionConfig.to);
                value = parseArgsNum(transactionConfig.value);
                valueInWei = _web["default"].utils.fromWei(value);
                _context5.prev = 49;
                _context5.next = 52;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.signTransaction",
                  params: {
                    transaction: {
                      data: transactionConfig.data,
                      gasLimit: gasLimit,
                      gasPrice: gasPriceDec,
                      nonce: nonce,
                      to: to,
                      value: value,
                      chainId: chainId,
                      path: IMKEY_ETH_PATH
                    },
                    preview: {
                      payment: valueInWei + " ETH",
                      receiver: to,
                      sender: from,
                      fee: fee
                    }
                  },
                  id: requestId++
                });

              case 52:
                _ret3 = _context5.sent;
                signature = (_ret3$result = _ret3.result) === null || _ret3$result === void 0 ? void 0 : _ret3$result.signature;

                if (!signature.startsWith("0x")) {
                  signature = "0x" + signature;
                }

                decoded = rlp.decode(signature, true);
                rlpTX = {
                  raw: signature,
                  tx: {
                    nonce: nonce,
                    gasPrice: gasPriceDec,
                    gas: gasLimit,
                    to: to,
                    value: valueInWei,
                    input: transactionConfig.data,
                    // @ts-ignore
                    r: _web["default"].utils.bytesToHex(decoded.data[7]),
                    // @ts-ignore
                    s: _web["default"].utils.bytesToHex(decoded.data[8]),
                    // @ts-ignore
                    v: _web["default"].utils.bytesToHex(decoded.data[6]),
                    hash: (_ret3$result2 = _ret3.result) === null || _ret3$result2 === void 0 ? void 0 : _ret3$result2.txHash
                  }
                };
                callback === null || callback === void 0 ? void 0 : callback(null, rlpTX);
                return _context5.abrupt("return", rlpTX);

              case 61:
                _context5.prev = 61;
                _context5.t0 = _context5["catch"](49);
                callback === null || callback === void 0 ? void 0 : callback(_context5.t0, null);
                throw createProviderRpcError(4001, _context5.t0);

              case 65:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[49, 61]]);
      }));

      function imKeySignTransaction(_x5, _x6, _x7) {
        return _imKeySignTransaction.apply(this, arguments);
      }

      return imKeySignTransaction;
    }()
  }, {
    key: "imKeySign",
    value: function () {
      var _imKeySign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, dataToSign, address, isPersonalSign, callback) {
        var _error, data, checksumAddress, _ret4$result, _ret4, sigRet;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!Number.isInteger(address)) {
                  _context6.next = 4;
                  break;
                }

                _error = createProviderRpcError(-32602, "Pass the address to sign data with for now");
                callback === null || callback === void 0 ? void 0 : callback({
                  name: "address invalid",
                  message: "Pass the address to sign data with for now"
                }, null);
                throw _error;

              case 4:
                data = "";

                try {
                  data = _web["default"].utils.toUtf8(dataToSign);
                } catch (error) {
                  data = dataToSign;
                }

                checksumAddress = _web["default"].utils.toChecksumAddress(address);
                _context6.prev = 7;
                _context6.next = 10;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.signMessage",
                  params: {
                    data: data,
                    isPersonalSign: isPersonalSign,
                    sender: checksumAddress,
                    path: IMKEY_ETH_PATH
                  },
                  id: requestId++
                });

              case 10:
                _ret4 = _context6.sent;
                sigRet = (_ret4$result = _ret4.result) === null || _ret4$result === void 0 ? void 0 : _ret4$result.signature.toLowerCase();

                if (!sigRet.startsWith("0x")) {
                  sigRet = "0x" + sigRet;
                }

                callback === null || callback === void 0 ? void 0 : callback(null, sigRet);
                return _context6.abrupt("return", sigRet);

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6["catch"](7);
                callback === null || callback === void 0 ? void 0 : callback(_context6.t0, null);
                throw createProviderRpcError(4001, _context6.t0);

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7, 17]]);
      }));

      function imKeySign(_x8, _x9, _x10, _x11, _x12) {
        return _imKeySign.apply(this, arguments);
      }

      return imKeySign;
    }()
  }]);
  return ImKeyProvider;
}(_eventEmitterEs["default"]);

exports["default"] = ImKeyProvider;

function callImKeyApi(arg) {
  return postData(IMKEY_MANAGER_ENDPOINT, arg).then(function (json) {
    if (json.error) {
      if (json.error.message.includes("ImkeyUserNotConfirmed")) {
        throw new Error("user not confirmed");
      } else {
        throw new Error(json.error.message);
      }
    } else {
      return json;
    }
  });
}

function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    // must match 'Content-Type' header
    cache: "no-cache",
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json"
    },
    method: "POST",
    // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    // no-cors, cors, *same-origin
    redirect: "follow",
    // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer

  }).then(function (response) {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error("HttpError");
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImltS2V5U2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmV0IiwicmF3IiwidHlwZWREYXRhIiwidHlwZXMiLCJFSVA3MTJEb21haW4iLCJ0eXBlIiwiUGVyc29uIiwiTWFpbCIsIkdyb3VwIiwiZG9tYWluIiwidmVyc2lvbiIsInZlcmlmeWluZ0NvbnRyYWN0IiwicHJpbWFyeVR5cGUiLCJmcm9tIiwid2FsbGV0cyIsInRvIiwiY29udGVudHMiLCJ0ZXN0X2J1ZmZlciIsInNpZ3V0aWwiLCJUeXBlZERhdGFVdGlscyIsInNpZ24iLCJ0ZXN0X2hhc2giLCJldGhVdGlsIiwiYnVmZmVyVG9IZXgiLCJwcml2YXRlS2V5IiwiQnVmZmVyIiwidGVzdF9zaWciLCJlY3NpZ24iLCJjb25jYXRTaWciLCJ2IiwiciIsInMiLCJlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMiLCJpbVRva2VuRWlwNzEyVXRpbHMiLCJzaWduSGFzaEhleCIsImVpcDcxMkhhc2hIZXgiLCJzaGEzIiwianNvbm9iaiIsIkpTT04iLCJwYXJzZSIsImJ1ZmZlciIsImhhc2giLCJzaWciLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwiZ2FzUHJpY2VEZWMiLCJnYXNQcmljZVJldCIsIm5vbmNlIiwiZ2FzIiwiZ2FzTGltaXQiLCJudW1iZXJUb0hleCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInNpZ25hdHVyZSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiYnl0ZXNUb0hleCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc1BlcnNvbmFsU2lnbiIsImlzSW50ZWdlciIsInRvVXRmOCIsImNoZWNrc3VtQWRkcmVzcyIsInNpZ1JldCIsInRvTG93ZXJDYXNlIiwiRXZlbnRFbWl0dGVyIiwiYXJnIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJzdHJpbmdpZnkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIi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YWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmltcG9ydCAqIGFzIHNpZ3V0aWwgZnJvbSBcImV0aC1zaWctdXRpbFwiO1xuaW1wb3J0ICogYXMgZXRoVXRpbCBmcm9tICdldGhlcmV1bWpzLXV0aWwnXG5pbXBvcnQgaW1Ub2tlbkVpcDcxMlV0aWxzIGZyb20gJy4vZWlwNzEyJztcblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdDogXCIsYXJncylcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwicGVyc29uYWxfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24ocmVxdWVzdElkKyssIGFyZ3MucGFyYW1zIVswXSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NlbmRUcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX3NlbmRSYXdUcmFuc2FjdGlvblwiLCBbcmV0LnJhd10pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgNDIwMCxcbiAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICk7XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICBjb25zb2xlLmxvZygnZXRoX3NpZ25UeXBlZERhdGFfdjQgYXJnczonLGFyZ3MpXG4gICAgICAgIGNvbnN0IHR5cGVkRGF0YSA9IHtcbiAgICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgRUlQNzEyRG9tYWluOiBbXG4gICAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICd2ZXJzaW9uJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnY2hhaW5JZCcsIHR5cGU6ICd1aW50MjU2JyB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICd2ZXJpZnlpbmdDb250cmFjdCcsIHR5cGU6ICdhZGRyZXNzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFBlcnNvbjogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnd2FsbGV0cycsIHR5cGU6ICdhZGRyZXNzW10nIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgTWFpbDogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICdmcm9tJywgdHlwZTogJ1BlcnNvbicgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAndG8nLCB0eXBlOiAnUGVyc29uW10nIH0sXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2NvbnRlbnRzJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBHcm91cDogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnbWVtYmVycycsIHR5cGU6ICdQZXJzb25bXScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkb21haW46IHtcbiAgICAgICAgICAgIG5hbWU6ICdFdGhlciBNYWlsJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxJyxcbiAgICAgICAgICAgIGNoYWluSWQ6IDEsXG4gICAgICAgICAgICB2ZXJpZnlpbmdDb250cmFjdDogJzB4Q2NDQ2NjY2NDQ0NDY0NDQ0NDQ2NDY0NjY0NjQ0NDY0NjY2NjY2NjQycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmltYXJ5VHlwZTogJ01haWwnIGFzIGNvbnN0LFxuICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgICAgbmFtZTogJ0NvdycsXG4gICAgICAgICAgICAgIHdhbGxldHM6IFtcbiAgICAgICAgICAgICAgICAnMHhDRDJhM2Q5RjkzOEUxM0NEOTQ3RWMwNUFiQzdGRTczNERmOEREODI2JyxcbiAgICAgICAgICAgICAgICAnMHhEZWFEYmVlZmRFQWRiZWVmZEVhZGJFRUZkZWFkYmVFRmRFYURiZWVGJyxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0bzogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0JvYicsXG4gICAgICAgICAgICAgICAgd2FsbGV0czogW1xuICAgICAgICAgICAgICAgICAgJzB4YkJiQkJCQmJiQkJCYmJiQmJiQmJiYmJCQmJCYmJiYkJiQmJiQkJiQicsXG4gICAgICAgICAgICAgICAgICAnMHhCMEJkYUJlYTU3QjBCREFCZUE1N2IwYmRBQkVBNTdiMEJEYWJFYTU3JyxcbiAgICAgICAgICAgICAgICAgICcweEIwQjBiMGIwYjBiMEIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY29udGVudHM6ICdIZWxsbywgQm9iIScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdGVzdF9idWZmZXIgPSBzaWd1dGlsLlR5cGVkRGF0YVV0aWxzLnNpZ24odHlwZWREYXRhKTtcbiAgICAgICAgY29uc3QgdGVzdF9oYXNoID0gZXRoVXRpbC5idWZmZXJUb0hleCh0ZXN0X2J1ZmZlcilcbiAgICAgICAgY29uc29sZS5sb2coJ2V0aF9zaWduVHlwZWREYXRhX3Y0IHRlc3QgaGFzaDonLHRlc3RfaGFzaClcblxuICAgICAgICBjb25zdCBwcml2YXRlS2V5ID0gQnVmZmVyLmZyb20oJ2NjZTY0NTg1ZTNiMTVhMGU0ZWU2MDFhNDY3ZTA1MGM5NTA0YTBkYjY5YTU1OWQ3ZWM0MTZmYTI1YWQzNDEwYzInLCAnaGV4JylcbiAgICAgICAgY29uc3QgdGVzdF9zaWcgPSBldGhVdGlsLmVjc2lnbih0ZXN0X2J1ZmZlciwgcHJpdmF0ZUtleSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdldGhfc2lnblR5cGVkRGF0YV92NCB0ZXN0IHNpZzonLGV0aFV0aWwuYnVmZmVyVG9IZXgoc2lndXRpbC5jb25jYXRTaWcodGVzdF9zaWcudiwgdGVzdF9zaWcuciwgdGVzdF9zaWcucykpKVxuXG4gICAgICAgIGNvbnN0IGVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMyA9IGltVG9rZW5FaXA3MTJVdGlscy5zaWduSGFzaEhleChcbiAgICAgICAgICB0eXBlZERhdGEsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGVpcDcxMkhhc2hIZXggPSBldGhVdGlsLmJ1ZmZlclRvSGV4KFxuICAgICAgICAgIGV0aFV0aWwuc2hhMyhlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMpXG4gICAgICAgIClcbiAgICAgICAgY29uc29sZS5sb2coXCJldGhfc2lnblR5cGVkRGF0YV92NCBpbXRva2VuIGhhc2g6IFwiLGVpcDcxMkhhc2hIZXgpXG5cbiAgICAgICAgY29uc3QganNvbm9iaiA9IEpTT04ucGFyc2UoYXJncy5wYXJhbXMhWzFdKVxuICAgICAgICBjb25zdCBidWZmZXIgPSBzaWd1dGlsLlR5cGVkRGF0YVV0aWxzLnNpZ24oanNvbm9iaik7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBldGhVdGlsLmJ1ZmZlclRvSGV4KGJ1ZmZlcilcblxuICAgICAgICBjb25zb2xlLmxvZyhcImV0aF9zaWduVHlwZWREYXRhX3Y0IGhhc2g6IFwiLGhhc2gpXG5cbiAgICAgICAgY29uc3Qgc2lnID0gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgaGFzaCxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJldGhfc2lnblR5cGVkRGF0YV92NCBzaWduOiBcIixzaWcpXG4gICAgICAgIC8vIGNvbnN0IHNpZyA9IGV0aFV0aWwuZWNzaWduKGJ1ZmZlciwgcHJpdmF0ZUtleSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZXRoX3NpZ25UeXBlZERhdGFfdjQgc2lnOlwiLGV0aFV0aWwuYnVmZmVyVG9IZXgoc2lndXRpbC5jb25jYXRTaWcoc2lnLnYsIHNpZy5yLCBzaWcucykpKVxuICAgICAgICByZXR1cm4gc2lnXG4gICAgICAgIC8vIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgLy8gICByZXF1ZXN0SWQrKyxcbiAgICAgICAgLy8gICBtZXNzYWdlLFxuICAgICAgICAvLyAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgLy8gICBmYWxzZVxuICAgICAgICAvLyApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgICAgLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNhbGxiYWNrKGVyciwgbnVsbCkpO1xuICB9XG5cbiAgYXN5bmMgaW1LZXlSZXF1ZXN0QWNjb3VudHMoXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLmdldEFkZHJlc3NcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBbcmV0LnJlc3VsdD8uYWRkcmVzc10pO1xuICAgICAgcmV0dXJuIFtyZXQucmVzdWx0Py5hZGRyZXNzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRyYW5zYWN0aW9uQ29uZmlnOiBUcmFuc2FjdGlvbkNvbmZpZyxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcudG8gfHwgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKC0zMjYwMiwgXCJleHBlY3RlZCB0byx2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fCB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZURlYzogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSkge1xuICAgICAgZ2FzUHJpY2VEZWMgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNQcmljZVJldCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlRGVjID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZVJldCk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZDtcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKSB7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbXG4gICAgICAgICAgdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICBcInBlbmRpbmdcIixcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZURlYykpLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25UcmFuc2FjdGlvblwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0cmFuc2FjdGlvbjoge1xuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAgIGdhc0xpbWl0LFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgcGF5bWVudDogdmFsdWVJbldlaSArIFwiIEVUSFwiLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHRvLFxuICAgICAgICAgICAgc2VuZGVyOiBmcm9tLFxuICAgICAgICAgICAgZmVlOiBmZWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBsZXQgc2lnbmF0dXJlID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlO1xuICAgICAgaWYgKCFzaWduYXR1cmUuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ25hdHVyZSA9IFwiMHhcIiArIHNpZ25hdHVyZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUoc2lnbmF0dXJlLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiBzaWduYXR1cmUsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVJbldlaSxcbiAgICAgICAgICBpbnB1dDogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgcjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs3XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHM6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbOF0pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB2OiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzZdKSxcbiAgICAgICAgICBoYXNoOiByZXQucmVzdWx0Py50eEhhc2gsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBybHBUWCk7XG4gICAgICByZXR1cm4gcmxwVFg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBpc1BlcnNvbmFsU2lnbjogYm9vbGVhbixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkLFxuICApIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhZGRyZXNzKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCJcbiAgICAgICk7XG4gICAgICBjYWxsYmFjaz8uKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhZGRyZXNzIGludmFsaWRcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiLFxuICAgICAgICB9LFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gV2ViMy51dGlscy50b1V0ZjgoZGF0YVRvU2lnbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRhdGEgPSBkYXRhVG9TaWduO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrc3VtQWRkcmVzcyA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcyBhcyBzdHJpbmcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnbk1lc3NhZ2VcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBpc1BlcnNvbmFsU2lnbixcbiAgICAgICAgICBzZW5kZXI6IGNoZWNrc3VtQWRkcmVzcyxcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBzaWdSZXQgPSByZXQucmVzdWx0Py5zaWduYXR1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghc2lnUmV0LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBwb3N0RGF0YShJTUtFWV9NQU5BR0VSX0VORFBPSU5ULCBhcmcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==