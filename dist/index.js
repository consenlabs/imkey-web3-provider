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
    var rpcUrl = config.rpcUrl;
    _this.chainId = (_config$chainId = config.chainId) !== null && _config$chainId !== void 0 ? _config$chainId : 1;

    if (config.infuraId) {
      var network = chainId2InfuraNetwork(_this.chainId);
      rpcUrl = "https://".concat(network, ".infura.io/v3/").concat(config.infuraId);
    } // @ts-ignore


    _this.infuraProvider = new _web["default"].providers.HttpProvider(rpcUrl);
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
        var _ret, req, payload;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 3 : _context3.t0 === "personal_listAccounts" ? 4 : _context3.t0 === "eth_accounts" ? 4 : _context3.t0 === "eth_requestAccounts" ? 4 : _context3.t0 === "personal_sign" ? 7 : _context3.t0 === "eth_signTransaction" ? 10 : _context3.t0 === "eth_sendTransaction" ? 13 : _context3.t0 === "eth_sign" ? 20 : _context3.t0 === "eth_signTypedData" ? 20 : _context3.t0 === "eth_signTypedData_v3" ? 20 : _context3.t0 === "eth_signTypedData_v4" ? 20 : 21;
                break;

              case 3:
                return _context3.abrupt("return", this.chainId);

              case 4:
                _context3.next = 6;
                return this.imKeyRequestAccounts(requestId++);

              case 6:
                return _context3.abrupt("return", _context3.sent);

              case 7:
                _context3.next = 9;
                return this.imKeyPersonalSign(requestId++, args.params[0], args.params[1]);

              case 9:
                return _context3.abrupt("return", _context3.sent);

              case 10:
                _context3.next = 12;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 12:
                return _context3.abrupt("return", _context3.sent);

              case 13:
                _context3.next = 15;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 15:
                _ret = _context3.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret.raw]);
                _context3.next = 19;
                return this.callInnerProviderApi(req);

              case 19:
                return _context3.abrupt("return", _context3.sent);

              case 20:
                return _context3.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 21:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 24;
                return this.callInnerProviderApi(payload);

              case 24:
                return _context3.abrupt("return", _context3.sent);

              case 25:
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
        var from, accounts, gasPrice, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret3$result, _ret3$result2, _ret3$result2$txData, _ret3$result3, _ret3, txData, decoded, rlpTX;

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
                if (!gasPrice) {
                  _context5.next = 14;
                  break;
                }

                gasPrice = parseArgsNum(transactionConfig.gasPrice);
                _context5.next = 18;
                break;

              case 14:
                _context5.next = 16;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 16:
                gasPrice = _context5.sent;
                gasPrice = _web["default"].utils.hexToNumberString(gasPrice);

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
                  gasPrice: transactionConfig.gasPrice,
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 39:
                gasRet = _context5.sent;
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
                _context5.prev = 49;
                _context5.next = 52;
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
                _ret3 = _context5.sent;
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
    key: "imKeyPersonalSign",
    value: function () {
      var _imKeyPersonalSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, dataToSign, address, callback) {
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

      function imKeyPersonalSign(_x8, _x9, _x10, _x11) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJoZXhUb051bWJlclN0cmluZyIsIkltS2V5UHJvdmlkZXIiLCJjb25maWciLCJycGNVcmwiLCJpbmZ1cmFJZCIsIm5ldHdvcmsiLCJpbmZ1cmFQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInJlcSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsImVycm9yIiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJhY2NvdW50cyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiYXJncyIsImltS2V5UGVyc29uYWxTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsInZhbHVlIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwidHhEYXRhIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc0ludGVnZXIiLCJuYW1lIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0Iiwic2lnbmF0dXJlIiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsInVybCIsImZldGNoIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7Ozs7OztBQWNBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVKLFNBQVMsRUFEUjtBQUVMSyxJQUFBQSxPQUFPLEVBQUUsS0FGSjtBQUdMSCxJQUFBQSxNQUFNLEVBQU5BLE1BSEs7QUFJTEMsSUFBQUEsTUFBTSxFQUFOQTtBQUpLLEdBQVA7QUFNRDs7QUFFRCxTQUFTRyxxQkFBVCxDQUErQkYsRUFBL0IsRUFBb0RHLE1BQXBELEVBQWlFO0FBQy9ELFNBQU87QUFDTEgsSUFBQUEsRUFBRSxFQUFGQSxFQURLO0FBRUxD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QU47QUFDRDtBQUNGLEtBTkQsTUFNTztBQUNMLGFBQU84RixJQUFQO0FBQ0Q7QUFDRixHQVZNLENBQVA7QUFXRDs7QUFFRCxTQUFTRCxRQUFULENBQWtCRyxHQUFsQixFQUErQjFDLElBQS9CLEVBQThEO0FBQzVELFNBQU8yQyxLQUFLLENBQUNELEdBQUQsRUFBTTtBQUNoQkUsSUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTlDLElBQWYsQ0FEVTtBQUNZO0FBQzVCK0MsSUFBQUEsS0FBSyxFQUFFLFVBRlM7QUFFRztBQUNuQkMsSUFBQUEsV0FBVyxFQUFFLGFBSEc7QUFHWTtBQUM1QkMsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCL0csSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQmdILElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSmxFLElBWkksQ0FZQyxVQUFDbUUsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNiLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSWhFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcblxuXG5pbnRlcmZhY2UgSVByb3ZpZGVyT3B0aW9ucyB7XG4gIHJwY1VybD86IHN0cmluZztcbiAgaW5mdXJhSWQ/OiBzdHJpbmc7XG4gIGNoYWluSWQ/OiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbmNvbnN0IElNS0VZX01BTkFHRVJfRU5EUE9JTlQgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGkvaW1rZXlcIjtcbmNvbnN0IElNS0VZX0VUSF9QQVRIID0gXCJtLzQ0Jy82MCcvMCcvMC8wXCI7XG5sZXQgcmVxdWVzdElkID0gMDtcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBpbmZ1cmFQcm92aWRlcjogV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyO1xuICBwcml2YXRlIGNoYWluSWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElQcm92aWRlck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBycGNVcmwgPSBjb25maWcucnBjVXJsO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNvbmZpZy5jaGFpbklkID8/IDE7XG4gICAgaWYgKGNvbmZpZy5pbmZ1cmFJZCkge1xuICAgICAgY29uc3QgbmV0d29yayA9IGNoYWluSWQySW5mdXJhTmV0d29yayh0aGlzLmNoYWluSWQpO1xuICAgICAgcnBjVXJsID0gYGh0dHBzOi8vJHtuZXR3b3JrfS5pbmZ1cmEuaW8vdjMvJHtjb25maWcuaW5mdXJhSWR9YDtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuaW5mdXJhUHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHJwY1VybCk7XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5pbmZ1cmFQcm92aWRlci5zZW5kKFxuICAgICAgICByZXEsXG4gICAgICAgIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBKc29uUnBjUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBlbmFibGUoKSB7XG4gICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICBjb25zdCBjaGFpbklkSGV4ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2NoYWluSWRcIilcbiAgICApO1xuICAgIGNvbnN0IGNoYWluSWQgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKGNoYWluSWRIZXgpO1xuICAgIGlmIChjaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYWluIGlkIGFuZCBycGMgZW5kcG9pbnQgZG9uJ3QgbWF0Y2hcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RcIiwgeyBjaGFpbklkIH0pO1xuICAgICAgcmV0dXJuIGFjY291bnRzO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PiB7XG4gICAgc3dpdGNoIChhcmdzLm1ldGhvZCkge1xuICAgICAgY2FzZSBcImV0aF9nZXRDaGFpbklkXCI6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5JZDtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwicGVyc29uYWxfbGlzdEFjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9hY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgfVxuICAgICAgY2FzZSBcInBlcnNvbmFsX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVBlcnNvbmFsU2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKHJlcXVlc3RJZCsrLCBhcmdzLnBhcmFtcyFbMF0pO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zZW5kVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXEgPSBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9zZW5kUmF3VHJhbnNhY3Rpb25cIiwgW3JldC5yYXddKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocmVxKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjpcbiAgICAgIC8vIGh0dHBzOi8vZG9jcy5tZXRhbWFzay5pby9ndWlkZS9zaWduaW5nLWRhdGEuaHRtbCNhLWJyaWVmLWhpc3RvcnlcbiAgICAgIC8vXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhXCI6XG4gICAgICAvLyBjYXNlICdldGhfc2lnblR5cGVkRGF0YV92MSc6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3YzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3Y0XCI6IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgNDIwMCxcbiAgICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgICAgLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNhbGxiYWNrKGVyciwgbnVsbCkpO1xuICB9XG5cbiAgYXN5bmMgaW1LZXlSZXF1ZXN0QWNjb3VudHMoXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLmdldEFkZHJlc3NcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBbcmV0LnJlc3VsdD8uYWRkcmVzc10pO1xuICAgICAgcmV0dXJuIFtyZXQucmVzdWx0Py5hZGRyZXNzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRyYW5zYWN0aW9uQ29uZmlnOiBUcmFuc2FjdGlvbkNvbmZpZyxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChcbiAgICAgICF0cmFuc2FjdGlvbkNvbmZpZy50byB8fFxuICAgICAgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlXG4gICAgKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIlxuICAgICAgKTtcbiAgICB9XG4gICAgXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHxcbiAgICAgIHR5cGVvZiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgZnJvbSA9IGFjY291bnRzWzBdIGFzIHN0cmluZztcbiAgICB9ZWxzZXtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZTogc3RyaW5nO1xuICAgIGlmKGdhc1ByaWNlKXtcbiAgICAgIGdhc1ByaWNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9ZWxzZXtcbiAgICAgIGdhc1ByaWNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2FzUHJpY2VcIiwgW10pXG4gICAgICApO1xuICAgICAgZ2FzUHJpY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKGdhc1ByaWNlKTtcbiAgICB9XG5cbiAgICAvL2NoYWluIGlkXG4gICAgbGV0IGNoYWluSWQ6IG51bWJlcjtcbiAgICBpZih0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKXtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZFxuICAgIH1lbHNle1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZFxuICAgIH1cblxuICAgIC8vbm9uY2VcbiAgICBsZXQgbm9uY2U6IHN0cmluZztcbiAgICBpZih0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSl7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfWVsc2V7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW3RyYW5zYWN0aW9uQ29uZmlnLmZyb20sXCJwZW5kaW5nXCJdKVxuICAgICAgKTtcbiAgICAgIG5vbmNlID0gV2ViMy51dGlscy5oZXhUb051bWJlcihub25jZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2VzdGltYXRlIGdhc1xuICAgIGxldCBnYXNMaW1pdDogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpIHtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bShnYXNSZXQpO1xuICAgIH1cblxuICAgIC8vZmVlXG4gICAgbGV0IGZlZSA9IChcbiAgICAgIEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2UpXG4gICAgKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgcGF5bWVudDogdmFsdWVJbldlaSArIFwiIEVUSFwiLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHRvLFxuICAgICAgICAgICAgc2VuZGVyOiBmcm9tLFxuICAgICAgICAgICAgZmVlOiBmZWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBsZXQgdHhEYXRhID0gcmV0LnJlc3VsdD8udHhEYXRhO1xuICAgICAgaWYgKCFyZXQucmVzdWx0Py50eERhdGE/LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICB0eERhdGEgPSBcIjB4XCIgKyB0eERhdGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHR4RGF0YSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogdHhEYXRhLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2UsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UGVyc29uYWxTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpe1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBwb3N0RGF0YShJTUtFWV9NQU5BR0VSX0VORFBPSU5ULCBhcmcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==