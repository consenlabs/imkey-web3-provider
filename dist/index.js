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
        var from, accounts, gasPrice, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, _ret3$result, _ret3$result2, _ret3$result2$txData, _ret3$result3, _ret3, txData, decoded, rlpTX;

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
                _context5.prev = 48;
                _context5.next = 51;
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
                      payment: value + " ETH",
                      receiver: to,
                      sender: from,
                      fee: fee
                    }
                  },
                  id: requestId++
                });

              case 51:
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
                    value: value,
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

              case 60:
                _context5.prev = 60;
                _context5.t0 = _context5["catch"](48);
                callback === null || callback === void 0 ? void 0 : callback(_context5.t0, null);
                throw createProviderRpcError(4001, _context5.t0);

              case 64:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[48, 60]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJoZXhUb051bWJlclN0cmluZyIsIkltS2V5UHJvdmlkZXIiLCJjb25maWciLCJycGNVcmwiLCJpbmZ1cmFJZCIsIm5ldHdvcmsiLCJpbmZ1cmFQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsInJlcSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsImVycm9yIiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJhY2NvdW50cyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiYXJncyIsImltS2V5UGVyc29uYWxTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsInZhbHVlIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ0cmFuc2FjdGlvbiIsInByZXZpZXciLCJwYXltZW50IiwicmVjZWl2ZXIiLCJzZW5kZXIiLCJ0eERhdGEiLCJzdGFydHNXaXRoIiwiZGVjb2RlZCIsInJscCIsImRlY29kZSIsInJscFRYIiwidHgiLCJpbnB1dCIsInIiLCJieXRlc1RvSGV4IiwicyIsInYiLCJoYXNoIiwidHhIYXNoIiwiZGF0YVRvU2lnbiIsImlzSW50ZWdlciIsIm5hbWUiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJzaWduYXR1cmUiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsImFyZyIsInBvc3REYXRhIiwianNvbiIsImluY2x1ZGVzIiwidXJsIiwiZmV0Y2giLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJyZXNwb25zZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFFQTs7QUFDQTs7Ozs7O0FBY0EsSUFBTUEsc0JBQXNCLEdBQUcsaUNBQS9CO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLGtCQUF2QjtBQUNBLElBQUlDLFNBQVMsR0FBRyxDQUFoQjs7QUFFQSxTQUFTQyxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBa0U7QUFBQSxNQUFwQkMsTUFBb0IsdUVBQUosRUFBSTtBQUNoRSxTQUFPO0FBQ0xDLElBQUFBLEVBQUUsRUFBRUosU0FBUyxFQURSO0FBRUxLLElBQUFBLE9BQU8sRUFBRSxLQUZKO0FBR0xILElBQUFBLE1BQU0sRUFBTkEsTUFISztBQUlMQyxJQUFBQSxNQUFNLEVBQU5BO0FBSkssR0FBUDtBQU1EOztBQUVELFNBQVNHLHFCQUFULENBQStCRixFQUEvQixFQUFvREcsTUFBcEQsRUFBaUU7QUFDL0QsU0FBTztBQUNMSCxJQUFBQSxFQUFFLEVBQUZBLEVBREs7QUFFTEMsSUFBQUEsT0FBTyxF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U0QsUUFBVCxDQUFrQkcsR0FBbEIsRUFBK0J6QyxJQUEvQixFQUE4RDtBQUM1RCxTQUFPMEMsS0FBSyxDQUFDRCxHQUFELEVBQU07QUFDaEJFLElBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU3QyxJQUFmLENBRFU7QUFDWTtBQUM1QjhDLElBQUFBLEtBQUssRUFBRSxVQUZTO0FBRUc7QUFDbkJDLElBQUFBLFdBQVcsRUFBRSxhQUhHO0FBR1k7QUFDNUJDLElBQUFBLE9BQU8sRUFBRTtBQUNQLG9CQUFjLHlCQURQO0FBRVAsc0JBQWdCO0FBRlQsS0FKTztBQVFoQjlHLElBQUFBLE1BQU0sRUFBRSxNQVJRO0FBUUE7QUFDaEIrRyxJQUFBQSxJQUFJLEVBQUUsTUFUVTtBQVNGO0FBQ2RDLElBQUFBLFFBQVEsRUFBRSxRQVZNO0FBVUk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxhQVhNLENBV1M7O0FBWFQsR0FBTixDQUFMLENBWUpqRSxJQVpJLENBWUMsVUFBQ2tFLFFBQUQsRUFBYztBQUNwQixRQUFJQSxRQUFRLENBQUNDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDYixJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUkvRCxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5cblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaW5mdXJhUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmluZnVyYVByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwpO1xuICB9XG5cbiAgYXN5bmMgY2FsbElubmVyUHJvdmlkZXJBcGkocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaW5mdXJhUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduXCI6XG4gICAgICAvLyBodHRwczovL2RvY3MubWV0YW1hc2suaW8vZ3VpZGUvc2lnbmluZy1kYXRhLmh0bWwjYS1icmllZi1oaXN0b3J5XG4gICAgICAvL1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoXG4gICAgICAhdHJhbnNhY3Rpb25Db25maWcudG8gfHxcbiAgICAgICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZVxuICAgICkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcImV4cGVjdGVkIHRvLHZhbHVlXCJcbiAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIC8vZnJvbVxuICAgIGxldCBmcm9tOiBzdHJpbmc7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIHx8XG4gICAgICB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfWVsc2V7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2U6IHN0cmluZztcbiAgICBpZihnYXNQcmljZSl7XG4gICAgICBnYXNQcmljZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSk7XG4gICAgfWVsc2V7XG4gICAgICBnYXNQcmljZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZSk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCl7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWRcbiAgICB9ZWxzZXtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWRcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYodHJhbnNhY3Rpb25Db25maWcubm9uY2Upe1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH1lbHNle1xuICAgICAgbm9uY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nZXRUcmFuc2FjdGlvbkNvdW50XCIsIFt0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFwicGVuZGluZ1wiXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogdHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UsXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoXG4gICAgICBCaWdJbnQoZ2FzTGltaXQpICogQmlnSW50KGdhc1ByaWNlKVxuICAgICkudG9TdHJpbmcoKTsgLy93ZWlcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlLCBcIkd3ZWlcIik7IC8vdG8gR3dlaVxuICAgIGNvbnN0IHRlbXAgPSBNYXRoLmNlaWwoTnVtYmVyKGZlZSkpO1xuICAgIGZlZSA9ICh0ZW1wICogMTAwMDAwMDAwMCkudG9TdHJpbmcoKTsgLy90byBldGhlclxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUpICsgXCIgZXRoZXJcIjtcblxuICAgIGNvbnN0IHRvID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy50byk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcudmFsdWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZSxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGxldCB0eERhdGEgPSByZXQucmVzdWx0Py50eERhdGE7XG4gICAgICBpZiAoIXJldC5yZXN1bHQ/LnR4RGF0YT8uc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHR4RGF0YSA9IFwiMHhcIiArIHR4RGF0YTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUodHhEYXRhLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiB0eERhdGEsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZSxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UGVyc29uYWxTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpe1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBwb3N0RGF0YShJTUtFWV9NQU5BR0VSX0VORFBPSU5ULCBhcmcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==