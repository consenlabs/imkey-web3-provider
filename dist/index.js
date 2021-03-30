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
        var _ret, req, jsonobj, eip712HashHexWithoutSha3, payload;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('request ', args);
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 4 : _context3.t0 === "personal_listAccounts" ? 5 : _context3.t0 === "eth_accounts" ? 5 : _context3.t0 === "eth_requestAccounts" ? 5 : _context3.t0 === "personal_sign" ? 8 : _context3.t0 === "eth_signTransaction" ? 11 : _context3.t0 === "eth_sendTransaction" ? 14 : _context3.t0 === "eth_sign" ? 21 : _context3.t0 === "eth_signTypedData" ? 24 : _context3.t0 === "eth_signTypedData_v3" ? 24 : _context3.t0 === "eth_signTypedData_v4" ? 25 : 30;
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
                jsonobj = JSON.parse(args.params[1]);
                eip712HashHexWithoutSha3 = _eip["default"].signHashHex(jsonobj, true);
                _context3.next = 29;
                return this.imKeySign(requestId++, eip712HashHexWithoutSha3, args.params[0], false);

              case 29:
                return _context3.abrupt("return", _context3.sent);

              case 30:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 33;
                return this.callInnerProviderApi(payload);

              case 33:
                return _context3.abrupt("return", _context3.sent);

              case 34:
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
                if (!transactionConfig.value) {
                  transactionConfig.value = "0x0";
                }

                if (!(!transactionConfig.to || !transactionConfig.value)) {
                  _context5.next = 3;
                  break;
                }

                throw createProviderRpcError(-32602, "expected to,value");

              case 3:
                if (!(!transactionConfig.from || typeof transactionConfig.from === "number")) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 6;
                return this.imKeyRequestAccounts(requestId++);

              case 6:
                accounts = _context5.sent;
                from = accounts[0];
                _context5.next = 11;
                break;

              case 10:
                from = _web["default"].utils.toChecksumAddress(transactionConfig.from);

              case 11:
                if (!transactionConfig.gasPrice) {
                  _context5.next = 15;
                  break;
                }

                gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
                _context5.next = 19;
                break;

              case 15:
                _context5.next = 17;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 17:
                gasPriceRet = _context5.sent;
                gasPriceDec = _web["default"].utils.hexToNumberString(gasPriceRet);

              case 19:
                if (!transactionConfig.chainId) {
                  _context5.next = 25;
                  break;
                }

                if (!(transactionConfig.chainId !== this.chainId)) {
                  _context5.next = 22;
                  break;
                }

                throw createProviderRpcError(-32602, "expected chainId and connected chainId are mismatched");

              case 22:
                chainId = transactionConfig.chainId;
                _context5.next = 26;
                break;

              case 25:
                chainId = this.chainId;

              case 26:
                if (!transactionConfig.nonce) {
                  _context5.next = 30;
                  break;
                }

                nonce = parseArgsNum(transactionConfig.nonce);
                _context5.next = 34;
                break;

              case 30:
                _context5.next = 32;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_getTransactionCount", [transactionConfig.from, "pending"]));

              case 32:
                nonce = _context5.sent;
                nonce = _web["default"].utils.hexToNumber(nonce).toString();

              case 34:
                if (!transactionConfig.gas) {
                  _context5.next = 38;
                  break;
                }

                gasLimit = parseArgsNum(transactionConfig.gas);
                _context5.next = 44;
                break;

              case 38:
                console.log('request gas:', createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.to,
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));
                _context5.next = 41;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.to,
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 41:
                gasRet = _context5.sent;
                console.log('gasret:', gasRet);
                gasLimit = parseArgsNum(gasRet);

              case 44:
                //fee
                fee = (BigInt(gasLimit) * BigInt(gasPriceDec)).toString(); //wei

                fee = _web["default"].utils.fromWei(fee, "Gwei"); //to Gwei

                temp = Math.ceil(Number(fee));
                fee = (temp * 1000000000).toString(); //to ether

                fee = _web["default"].utils.fromWei(fee) + " ether";
                to = _web["default"].utils.toChecksumAddress(transactionConfig.to);
                value = parseArgsNum(transactionConfig.value);
                valueInWei = _web["default"].utils.fromWei(value);
                _context5.prev = 52;
                _context5.next = 55;
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

              case 55:
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

              case 64:
                _context5.prev = 64;
                _context5.t0 = _context5["catch"](52);
                callback === null || callback === void 0 ? void 0 : callback(_context5.t0, null);
                throw createProviderRpcError(4001, _context5.t0);

              case 68:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[52, 64]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImltS2V5U2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmV0IiwicmF3IiwianNvbm9iaiIsIkpTT04iLCJwYXJzZSIsImVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMyIsImltVG9rZW5FaXA3MTJVdGlscyIsInNpZ25IYXNoSGV4IiwicGF5bG9hZCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJmcm9tIiwidG9DaGVja3N1bUFkZHJlc3MiLCJnYXNQcmljZSIsImdhc1ByaWNlRGVjIiwiZ2FzUHJpY2VSZXQiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwibnVtYmVyVG9IZXgiLCJkYXRhIiwiZ2FzUmV0IiwiZmVlIiwiQmlnSW50IiwiZnJvbVdlaSIsInRlbXAiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsInZhbHVlSW5XZWkiLCJ0cmFuc2FjdGlvbiIsInByZXZpZXciLCJwYXltZW50IiwicmVjZWl2ZXIiLCJzZW5kZXIiLCJzaWduYXR1cmUiLCJzdGFydHNXaXRoIiwiZGVjb2RlZCIsInJscCIsImRlY29kZSIsInJscFRYIiwidHgiLCJpbnB1dCIsInIiLCJieXRlc1RvSGV4IiwicyIsInYiLCJoYXNoIiwidHhIYXNoIiwiZGF0YVRvU2lnbiIsImlzUGVyc29uYWxTaWduIiwiaXNJbnRlZ2VyIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0IiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsInVybCIsImZldGNoIiwiYm9keSIsInN0cmluZ2lmeSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOztBQUdBOzs7Ozs7QUFjQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCOztBQUVBLFNBQVNDLG9CQUFULENBQThCQyxNQUE5QixFQUFrRTtBQUFBLE1BQXBCQyxNQUFvQix1RUFBSixFQUFJO0FBQ2hFLFNBQU87QUFDTEMsSUFBQUEsRUFBRSxFQUFFSixTQUFTLEVBRFI7QUFFTEssSUFBQUEsT0FBTyxFQUFFLEtB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RUc7QUFDbkJDLElBQUFBLFdBQVcsRUFBRSxhQUhHO0FBR1k7QUFDNUJuRyxJQUFBQSxPQUFPLEVBQUU7QUFDUCxvQkFBYyx5QkFEUDtBQUVQLHNCQUFnQjtBQUZULEtBSk87QUFRaEJ6QixJQUFBQSxNQUFNLEVBQUUsTUFSUTtBQVFBO0FBQ2hCNkgsSUFBQUEsSUFBSSxFQUFFLE1BVFU7QUFTRjtBQUNkQyxJQUFBQSxRQUFRLEVBQUUsUUFWTTtBQVVJO0FBQ3BCQyxJQUFBQSxRQUFRLEVBQUUsYUFYTSxDQVdTOztBQVhULEdBQU4sQ0FBTCxDQVlKakUsSUFaSSxDQVlDLFVBQUNrRSxRQUFELEVBQWM7QUFDcEIsUUFBSUEsUUFBUSxDQUFDQyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGFBQU9ELFFBQVEsQ0FBQ1gsSUFBVCxFQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJekUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FsQk0sQ0FBUDtBQW1CRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgeyBKc29uUnBjUGF5bG9hZCwgSnNvblJwY1Jlc3BvbnNlIH0gZnJvbSBcIndlYjMtY29yZS1oZWxwZXJzXCI7XG5cbmltcG9ydCAqIGFzIHJscCBmcm9tIFwicmxwXCI7XG5pbXBvcnQgeyBSTFBFbmNvZGVkVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uQ29uZmlnIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudC1lbWl0dGVyLWVzNlwiO1xuaW1wb3J0IEJOIGZyb20gXCJibi5qc1wiO1xuaW1wb3J0ICogYXMgc2lndXRpbCBmcm9tIFwiZXRoLXNpZy11dGlsXCI7XG5pbXBvcnQgKiBhcyBldGhVdGlsIGZyb20gJ2V0aGVyZXVtanMtdXRpbCdcbmltcG9ydCBpbVRva2VuRWlwNzEyVXRpbHMgZnJvbSAnLi9laXA3MTInO1xuXG5pbnRlcmZhY2UgSVByb3ZpZGVyT3B0aW9ucyB7XG4gIHJwY1VybD86IHN0cmluZztcbiAgaW5mdXJhSWQ/OiBzdHJpbmc7XG4gIGNoYWluSWQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIiAmJiBXZWIzLnV0aWxzLmlzSGV4KG51bSkpIHtcbiAgICByZXR1cm4gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhudW0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbUtleVByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIGh0dHBQcm92aWRlcjogV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyO1xuICBwcml2YXRlIGNoYWluSWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElQcm92aWRlck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBycGNVcmwgPSBjb25maWcucnBjVXJsO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNvbmZpZy5jaGFpbklkID8/IDE7XG4gICAgaWYgKGNvbmZpZy5pbmZ1cmFJZCkge1xuICAgICAgY29uc3QgbmV0d29yayA9IGNoYWluSWQySW5mdXJhTmV0d29yayh0aGlzLmNoYWluSWQpO1xuICAgICAgcnBjVXJsID0gYGh0dHBzOi8vJHtuZXR3b3JrfS5pbmZ1cmEuaW8vdjMvJHtjb25maWcuaW5mdXJhSWR9YDtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGxldCBoZWFkZXJzID0gbnVsbDtcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaWR4IGluIGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgIGhlYWRlcnMucHVzaCh7IG5hbWU6IGlkeCwgdmFsdWU6IGNvbmZpZy5oZWFkZXJzW2lkeF0gfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5odHRwUHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHJwY1VybCwge1xuICAgICAgaGVhZGVycyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmh0dHBQcm92aWRlci5zZW5kKFxuICAgICAgICByZXEsXG4gICAgICAgIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBKc29uUnBjUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBlbmFibGUoKSB7XG4gICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICBjb25zdCBjaGFpbklkSGV4ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2NoYWluSWRcIilcbiAgICApO1xuICAgIGNvbnN0IGNoYWluSWQgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKGNoYWluSWRIZXgpO1xuICAgIGlmIChjaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYWluIGlkIGFuZCBycGMgZW5kcG9pbnQgZG9uJ3QgbWF0Y2hcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RcIiwgeyBjaGFpbklkIH0pO1xuICAgICAgcmV0dXJuIGFjY291bnRzO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc29sZS5sb2coJ3JlcXVlc3QgJyxhcmdzKVxuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICA0MjAwLFxuICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgKTtcbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIGNvbnN0IGpzb25vYmogPSBKU09OLnBhcnNlKGFyZ3MucGFyYW1zIVsxXSlcbiAgICAgICAgY29uc3QgZWlwNzEySGFzaEhleFdpdGhvdXRTaGEzID0gaW1Ub2tlbkVpcDcxMlV0aWxzLnNpZ25IYXNoSGV4KFxuICAgICAgICAgIGpzb25vYmosXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMsXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgICAudGhlbigocmV0KSA9PiBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYoIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKXtcbiAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlID0gXCIweDBcIlxuICAgIH1cbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZ2FzOicsICAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICB9LFxuICAgICAgXSkpXG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coJ2dhc3JldDonLGdhc1JldClcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuICAgICAgbGV0IHNpZ25hdHVyZSA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZTtcbiAgICAgIGlmICghc2lnbmF0dXJlLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWduYXR1cmUgPSBcIjB4XCIgKyBzaWduYXR1cmU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHNpZ25hdHVyZSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogc2lnbmF0dXJlLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgaXNQZXJzb25hbFNpZ246IGJvb2xlYW4sXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZCxcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgaXNQZXJzb25hbFNpZ24sXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIG11c3QgbWF0Y2ggJ0NvbnRlbnQtVHlwZScgaGVhZGVyXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIC8vIGluY2x1ZGUsIHNhbWUtb3JpZ2luLCAqb21pdFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNC4wIE1ETiBFeGFtcGxlXCIsXG4gICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXG4gICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gKmNsaWVudCwgbm8tcmVmZXJyZXJcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cEVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=