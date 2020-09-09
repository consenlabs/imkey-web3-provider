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
  } else if (typeof num === "string") {
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
        var _ret, req, payload;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = args.method;
                _context4.next = _context4.t0 === "eth_getChainId" ? 3 : _context4.t0 === "personal_listAccounts" ? 4 : _context4.t0 === "eth_accounts" ? 4 : _context4.t0 === "eth_requestAccounts" ? 4 : _context4.t0 === "personal_sign" ? 7 : _context4.t0 === "eth_signTransaction" ? 10 : _context4.t0 === "eth_sendTransaction" ? 13 : _context4.t0 === "eth_sign" ? 26 : _context4.t0 === "eth_signTypedData" ? 26 : _context4.t0 === "eth_signTypedData_v3" ? 26 : _context4.t0 === "eth_signTypedData_v4" ? 26 : 27;
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
                return _context4.abrupt("return", _context4.sent);

              case 23:
                _context4.next = 25;
                return this.callInnerProviderApi(req);

              case 25:
                return _context4.abrupt("return", _context4.sent);

              case 26:
                return _context4.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 27:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context4.next = 30;
                return this.callInnerProviderApi(payload);

              case 30:
                return _context4.abrupt("return", _context4.sent);

              case 31:
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
        var from, accounts, gasPrice, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret3$result, _ret3$result2, _ret3$result2$txData, _ret3$result3, _ret3, txData, decoded, rlpTX;

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

                gasPrice = parseArgsNum(transactionConfig.gasPrice);
                _context6.next = 18;
                break;

              case 14:
                _context6.next = 16;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 16:
                gasPrice = _context6.sent;
                gasPrice = _web["default"].utils.hexToNumberString(gasPrice);

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
                  gasPrice: gasPrice,
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 39:
                gasRet = _context6.sent;
                gasLimit = parseArgsNum(gasRet);

              case 41:
                //fee
                fee = (BigInt(gasLimit) * BigInt(gasPrice)).toString(); //wei

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
                      gasPrice: gasPrice,
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
                    gasPrice: gasPrice,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJoZXhUb051bWJlclN0cmluZyIsIkltS2V5UHJvdmlkZXIiLCJjb25maWciLCJycGNVcmwiLCJpbmZ1cmFJZCIsIm5ldHdvcmsiLCJpbmZ1cmFQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsImhlYWRlcnMiLCJjb25maWdQcm92aWRlciIsIkh0dHBIZWFkZXJQcm92aWRlciIsInJlcSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsImVycm9yIiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJhY2NvdW50cyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiYXJncyIsImltS2V5UGVyc29uYWxTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJjYWxsUHJvdmlkZXJBcGlXaXRoSGVhZGVyIiwicGF5bG9hZCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJ2YWx1ZSIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInR4RGF0YSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNJbnRlZ2VyIiwibmFtZSIsInRvVXRmOCIsImNoZWNrc3VtQWRkcmVzcyIsInNpZ1JldCIsInNpZ25hdHVyZSIsInRvTG93ZXJDYXNlIiwiRXZlbnRFbWl0dGVyIiwiYXJnIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQWNBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVKLFNBQVMsRUFEUjtBQUVMSyxJQUFBQSxPQUFPLEVBQUUsS0FGSjtBQUdMSCxJQUFBQSxNQUFNLEVBQU5BLE1BSEs7QUFJTEMsSUFBQUEsTUFBTSxFQUFOQTtBQUpLLEdBQVA7QUFNRDs7QUFFRCxTQUFTRyxxQkFBVCxDQUEr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RztBQUdZO0FBQzVCdkYsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCM0IsSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQm1ILElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSmpFLElBWkksQ0FZQyxVQUFDa0UsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNaLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSWpFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmltcG9ydCBIdHRwSGVhZGVyUHJvdmlkZXIgZnJvbSBcImh0dHBoZWFkZXJwcm92aWRlclwiO1xuXG5pbnRlcmZhY2UgSVByb3ZpZGVyT3B0aW9ucyB7XG4gIHJwY1VybD86IHN0cmluZztcbiAgaW5mdXJhSWQ/OiBzdHJpbmc7XG4gIGNoYWluSWQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBhbnk7XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbmNvbnN0IElNS0VZX01BTkFHRVJfRU5EUE9JTlQgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGkvaW1rZXlcIjtcbmNvbnN0IElNS0VZX0VUSF9QQVRIID0gXCJtLzQ0Jy82MCcvMCcvMC8wXCI7XG5sZXQgcmVxdWVzdElkID0gMDtcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBpbmZ1cmFQcm92aWRlcjogV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyO1xuICBwcml2YXRlIGNoYWluSWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb25maWdQcm92aWRlcj86IEh0dHBIZWFkZXJQcm92aWRlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElQcm92aWRlck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBycGNVcmwgPSBjb25maWcucnBjVXJsO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNvbmZpZy5jaGFpbklkID8/IDE7XG4gICAgaWYgKGNvbmZpZy5pbmZ1cmFJZCkge1xuICAgICAgY29uc3QgbmV0d29yayA9IGNoYWluSWQySW5mdXJhTmV0d29yayh0aGlzLmNoYWluSWQpO1xuICAgICAgcnBjVXJsID0gYGh0dHBzOi8vJHtuZXR3b3JrfS5pbmZ1cmEuaW8vdjMvJHtjb25maWcuaW5mdXJhSWR9YDtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuaW5mdXJhUHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHJwY1VybCk7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmNvbmZpZ1Byb3ZpZGVyID0gbmV3IEh0dHBIZWFkZXJQcm92aWRlcihycGNVcmwsIGNvbmZpZy5oZWFkZXJzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pbmZ1cmFQcm92aWRlci5zZW5kKFxuICAgICAgICByZXEsXG4gICAgICAgIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBKc29uUnBjUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjYWxsUHJvdmlkZXJBcGlXaXRoSGVhZGVyKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ1Byb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGVuYWJsZSgpIHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgIGNvbnN0IGNoYWluSWRIZXggPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfY2hhaW5JZFwiKVxuICAgICk7XG4gICAgY29uc3QgY2hhaW5JZCA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIoY2hhaW5JZEhleCk7XG4gICAgaWYgKGNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhaW4gaWQgYW5kIHJwYyBlbmRwb2ludCBkb24ndCBtYXRjaFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdFwiLCB7IGNoYWluSWQgfSk7XG4gICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwicGVyc29uYWxfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UGVyc29uYWxTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24ocmVxdWVzdElkKyssIGFyZ3MucGFyYW1zIVswXSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NlbmRUcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX3NlbmRSYXdUcmFuc2FjdGlvblwiLCBbcmV0LnJhd10pO1xuICAgICAgICBpZiAodGhpcy5jb25maWdQcm92aWRlcikge1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxQcm92aWRlckFwaVdpdGhIZWFkZXIocmVxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduXCI6XG4gICAgICAvLyBodHRwczovL2RvY3MubWV0YW1hc2suaW8vZ3VpZGUvc2lnbmluZy1kYXRhLmh0bWwjYS1icmllZi1oaXN0b3J5XG4gICAgICAvL1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2U6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FzUHJpY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2UpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2UpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgcGF5bWVudDogdmFsdWVJbldlaSArIFwiIEVUSFwiLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHRvLFxuICAgICAgICAgICAgc2VuZGVyOiBmcm9tLFxuICAgICAgICAgICAgZmVlOiBmZWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBsZXQgdHhEYXRhID0gcmV0LnJlc3VsdD8udHhEYXRhO1xuICAgICAgaWYgKCFyZXQucmVzdWx0Py50eERhdGE/LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICB0eERhdGEgPSBcIjB4XCIgKyB0eERhdGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHR4RGF0YSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogdHhEYXRhLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2UsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UGVyc29uYWxTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFzaWdSZXQuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19