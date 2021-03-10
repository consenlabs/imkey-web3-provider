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
        var _ret, req, typedData, test_buffer, test_hash, privateKey, test_sig, eip712HashHexWithoutSha3, eip712HashHex, jsonobj, buffer, hash, withoutsha3, sig, payload;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("request: ", args);
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 4 : _context3.t0 === "personal_listAccounts" ? 5 : _context3.t0 === "eth_accounts" ? 5 : _context3.t0 === "eth_requestAccounts" ? 5 : _context3.t0 === "personal_sign" ? 8 : _context3.t0 === "eth_signTransaction" ? 11 : _context3.t0 === "eth_sendTransaction" ? 14 : _context3.t0 === "eth_sign" ? 21 : _context3.t0 === "eth_signTypedData" ? 24 : _context3.t0 === "eth_signTypedData_v3" ? 24 : _context3.t0 === "eth_signTypedData_v4" ? 25 : 48;
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
                console.log("eth_signTypedData_v4 imtoken eip712HashHexWithoutSha3: ", eip712HashHexWithoutSha3);
                eip712HashHex = ethUtil.bufferToHex(ethUtil.sha3(eip712HashHexWithoutSha3));
                console.log("eth_signTypedData_v4 imtoken hash: ", eip712HashHex);
                jsonobj = JSON.parse(args.params[1]);
                buffer = sigutil.TypedDataUtils.sign(jsonobj);
                hash = ethUtil.bufferToHex(buffer);
                console.log("eth_signTypedData_v4 hash: ", hash);
                withoutsha3 = _eip["default"].signHashHex(jsonobj, true);
                console.log("eth_signTypedData_v4 withoutsha3: ", withoutsha3);
                _context3.next = 45;
                return this.imKeySign(requestId++, withoutsha3, args.params[0], false);

              case 45:
                sig = _context3.sent;
                console.log("eth_signTypedData_v4 sign: ", sig); // const sig = ethUtil.ecsign(buffer, privateKey);
                // console.log("eth_signTypedData_v4 sig:",ethUtil.bufferToHex(sigutil.concatSig(sig.v, sig.r, sig.s)))

                return _context3.abrupt("return", sig);

              case 48:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 51;
                return this.callInnerProviderApi(payload);

              case 51:
                return _context3.abrupt("return", _context3.sent);

              case 52:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImltS2V5U2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmV0IiwicmF3IiwidHlwZWREYXRhIiwidHlwZXMiLCJFSVA3MTJEb21haW4iLCJ0eXBlIiwiUGVyc29uIiwiTWFpbCIsIkdyb3VwIiwiZG9tYWluIiwidmVyc2lvbiIsInZlcmlmeWluZ0NvbnRyYWN0IiwicHJpbWFyeVR5cGUiLCJmcm9tIiwid2FsbGV0cyIsInRvIiwiY29udGVudHMiLCJ0ZXN0X2J1ZmZlciIsInNpZ3V0aWwiLCJUeXBlZERhdGFVdGlscyIsInNpZ24iLCJ0ZXN0X2hhc2giLCJldGhVdGlsIiwiYnVmZmVyVG9IZXgiLCJwcml2YXRlS2V5IiwiQnVmZmVyIiwidGVzdF9zaWciLCJlY3NpZ24iLCJjb25jYXRTaWciLCJ2IiwiciIsInMiLCJlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMiLCJpbVRva2VuRWlwNzEyVXRpbHMiLCJzaWduSGFzaEhleCIsImVpcDcxMkhhc2hIZXgiLCJzaGEzIiwianNvbm9iaiIsIkpTT04iLCJwYXJzZSIsImJ1ZmZlciIsImhhc2giLCJ3aXRob3V0c2hhMyIsInNpZyIsInBheWxvYWQiLCJjYWxsYmFjayIsInJlcXVlc3QiLCJ0aGVuIiwiZXJyIiwiY2FsbEltS2V5QXBpIiwicGF0aCIsImFkZHJlc3MiLCJ0cmFuc2FjdGlvbkNvbmZpZyIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJnYXNQcmljZURlYyIsImdhc1ByaWNlUmV0Iiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsIm51bWJlclRvSGV4IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwic2lnbmF0dXJlIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJieXRlc1RvSGV4IiwidHhIYXNoIiwiZGF0YVRvU2lnbiIsImlzUGVyc29uYWxTaWduIiwiaXNJbnRlZ2VyIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0IiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsInVybCIsImZldGNoIiwiYm9keSIsInN0cmluZ2lmeSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJl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QUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNYLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSXZHLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmltcG9ydCAqIGFzIHNpZ3V0aWwgZnJvbSBcImV0aC1zaWctdXRpbFwiO1xuaW1wb3J0ICogYXMgZXRoVXRpbCBmcm9tICdldGhlcmV1bWpzLXV0aWwnXG5pbXBvcnQgaW1Ub2tlbkVpcDcxMlV0aWxzIGZyb20gJy4vZWlwNzEyJztcblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmVxdWVzdDogXCIsYXJncylcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwicGVyc29uYWxfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24ocmVxdWVzdElkKyssIGFyZ3MucGFyYW1zIVswXSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NlbmRUcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX3NlbmRSYXdUcmFuc2FjdGlvblwiLCBbcmV0LnJhd10pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgNDIwMCxcbiAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICk7XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICBjb25zb2xlLmxvZygnZXRoX3NpZ25UeXBlZERhdGFfdjQgYXJnczonLGFyZ3MpXG4gICAgICAgIGNvbnN0IHR5cGVkRGF0YSA9IHtcbiAgICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgRUlQNzEyRG9tYWluOiBbXG4gICAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICd2ZXJzaW9uJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnY2hhaW5JZCcsIHR5cGU6ICd1aW50MjU2JyB9LFxuICAgICAgICAgICAgICB7IG5hbWU6ICd2ZXJpZnlpbmdDb250cmFjdCcsIHR5cGU6ICdhZGRyZXNzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFBlcnNvbjogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnd2FsbGV0cycsIHR5cGU6ICdhZGRyZXNzW10nIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgTWFpbDogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICdmcm9tJywgdHlwZTogJ1BlcnNvbicgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAndG8nLCB0eXBlOiAnUGVyc29uW10nIH0sXG4gICAgICAgICAgICAgIHsgbmFtZTogJ2NvbnRlbnRzJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBHcm91cDogW1xuICAgICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgeyBuYW1lOiAnbWVtYmVycycsIHR5cGU6ICdQZXJzb25bXScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkb21haW46IHtcbiAgICAgICAgICAgIG5hbWU6ICdFdGhlciBNYWlsJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxJyxcbiAgICAgICAgICAgIGNoYWluSWQ6IDEsXG4gICAgICAgICAgICB2ZXJpZnlpbmdDb250cmFjdDogJzB4Q2NDQ2NjY2NDQ0NDY0NDQ0NDQ2NDY0NjY0NjQ0NDY0NjY2NjY2NjQycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmltYXJ5VHlwZTogJ01haWwnIGFzIGNvbnN0LFxuICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIGZyb206IHtcbiAgICAgICAgICAgICAgbmFtZTogJ0NvdycsXG4gICAgICAgICAgICAgIHdhbGxldHM6IFtcbiAgICAgICAgICAgICAgICAnMHhDRDJhM2Q5RjkzOEUxM0NEOTQ3RWMwNUFiQzdGRTczNERmOEREODI2JyxcbiAgICAgICAgICAgICAgICAnMHhEZWFEYmVlZmRFQWRiZWVmZEVhZGJFRUZkZWFkYmVFRmRFYURiZWVGJyxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0bzogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0JvYicsXG4gICAgICAgICAgICAgICAgd2FsbGV0czogW1xuICAgICAgICAgICAgICAgICAgJzB4YkJiQkJCQmJiQkJCYmJiQmJiQmJiYmJCQmJCYmJiYkJiQmJiQkJiQicsXG4gICAgICAgICAgICAgICAgICAnMHhCMEJkYUJlYTU3QjBCREFCZUE1N2IwYmRBQkVBNTdiMEJEYWJFYTU3JyxcbiAgICAgICAgICAgICAgICAgICcweEIwQjBiMGIwYjBiMEIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY29udGVudHM6ICdIZWxsbywgQm9iIScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdGVzdF9idWZmZXIgPSBzaWd1dGlsLlR5cGVkRGF0YVV0aWxzLnNpZ24odHlwZWREYXRhKTtcbiAgICAgICAgY29uc3QgdGVzdF9oYXNoID0gZXRoVXRpbC5idWZmZXJUb0hleCh0ZXN0X2J1ZmZlcilcbiAgICAgICAgY29uc29sZS5sb2coJ2V0aF9zaWduVHlwZWREYXRhX3Y0IHRlc3QgaGFzaDonLHRlc3RfaGFzaClcblxuICAgICAgICBjb25zdCBwcml2YXRlS2V5ID0gQnVmZmVyLmZyb20oJ2NjZTY0NTg1ZTNiMTVhMGU0ZWU2MDFhNDY3ZTA1MGM5NTA0YTBkYjY5YTU1OWQ3ZWM0MTZmYTI1YWQzNDEwYzInLCAnaGV4JylcbiAgICAgICAgY29uc3QgdGVzdF9zaWcgPSBldGhVdGlsLmVjc2lnbih0ZXN0X2J1ZmZlciwgcHJpdmF0ZUtleSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdldGhfc2lnblR5cGVkRGF0YV92NCB0ZXN0IHNpZzonLGV0aFV0aWwuYnVmZmVyVG9IZXgoc2lndXRpbC5jb25jYXRTaWcodGVzdF9zaWcudiwgdGVzdF9zaWcuciwgdGVzdF9zaWcucykpKVxuXG4gICAgICAgIGNvbnN0IGVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMyA9IGltVG9rZW5FaXA3MTJVdGlscy5zaWduSGFzaEhleChcbiAgICAgICAgICB0eXBlZERhdGEsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXRoX3NpZ25UeXBlZERhdGFfdjQgaW10b2tlbiBlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTM6IFwiLGVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMylcbiAgICAgICAgY29uc3QgZWlwNzEySGFzaEhleCA9IGV0aFV0aWwuYnVmZmVyVG9IZXgoXG4gICAgICAgICAgZXRoVXRpbC5zaGEzKGVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMylcbiAgICAgICAgKVxuICAgICAgICBjb25zb2xlLmxvZyhcImV0aF9zaWduVHlwZWREYXRhX3Y0IGltdG9rZW4gaGFzaDogXCIsZWlwNzEySGFzaEhleClcblxuICAgICAgICBjb25zdCBqc29ub2JqID0gSlNPTi5wYXJzZShhcmdzLnBhcmFtcyFbMV0pXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHNpZ3V0aWwuVHlwZWREYXRhVXRpbHMuc2lnbihqc29ub2JqKTtcbiAgICAgICAgY29uc3QgaGFzaCA9IGV0aFV0aWwuYnVmZmVyVG9IZXgoYnVmZmVyKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXRoX3NpZ25UeXBlZERhdGFfdjQgaGFzaDogXCIsaGFzaClcbiAgICAgICAgY29uc3Qgd2l0aG91dHNoYTMgPSBpbVRva2VuRWlwNzEyVXRpbHMuc2lnbkhhc2hIZXgoXG4gICAgICAgICAganNvbm9iaixcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgICAgY29uc29sZS5sb2coXCJldGhfc2lnblR5cGVkRGF0YV92NCB3aXRob3V0c2hhMzogXCIsd2l0aG91dHNoYTMpXG5cbiAgICAgICAgY29uc3Qgc2lnID0gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgd2l0aG91dHNoYTMsXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXRoX3NpZ25UeXBlZERhdGFfdjQgc2lnbjogXCIsc2lnKVxuICAgICAgICAvLyBjb25zdCBzaWcgPSBldGhVdGlsLmVjc2lnbihidWZmZXIsIHByaXZhdGVLZXkpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImV0aF9zaWduVHlwZWREYXRhX3Y0IHNpZzpcIixldGhVdGlsLmJ1ZmZlclRvSGV4KHNpZ3V0aWwuY29uY2F0U2lnKHNpZy52LCBzaWcuciwgc2lnLnMpKSlcbiAgICAgICAgcmV0dXJuIHNpZ1xuICAgICAgICAvLyByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgIC8vICAgcmVxdWVzdElkKyssXG4gICAgICAgIC8vICAgbWVzc2FnZSxcbiAgICAgICAgLy8gICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgIC8vICAgZmFsc2VcbiAgICAgICAgLy8gKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuICAgICAgbGV0IHNpZ25hdHVyZSA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZTtcbiAgICAgIGlmICghc2lnbmF0dXJlLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWduYXR1cmUgPSBcIjB4XCIgKyBzaWduYXR1cmU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHNpZ25hdHVyZSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogc2lnbmF0dXJlLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgaXNQZXJzb25hbFNpZ246IGJvb2xlYW4sXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZCxcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgaXNQZXJzb25hbFNpZ24sXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIG11c3QgbWF0Y2ggJ0NvbnRlbnQtVHlwZScgaGVhZGVyXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIC8vIGluY2x1ZGUsIHNhbWUtb3JpZ2luLCAqb21pdFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNC4wIE1ETiBFeGFtcGxlXCIsXG4gICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXG4gICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gKmNsaWVudCwgbm8tcmVmZXJyZXJcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cEVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=