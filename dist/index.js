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

var HttpHeaderProvider = _interopRequireWildcard(require("httpheaderprovider"));

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
      _this.configProvider = new HttpHeaderProvider(rpcUrl, config.headers);
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
                if (!gasPrice) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJoZXhUb051bWJlclN0cmluZyIsIkltS2V5UHJvdmlkZXIiLCJjb25maWciLCJycGNVcmwiLCJpbmZ1cmFJZCIsIm5ldHdvcmsiLCJpbmZ1cmFQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsImhlYWRlcnMiLCJjb25maWdQcm92aWRlciIsIkh0dHBIZWFkZXJQcm92aWRlciIsInJlcSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsImVycm9yIiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJhY2NvdW50cyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiYXJncyIsImltS2V5UGVyc29uYWxTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJjYWxsUHJvdmlkZXJBcGlXaXRoSGVhZGVyIiwicGF5bG9hZCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJ2YWx1ZSIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInR4RGF0YSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNJbnRlZ2VyIiwibmFtZSIsInRvVXRmOCIsImNoZWNrc3VtQWRkcmVzcyIsInNpZ1JldCIsInNpZ25hdHVyZSIsInRvTG93ZXJDYXNlIiwiRXZlbnRFbWl0dGVyIiwiYXJnIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQWVBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVKLFNBQVMsRUFEUjtBQUVMSyxJQUFBQSxPQUFPLEVBQUUsS0FGSjtBQUdMSCxJQUFBQSxNQUFNLEVBQU5BLE1BSEs7QUFJTEMsSUFBQUEsTUFBTSxFQUFOQTtBQUpLLEdBQVA7QUFNRDs7QUFFRCxTQUFTRyxxQkFBVCxDQUEr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LE9BQU8sRUFBRTtBQUNQLG9CQUFjLHlCQURQO0FBRVAsc0JBQWdCO0FBRlQsS0FKTztBQVFoQjNCLElBQUFBLE1BQU0sRUFBRSxNQVJRO0FBUUE7QUFDaEJtSCxJQUFBQSxJQUFJLEVBQUUsTUFUVTtBQVNGO0FBQ2RDLElBQUFBLFFBQVEsRUFBRSxRQVZNO0FBVUk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxhQVhNLENBV1M7O0FBWFQsR0FBTixDQUFMLENBWUpqRSxJQVpJLENBWUMsVUFBQ2tFLFFBQUQsRUFBYztBQUNwQixRQUFJQSxRQUFRLENBQUNDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDWixJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUlqRSxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbXBvcnQgKiBhcyBIdHRwSGVhZGVyUHJvdmlkZXIgZnJvbSBcImh0dHBoZWFkZXJwcm92aWRlclwiXG5cblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogYW55O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaW5mdXJhUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG4gIHByaXZhdGUgY29uZmlnUHJvdmlkZXI/OiBIdHRwSGVhZGVyUHJvdmlkZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmluZnVyYVByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwpO1xuICAgIGlmKGNvbmZpZy5oZWFkZXJzKXtcbiAgICAgIHRoaXMuY29uZmlnUHJvdmlkZXIgPSBuZXcgSHR0cEhlYWRlclByb3ZpZGVyKHJwY1VybCwgY29uZmlnLmhlYWRlcnMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmluZnVyYVByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNhbGxQcm92aWRlckFwaVdpdGhIZWFkZXIocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY29uZmlnUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIGlmKHRoaXMuY29uZmlnUHJvdmlkZXIpe1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxQcm92aWRlckFwaVdpdGhIZWFkZXIocmVxKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocmVxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblwiOlxuICAgICAgLy8gaHR0cHM6Ly9kb2NzLm1ldGFtYXNrLmlvL2d1aWRlL3NpZ25pbmctZGF0YS5odG1sI2EtYnJpZWYtaGlzdG9yeVxuICAgICAgLy9cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICA0MjAwLFxuICAgICAgICAgIGAke2FyZ3MubWV0aG9kfSBpcyBub3Qgc3VwcG9ydCBub3dgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgICAudGhlbigocmV0KSA9PiBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8XG4gICAgICAhdHJhbnNhY3Rpb25Db25maWcudmFsdWVcbiAgICApIHtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJleHBlY3RlZCB0byx2YWx1ZVwiXG4gICAgICApO1xuICAgIH1cbiAgICBcbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fFxuICAgICAgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH1lbHNle1xuICAgICAgZnJvbSA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcuZnJvbSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vZ2FzIHByaWNlXG4gICAgbGV0IGdhc1ByaWNlOiBzdHJpbmc7XG4gICAgaWYoZ2FzUHJpY2Upe1xuICAgICAgZ2FzUHJpY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH1lbHNle1xuICAgICAgZ2FzUHJpY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2UpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpe1xuICAgICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIC0zMjYwMixcbiAgICAgICAgICBcImV4cGVjdGVkIGNoYWluSWQgYW5kIGNvbm5lY3RlZCBjaGFpbklkIGFyZSBtaXNtYXRjaGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNoYWluSWQgPSB0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkXG4gICAgfWVsc2V7XG4gICAgICBjaGFpbklkID0gdGhpcy5jaGFpbklkXG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKXtcbiAgICAgIG5vbmNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKTtcbiAgICB9ZWxzZXtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcInBlbmRpbmdcIl0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKFxuICAgICAgQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZSlcbiAgICApLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25UcmFuc2FjdGlvblwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0cmFuc2FjdGlvbjoge1xuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAgIGdhc0xpbWl0LFxuICAgICAgICAgICAgZ2FzUHJpY2UsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGxldCB0eERhdGEgPSByZXQucmVzdWx0Py50eERhdGE7XG4gICAgICBpZiAoIXJldC5yZXN1bHQ/LnR4RGF0YT8uc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHR4RGF0YSA9IFwiMHhcIiArIHR4RGF0YTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUodHhEYXRhLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiB0eERhdGEsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZSxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVJbldlaSxcbiAgICAgICAgICBpbnB1dDogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgcjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs3XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHM6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbOF0pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB2OiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzZdKSxcbiAgICAgICAgICBoYXNoOiByZXQucmVzdWx0Py50eEhhc2gsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBybHBUWCk7XG4gICAgICByZXR1cm4gcmxwVFg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkYXRhVG9TaWduOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZighc2lnUmV0LnN0YXJ0c1dpdGgoXCIweFwiKSl7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19