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
                _context3.t0 = args.method;
                _context3.next = _context3.t0 === "eth_getChainId" ? 3 : _context3.t0 === "personal_listAccounts" ? 4 : _context3.t0 === "eth_accounts" ? 4 : _context3.t0 === "eth_requestAccounts" ? 4 : _context3.t0 === "personal_sign" ? 7 : _context3.t0 === "eth_signTransaction" ? 10 : _context3.t0 === "eth_sendTransaction" ? 13 : _context3.t0 === "eth_sign" ? 20 : _context3.t0 === "eth_signTypedData" ? 23 : _context3.t0 === "eth_signTypedData_v3" ? 23 : _context3.t0 === "eth_signTypedData_v4" ? 24 : 29;
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
                jsonobj = JSON.parse(args.params[1]);
                eip712HashHexWithoutSha3 = _eip["default"].signHashHex(jsonobj, true);
                _context3.next = 28;
                return this.imKeySign(requestId++, eip712HashHexWithoutSha3, args.params[0], false);

              case 28:
                return _context3.abrupt("return", _context3.sent);

              case 29:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context3.next = 32;
                return this.callInnerProviderApi(payload);

              case 32:
                return _context3.abrupt("return", _context3.sent);

              case 33:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiaW1LZXlTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJqc29ub2JqIiwiSlNPTiIsInBhcnNlIiwiZWlwNzEySGFzaEhleFdpdGhvdXRTaGEzIiwiaW1Ub2tlbkVpcDcxMlV0aWxzIiwic2lnbkhhc2hIZXgiLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwiZ2FzUHJpY2VEZWMiLCJnYXNQcmljZVJldCIsIm5vbmNlIiwiZ2FzIiwiZ2FzTGltaXQiLCJudW1iZXJUb0hleCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInNpZ25hdHVyZSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNQZXJzb25hbFNpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsImFyZyIsInBvc3REYXRhIiwianNvbiIsImluY2x1ZGVzIiwidXJsIiwiZmV0Y2giLCJib2R5Iiwic3RyaW5naWZ5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBR0E7Ozs7OztBQWNBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVKLFNBQVMsRUFEUjtBQUVMSyxJQUFBQSxPQUFPLEVBQUUsS0FGSjtBQUdMSCxJQUFBQSxN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LElBQUlBLEtBQUosQ0FBVXVFLElBQUksQ0FBQzdFLEtBQUwsQ0FBVzlCLE9BQXJCLENBQU47QUFDRDtBQUNGLEtBTkQsTUFNTztBQUNMLGFBQU8yRyxJQUFQO0FBQ0Q7QUFDRixHQVZNLENBQVA7QUFXRDs7QUFFRCxTQUFTRCxRQUFULENBQWtCRyxHQUFsQixFQUErQnpDLElBQS9CLEVBQThEO0FBQzVELFNBQU8wQyxLQUFLLENBQUNELEdBQUQsRUFBTTtBQUNoQkUsSUFBQUEsSUFBSSxFQUFFbkUsSUFBSSxDQUFDb0UsU0FBTCxDQUFlNUMsSUFBZixDQURVO0FBQ1k7QUFDNUI2QyxJQUFBQSxLQUFLLEVBQUUsVUFGUztBQUVHO0FBQ25CQyxJQUFBQSxXQUFXLEVBQUUsYUFIRztBQUdZO0FBQzVCakcsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCekIsSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQjJILElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSmpFLElBWkksQ0FZQyxVQUFDa0UsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNYLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSXZFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmltcG9ydCAqIGFzIHNpZ3V0aWwgZnJvbSBcImV0aC1zaWctdXRpbFwiO1xuaW1wb3J0ICogYXMgZXRoVXRpbCBmcm9tICdldGhlcmV1bWpzLXV0aWwnXG5pbXBvcnQgaW1Ub2tlbkVpcDcxMlV0aWxzIGZyb20gJy4vZWlwNzEyJztcblxuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4ge1xuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICA0MjAwLFxuICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgKTtcbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIGNvbnN0IGpzb25vYmogPSBKU09OLnBhcnNlKGFyZ3MucGFyYW1zIVsxXSlcbiAgICAgICAgY29uc3QgZWlwNzEySGFzaEhleFdpdGhvdXRTaGEzID0gaW1Ub2tlbkVpcDcxMlV0aWxzLnNpZ25IYXNoSGV4KFxuICAgICAgICAgIGpzb25vYmosXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMsXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgICAudGhlbigocmV0KSA9PiBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSkpXG4gICAgICAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy50byB8fCAhdHJhbnNhY3Rpb25Db25maWcudmFsdWUpIHtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoLTMyNjAyLCBcImV4cGVjdGVkIHRvLHZhbHVlXCIpO1xuICAgIH1cblxuICAgIC8vZnJvbVxuICAgIGxldCBmcm9tOiBzdHJpbmc7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIHx8IHR5cGVvZiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgZnJvbSA9IGFjY291bnRzWzBdIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbSA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcuZnJvbSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vZ2FzIHByaWNlXG4gICAgbGV0IGdhc1ByaWNlRGVjOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKSB7XG4gICAgICBnYXNQcmljZURlYyA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1ByaWNlUmV0ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2FzUHJpY2VcIiwgW10pXG4gICAgICApO1xuICAgICAgZ2FzUHJpY2VEZWMgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKGdhc1ByaWNlUmV0KTtcbiAgICB9XG5cbiAgICAvL2NoYWluIGlkXG4gICAgbGV0IGNoYWluSWQ6IG51bWJlcjtcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIC0zMjYwMixcbiAgICAgICAgICBcImV4cGVjdGVkIGNoYWluSWQgYW5kIGNvbm5lY3RlZCBjaGFpbklkIGFyZSBtaXNtYXRjaGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNoYWluSWQgPSB0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFpbklkID0gdGhpcy5jaGFpbklkO1xuICAgIH1cblxuICAgIC8vbm9uY2VcbiAgICBsZXQgbm9uY2U6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcubm9uY2UpIHtcbiAgICAgIG5vbmNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9uY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nZXRUcmFuc2FjdGlvbkNvdW50XCIsIFtcbiAgICAgICAgICB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgIFwicGVuZGluZ1wiLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIG5vbmNlID0gV2ViMy51dGlscy5oZXhUb051bWJlcihub25jZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2VzdGltYXRlIGdhc1xuICAgIGxldCBnYXNMaW1pdDogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpIHtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBXZWIzLnV0aWxzLm51bWJlclRvSGV4KGdhc1ByaWNlRGVjKSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bShnYXNSZXQpO1xuICAgIH1cblxuICAgIC8vZmVlXG4gICAgbGV0IGZlZSA9IChCaWdJbnQoZ2FzTGltaXQpICogQmlnSW50KGdhc1ByaWNlRGVjKSkudG9TdHJpbmcoKTsgLy93ZWlcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlLCBcIkd3ZWlcIik7IC8vdG8gR3dlaVxuICAgIGNvbnN0IHRlbXAgPSBNYXRoLmNlaWwoTnVtYmVyKGZlZSkpO1xuICAgIGZlZSA9ICh0ZW1wICogMTAwMDAwMDAwMCkudG9TdHJpbmcoKTsgLy90byBldGhlclxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUpICsgXCIgZXRoZXJcIjtcblxuICAgIGNvbnN0IHRvID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy50byk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcudmFsdWUpO1xuICAgIGNvbnN0IHZhbHVlSW5XZWkgPSBXZWIzLnV0aWxzLmZyb21XZWkodmFsdWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcbiAgICAgIGxldCBzaWduYXR1cmUgPSByZXQucmVzdWx0Py5zaWduYXR1cmU7XG4gICAgICBpZiAoIXNpZ25hdHVyZS5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnbmF0dXJlID0gXCIweFwiICsgc2lnbmF0dXJlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvZGVkID0gcmxwLmRlY29kZShzaWduYXR1cmUsIHRydWUpO1xuXG4gICAgICBjb25zdCBybHBUWDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uID0ge1xuICAgICAgICByYXc6IHNpZ25hdHVyZSxcbiAgICAgICAgdHg6IHtcbiAgICAgICAgICBub25jZTogbm9uY2UsXG4gICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgIGdhczogZ2FzTGltaXQsXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUluV2VpLFxuICAgICAgICAgIGlucHV0OiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICByOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzddKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgczogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs4XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHY6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbNl0pLFxuICAgICAgICAgIGhhc2g6IHJldC5yZXN1bHQ/LnR4SGFzaCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHJscFRYKTtcbiAgICAgIHJldHVybiBybHBUWDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkYXRhVG9TaWduOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGlzUGVyc29uYWxTaWduOiBib29sZWFuLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWQsXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIGlzUGVyc29uYWxTaWduLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9KTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFzaWdSZXQuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19