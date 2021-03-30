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
                  to: transactionConfig.from,
                  // to 报错，先用from测试
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));
                _context5.next = 41;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.from,
                  // to 报错，先用from测试
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImltS2V5U2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmV0IiwicmF3IiwianNvbm9iaiIsIkpTT04iLCJwYXJzZSIsImVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMyIsImltVG9rZW5FaXA3MTJVdGlscyIsInNpZ25IYXNoSGV4IiwicGF5bG9hZCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJmcm9tIiwidG9DaGVja3N1bUFkZHJlc3MiLCJnYXNQcmljZSIsImdhc1ByaWNlRGVjIiwiZ2FzUHJpY2VSZXQiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwibnVtYmVyVG9IZXgiLCJkYXRhIiwiZ2FzUmV0IiwiZmVlIiwiQmlnSW50IiwiZnJvbVdlaSIsInRlbXAiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsInZhbHVlSW5XZWkiLCJ0cmFuc2FjdGlvbiIsInByZXZpZXciLCJwYXltZW50IiwicmVjZWl2ZXIiLCJzZW5kZXIiLCJzaWduYXR1cmUiLCJzdGFydHNXaXRoIiwiZGVjb2RlZCIsInJscCIsImRlY29kZSIsInJscFRYIiwidHgiLCJpbnB1dCIsInIiLCJieXRlc1RvSGV4IiwicyIsInYiLCJoYXNoIiwidHhIYXNoIiwiZGF0YVRvU2lnbiIsImlzUGVyc29uYWxTaWduIiwiaXNJbnRlZ2VyIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0IiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsInVybCIsImZldGNoIiwiYm9keSIsInN0cmluZ2lmeSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOztBQUdBOzs7Ozs7QUFjQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCOztBQUVBLFNBQVNDLG9CQUFULENBQThCQyxNQUE5QixFQUFrRTtBQUFBLE1BQXBCQyxNQUFvQix1RUFBSixFQUFJO0FBQ2hFLFNBQU87QUFDTEMsSUFBQUEsRUFBRSxFQUFFSixTQUFTLEVBRFI7QUFFTEssSUFBQUEsT0FBTyxFQUFFLEtB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SyxFQUFFLFVBRlM7QUFFRztBQUNuQkMsSUFBQUEsV0FBVyxFQUFFLGFBSEc7QUFHWTtBQUM1Qm5HLElBQUFBLE9BQU8sRUFBRTtBQUNQLG9CQUFjLHlCQURQO0FBRVAsc0JBQWdCO0FBRlQsS0FKTztBQVFoQnpCLElBQUFBLE1BQU0sRUFBRSxNQVJRO0FBUUE7QUFDaEI2SCxJQUFBQSxJQUFJLEVBQUUsTUFUVTtBQVNGO0FBQ2RDLElBQUFBLFFBQVEsRUFBRSxRQVZNO0FBVUk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxhQVhNLENBV1M7O0FBWFQsR0FBTixDQUFMLENBWUpqRSxJQVpJLENBWUMsVUFBQ2tFLFFBQUQsRUFBYztBQUNwQixRQUFJQSxRQUFRLENBQUNDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDWCxJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUl6RSxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbXBvcnQgKiBhcyBzaWd1dGlsIGZyb20gXCJldGgtc2lnLXV0aWxcIjtcbmltcG9ydCAqIGFzIGV0aFV0aWwgZnJvbSAnZXRoZXJldW1qcy11dGlsJ1xuaW1wb3J0IGltVG9rZW5FaXA3MTJVdGlscyBmcm9tICcuL2VpcDcxMic7XG5cbmludGVyZmFjZSBJUHJvdmlkZXJPcHRpb25zIHtcbiAgcnBjVXJsPzogc3RyaW5nO1xuICBpbmZ1cmFJZD86IHN0cmluZztcbiAgY2hhaW5JZD86IG51bWJlcjtcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbmNvbnN0IElNS0VZX01BTkFHRVJfRU5EUE9JTlQgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGkvaW1rZXlcIjtcbmNvbnN0IElNS0VZX0VUSF9QQVRIID0gXCJtLzQ0Jy82MCcvMCcvMC8wXCI7XG5sZXQgcmVxdWVzdElkID0gMDtcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiICYmIFdlYjMudXRpbHMuaXNIZXgobnVtKSkge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaHR0cFByb3ZpZGVyOiBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG4gIHByaXZhdGUgY2hhaW5JZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVByb3ZpZGVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmw7XG4gICAgdGhpcy5jaGFpbklkID0gY29uZmlnLmNoYWluSWQgPz8gMTtcbiAgICBpZiAoY29uZmlnLmluZnVyYUlkKSB7XG4gICAgICBjb25zdCBuZXR3b3JrID0gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKHRoaXMuY2hhaW5JZCk7XG4gICAgICBycGNVcmwgPSBgaHR0cHM6Ly8ke25ldHdvcmt9LmluZnVyYS5pby92My8ke2NvbmZpZy5pbmZ1cmFJZH1gO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbGV0IGhlYWRlcnMgPSBudWxsO1xuICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpZHggaW4gY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKHsgbmFtZTogaWR4LCB2YWx1ZTogY29uZmlnLmhlYWRlcnNbaWR4XSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmh0dHBQcm92aWRlciA9IG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIocnBjVXJsLCB7XG4gICAgICBoZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY2FsbElubmVyUHJvdmlkZXJBcGkocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaHR0cFByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGVuYWJsZSgpIHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgIGNvbnN0IGNoYWluSWRIZXggPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfY2hhaW5JZFwiKVxuICAgICk7XG4gICAgY29uc3QgY2hhaW5JZCA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIoY2hhaW5JZEhleCk7XG4gICAgaWYgKGNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhaW4gaWQgYW5kIHJwYyBlbmRwb2ludCBkb24ndCBtYXRjaFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdFwiLCB7IGNoYWluSWQgfSk7XG4gICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zb2xlLmxvZygncmVxdWVzdCAnLGFyZ3MpXG4gICAgc3dpdGNoIChhcmdzLm1ldGhvZCkge1xuICAgICAgY2FzZSBcImV0aF9nZXRDaGFpbklkXCI6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5JZDtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwicGVyc29uYWxfbGlzdEFjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9hY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgfVxuICAgICAgY2FzZSBcInBlcnNvbmFsX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKHJlcXVlc3RJZCsrLCBhcmdzLnBhcmFtcyFbMF0pO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zZW5kVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXEgPSBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9zZW5kUmF3VHJhbnNhY3Rpb25cIiwgW3JldC5yYXddKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocmVxKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhXCI6XG4gICAgICAvLyBjYXNlICdldGhfc2lnblR5cGVkRGF0YV92MSc6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3YzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgcmV0dXJuIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIDQyMDAsXG4gICAgICAgIGAke2FyZ3MubWV0aG9kfSBpcyBub3Qgc3VwcG9ydCBub3dgXG4gICAgICApO1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3Y0XCI6IHtcbiAgICAgICAgY29uc3QganNvbm9iaiA9IEpTT04ucGFyc2UoYXJncy5wYXJhbXMhWzFdKVxuICAgICAgICBjb25zdCBlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMgPSBpbVRva2VuRWlwNzEyVXRpbHMuc2lnbkhhc2hIZXgoXG4gICAgICAgICAganNvbm9iaixcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGVpcDcxMkhhc2hIZXhXaXRob3V0U2hhMyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZighdHJhbnNhY3Rpb25Db25maWcudmFsdWUpe1xuICAgICAgdHJhbnNhY3Rpb25Db25maWcudmFsdWUgPSBcIjB4MFwiXG4gICAgfVxuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcudG8gfHwgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKC0zMjYwMiwgXCJleHBlY3RlZCB0byx2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fCB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZURlYzogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSkge1xuICAgICAgZ2FzUHJpY2VEZWMgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNQcmljZVJldCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlRGVjID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZVJldCk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZDtcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKSB7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbXG4gICAgICAgICAgdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICBcInBlbmRpbmdcIixcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBnYXM6JywgICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLC8vIHRvIOaKpemUme+8jOWFiOeUqGZyb23mtYvor5VcbiAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgIH0sXG4gICAgICBdKSlcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcuZnJvbSwvLyB0byDmiqXplJnvvIzlhYjnlKhmcm9t5rWL6K+VXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBXZWIzLnV0aWxzLm51bWJlclRvSGV4KGdhc1ByaWNlRGVjKSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZygnZ2FzcmV0OicsZ2FzUmV0KVxuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZURlYykpLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25UcmFuc2FjdGlvblwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0cmFuc2FjdGlvbjoge1xuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAgIGdhc0xpbWl0LFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgcGF5bWVudDogdmFsdWVJbldlaSArIFwiIEVUSFwiLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHRvLFxuICAgICAgICAgICAgc2VuZGVyOiBmcm9tLFxuICAgICAgICAgICAgZmVlOiBmZWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBsZXQgc2lnbmF0dXJlID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlO1xuICAgICAgaWYgKCFzaWduYXR1cmUuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ25hdHVyZSA9IFwiMHhcIiArIHNpZ25hdHVyZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUoc2lnbmF0dXJlLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiBzaWduYXR1cmUsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVJbldlaSxcbiAgICAgICAgICBpbnB1dDogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgcjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs3XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHM6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbOF0pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB2OiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzZdKSxcbiAgICAgICAgICBoYXNoOiByZXQucmVzdWx0Py50eEhhc2gsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBybHBUWCk7XG4gICAgICByZXR1cm4gcmxwVFg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBpc1BlcnNvbmFsU2lnbjogYm9vbGVhbixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkLFxuICApIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhZGRyZXNzKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCJcbiAgICAgICk7XG4gICAgICBjYWxsYmFjaz8uKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhZGRyZXNzIGludmFsaWRcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiLFxuICAgICAgICB9LFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gV2ViMy51dGlscy50b1V0ZjgoZGF0YVRvU2lnbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRhdGEgPSBkYXRhVG9TaWduO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrc3VtQWRkcmVzcyA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcyBhcyBzdHJpbmcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnbk1lc3NhZ2VcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBpc1BlcnNvbmFsU2lnbixcbiAgICAgICAgICBzZW5kZXI6IGNoZWNrc3VtQWRkcmVzcyxcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBzaWdSZXQgPSByZXQucmVzdWx0Py5zaWduYXR1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghc2lnUmV0LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBwb3N0RGF0YShJTUtFWV9NQU5BR0VSX0VORFBPSU5ULCBhcmcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==