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
        var _ret, req, payload;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 3 : _context3.t0 === "personal_listAccounts" ? 4 : _context3.t0 === "eth_accounts" ? 4 : _context3.t0 === "eth_requestAccounts" ? 4 : _context3.t0 === "personal_sign" ? 7 : _context3.t0 === "eth_signTransaction" ? 10 : _context3.t0 === "eth_sendTransaction" ? 13 : _context3.t0 === "eth_sign" ? 20 : _context3.t0 === "eth_signTypedData" ? 23 : _context3.t0 === "eth_signTypedData_v3" ? 23 : _context3.t0 === "eth_signTypedData_v4" ? 23 : 24;
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
                return this.imKeySign(requestId++, args.params[0], args.params[1], true);

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
                _context3.next = 22;
                return this.imKeySign(requestId++, args.params[1], args.params[0], false);

              case 22:
                return _context3.abrupt("return", _context3.sent);

              case 23:
                return _context3.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 24:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 27;
                return this.callInnerProviderApi(payload);

              case 27:
                return _context3.abrupt("return", _context3.sent);

              case 28:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiaW1LZXlTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwiZ2FzUHJpY2VEZWMiLCJnYXNQcmljZVJldCIsIm5vbmNlIiwiZ2FzIiwiZ2FzTGltaXQiLCJudW1iZXJUb0hleCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInNpZ25hdHVyZSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNQZXJzb25hbFNpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsImFyZyIsInBvc3REYXRhIiwianNvbiIsImluY2x1ZGVzIiwidXJsIiwiZmV0Y2giLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOzs7Ozs7QUFjQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCOztBQUVBLFNBQVNDLG9CQUFULENBQThCQyxNQUE5QixFQUFrRTtBQUFBLE1BQXBCQyxNQUFvQix1RUFBSixFQUFJO0FBQ2hFLFNBQU87QUFDTEMsSUFBQUEsRUFBRSxFQUFFSixTQUFTLEVBRFI7QUFFTEssSUFBQUEsT0FBTyxFQUFFLEtBRko7QUFHTEgsSUFBQUEsTUFBTSxFQUFOQSxNQUhLO0FBSUxDLElBQUFBLE1BQU0sRUFBTkE7QUFKSyxHQUFQO0FBTUQ7O0FBRUQsU0FBU0cscUJBQVQsQ0FBK0JGLEVBQS9CLEVB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NUYsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCekIsSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQnNILElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSmxFLElBWkksQ0FZQyxVQUFDbUUsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNaLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSWpFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuICAgICAgbGV0IHNpZ25hdHVyZSA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZTtcbiAgICAgIGlmICghc2lnbmF0dXJlLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWduYXR1cmUgPSBcIjB4XCIgKyBzaWduYXR1cmU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHNpZ25hdHVyZSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogc2lnbmF0dXJlLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgaXNQZXJzb25hbFNpZ246IGJvb2xlYW4sXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZCxcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgaXNQZXJzb25hbFNpZ24sXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIG11c3QgbWF0Y2ggJ0NvbnRlbnQtVHlwZScgaGVhZGVyXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIC8vIGluY2x1ZGUsIHNhbWUtb3JpZ2luLCAqb21pdFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNC4wIE1ETiBFeGFtcGxlXCIsXG4gICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXG4gICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gKmNsaWVudCwgbm8tcmVmZXJyZXJcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cEVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=