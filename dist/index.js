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

var _httpheaderprovider = _interopRequireDefault(require("httpheaderprovider"));

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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "infuraProvider", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "chainId", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "configProvider", void 0);
    var rpcUrl = config.rpcUrl;
    _this.chainId = (_config$chainId = config.chainId) !== null && _config$chainId !== void 0 ? _config$chainId : 1;

    if (config.infuraId) {
      var network = chainId2InfuraNetwork(_this.chainId);
      rpcUrl = "https://".concat(network, ".infura.io/v3/").concat(config.infuraId);
    } // @ts-ignore


    _this.infuraProvider = new _web["default"].providers.HttpProvider(rpcUrl);

    if (config.headers) {
      _this.configProvider = new _httpheaderprovider["default"](rpcUrl, config.headers);
    }

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
                  _this2.infuraProvider.send(req, function (error, result) {
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
    key: "callProviderApiWithHeader",
    value: function () {
      var _callProviderApiWithHeader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
        var _this3 = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  _this3.configProvider.send(req, function (error, result) {
                    if (error) {
                      reject(createProviderRpcError(4001, error.message));
                    } else {
                      resolve(result.result);
                    }
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function callProviderApiWithHeader(_x2) {
        return _callProviderApiWithHeader.apply(this, arguments);
      }

      return callProviderApiWithHeader;
    }()
  }, {
    key: "enable",
    value: function () {
      var _enable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var accounts, chainIdHex, chainId;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.imKeyRequestAccounts(requestId++);

              case 2:
                accounts = _context3.sent;
                _context3.next = 5;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_chainId"));

              case 5:
                chainIdHex = _context3.sent;
                chainId = _web["default"].utils.hexToNumber(chainIdHex);

                if (!(chainId !== this.chainId)) {
                  _context3.next = 11;
                  break;
                }

                throw new Error("chain id and rpc endpoint don't match");

              case 11:
                this.emit("connect", {
                  chainId: chainId
                });
                return _context3.abrupt("return", accounts);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function enable() {
        return _enable.apply(this, arguments);
      }

      return enable;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(args) {
        var _ret, req, rsp, payload;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = args.method;
                _context4.next = _context4.t0 === "eth_getChainId" ? 3 : _context4.t0 === "personal_listAccounts" ? 4 : _context4.t0 === "eth_accounts" ? 4 : _context4.t0 === "eth_requestAccounts" ? 4 : _context4.t0 === "personal_sign" ? 7 : _context4.t0 === "eth_signTransaction" ? 10 : _context4.t0 === "eth_sendTransaction" ? 13 : _context4.t0 === "eth_sign" ? 31 : _context4.t0 === "eth_signTypedData" ? 31 : _context4.t0 === "eth_signTypedData_v3" ? 31 : _context4.t0 === "eth_signTypedData_v4" ? 31 : 32;
                break;

              case 3:
                return _context4.abrupt("return", this.chainId);

              case 4:
                _context4.next = 6;
                return this.imKeyRequestAccounts(requestId++);

              case 6:
                return _context4.abrupt("return", _context4.sent);

              case 7:
                _context4.next = 9;
                return this.imKeyPersonalSign(requestId++, args.params[0], args.params[1]);

              case 9:
                return _context4.abrupt("return", _context4.sent);

              case 10:
                _context4.next = 12;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 12:
                return _context4.abrupt("return", _context4.sent);

              case 13:
                _context4.next = 15;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 15:
                _ret = _context4.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret.raw]);

                if (!this.configProvider) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 20;
                return this.callProviderApiWithHeader(req);

              case 20:
                rsp = _context4.sent;
                _context4.next = 26;
                break;

              case 23:
                _context4.next = 25;
                return this.callInnerProviderApi(req);

              case 25:
                rsp = _context4.sent;

              case 26:
                if (!rsp.txHash) {
                  _context4.next = 30;
                  break;
                }

                return _context4.abrupt("return", rsp.txHash);

              case 30:
                return _context4.abrupt("return", rsp);

              case 31:
                return _context4.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 32:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context4.next = 35;
                return this.callInnerProviderApi(payload);

              case 35:
                return _context4.abrupt("return", _context4.sent);

              case 36:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function request(_x3) {
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
      var _imKeyRequestAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, callback) {
        var _ret2$result, _ret2$result2, _ret2;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.getAddress",
                  params: {
                    path: IMKEY_ETH_PATH
                  },
                  id: requestId++
                });

              case 3:
                _ret2 = _context5.sent;
                callback === null || callback === void 0 ? void 0 : callback(null, [(_ret2$result = _ret2.result) === null || _ret2$result === void 0 ? void 0 : _ret2$result.address]);
                return _context5.abrupt("return", [(_ret2$result2 = _ret2.result) === null || _ret2$result2 === void 0 ? void 0 : _ret2$result2.address]);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                callback === null || callback === void 0 ? void 0 : callback(_context5.t0, null);
                throw createProviderRpcError(4001, _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }));

      function imKeyRequestAccounts(_x4, _x5) {
        return _imKeyRequestAccounts.apply(this, arguments);
      }

      return imKeyRequestAccounts;
    }()
  }, {
    key: "imKeySignTransaction",
    value: function () {
      var _imKeySignTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, transactionConfig, callback) {
        var from, accounts, gasPriceDec, gasPriceRet, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret3$result, _ret3$result2, _ret3$result2$txData, _ret3$result3, _ret3, txData, decoded, rlpTX;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!transactionConfig.to || !transactionConfig.value)) {
                  _context6.next = 2;
                  break;
                }

                throw createProviderRpcError(-32602, "expected to,value");

              case 2:
                if (!(!transactionConfig.from || typeof transactionConfig.from === "number")) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 5;
                return this.imKeyRequestAccounts(requestId++);

              case 5:
                accounts = _context6.sent;
                from = accounts[0];
                _context6.next = 10;
                break;

              case 9:
                from = _web["default"].utils.toChecksumAddress(transactionConfig.from);

              case 10:
                if (!transactionConfig.gasPrice) {
                  _context6.next = 14;
                  break;
                }

                gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
                _context6.next = 18;
                break;

              case 14:
                _context6.next = 16;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 16:
                gasPriceRet = _context6.sent;
                gasPriceDec = _web["default"].utils.hexToNumberString(gasPriceRet);

              case 18:
                if (!transactionConfig.chainId) {
                  _context6.next = 24;
                  break;
                }

                if (!(transactionConfig.chainId !== this.chainId)) {
                  _context6.next = 21;
                  break;
                }

                throw createProviderRpcError(-32602, "expected chainId and connected chainId are mismatched");

              case 21:
                chainId = transactionConfig.chainId;
                _context6.next = 25;
                break;

              case 24:
                chainId = this.chainId;

              case 25:
                if (!transactionConfig.nonce) {
                  _context6.next = 29;
                  break;
                }

                nonce = parseArgsNum(transactionConfig.nonce);
                _context6.next = 33;
                break;

              case 29:
                _context6.next = 31;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_getTransactionCount", [transactionConfig.from, "pending"]));

              case 31:
                nonce = _context6.sent;
                nonce = _web["default"].utils.hexToNumber(nonce).toString();

              case 33:
                if (!transactionConfig.gas) {
                  _context6.next = 37;
                  break;
                }

                gasLimit = parseArgsNum(transactionConfig.gas);
                _context6.next = 41;
                break;

              case 37:
                _context6.next = 39;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.to,
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 39:
                gasRet = _context6.sent;
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
                _context6.prev = 49;
                _context6.next = 52;
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
                _ret3 = _context6.sent;
                txData = (_ret3$result = _ret3.result) === null || _ret3$result === void 0 ? void 0 : _ret3$result.txData;

                if (!((_ret3$result2 = _ret3.result) === null || _ret3$result2 === void 0 ? void 0 : (_ret3$result2$txData = _ret3$result2.txData) === null || _ret3$result2$txData === void 0 ? void 0 : _ret3$result2$txData.startsWith("0x"))) {
                  txData = "0x" + txData;
                }

                decoded = rlp.decode(txData, true);
                rlpTX = {
                  raw: txData,
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
                    hash: (_ret3$result3 = _ret3.result) === null || _ret3$result3 === void 0 ? void 0 : _ret3$result3.txHash
                  }
                };
                callback === null || callback === void 0 ? void 0 : callback(null, rlpTX);
                return _context6.abrupt("return", rlpTX);

              case 61:
                _context6.prev = 61;
                _context6.t0 = _context6["catch"](49);
                callback === null || callback === void 0 ? void 0 : callback(_context6.t0, null);
                throw createProviderRpcError(4001, _context6.t0);

              case 65:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[49, 61]]);
      }));

      function imKeySignTransaction(_x6, _x7, _x8) {
        return _imKeySignTransaction.apply(this, arguments);
      }

      return imKeySignTransaction;
    }()
  }, {
    key: "imKeyPersonalSign",
    value: function () {
      var _imKeyPersonalSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id, dataToSign, address, callback) {
        var _error, data, checksumAddress, _ret4$result, _ret4, sigRet;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!Number.isInteger(address)) {
                  _context7.next = 4;
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
                _context7.prev = 7;
                _context7.next = 10;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.signMessage",
                  params: {
                    data: data,
                    sender: checksumAddress,
                    path: IMKEY_ETH_PATH
                  },
                  id: requestId++
                });

              case 10:
                _ret4 = _context7.sent;
                sigRet = (_ret4$result = _ret4.result) === null || _ret4$result === void 0 ? void 0 : _ret4$result.signature.toLowerCase();

                if (!sigRet.startsWith("0x")) {
                  sigRet = "0x" + sigRet;
                }

                callback === null || callback === void 0 ? void 0 : callback(null, sigRet);
                return _context7.abrupt("return", sigRet);

              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7["catch"](7);
                callback === null || callback === void 0 ? void 0 : callback(_context7.t0, null);
                throw createProviderRpcError(4001, _context7.t0);

              case 21:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[7, 17]]);
      }));

      function imKeyPersonalSign(_x9, _x10, _x11, _x12) {
        return _imKeyPersonalSign.apply(this, arguments);
      }

      return imKeyPersonalSign;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImluZnVyYVByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwiaGVhZGVycyIsImNvbmZpZ1Byb3ZpZGVyIiwiSHR0cEhlYWRlclByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiaW1LZXlQZXJzb25hbFNpZ24iLCJpbUtleVNpZ25UcmFuc2FjdGlvbiIsInJldCIsInJhdyIsImNhbGxQcm92aWRlckFwaVdpdGhIZWFkZXIiLCJyc3AiLCJ0eEhhc2giLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsInZhbHVlIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJnYXNQcmljZURlYyIsImdhc1ByaWNlUmV0Iiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsIm51bWJlclRvSGV4IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwidHhEYXRhIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsImRhdGFUb1NpZ24iLCJpc0ludGVnZXIiLCJuYW1lIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0Iiwic2lnbmF0dXJlIiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsInVybCIsImZldGNoIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJyZXNwb25zZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7O0FBY0EsSUFBTUEsc0JBQXNCLEdBQUcsaUNBQS9CO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLGtCQUF2QjtBQUNBLElBQUlDLFNBQVMsR0FBRyxDQUFoQjs7QUFFQSxTQUFTQyxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBa0U7QUFBQSxNQUFwQkMsTUFBb0IsdUVBQUosRUFBSTtBQUNoRSxTQUFPO0FBQ0xDLElBQUFBLEVBQUUsRUFBRUosU0FBUyxFQURSO0FBRUxLLElBQUFBLE9BQU8sRUFBRSxLQUZKO0FBR0xILElBQUFBLE1BQU0sRUFBTkEsTUFISztBQUlMQyxJQUFBQSxNQUFNLEVBQU5BO0FBSkssR0FBUDtBQU1EOztBQUVELFNBQVNHLHFCQUFULENBQStCRixFQUEvQixFQUFvREcsTUFBcEQsRUFBaUU7QUFDL0QsU0FBTztBQUNMSCxJQUFBQSxFQUFFLEVBQUZBLEVBREs7QUFFTEMsSUFBQUEsT0FBTyxFQUFFLEtBRko7QUFHTEUsSUFBQUEsTUFBTSxFQUFOQTtBQUhLLEdBQVA7QUFLRDs7QUFFRCxTQUFTQyxzQkFBVCxDQUFnQ0MsSUFBaEMsRUFBOENDLE9BQTlDLEVBQStEO0FBQzdELFNBQU87QUFDTEEsSUFBQUEsT0FBTyxFQUFQQSxPQURLO0FBRUxELElBQUFBLElBQUksRUFBSkE7QUFGSyxHQUFQO0FBSUQ7O0FBRUQsU0FBU0UscUJBQVQsQ0FBK0JDLE9BQS9CLEVBQWdEO0FBQzlDLFVBQVFBLE9BQVI7QUFDRSxTQUFLLENBQUw7QUFDRSxhQUFPLFNBQVA7O0FBQ0YsU0FBSyxDQUFMO0FBQ0UsYUFBTyxTQUFQOztBQUNGLFNBQUssQ0FBTDtBQUNFLGFBQU8sUUFBUDs7QUFDRixTQUFLLEVBQUw7QUFDRSxhQUFPLE9BQVA7O0FBQ0Y7QUFDRSxhQUFPLFNBQVA7QUFWSjtBQVlEOztBQUVELFNBQVNDLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQWlEO0FBQy9DLE1BQUlBLEdBQUcsWUFBWUMsY0FBbkIsRUFBdUI7QUFDckIsV0FBT0QsR0FBRyxDQUFDRSxRQUFKLEdBQWVDLFFBQWYsRUFBUDtBQUNELEdBRkQsTUFFTyxJQUFJLE9BQU9ILEdBQVAsS0FBZSxRQUFmLElBQTJCSSxnQkFBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCTixHQUFqQixDQUEvQixFQUFzRDtBQUMzRCxXQUFPSSxnQkFBS0MsS0FBTCxDQUFXRSxpQkFBWCxDQUE2QlAsR0FBN0IsQ0FBUDtBQUNELEdBRk0sTUFFQTtBQUNMLFdBQU9BLEdBQUcsQ0FBQ0csUUFBSixFQUFQO0FBQ0Q7QUFDRjs7SUFFb0JLLGE7Ozs7O0FBQ25CO0FBS0EseUJBQVlDLE1BQVosRUFBc0M7QUFBQTs7QUFBQTs7QUFBQTtBQUNwQztBQURvQztBQUFBO0FBQUE7QUFFcEMsUUFBSUMsTUFBTSxHQUFHRCxNQUFNLENBQUNDLE1BQXBCO0FBQ0EsVUFBS1osT0FBTCxzQkFBZVcsTUFBTSxDQUFDWCxPQUF0Qiw2REFBaUMsQ0FBakM7O0FBQ0EsUUFBSVcsTUFBTSxDQUFDRSxRQUFYLEVBQXFCO0FBQ25CLFVBQU1DLE9BQU8sR0FBR2YscUJBQXFCLENBQUMsTUFBS0MsT0FBTixDQUFyQztBQUNBWSxNQUFBQSxNQUFNLHFCQUFjRSxPQUFkLDJCQUFzQ0gsTUFBTSxDQUFDRSxRQUE3QyxDQUFOO0FBQ0QsS0FQbUMsQ0FRcEM7OztBQUNBLFVBQUtFLGNBQUwsR0FBc0IsSUFBSVQsZ0JBQUtVLFNBQUwsQ0FBZUMsWUFBbkIsQ0FBZ0NMLE1BQWhDLENBQXRCOztBQUNBLFFBQUlELE1BQU0sQ0FBQ08sT0FBWCxFQUFvQjtBQUNsQixZQUFLQyxjQUFMLEdBQXNCLElBQUlDLDhCQUFKLENBQXVCUixNQUF2QixFQUErQkQsTUFBTSxDQUFDTyxPQUF0QyxDQUF0QjtBQUNEOztBQVptQztBQWFyQzs7Ozs7aUlBRTBCRyxHOzs7Ozs7O2lEQUNsQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLGtCQUFBLE1BQUksQ0FBQ1QsY0FBTCxDQUFvQlUsSUFBcEIsQ0FDRUosR0FERixFQUVFLFVBQUNLLEtBQUQsRUFBc0IvQixNQUF0QixFQUFtRDtBQUNqRCx3QkFBSStCLEtBQUosRUFBVztBQUNURixzQkFBQUEsTUFBTSxDQUFDNUIsc0JBQXNCLENBQUMsSUFBRCxFQUFPOEIsS0FBSyxDQUFDNUIsT0FBYixDQUF2QixDQUFOO0FBQ0QscUJBRkQsTUFFTztBQUNMeUIsc0JBQUFBLE9BQU8sQ0FBQzVCLE1BQU0sQ0FBQ0EsTUFBUixDQUFQO0FBQ0Q7QUFDRixtQkFSSDtBQVVELGlCQVhNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUlBY3VCMEIsRzs7Ozs7OztrREFDdkIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxrQkFBQSxNQUFJLENBQUNMLGNBQUwsQ0FBb0JNLElBQXBCLENBQ0VKLEdBREYsRUFFRSxVQUFDSyxLQUFELEVBQXNCL0IsTUFBdEIsRUFBbUQ7QUFDakQsd0JBQUkrQixLQUFKLEVBQVc7QUFDVEYsc0JBQUFBLE1BQU0sQ0FBQzVCLHNCQUFzQixDQUFDLElBQUQsRUFBTzhCLEtBQUssQ0FBQzVCLE9BQWIsQ0FBdkIsQ0FBTjtBQUNELHFCQUZELE1BRU87QUFDTHlCLHNCQUFBQSxPQUFPLENBQUM1QixNQUFNLENBQUNBLE1BQVIsQ0FBUDtBQUNEO0FBQ0YsbUJBUkg7QUFVRCxpQkFYTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFlZ0IsS0FBS2dDLG9CQUFMLENBQTBCdkMsU0FBUyxFQUFuQyxDOzs7QUFBakJ3QyxnQkFBQUEsUTs7dUJBQ21CLEtBQUtDLG9CQUFMLENBQ3ZCeEMsb0JBQW9CLENBQUMsYUFBRCxDQURHLEM7OztBQUFuQnlDLGdCQUFBQSxVO0FBR0E5QixnQkFBQUEsTyxHQUFVTSxnQkFBS0MsS0FBTCxDQUFXd0IsV0FBWCxDQUF1QkQsVUFBdkIsQzs7c0JBQ1o5QixPQUFPLEtBQUssS0FBS0EsTzs7Ozs7c0JBQ2IsSUFBSWdDLEtBQUosQ0FBVSx1Q0FBVixDOzs7QUFFTixxQkFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUI7QUFBRWpDLGtCQUFBQSxPQUFPLEVBQVBBO0FBQUYsaUJBQXJCO2tEQUNPNEIsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxSEFJR00sSTs7Ozs7OzsrQkFDSkEsSUFBSSxDQUFDNUMsTTtrREFDTixnQix3QkFJQSx1Qix3QkFFQSxjLHdCQUVBLHFCLHdCQUdBLGUsd0JBT0EscUIseUJBR0EscUIseUJBbUJBLFUseUJBSUEsbUIseUJBR0Esc0IseUJBRUEsc0I7Ozs7a0RBaERJLEtBQUtVLE87Ozs7dUJBUUMsS0FBSzJCLG9CQUFMLENBQTBCdkMsU0FBUyxFQUFuQyxDOzs7Ozs7O3VCQUdBLEtBQUsrQyxpQkFBTCxDQUNYL0MsU0FBUyxFQURFLEVBRVg4QyxJQUFJLENBQUMzQyxNQUFMLENBQWEsQ0FBYixDQUZXLEVBR1gyQyxJQUFJLENBQUMzQyxNQUFMLENBQWEsQ0FBYixDQUhXLEM7Ozs7Ozs7dUJBT0EsS0FBSzZDLG9CQUFMLENBQTBCaEQsU0FBUyxFQUFuQyxFQUF1QzhDLElBQUksQ0FBQzNDLE1BQUwsQ0FBYSxDQUFiLENBQXZDLEM7Ozs7Ozs7dUJBR0ssS0FBSzZDLG9CQUFMLENBQ2hCaEQsU0FBUyxFQURPLEVBRWhCOEMsSUFBSSxDQUFDM0MsTUFBTCxDQUFhLENBQWIsQ0FGZ0IsQzs7O0FBQVo4QyxnQkFBQUEsSTtBQUlBaEIsZ0JBQUFBLEcsR0FBTWhDLG9CQUFvQixDQUFDLHdCQUFELEVBQTJCLENBQUNnRCxJQUFHLENBQUNDLEdBQUwsQ0FBM0IsQzs7cUJBRTVCLEtBQUtuQixjOzs7Ozs7dUJBQ0ssS0FBS29CLHlCQUFMLENBQStCbEIsR0FBL0IsQzs7O0FBQVptQixnQkFBQUEsRzs7Ozs7O3VCQUVZLEtBQUtYLG9CQUFMLENBQTBCUixHQUExQixDOzs7QUFBWm1CLGdCQUFBQSxHOzs7cUJBRUVBLEdBQUcsQ0FBQ0MsTTs7Ozs7a0RBQ0NELEdBQUcsQ0FBQ0MsTTs7O2tEQUVKRCxHOzs7a0RBY0Y1QyxzQkFBc0IsQ0FDM0IsSUFEMkIsWUFFeEJzQyxJQUFJLENBQUM1QyxNQUZtQix5Qjs7O0FBTXZCb0QsZ0JBQUFBLE8sR0FBVTtBQUNkakQsa0JBQUFBLE9BQU8sRUFBRSxLQURLO0FBRWRILGtCQUFBQSxNQUFNLEVBQUU0QyxJQUFJLENBQUM1QyxNQUZDO0FBR2RDLGtCQUFBQSxNQUFNLEVBQUUyQyxJQUFJLENBQUMzQyxNQUhDO0FBSWRDLGtCQUFBQSxFQUFFLEVBQUVKLFNBQVM7QUFKQyxpQjs7dUJBTUgsS0FBS3lDLG9CQUFMLENBQTBCYSxPQUExQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBTWpCUixJLEVBQ0FTLFEsRUFDQTtBQUNBLFdBQUtDLE9BQUwsQ0FBYVYsSUFBYixFQUNHVyxJQURILENBQ1EsVUFBQ1IsR0FBRDtBQUFBLGVBQVNNLFFBQVEsQ0FBQyxJQUFELEVBQU9qRCxxQkFBcUIsQ0FBQ3dDLElBQUksQ0FBQzFDLEVBQU4sRUFBVTZDLEdBQVYsQ0FBNUIsQ0FBakI7QUFBQSxPQURSLFdBRVMsVUFBQ1MsR0FBRDtBQUFBLGVBQVNILFFBQVEsQ0FBQ0csR0FBRCxFQUFNLElBQU4sQ0FBakI7QUFBQSxPQUZUO0FBR0Q7Ozs7a0lBR0N0RCxFLEVBQ0FtRCxROzs7Ozs7Ozs7dUJBR29CSSxZQUFZLENBQUM7QUFDN0J0RCxrQkFBQUEsT0FBTyxFQUFFLEtBRG9CO0FBRTdCSCxrQkFBQUEsTUFBTSxFQUFFLGdCQUZxQjtBQUc3QkMsa0JBQUFBLE1BQU0sRUFBRTtBQUNOeUQsb0JBQUFBLElBQUksRUFBRTdEO0FBREEsbUJBSHFCO0FBTTdCSyxrQkFBQUEsRUFBRSxFQUFFSixTQUFTO0FBTmdCLGlCQUFELEM7OztBQUF4QmlELGdCQUFBQSxLO0FBUU5NLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FBRyxJQUFILEVBQVMsaUJBQUNOLEtBQUcsQ0FBQzFDLE1BQUwsaURBQUMsYUFBWXNELE9BQWIsQ0FBVCxDQUFSO2tEQUNPLGtCQUFDWixLQUFHLENBQUMxQyxNQUFMLGtEQUFDLGNBQVlzRCxPQUFiLEM7Ozs7O0FBRVBOLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsZUFBVSxJQUFWLENBQVI7c0JBQ00vQyxzQkFBc0IsQ0FBQyxJQUFELGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0lBSzlCSixFLEVBQ0EwRCxpQixFQUNBUCxROzs7Ozs7O3NCQUVJLENBQUNPLGlCQUFpQixDQUFDQyxFQUFuQixJQUF5QixDQUFDRCxpQkFBaUIsQ0FBQ0UsSzs7Ozs7c0JBQ3hDeEQsc0JBQXNCLENBQUMsQ0FBQyxLQUFGLEVBQVMsbUJBQVQsQzs7O3NCQUsxQixDQUFDc0QsaUJBQWlCLENBQUNHLElBQW5CLElBQTJCLE9BQU9ILGlCQUFpQixDQUFDRyxJQUF6QixLQUFrQyxROzs7Ozs7dUJBQ3hDLEtBQUsxQixvQkFBTCxDQUEwQnZDLFNBQVMsRUFBbkMsQzs7O0FBQWpCd0MsZ0JBQUFBLFE7QUFDTnlCLGdCQUFBQSxJQUFJLEdBQUd6QixRQUFRLENBQUMsQ0FBRCxDQUFmOzs7OztBQUVBeUIsZ0JBQUFBLElBQUksR0FBRy9DLGdCQUFLQyxLQUFMLENBQVcrQyxpQkFBWCxDQUE2QkosaUJBQWlCLENBQUNHLElBQS9DLENBQVA7OztxQkFLRUgsaUJBQWlCLENBQUNLLFE7Ozs7O0FBQ3BCQyxnQkFBQUEsV0FBVyxHQUFHdkQsWUFBWSxDQUFDaUQsaUJBQWlCLENBQUNLLFFBQW5CLENBQTFCOzs7Ozs7dUJBRTBCLEtBQUsxQixvQkFBTCxDQUN4QnhDLG9CQUFvQixDQUFDLGNBQUQsRUFBaUIsRUFBakIsQ0FESSxDOzs7QUFBcEJvRSxnQkFBQUEsVztBQUdORCxnQkFBQUEsV0FBVyxHQUFHbEQsZ0JBQUtDLEtBQUwsQ0FBV0UsaUJBQVgsQ0FBNkJnRCxXQUE3QixDQUFkOzs7cUJBS0VQLGlCQUFpQixDQUFDbEQsTzs7Ozs7c0JBQ2hCa0QsaUJBQWlCLENBQUNsRCxPQUFsQixLQUE4QixLQUFLQSxPOzs7OztzQkFDL0JKLHNCQUFzQixDQUMxQixDQUFDLEtBRHlCLEVBRTFCLHVEQUYwQixDOzs7QUFLOUJJLGdCQUFBQSxPQUFPLEdBQUdrRCxpQkFBaUIsQ0FBQ2xELE9BQTVCOzs7OztBQUVBQSxnQkFBQUEsT0FBTyxHQUFHLEtBQUtBLE9BQWY7OztxQkFLRWtELGlCQUFpQixDQUFDUSxLOzs7OztBQUNwQkEsZ0JBQUFBLEtBQUssR0FBR3pELFlBQVksQ0FBQ2lELGlCQUFpQixDQUFDUSxLQUFuQixDQUFwQjs7Ozs7O3VCQUVjLEtBQUs3QixvQkFBTCxDQUNaeEMsb0JBQW9CLENBQUMseUJBQUQsRUFBNEIsQ0FDOUM2RCxpQkFBaUIsQ0FBQ0csSUFENEIsRUFFOUMsU0FGOEMsQ0FBNUIsQ0FEUixDOzs7QUFBZEssZ0JBQUFBLEs7QUFNQUEsZ0JBQUFBLEtBQUssR0FBR3BELGdCQUFLQyxLQUFMLENBQVd3QixXQUFYLENBQXVCMkIsS0FBdkIsRUFBOEJyRCxRQUE5QixFQUFSOzs7cUJBS0U2QyxpQkFBaUIsQ0FBQ1MsRzs7Ozs7QUFDcEJDLGdCQUFBQSxRQUFRLEdBQUczRCxZQUFZLENBQUNpRCxpQkFBaUIsQ0FBQ1MsR0FBbkIsQ0FBdkI7Ozs7Ozt1QkFFNkIsS0FBSzlCLG9CQUFMLENBQzNCeEMsb0JBQW9CLENBQUMsaUJBQUQsRUFBb0IsQ0FDdEM7QUFDRWdFLGtCQUFBQSxJQUFJLEVBQUVILGlCQUFpQixDQUFDRyxJQUQxQjtBQUVFRixrQkFBQUEsRUFBRSxFQUFFRCxpQkFBaUIsQ0FBQ0MsRUFGeEI7QUFHRVEsa0JBQUFBLEdBQUcsRUFBRVQsaUJBQWlCLENBQUNTLEdBSHpCO0FBSUVKLGtCQUFBQSxRQUFRLEVBQUVqRCxnQkFBS0MsS0FBTCxDQUFXc0QsV0FBWCxDQUF1QkwsV0FBdkIsQ0FKWjtBQUtFSixrQkFBQUEsS0FBSyxFQUFFRixpQkFBaUIsQ0FBQ0UsS0FMM0I7QUFNRVUsa0JBQUFBLElBQUksRUFBRVosaUJBQWlCLENBQUNZO0FBTjFCLGlCQURzQyxDQUFwQixDQURPLEM7OztBQUF2QkMsZ0JBQUFBLE07QUFZTkgsZ0JBQUFBLFFBQVEsR0FBRzNELFlBQVksQ0FBQzhELE1BQUQsQ0FBdkI7OztBQUdGO0FBQ0lDLGdCQUFBQSxHLEdBQU0sQ0FBQ0MsTUFBTSxDQUFDTCxRQUFELENBQU4sR0FBbUJLLE1BQU0sQ0FBQ1QsV0FBRCxDQUExQixFQUF5Q25ELFFBQXpDLEUsRUFBcUQ7O0FBQy9EMkQsZ0JBQUFBLEdBQUcsR0FBRzFELGdCQUFLQyxLQUFMLENBQVcyRCxPQUFYLENBQW1CRixHQUFuQixFQUF3QixNQUF4QixDQUFOLEMsQ0FBdUM7O0FBQ2pDRyxnQkFBQUEsSSxHQUFPQyxJQUFJLENBQUNDLElBQUwsQ0FBVUMsTUFBTSxDQUFDTixHQUFELENBQWhCLEM7QUFDYkEsZ0JBQUFBLEdBQUcsR0FBRyxDQUFDRyxJQUFJLEdBQUcsVUFBUixFQUFvQjlELFFBQXBCLEVBQU4sQyxDQUFzQzs7QUFDdEMyRCxnQkFBQUEsR0FBRyxHQUFHMUQsZ0JBQUtDLEtBQUwsQ0FBVzJELE9BQVgsQ0FBbUJGLEdBQW5CLElBQTBCLFFBQWhDO0FBRU1iLGdCQUFBQSxFLEdBQUs3QyxnQkFBS0MsS0FBTCxDQUFXK0MsaUJBQVgsQ0FBNkJKLGlCQUFpQixDQUFDQyxFQUEvQyxDO0FBQ0xDLGdCQUFBQSxLLEdBQVFuRCxZQUFZLENBQUNpRCxpQkFBaUIsQ0FBQ0UsS0FBbkIsQztBQUNwQm1CLGdCQUFBQSxVLEdBQWFqRSxnQkFBS0MsS0FBTCxDQUFXMkQsT0FBWCxDQUFtQmQsS0FBbkIsQzs7O3VCQUdDTCxZQUFZLENBQUM7QUFDN0J0RCxrQkFBQUEsT0FBTyxFQUFFLEtBRG9CO0FBRTdCSCxrQkFBQUEsTUFBTSxFQUFFLHFCQUZxQjtBQUc3QkMsa0JBQUFBLE1BQU0sRUFBRTtBQUNOaUYsb0JBQUFBLFdBQVcsRUFBRTtBQUNYVixzQkFBQUEsSUFBSSxFQUFFWixpQkFBaUIsQ0FBQ1ksSUFEYjtBQUVYRixzQkFBQUEsUUFBUSxFQUFSQSxRQUZXO0FBR1hMLHNCQUFBQSxRQUFRLEVBQUVDLFdBSEM7QUFJWEUsc0JBQUFBLEtBQUssRUFBTEEsS0FKVztBQUtYUCxzQkFBQUEsRUFBRSxFQUFGQSxFQUxXO0FBTVhDLHNCQUFBQSxLQUFLLEVBQUxBLEtBTlc7QUFPWHBELHNCQUFBQSxPQUFPLEVBQVBBLE9BUFc7QUFRWGdELHNCQUFBQSxJQUFJLEVBQUU3RDtBQVJLLHFCQURQO0FBV05zRixvQkFBQUEsT0FBTyxFQUFFO0FBQ1BDLHNCQUFBQSxPQUFPLEVBQUVILFVBQVUsR0FBRyxNQURmO0FBRVBJLHNCQUFBQSxRQUFRLEVBQUV4QixFQUZIO0FBR1B5QixzQkFBQUEsTUFBTSxFQUFFdkIsSUFIRDtBQUlQVyxzQkFBQUEsR0FBRyxFQUFFQTtBQUpFO0FBWEgsbUJBSHFCO0FBcUI3QnhFLGtCQUFBQSxFQUFFLEVBQUVKLFNBQVM7QUFyQmdCLGlCQUFELEM7OztBQUF4QmlELGdCQUFBQSxLO0FBdUJGd0MsZ0JBQUFBLE0sbUJBQVN4QyxLQUFHLENBQUMxQyxNLGlEQUFKLGFBQVlrRixNOztBQUN6QixvQkFBSSxtQkFBQ3hDLEtBQUcsQ0FBQzFDLE1BQUwsMEVBQUMsY0FBWWtGLE1BQWIseURBQUMscUJBQW9CQyxVQUFwQixDQUErQixJQUEvQixDQUFELENBQUosRUFBMkM7QUFDekNELGtCQUFBQSxNQUFNLEdBQUcsT0FBT0EsTUFBaEI7QUFDRDs7QUFFS0UsZ0JBQUFBLE8sR0FBVUMsR0FBRyxDQUFDQyxNQUFKLENBQVdKLE1BQVgsRUFBbUIsSUFBbkIsQztBQUVWSyxnQkFBQUEsSyxHQUErQjtBQUNuQzVDLGtCQUFBQSxHQUFHLEVBQUV1QyxNQUQ4QjtBQUVuQ00sa0JBQUFBLEVBQUUsRUFBRTtBQUNGekIsb0JBQUFBLEtBQUssRUFBRUEsS0FETDtBQUVGSCxvQkFBQUEsUUFBUSxFQUFFQyxXQUZSO0FBR0ZHLG9CQUFBQSxHQUFHLEVBQUVDLFFBSEg7QUFJRlQsb0JBQUFBLEVBQUUsRUFBRUEsRUFKRjtBQUtGQyxvQkFBQUEsS0FBSyxFQUFFbUIsVUFMTDtBQU1GYSxvQkFBQUEsS0FBSyxFQUFFbEMsaUJBQWlCLENBQUNZLElBTnZCO0FBT0Y7QUFDQXVCLG9CQUFBQSxDQUFDLEVBQUUvRSxnQkFBS0MsS0FBTCxDQUFXK0UsVUFBWCxDQUFzQlAsT0FBTyxDQUFDakIsSUFBUixDQUFhLENBQWIsQ0FBdEIsQ0FSRDtBQVNGO0FBQ0F5QixvQkFBQUEsQ0FBQyxFQUFFakYsZ0JBQUtDLEtBQUwsQ0FBVytFLFVBQVgsQ0FBc0JQLE9BQU8sQ0FBQ2pCLElBQVIsQ0FBYSxDQUFiLENBQXRCLENBVkQ7QUFXRjtBQUNBMEIsb0JBQUFBLENBQUMsRUFBRWxGLGdCQUFLQyxLQUFMLENBQVcrRSxVQUFYLENBQXNCUCxPQUFPLENBQUNqQixJQUFSLENBQWEsQ0FBYixDQUF0QixDQVpEO0FBYUYyQixvQkFBQUEsSUFBSSxtQkFBRXBELEtBQUcsQ0FBQzFDLE1BQU4sa0RBQUUsY0FBWThDO0FBYmhCO0FBRitCLGlCO0FBa0JyQ0UsZ0JBQUFBLFFBQVEsU0FBUixJQUFBQSxRQUFRLFdBQVIsWUFBQUEsUUFBUSxDQUFHLElBQUgsRUFBU3VDLEtBQVQsQ0FBUjtrREFDT0EsSzs7Ozs7QUFFUHZDLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsZUFBVSxJQUFWLENBQVI7c0JBQ00vQyxzQkFBc0IsQ0FBQyxJQUFELGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0hBSzlCSixFLEVBQ0FrRyxVLEVBQ0F6QyxPLEVBQ0FOLFE7Ozs7Ozs7cUJBRUkyQixNQUFNLENBQUNxQixTQUFQLENBQWlCMUMsT0FBakIsQzs7Ozs7QUFDSXZCLGdCQUFBQSxNLEdBQVE5QixzQkFBc0IsQ0FDbEMsQ0FBQyxLQURpQyxFQUVsQyw0Q0FGa0MsQztBQUlwQytDLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FDTjtBQUNFaUQsa0JBQUFBLElBQUksRUFBRSxpQkFEUjtBQUVFOUYsa0JBQUFBLE9BQU8sRUFBRTtBQUZYLGlCQURNLEVBS04sSUFMTSxDQUFSO3NCQU9NNEIsTTs7O0FBR0pvQyxnQkFBQUEsSSxHQUFPLEU7O0FBQ1gsb0JBQUk7QUFDRkEsa0JBQUFBLElBQUksR0FBR3hELGdCQUFLQyxLQUFMLENBQVdzRixNQUFYLENBQWtCSCxVQUFsQixDQUFQO0FBQ0QsaUJBRkQsQ0FFRSxPQUFPaEUsS0FBUCxFQUFjO0FBQ2RvQyxrQkFBQUEsSUFBSSxHQUFHNEIsVUFBUDtBQUNEOztBQUVLSSxnQkFBQUEsZSxHQUFrQnhGLGdCQUFLQyxLQUFMLENBQVcrQyxpQkFBWCxDQUE2QkwsT0FBN0IsQzs7O3VCQUdKRixZQUFZLENBQUM7QUFDN0J0RCxrQkFBQUEsT0FBTyxFQUFFLEtBRG9CO0FBRTdCSCxrQkFBQUEsTUFBTSxFQUFFLGlCQUZxQjtBQUc3QkMsa0JBQUFBLE1BQU0sRUFBRTtBQUNOdUUsb0JBQUFBLElBQUksRUFBRUEsSUFEQTtBQUVOYyxvQkFBQUEsTUFBTSxFQUFFa0IsZUFGRjtBQUdOOUMsb0JBQUFBLElBQUksRUFBRTdEO0FBSEEsbUJBSHFCO0FBUTdCSyxrQkFBQUEsRUFBRSxFQUFFSixTQUFTO0FBUmdCLGlCQUFELEM7OztBQUF4QmlELGdCQUFBQSxLO0FBV0YwRCxnQkFBQUEsTSxtQkFBUzFELEtBQUcsQ0FBQzFDLE0saURBQUosYUFBWXFHLFNBQVosQ0FBc0JDLFdBQXRCLEU7O0FBQ2Isb0JBQUksQ0FBQ0YsTUFBTSxDQUFDakIsVUFBUCxDQUFrQixJQUFsQixDQUFMLEVBQThCO0FBQzVCaUIsa0JBQUFBLE1BQU0sR0FBRyxPQUFPQSxNQUFoQjtBQUNEOztBQUVEcEQsZ0JBQUFBLFFBQVEsU0FBUixJQUFBQSxRQUFRLFdBQVIsWUFBQUEsUUFBUSxDQUFHLElBQUgsRUFBU29ELE1BQVQsQ0FBUjtrREFDT0EsTTs7Ozs7QUFFUHBELGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsZUFBVSxJQUFWLENBQVI7c0JBQ00vQyxzQkFBc0IsQ0FBQyxJQUFELGU7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXhXU3NHLDBCOzs7O0FBNlczQyxTQUFTbkQsWUFBVCxDQUFzQm9ELEdBQXRCLEVBQW9EO0FBQ2xELFNBQU9DLFFBQVEsQ0FBQ2xILHNCQUFELEVBQXlCaUgsR0FBekIsQ0FBUixDQUFzQ3RELElBQXRDLENBQTJDLFVBQUN3RCxJQUFELEVBQVU7QUFDMUQsUUFBSUEsSUFBSSxDQUFDM0UsS0FBVCxFQUFnQjtBQUNkLFVBQUkyRSxJQUFJLENBQUMzRSxLQUFMLENBQVc1QixPQUFYLENBQW1Cd0csUUFBbkIsQ0FBNEIsdUJBQTVCLENBQUosRUFBMEQ7QUFDeEQsY0FBTSxJQUFJdEUsS0FBSixDQUFVLG9CQUFWLENBQU47QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQUlBLEtBQUosQ0FBVXFFLElBQUksQ0FBQzNFLEtBQUwsQ0FBVzVCLE9BQXJCLENBQU47QUFDRDtBQUNGLEtBTkQsTUFNTztBQUNMLGFBQU91RyxJQUFQO0FBQ0Q7QUFDRixHQVZNLENBQVA7QUFXRDs7QUFFRCxTQUFTRCxRQUFULENBQWtCRyxHQUFsQixFQUErQnpDLElBQS9CLEVBQThEO0FBQzVELFNBQU8wQyxLQUFLLENBQUNELEdBQUQsRUFBTTtBQUNoQkUsSUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTdDLElBQWYsQ0FEVTtBQUNZO0FBQzVCOEMsSUFBQUEsS0FBSyxFQUFFLFVBRlM7QUFFRztBQUNuQkMsSUFBQUEsV0FBVyxFQUFFLGFBSEc7QUFHWTtBQUM1QjNGLElBQUFBLE9BQU8sRUFBRTtBQUNQLG9CQUFjLHlCQURQO0FBRVAsc0JBQWdCO0FBRlQsS0FKTztBQVFoQjVCLElBQUFBLE1BQU0sRUFBRSxNQVJRO0FBUUE7QUFDaEJ3SCxJQUFBQSxJQUFJLEVBQUUsTUFUVTtBQVNGO0FBQ2RDLElBQUFBLFFBQVEsRUFBRSxRQVZNO0FBVUk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxhQVhNLENBV1M7O0FBWFQsR0FBTixDQUFMLENBWUpuRSxJQVpJLENBWUMsVUFBQ29FLFFBQUQsRUFBYztBQUNwQixRQUFJQSxRQUFRLENBQUNDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDWixJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUlyRSxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbXBvcnQgSHR0cEhlYWRlclByb3ZpZGVyIGZyb20gXCJodHRwaGVhZGVycHJvdmlkZXJcIjtcblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogYW55O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIiAmJiBXZWIzLnV0aWxzLmlzSGV4KG51bSkpIHtcbiAgICByZXR1cm4gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhudW0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbUtleVByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIGluZnVyYVByb3ZpZGVyOiBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG4gIHByaXZhdGUgY2hhaW5JZDogbnVtYmVyO1xuICBwcml2YXRlIGNvbmZpZ1Byb3ZpZGVyPzogSHR0cEhlYWRlclByb3ZpZGVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVByb3ZpZGVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmw7XG4gICAgdGhpcy5jaGFpbklkID0gY29uZmlnLmNoYWluSWQgPz8gMTtcbiAgICBpZiAoY29uZmlnLmluZnVyYUlkKSB7XG4gICAgICBjb25zdCBuZXR3b3JrID0gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKHRoaXMuY2hhaW5JZCk7XG4gICAgICBycGNVcmwgPSBgaHR0cHM6Ly8ke25ldHdvcmt9LmluZnVyYS5pby92My8ke2NvbmZpZy5pbmZ1cmFJZH1gO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5pbmZ1cmFQcm92aWRlciA9IG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIocnBjVXJsKTtcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuY29uZmlnUHJvdmlkZXIgPSBuZXcgSHR0cEhlYWRlclByb3ZpZGVyKHJwY1VybCwgY29uZmlnLmhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmluZnVyYVByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNhbGxQcm92aWRlckFwaVdpdGhIZWFkZXIocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY29uZmlnUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIGxldCByc3A7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ1Byb3ZpZGVyKSB7XG4gICAgICAgICAgcnNwID0gYXdhaXQgdGhpcy5jYWxsUHJvdmlkZXJBcGlXaXRoSGVhZGVyKHJlcSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnNwID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyc3AudHhIYXNoKSB7XG4gICAgICAgICAgcmV0dXJuIHJzcC50eEhhc2g7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJzcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblwiOlxuICAgICAgLy8gaHR0cHM6Ly9kb2NzLm1ldGFtYXNrLmlvL2d1aWRlL3NpZ25pbmctZGF0YS5odG1sI2EtYnJpZWYtaGlzdG9yeVxuICAgICAgLy9cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICA0MjAwLFxuICAgICAgICAgIGAke2FyZ3MubWV0aG9kfSBpcyBub3Qgc3VwcG9ydCBub3dgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgICAudGhlbigocmV0KSA9PiBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy50byB8fCAhdHJhbnNhY3Rpb25Db25maWcudmFsdWUpIHtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoLTMyNjAyLCBcImV4cGVjdGVkIHRvLHZhbHVlXCIpO1xuICAgIH1cblxuICAgIC8vZnJvbVxuICAgIGxldCBmcm9tOiBzdHJpbmc7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIHx8IHR5cGVvZiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgZnJvbSA9IGFjY291bnRzWzBdIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbSA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcuZnJvbSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vZ2FzIHByaWNlXG4gICAgbGV0IGdhc1ByaWNlRGVjOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKSB7XG4gICAgICBnYXNQcmljZURlYyA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1ByaWNlUmV0ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2FzUHJpY2VcIiwgW10pXG4gICAgICApO1xuICAgICAgZ2FzUHJpY2VEZWMgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKGdhc1ByaWNlUmV0KTtcbiAgICB9XG5cbiAgICAvL2NoYWluIGlkXG4gICAgbGV0IGNoYWluSWQ6IG51bWJlcjtcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIC0zMjYwMixcbiAgICAgICAgICBcImV4cGVjdGVkIGNoYWluSWQgYW5kIGNvbm5lY3RlZCBjaGFpbklkIGFyZSBtaXNtYXRjaGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNoYWluSWQgPSB0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFpbklkID0gdGhpcy5jaGFpbklkO1xuICAgIH1cblxuICAgIC8vbm9uY2VcbiAgICBsZXQgbm9uY2U6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcubm9uY2UpIHtcbiAgICAgIG5vbmNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9uY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nZXRUcmFuc2FjdGlvbkNvdW50XCIsIFtcbiAgICAgICAgICB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgIFwicGVuZGluZ1wiLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIG5vbmNlID0gV2ViMy51dGlscy5oZXhUb051bWJlcihub25jZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2VzdGltYXRlIGdhc1xuICAgIGxldCBnYXNMaW1pdDogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpIHtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBXZWIzLnV0aWxzLm51bWJlclRvSGV4KGdhc1ByaWNlRGVjKSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bShnYXNSZXQpO1xuICAgIH1cblxuICAgIC8vZmVlXG4gICAgbGV0IGZlZSA9IChCaWdJbnQoZ2FzTGltaXQpICogQmlnSW50KGdhc1ByaWNlRGVjKSkudG9TdHJpbmcoKTsgLy93ZWlcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlLCBcIkd3ZWlcIik7IC8vdG8gR3dlaVxuICAgIGNvbnN0IHRlbXAgPSBNYXRoLmNlaWwoTnVtYmVyKGZlZSkpO1xuICAgIGZlZSA9ICh0ZW1wICogMTAwMDAwMDAwMCkudG9TdHJpbmcoKTsgLy90byBldGhlclxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUpICsgXCIgZXRoZXJcIjtcblxuICAgIGNvbnN0IHRvID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy50byk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcudmFsdWUpO1xuICAgIGNvbnN0IHZhbHVlSW5XZWkgPSBXZWIzLnV0aWxzLmZyb21XZWkodmFsdWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGxldCB0eERhdGEgPSByZXQucmVzdWx0Py50eERhdGE7XG4gICAgICBpZiAoIXJldC5yZXN1bHQ/LnR4RGF0YT8uc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHR4RGF0YSA9IFwiMHhcIiArIHR4RGF0YTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUodHhEYXRhLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiB0eERhdGEsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVJbldlaSxcbiAgICAgICAgICBpbnB1dDogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgcjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs3XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHM6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbOF0pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB2OiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzZdKSxcbiAgICAgICAgICBoYXNoOiByZXQucmVzdWx0Py50eEhhc2gsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBybHBUWCk7XG4gICAgICByZXR1cm4gcmxwVFg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkYXRhVG9TaWduOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIG11c3QgbWF0Y2ggJ0NvbnRlbnQtVHlwZScgaGVhZGVyXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIC8vIGluY2x1ZGUsIHNhbWUtb3JpZ2luLCAqb21pdFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNC4wIE1ETiBFeGFtcGxlXCIsXG4gICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXG4gICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gKmNsaWVudCwgbm8tcmVmZXJyZXJcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cEVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=