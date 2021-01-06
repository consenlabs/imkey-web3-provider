"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test33 = test33;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _web = _interopRequireDefault(require("web3"));

var rlp = _interopRequireWildcard(require("rlp"));

var _eventEmitterEs = _interopRequireDefault(require("event-emitter-es6"));

var _bn = _interopRequireDefault(require("bn.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var IMKEY_MANAGER_ENDPOINT = "http://localhost:8081/api/imkey";
var IMKEY_ETH_PATH = "m/44'/60'/0'/0/0";
var requestId = 0;
var apirouter;
var dialog;

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

function test33() {
  return _test.apply(this, arguments);
}

function _test() {
  _test = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('test33');
            return _context8.abrupt("return", 'test33');

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _test.apply(this, arguments);
}

function isNative() {
  if (apirouter && dialog) {
    console.log('isNative true');
    return true;
  } else {
    console.log('isNative false');
    return false;
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
    apirouter = config.apirouter;
    dialog = config.dialog;
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
    key: "test22",
    value: function () {
      var _test2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('test22');
                return _context3.abrupt("return", '22');

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function test22() {
        return _test2.apply(this, arguments);
      }

      return test22;
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
                _context4.next = _context4.t0 === "eth_getChainId" ? 3 : _context4.t0 === "personal_listAccounts" ? 4 : _context4.t0 === "eth_accounts" ? 4 : _context4.t0 === "eth_requestAccounts" ? 4 : _context4.t0 === "personal_sign" ? 7 : _context4.t0 === "eth_signTransaction" ? 10 : _context4.t0 === "eth_sendTransaction" ? 13 : _context4.t0 === "eth_sign" ? 20 : _context4.t0 === "eth_signTypedData" ? 20 : _context4.t0 === "eth_signTypedData_v3" ? 20 : _context4.t0 === "eth_signTypedData_v4" ? 20 : 21;
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
                _context4.next = 19;
                return this.callInnerProviderApi(req);

              case 19:
                return _context4.abrupt("return", _context4.sent);

              case 20:
                return _context4.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 21:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context4.next = 24;
                return this.callInnerProviderApi(payload);

              case 24:
                return _context4.abrupt("return", _context4.sent);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
                }, isNative());

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

      function imKeyRequestAccounts(_x3, _x4) {
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
                }, isNative());

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

      function imKeySignTransaction(_x5, _x6, _x7) {
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
                }, isNative());

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
  var isNative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isNative) {
    console.log('native'); // dialog.showMessageBox({
    //   type: 'info',
    //   title: '访问说明',
    //   message: '你正在访问第三方DAPP\n' + arg,
    //   buttons: ['OK', 'Cancel']
    // }).then(result => {
    //   console.log('dialog then')
    //   return callNativeApi(arg)
    // }).catch(err => {
    //   console.log('dialog error')
    //   console.log(err)
    // })

    return callNativeApi(arg);
  } else {
    console.log('rpc');
    return callRpcApi(arg);
  }
}

function callRpcApi(arg) {
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

function callNativeApi(_x12) {
  return _callNativeApi.apply(this, arguments);
}

function _callNativeApi() {
  _callNativeApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(arg) {
    var json;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            json = apirouter.api(arg);

            if (!json.error) {
              _context9.next = 9;
              break;
            }

            if (!json.error.message.includes("ImkeyUserNotConfirmed")) {
              _context9.next = 6;
              break;
            }

            throw new Error("user not confirmed");

          case 6:
            throw new Error(json.error.message);

          case 7:
            _context9.next = 10;
            break;

          case 9:
            return _context9.abrupt("return", json);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _callNativeApi.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiaW1LZXlQZXJzb25hbFNpZ24iLCJpbUtleVNpZ25UcmFuc2FjdGlvbiIsInJldCIsInJhdyIsInBheWxvYWQiLCJjYWxsYmFjayIsInJlcXVlc3QiLCJ0aGVuIiwiZXJyIiwiY2FsbEltS2V5QXBpIiwicGF0aCIsImFkZHJlc3MiLCJ0cmFuc2FjdGlvbkNvbmZpZyIsInRvIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJnYXNQcmljZURlYyIsImdhc1ByaWNlUmV0Iiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsIm51bWJlclRvSGV4IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwidHhEYXRhIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJzaWduYXR1cmUiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsImFyZyIsImNhbGxOYXRpdmVBcGkiLCJjYWxsUnBjQXBpIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJhcGkiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOzs7Ozs7QUFlQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCO0FBQ0EsSUFBSUMsU0FBSjtBQUNBLElBQUlDLE1BQUo7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVOLFNBQVMsRUFEUjtBQUVMTyxJQUFBQSxPQUFPLEVBQUUsS0FGSjtBQUdMSCxJQUFBQSxNQUFNLEVBQU5BLE1BSEs7QUFJTEMsSUFBQUEsTUFBTSxFQUFOQTtBQUpLLEdBQVA7QUFNRDs7QUFFRCxTQUFTRyxxQkFBVCxDQUErQkYsRUFBL0IsRUFBb0RHLE1BQXBELEVBQWlFO0FBQy9ELFNBQU87QUFDTEgsSUFBQUEsRUFBRSxFQUFGQSxFQURLO0FBRUxDLElBQUFBLE9BQU8sRUFBRSxLQUZKO0FBR0xFLElBQUFBLE1BQU0sRUFBTkE7QUFISyxHQUFQO0FBS0Q7O0FBRUQsU0FBU0Msc0JBQVQsQ0FBZ0NDLElBQWhDLEVBQThDQyxPQUE5QyxFQUErRDtBQUM3RCxTQUFPO0FBQ0xBLElBQUFBLE9BQU8sRUFBUEEsT0FESztBQUVMRCxJQUFBQSxJQUFJLEVBQUpBO0FBRkssR0FBUDtBQUlEOztBQUVELFNBQVNFLHFCQUFULENBQStCQyxPQUEvQixFQUFnRDtBQUM5QyxVQUFRQSxPQUFSO0FBQ0UsU0FBSyxDQUFMO0FBQ0UsYUFBTyxTQUFQOztBQUNGLFNBQUssQ0FBTDtBQUNFLGFBQU8sU0FBUDs7QUFDRixTQUFLLENBQUw7QUFDRSxhQUFPLFFBQVA7O0FBQ0YsU0FBSyxFQUFMO0FBQ0UsYUFBTyxPQUFQOztBQUNGO0FBQ0UsYUFBTyxTQUFQO0FBVko7QUFZRDs7QUFFRCxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUFpRDtBQUMvQyxNQUFJQSxHQUFHLFlBQVlDLGNBQW5CLEVBQXVCO0FBQ3JCLFdBQU9ELEdBQUcsQ0FBQ0UsUUFBSixHQUFlQyxRQUFmLEVBQVA7QUFDRCxHQUZELE1BRU8sSUFBSSxPQUFPSCxHQUFQLEtBQWUsUUFBZixJQUEyQkksZ0JBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQk4sR0FBakIsQ0FBL0IsRUFBc0Q7QUFDM0QsV0FBT0ksZ0JBQUtDLEtBQUwsQ0FBV0UsaUJBQVgsQ0FBNkJQLEdBQTdCLENBQVA7QUFDRCxHQUZNLE1BRUE7QUFDTCxXQUFPQSxHQUFHLENBQUNHLFFBQUosRUFBUDtBQUNEO0FBQ0Y7O1NBRXFCSyxNOzs7Ozt3RkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0xDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFESyw4Q0FFRSxRQUZGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFLUCxTQUFTQyxRQUFULEdBQW1CO0FBQ2pCLE1BQUcxQixTQUFTLElBQUVDLE1BQWQsRUFBcUI7QUFDbkJ1QixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRCxNQUdLO0FBQ0hELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaO0FBQ0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRjs7SUFFb0JFLGE7Ozs7O0FBQ25CO0FBSUEseUJBQVlDLE1BQVosRUFBc0M7QUFBQTs7QUFBQTs7QUFBQTtBQUNwQztBQURvQztBQUFBO0FBRXBDLFFBQUlDLE1BQU0sR0FBR0QsTUFBTSxDQUFDQyxNQUFwQjtBQUNBLFVBQUtoQixPQUFMLHNCQUFlZSxNQUFNLENBQUNmLE9BQXRCLDZEQUFpQyxDQUFqQzs7QUFDQSxRQUFJZSxNQUFNLENBQUNFLFFBQVgsRUFBcUI7QUFDbkIsVUFBTUMsT0FBTyxHQUFHbkIscUJBQXFCLENBQUMsTUFBS0MsT0FBTixDQUFyQztBQUNBZ0IsTUFBQUEsTUFBTSxxQkFBY0UsT0FBZCwyQkFBc0NILE1BQU0sQ0FBQ0UsUUFBN0MsQ0FBTjtBQUNELEtBUG1DLENBUXBDOzs7QUFDQSxRQUFJRSxPQUFPLEdBQUcsSUFBZDs7QUFDQSxRQUFJSixNQUFNLENBQUNJLE9BQVgsRUFBb0I7QUFDbEJBLE1BQUFBLE9BQU8sR0FBRyxFQUFWOztBQUNBLFdBQUssSUFBTUMsR0FBWCxJQUFrQkwsTUFBTSxDQUFDSSxPQUF6QixFQUFrQztBQUNoQ0EsUUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWE7QUFBRUMsVUFBQUEsSUFBSSxFQUFFRixHQUFSO0FBQWFHLFVBQUFBLEtBQUssRUFBRVIsTUFBTSxDQUFDSSxPQUFQLENBQWVDLEdBQWY7QUFBcEIsU0FBYjtBQUNEO0FBQ0Y7O0FBRUQsVUFBS0ksWUFBTCxHQUFvQixJQUFJbEIsZ0JBQUttQixTQUFMLENBQWVDLFlBQW5CLENBQWdDVixNQUFoQyxFQUF3QztBQUMxREcsTUFBQUEsT0FBTyxFQUFQQTtBQUQwRCxLQUF4QyxDQUFwQjtBQUlBaEMsSUFBQUEsU0FBUyxHQUFHNEIsTUFBTSxDQUFDNUIsU0FBbkI7QUFDQUMsSUFBQUEsTUFBTSxHQUFHMkIsTUFBTSxDQUFDM0IsTUFBaEI7QUF0Qm9DO0FBdUJyQzs7Ozs7aUlBRTBCdUMsRzs7Ozs7OztpREFDbEIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxrQkFBQSxNQUFJLENBQUNOLFlBQUwsQ0FBa0JPLElBQWxCLENBQ0VKLEdBREYsRUFFRSxVQUFDSyxLQUFELEVBQXNCckMsTUFBdEIsRUFBbUQ7QUFDakQsd0JBQUlxQyxLQUFKLEVBQVc7QUFDVEYsc0JBQUFBLE1BQU0sQ0FBQ2xDLHNCQUFzQixDQUFDLElBQUQsRUFBT29DLEtBQUssQ0FBQ2xDLE9BQWIsQ0FBdkIsQ0FBTjtBQUNELHFCQUZELE1BRU87QUFDTCtCLHNCQUFBQSxPQUFPLENBQUNsQyxNQUFNLENBQUNBLE1BQVIsQ0FBUDtBQUNEO0FBQ0YsbUJBUkg7QUFVRCxpQkFYTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFlZ0IsS0FBS3NDLG9CQUFMLENBQTBCL0MsU0FBUyxFQUFuQyxDOzs7QUFBakJnRCxnQkFBQUEsUTs7dUJBQ21CLEtBQUtDLG9CQUFMLENBQ3ZCOUMsb0JBQW9CLENBQUMsYUFBRCxDQURHLEM7OztBQUFuQitDLGdCQUFBQSxVO0FBR0FwQyxnQkFBQUEsTyxHQUFVTSxnQkFBS0MsS0FBTCxDQUFXOEIsV0FBWCxDQUF1QkQsVUFBdkIsQzs7c0JBQ1pwQyxPQUFPLEtBQUssS0FBS0EsTzs7Ozs7c0JBQ2IsSUFBSXNDLEtBQUosQ0FBVSx1Q0FBVixDOzs7QUFFTixxQkFBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUI7QUFBRXZDLGtCQUFBQSxPQUFPLEVBQVBBO0FBQUYsaUJBQXJCO2tEQUNPa0MsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1R2QixnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWjtrREFDTyxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FIQUdLNEIsSTs7Ozs7OzsrQkFDSkEsSUFBSSxDQUFDbEQsTTtrREFDTixnQix3QkFJQSx1Qix3QkFFQSxjLHdCQUVBLHFCLHdCQUdBLGUsd0JBT0EscUIseUJBR0EscUIseUJBU0EsVSx5QkFJQSxtQix5QkFHQSxzQix5QkFFQSxzQjs7OztrREF0Q0ksS0FBS1UsTzs7Ozt1QkFRQyxLQUFLaUMsb0JBQUwsQ0FBMEIvQyxTQUFTLEVBQW5DLEM7Ozs7Ozs7dUJBR0EsS0FBS3VELGlCQUFMLENBQ1h2RCxTQUFTLEVBREUsRUFFWHNELElBQUksQ0FBQ2pELE1BQUwsQ0FBYSxDQUFiLENBRlcsRUFHWGlELElBQUksQ0FBQ2pELE1BQUwsQ0FBYSxDQUFiLENBSFcsQzs7Ozs7Ozt1QkFPQSxLQUFLbUQsb0JBQUwsQ0FBMEJ4RCxTQUFTLEVBQW5DLEVBQXVDc0QsSUFBSSxDQUFDakQsTUFBTCxDQUFhLENBQWIsQ0FBdkMsQzs7Ozs7Ozt1QkFHSyxLQUFLbUQsb0JBQUwsQ0FDaEJ4RCxTQUFTLEVBRE8sRUFFaEJzRCxJQUFJLENBQUNqRCxNQUFMLENBQWEsQ0FBYixDQUZnQixDOzs7QUFBWm9ELGdCQUFBQSxJO0FBSUFoQixnQkFBQUEsRyxHQUFNdEMsb0JBQW9CLENBQUMsd0JBQUQsRUFBMkIsQ0FBQ3NELElBQUcsQ0FBQ0MsR0FBTCxDQUEzQixDOzt1QkFDbkIsS0FBS1Qsb0JBQUwsQ0FBMEJSLEdBQTFCLEM7Ozs7OztrREFhTi9CLHNCQUFzQixDQUMzQixJQUQyQixZQUV4QjRDLElBQUksQ0FBQ2xELE1BRm1CLHlCOzs7QUFNdkJ1RCxnQkFBQUEsTyxHQUFVO0FBQ2RwRCxrQkFBQUEsT0FBTyxFQUFFLEtBREs7QUFFZEgsa0JBQUFBLE1BQU0sRUFBRWtELElBQUksQ0FBQ2xELE1BRkM7QUFHZEMsa0JBQUFBLE1BQU0sRUFBRWlELElBQUksQ0FBQ2pELE1BSEM7QUFJZEMsa0JBQUFBLEVBQUUsRUFBRU4sU0FBUztBQUpDLGlCOzt1QkFNSCxLQUFLaUQsb0JBQUwsQ0FBMEJVLE9BQTFCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFNakJMLEksRUFDQU0sUSxFQUNBO0FBQ0EsV0FBS0MsT0FBTCxDQUFhUCxJQUFiLEVBQ0dRLElBREgsQ0FDUSxVQUFDTCxHQUFEO0FBQUEsZUFBU0csUUFBUSxDQUFDLElBQUQsRUFBT3BELHFCQUFxQixDQUFDOEMsSUFBSSxDQUFDaEQsRUFBTixFQUFVbUQsR0FBVixDQUE1QixDQUFqQjtBQUFBLE9BRFIsV0FFUyxVQUFDTSxHQUFEO0FBQUEsZUFBU0gsUUFBUSxDQUFDRyxHQUFELEVBQU0sSUFBTixDQUFqQjtBQUFBLE9BRlQ7QUFHRDs7OztrSUFHQ3pELEUsRUFDQXNELFE7Ozs7Ozs7Ozt1QkFHb0JJLFlBQVksQ0FBQztBQUM3QnpELGtCQUFBQSxPQUFPLEVBQUUsS0FEb0I7QUFFN0JILGtCQUFBQSxNQUFNLEVBQUUsZ0JBRnFCO0FBRzdCQyxrQkFBQUEsTUFBTSxFQUFFO0FBQ040RCxvQkFBQUEsSUFBSSxFQUFFbEU7QUFEQSxtQkFIcUI7QUFNN0JPLGtCQUFBQSxFQUFFLEVBQUVOLFNBQVM7QUFOZ0IsaUJBQUQsRUFPM0IyQixRQUFRLEVBUG1CLEM7OztBQUF4QjhCLGdCQUFBQSxLO0FBUU5HLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FBRyxJQUFILEVBQVMsaUJBQUNILEtBQUcsQ0FBQ2hELE1BQUwsaURBQUMsYUFBWXlELE9BQWIsQ0FBVCxDQUFSO2tEQUNPLGtCQUFDVCxLQUFHLENBQUNoRCxNQUFMLGtEQUFDLGNBQVl5RCxPQUFiLEM7Ozs7O0FBRVBOLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsZUFBVSxJQUFWLENBQVI7c0JBQ01sRCxzQkFBc0IsQ0FBQyxJQUFELGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0lBSzlCSixFLEVBQ0E2RCxpQixFQUNBUCxROzs7Ozs7O3NCQUVJLENBQUNPLGlCQUFpQixDQUFDQyxFQUFuQixJQUF5QixDQUFDRCxpQkFBaUIsQ0FBQzlCLEs7Ozs7O3NCQUN4QzNCLHNCQUFzQixDQUFDLENBQUMsS0FBRixFQUFTLG1CQUFULEM7OztzQkFLMUIsQ0FBQ3lELGlCQUFpQixDQUFDRSxJQUFuQixJQUEyQixPQUFPRixpQkFBaUIsQ0FBQ0UsSUFBekIsS0FBa0MsUTs7Ozs7O3VCQUN4QyxLQUFLdEIsb0JBQUwsQ0FBMEIvQyxTQUFTLEVBQW5DLEM7OztBQUFqQmdELGdCQUFBQSxRO0FBQ05xQixnQkFBQUEsSUFBSSxHQUFHckIsUUFBUSxDQUFDLENBQUQsQ0FBZjs7Ozs7QUFFQXFCLGdCQUFBQSxJQUFJLEdBQUdqRCxnQkFBS0MsS0FBTCxDQUFXaUQsaUJBQVgsQ0FBNkJILGlCQUFpQixDQUFDRSxJQUEvQyxDQUFQOzs7cUJBS0VGLGlCQUFpQixDQUFDSSxROzs7OztBQUNwQkMsZ0JBQUFBLFdBQVcsR0FBR3pELFlBQVksQ0FBQ29ELGlCQUFpQixDQUFDSSxRQUFuQixDQUExQjs7Ozs7O3VCQUUwQixLQUFLdEIsb0JBQUwsQ0FDeEI5QyxvQkFBb0IsQ0FBQyxjQUFELEVBQWlCLEVBQWpCLENBREksQzs7O0FBQXBCc0UsZ0JBQUFBLFc7QUFHTkQsZ0JBQUFBLFdBQVcsR0FBR3BELGdCQUFLQyxLQUFMLENBQVdFLGlCQUFYLENBQTZCa0QsV0FBN0IsQ0FBZDs7O3FCQUtFTixpQkFBaUIsQ0FBQ3JELE87Ozs7O3NCQUNoQnFELGlCQUFpQixDQUFDckQsT0FBbEIsS0FBOEIsS0FBS0EsTzs7Ozs7c0JBQy9CSixzQkFBc0IsQ0FDMUIsQ0FBQyxLQUR5QixFQUUxQix1REFGMEIsQzs7O0FBSzlCSSxnQkFBQUEsT0FBTyxHQUFHcUQsaUJBQWlCLENBQUNyRCxPQUE1Qjs7Ozs7QUFFQUEsZ0JBQUFBLE9BQU8sR0FBRyxLQUFLQSxPQUFmOzs7cUJBS0VxRCxpQkFBaUIsQ0FBQ08sSzs7Ozs7QUFDcEJBLGdCQUFBQSxLQUFLLEdBQUczRCxZQUFZLENBQUNvRCxpQkFBaUIsQ0FBQ08sS0FBbkIsQ0FBcEI7Ozs7Ozt1QkFFYyxLQUFLekIsb0JBQUwsQ0FDWjlDLG9CQUFvQixDQUFDLHlCQUFELEVBQTRCLENBQzlDZ0UsaUJBQWlCLENBQUNFLElBRDRCLEVBRTlDLFNBRjhDLENBQTVCLENBRFIsQzs7O0FBQWRLLGdCQUFBQSxLO0FBTUFBLGdCQUFBQSxLQUFLLEdBQUd0RCxnQkFBS0MsS0FBTCxDQUFXOEIsV0FBWCxDQUF1QnVCLEtBQXZCLEVBQThCdkQsUUFBOUIsRUFBUjs7O3FCQUtFZ0QsaUJBQWlCLENBQUNRLEc7Ozs7O0FBQ3BCQyxnQkFBQUEsUUFBUSxHQUFHN0QsWUFBWSxDQUFDb0QsaUJBQWlCLENBQUNRLEdBQW5CLENBQXZCOzs7Ozs7dUJBRTZCLEtBQUsxQixvQkFBTCxDQUMzQjlDLG9CQUFvQixDQUFDLGlCQUFELEVBQW9CLENBQ3RDO0FBQ0VrRSxrQkFBQUEsSUFBSSxFQUFFRixpQkFBaUIsQ0FBQ0UsSUFEMUI7QUFFRUQsa0JBQUFBLEVBQUUsRUFBRUQsaUJBQWlCLENBQUNDLEVBRnhCO0FBR0VPLGtCQUFBQSxHQUFHLEVBQUVSLGlCQUFpQixDQUFDUSxHQUh6QjtBQUlFSixrQkFBQUEsUUFBUSxFQUFFbkQsZ0JBQUtDLEtBQUwsQ0FBV3dELFdBQVgsQ0FBdUJMLFdBQXZCLENBSlo7QUFLRW5DLGtCQUFBQSxLQUFLLEVBQUU4QixpQkFBaUIsQ0FBQzlCLEtBTDNCO0FBTUV5QyxrQkFBQUEsSUFBSSxFQUFFWCxpQkFBaUIsQ0FBQ1c7QUFOMUIsaUJBRHNDLENBQXBCLENBRE8sQzs7O0FBQXZCQyxnQkFBQUEsTTtBQVlOSCxnQkFBQUEsUUFBUSxHQUFHN0QsWUFBWSxDQUFDZ0UsTUFBRCxDQUF2Qjs7O0FBR0Y7QUFDSUMsZ0JBQUFBLEcsR0FBTSxDQUFDQyxNQUFNLENBQUNMLFFBQUQsQ0FBTixHQUFtQkssTUFBTSxDQUFDVCxXQUFELENBQTFCLEVBQXlDckQsUUFBekMsRSxFQUFxRDs7QUFDL0Q2RCxnQkFBQUEsR0FBRyxHQUFHNUQsZ0JBQUtDLEtBQUwsQ0FBVzZELE9BQVgsQ0FBbUJGLEdBQW5CLEVBQXdCLE1BQXhCLENBQU4sQyxDQUF1Qzs7QUFDakNHLGdCQUFBQSxJLEdBQU9DLElBQUksQ0FBQ0MsSUFBTCxDQUFVQyxNQUFNLENBQUNOLEdBQUQsQ0FBaEIsQztBQUNiQSxnQkFBQUEsR0FBRyxHQUFHLENBQUNHLElBQUksR0FBRyxVQUFSLEVBQW9CaEUsUUFBcEIsRUFBTixDLENBQXNDOztBQUN0QzZELGdCQUFBQSxHQUFHLEdBQUc1RCxnQkFBS0MsS0FBTCxDQUFXNkQsT0FBWCxDQUFtQkYsR0FBbkIsSUFBMEIsUUFBaEM7QUFFTVosZ0JBQUFBLEUsR0FBS2hELGdCQUFLQyxLQUFMLENBQVdpRCxpQkFBWCxDQUE2QkgsaUJBQWlCLENBQUNDLEVBQS9DLEM7QUFDTC9CLGdCQUFBQSxLLEdBQVF0QixZQUFZLENBQUNvRCxpQkFBaUIsQ0FBQzlCLEtBQW5CLEM7QUFDcEJrRCxnQkFBQUEsVSxHQUFhbkUsZ0JBQUtDLEtBQUwsQ0FBVzZELE9BQVgsQ0FBbUI3QyxLQUFuQixDOzs7dUJBR0MyQixZQUFZLENBQUM7QUFDN0J6RCxrQkFBQUEsT0FBTyxFQUFFLEtBRG9CO0FBRTdCSCxrQkFBQUEsTUFBTSxFQUFFLHFCQUZxQjtBQUc3QkMsa0JBQUFBLE1BQU0sRUFBRTtBQUNObUYsb0JBQUFBLFdBQVcsRUFBRTtBQUNYVixzQkFBQUEsSUFBSSxFQUFFWCxpQkFBaUIsQ0FBQ1csSUFEYjtBQUVYRixzQkFBQUEsUUFBUSxFQUFSQSxRQUZXO0FBR1hMLHNCQUFBQSxRQUFRLEVBQUVDLFdBSEM7QUFJWEUsc0JBQUFBLEtBQUssRUFBTEEsS0FKVztBQUtYTixzQkFBQUEsRUFBRSxFQUFGQSxFQUxXO0FBTVgvQixzQkFBQUEsS0FBSyxFQUFMQSxLQU5XO0FBT1h2QixzQkFBQUEsT0FBTyxFQUFQQSxPQVBXO0FBUVhtRCxzQkFBQUEsSUFBSSxFQUFFbEU7QUFSSyxxQkFEUDtBQVdOMEYsb0JBQUFBLE9BQU8sRUFBRTtBQUNQQyxzQkFBQUEsT0FBTyxFQUFFSCxVQUFVLEdBQUcsTUFEZjtBQUVQSSxzQkFBQUEsUUFBUSxFQUFFdkIsRUFGSDtBQUdQd0Isc0JBQUFBLE1BQU0sRUFBRXZCLElBSEQ7QUFJUFcsc0JBQUFBLEdBQUcsRUFBRUE7QUFKRTtBQVhILG1CQUhxQjtBQXFCN0IxRSxrQkFBQUEsRUFBRSxFQUFFTixTQUFTO0FBckJnQixpQkFBRCxFQXNCM0IyQixRQUFRLEVBdEJtQixDOzs7QUFBeEI4QixnQkFBQUEsSztBQXVCRm9DLGdCQUFBQSxNLG1CQUFTcEMsS0FBRyxDQUFDaEQsTSxpREFBSixhQUFZb0YsTTs7QUFDekIsb0JBQUksbUJBQUNwQyxLQUFHLENBQUNoRCxNQUFMLDBFQUFDLGNBQVlvRixNQUFiLHlEQUFDLHFCQUFvQkMsVUFBcEIsQ0FBK0IsSUFBL0IsQ0FBRCxDQUFKLEVBQTJDO0FBQ3pDRCxrQkFBQUEsTUFBTSxHQUFHLE9BQU9BLE1BQWhCO0FBQ0Q7O0FBRUtFLGdCQUFBQSxPLEdBQVVDLEdBQUcsQ0FBQ0MsTUFBSixDQUFXSixNQUFYLEVBQW1CLElBQW5CLEM7QUFFVkssZ0JBQUFBLEssR0FBK0I7QUFDbkN4QyxrQkFBQUEsR0FBRyxFQUFFbUMsTUFEOEI7QUFFbkNNLGtCQUFBQSxFQUFFLEVBQUU7QUFDRnpCLG9CQUFBQSxLQUFLLEVBQUVBLEtBREw7QUFFRkgsb0JBQUFBLFFBQVEsRUFBRUMsV0FGUjtBQUdGRyxvQkFBQUEsR0FBRyxFQUFFQyxRQUhIO0FBSUZSLG9CQUFBQSxFQUFFLEVBQUVBLEVBSkY7QUFLRi9CLG9CQUFBQSxLQUFLLEVBQUVrRCxVQUxMO0FBTUZhLG9CQUFBQSxLQUFLLEVBQUVqQyxpQkFBaUIsQ0FBQ1csSUFOdkI7QUFPRjtBQUNBdUIsb0JBQUFBLENBQUMsRUFBRWpGLGdCQUFLQyxLQUFMLENBQVdpRixVQUFYLENBQXNCUCxPQUFPLENBQUNqQixJQUFSLENBQWEsQ0FBYixDQUF0QixDQVJEO0FBU0Y7QUFDQXlCLG9CQUFBQSxDQUFDLEVBQUVuRixnQkFBS0MsS0FBTCxDQUFXaUYsVUFBWCxDQUFzQlAsT0FBTyxDQUFDakIsSUFBUixDQUFhLENBQWIsQ0FBdEIsQ0FWRDtBQVdGO0FBQ0EwQixvQkFBQUEsQ0FBQyxFQUFFcEYsZ0JBQUtDLEtBQUwsQ0FBV2lGLFVBQVgsQ0FBc0JQLE9BQU8sQ0FBQ2pCLElBQVIsQ0FBYSxDQUFiLENBQXRCLENBWkQ7QUFhRjJCLG9CQUFBQSxJQUFJLG1CQUFFaEQsS0FBRyxDQUFDaEQsTUFBTixrREFBRSxjQUFZaUc7QUFiaEI7QUFGK0IsaUI7QUFrQnJDOUMsZ0JBQUFBLFFBQVEsU0FBUixJQUFBQSxRQUFRLFdBQVIsWUFBQUEsUUFBUSxDQUFHLElBQUgsRUFBU3NDLEtBQVQsQ0FBUjtrREFDT0EsSzs7Ozs7QUFFUHRDLGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsZUFBVSxJQUFWLENBQVI7c0JBQ01sRCxzQkFBc0IsQ0FBQyxJQUFELGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0hBSzlCSixFLEVBQ0FxRyxVLEVBQ0F6QyxPLEVBQ0FOLFE7Ozs7Ozs7cUJBRUkwQixNQUFNLENBQUNzQixTQUFQLENBQWlCMUMsT0FBakIsQzs7Ozs7QUFDSXBCLGdCQUFBQSxNLEdBQVFwQyxzQkFBc0IsQ0FDbEMsQ0FBQyxLQURpQyxFQUVsQyw0Q0FGa0MsQztBQUlwQ2tELGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FDTjtBQUNFeEIsa0JBQUFBLElBQUksRUFBRSxpQkFEUjtBQUVFeEIsa0JBQUFBLE9BQU8sRUFBRTtBQUZYLGlCQURNLEVBS04sSUFMTSxDQUFSO3NCQU9Na0MsTTs7O0FBR0pnQyxnQkFBQUEsSSxHQUFPLEU7O0FBQ1gsb0JBQUk7QUFDRkEsa0JBQUFBLElBQUksR0FBRzFELGdCQUFLQyxLQUFMLENBQVd3RixNQUFYLENBQWtCRixVQUFsQixDQUFQO0FBQ0QsaUJBRkQsQ0FFRSxPQUFPN0QsS0FBUCxFQUFjO0FBQ2RnQyxrQkFBQUEsSUFBSSxHQUFHNkIsVUFBUDtBQUNEOztBQUVLRyxnQkFBQUEsZSxHQUFrQjFGLGdCQUFLQyxLQUFMLENBQVdpRCxpQkFBWCxDQUE2QkosT0FBN0IsQzs7O3VCQUdKRixZQUFZLENBQUM7QUFDN0J6RCxrQkFBQUEsT0FBTyxFQUFFLEtBRG9CO0FBRTdCSCxrQkFBQUEsTUFBTSxFQUFFLGlCQUZxQjtBQUc3QkMsa0JBQUFBLE1BQU0sRUFBRTtBQUNOeUUsb0JBQUFBLElBQUksRUFBRUEsSUFEQTtBQUVOYyxvQkFBQUEsTUFBTSxFQUFFa0IsZUFGRjtBQUdON0Msb0JBQUFBLElBQUksRUFBRWxFO0FBSEEsbUJBSHFCO0FBUTdCTyxrQkFBQUEsRUFBRSxFQUFFTixTQUFTO0FBUmdCLGlCQUFELEVBUzVCMkIsUUFBUSxFQVRvQixDOzs7QUFBeEI4QixnQkFBQUEsSztBQVdGc0QsZ0JBQUFBLE0sbUJBQVN0RCxLQUFHLENBQUNoRCxNLGlEQUFKLGFBQVl1RyxTQUFaLENBQXNCQyxXQUF0QixFOztBQUNiLG9CQUFJLENBQUNGLE1BQU0sQ0FBQ2pCLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBTCxFQUE4QjtBQUM1QmlCLGtCQUFBQSxNQUFNLEdBQUcsT0FBT0EsTUFBaEI7QUFDRDs7QUFFRG5ELGdCQUFBQSxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FBRyxJQUFILEVBQVNtRCxNQUFULENBQVI7a0RBQ09BLE07Ozs7O0FBRVBuRCxnQkFBQUEsUUFBUSxTQUFSLElBQUFBLFFBQVEsV0FBUixZQUFBQSxRQUFRLGVBQVUsSUFBVixDQUFSO3NCQUNNbEQsc0JBQXNCLENBQUMsSUFBRCxlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3VlN3RywwQjs7OztBQWtXM0MsU0FBU2xELFlBQVQsQ0FBc0JtRCxHQUF0QixFQUFzRTtBQUFBLE1BQWxCeEYsUUFBa0IsdUVBQVAsS0FBTzs7QUFDbEUsTUFBR0EsUUFBSCxFQUFZO0FBQ1ZGLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFEVSxDQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDRixXQUFPMEYsYUFBYSxDQUFDRCxHQUFELENBQXBCO0FBQ0QsR0FmRCxNQWVLO0FBQ0gxRixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsV0FBTzJGLFVBQVUsQ0FBQ0YsR0FBRCxDQUFqQjtBQUNEO0FBQ0o7O0FBRUQsU0FBU0UsVUFBVCxDQUFvQkYsR0FBcEIsRUFBaUQ7QUFDL0MsU0FBT0csUUFBUSxDQUFDeEgsc0JBQUQsRUFBeUJxSCxHQUF6QixDQUFSLENBQXNDckQsSUFBdEMsQ0FBMkMsVUFBQ3lELElBQUQsRUFBVTtBQUMxRCxRQUFJQSxJQUFJLENBQUN6RSxLQUFULEVBQWdCO0FBQ2QsVUFBSXlFLElBQUksQ0FBQ3pFLEtBQUwsQ0FBV2xDLE9BQVgsQ0FBbUI0RyxRQUFuQixDQUE0Qix1QkFBNUIsQ0FBSixFQUEwRDtBQUN4RCxjQUFNLElBQUlwRSxLQUFKLENBQVUsb0JBQVYsQ0FBTjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU0sSUFBSUEsS0FBSixDQUFVbUUsSUFBSSxDQUFDekUsS0FBTCxDQUFXbEMsT0FBckIsQ0FBTjtBQUNEO0FBQ0YsS0FORCxNQU1PO0FBQ0wsYUFBTzJHLElBQVA7QUFDRDtBQUNGLEdBVk0sQ0FBUDtBQVdEOztTQUVjSCxhOzs7OztpR0FBZixrQkFBNkJELEdBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNRSSxZQUFBQSxJQURSLEdBQ2V0SCxTQUFTLENBQUN3SCxHQUFWLENBQWNOLEdBQWQsQ0FEZjs7QUFBQSxpQkFFTUksSUFBSSxDQUFDekUsS0FGWDtBQUFBO0FBQUE7QUFBQTs7QUFBQSxpQkFHUXlFLElBQUksQ0FBQ3pFLEtBQUwsQ0FBV2xDLE9BQVgsQ0FBbUI0RyxRQUFuQixDQUE0Qix1QkFBNUIsQ0FIUjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFJWSxJQUFJcEUsS0FBSixDQUFVLG9CQUFWLENBSlo7O0FBQUE7QUFBQSxrQkFNWSxJQUFJQSxLQUFKLENBQVVtRSxJQUFJLENBQUN6RSxLQUFMLENBQVdsQyxPQUFyQixDQU5aOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDhDQVNXMkcsSUFUWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBYUEsU0FBU0QsUUFBVCxDQUFrQkksR0FBbEIsRUFBK0I1QyxJQUEvQixFQUE4RDtBQUM1RCxTQUFPNkMsS0FBSyxDQUFDRCxHQUFELEVBQU07QUFDaEJFLElBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVoRCxJQUFmLENBRFU7QUFDWTtBQUM1QmlELElBQUFBLEtBQUssRUFBRSxVQUZTO0FBRUc7QUFDbkJDLElBQUFBLFdBQVcsRUFBRSxhQUhHO0FBR1k7QUFDNUIvRixJQUFBQSxPQUFPLEVBQUU7QUFDUCxvQkFBYyx5QkFEUDtBQUVQLHNCQUFnQjtBQUZULEtBSk87QUFRaEI3QixJQUFBQSxNQUFNLEVBQUUsTUFSUTtBQVFBO0FBQ2hCNkgsSUFBQUEsSUFBSSxFQUFFLE1BVFU7QUFTRjtBQUNkQyxJQUFBQSxRQUFRLEVBQUUsUUFWTTtBQVVJO0FBQ3BCQyxJQUFBQSxRQUFRLEVBQUUsYUFYTSxDQVdTOztBQVhULEdBQU4sQ0FBTCxDQVlKckUsSUFaSSxDQVlDLFVBQUNzRSxRQUFELEVBQWM7QUFDcEIsUUFBSUEsUUFBUSxDQUFDQyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGFBQU9ELFFBQVEsQ0FBQ2IsSUFBVCxFQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJbkUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FsQk0sQ0FBUDtBQW1CRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgeyBKc29uUnBjUGF5bG9hZCwgSnNvblJwY1Jlc3BvbnNlIH0gZnJvbSBcIndlYjMtY29yZS1oZWxwZXJzXCI7XG5cbmltcG9ydCAqIGFzIHJscCBmcm9tIFwicmxwXCI7XG5pbXBvcnQgeyBSTFBFbmNvZGVkVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uQ29uZmlnIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudC1lbWl0dGVyLWVzNlwiO1xuaW1wb3J0IEJOIGZyb20gXCJibi5qc1wiO1xuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgYXBpcm91dGVyPzphbnk7XG4gIGRpYWxvZz86YW55O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5sZXQgYXBpcm91dGVyO1xudmFyIGRpYWxvZztcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiICYmIFdlYjMudXRpbHMuaXNIZXgobnVtKSkge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0MzMoKXtcbiAgY29uc29sZS5sb2coJ3Rlc3QzMycpXG4gIHJldHVybiAndGVzdDMzJ1xufVxuXG5mdW5jdGlvbiBpc05hdGl2ZSgpe1xuICBpZihhcGlyb3V0ZXImJmRpYWxvZyl7XG4gICAgY29uc29sZS5sb2coJ2lzTmF0aXZlIHRydWUnKVxuICAgIHJldHVybiB0cnVlXG4gIH1lbHNle1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSBmYWxzZScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBhcGlyb3V0ZXIgPSBjb25maWcuYXBpcm91dGVyXG4gICAgZGlhbG9nID0gY29uZmlnLmRpYWxvZ1xuICB9XG5cbiAgYXN5bmMgY2FsbElubmVyUHJvdmlkZXJBcGkocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaHR0cFByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGVuYWJsZSgpIHtcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgIGNvbnN0IGNoYWluSWRIZXggPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfY2hhaW5JZFwiKVxuICAgICk7XG4gICAgY29uc3QgY2hhaW5JZCA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIoY2hhaW5JZEhleCk7XG4gICAgaWYgKGNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhaW4gaWQgYW5kIHJwYyBlbmRwb2ludCBkb24ndCBtYXRjaFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdFwiLCB7IGNoYWluSWQgfSk7XG4gICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdGVzdDIyKCl7XG4gICAgY29uc29sZS5sb2coJ3Rlc3QyMicpXG4gICAgcmV0dXJuICcyMidcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PiB7XG4gICAgc3dpdGNoIChhcmdzLm1ldGhvZCkge1xuICAgICAgY2FzZSBcImV0aF9nZXRDaGFpbklkXCI6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5JZDtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwicGVyc29uYWxfbGlzdEFjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9hY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgfVxuICAgICAgY2FzZSBcInBlcnNvbmFsX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVBlcnNvbmFsU2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKHJlcXVlc3RJZCsrLCBhcmdzLnBhcmFtcyFbMF0pO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zZW5kVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXEgPSBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9zZW5kUmF3VHJhbnNhY3Rpb25cIiwgW3JldC5yYXddKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocmVxKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjpcbiAgICAgIC8vIGh0dHBzOi8vZG9jcy5tZXRhbWFzay5pby9ndWlkZS9zaWduaW5nLWRhdGEuaHRtbCNhLWJyaWVmLWhpc3RvcnlcbiAgICAgIC8vXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhXCI6XG4gICAgICAvLyBjYXNlICdldGhfc2lnblR5cGVkRGF0YV92MSc6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3YzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3Y0XCI6IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgNDIwMCxcbiAgICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgICAgLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNhbGxiYWNrKGVyciwgbnVsbCkpO1xuICB9XG5cbiAgYXN5bmMgaW1LZXlSZXF1ZXN0QWNjb3VudHMoXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLmdldEFkZHJlc3NcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBbcmV0LnJlc3VsdD8uYWRkcmVzc10pO1xuICAgICAgcmV0dXJuIFtyZXQucmVzdWx0Py5hZGRyZXNzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRyYW5zYWN0aW9uQ29uZmlnOiBUcmFuc2FjdGlvbkNvbmZpZyxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcudG8gfHwgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKC0zMjYwMiwgXCJleHBlY3RlZCB0byx2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fCB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZURlYzogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSkge1xuICAgICAgZ2FzUHJpY2VEZWMgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNQcmljZVJldCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlRGVjID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZVJldCk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZDtcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKSB7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbXG4gICAgICAgICAgdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICBcInBlbmRpbmdcIixcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZURlYykpLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25UcmFuc2FjdGlvblwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICB0cmFuc2FjdGlvbjoge1xuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAgIGdhc0xpbWl0LFxuICAgICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICB0byxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgY2hhaW5JZCxcbiAgICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgcGF5bWVudDogdmFsdWVJbldlaSArIFwiIEVUSFwiLFxuICAgICAgICAgICAgcmVjZWl2ZXI6IHRvLFxuICAgICAgICAgICAgc2VuZGVyOiBmcm9tLFxuICAgICAgICAgICAgZmVlOiBmZWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSwgaXNOYXRpdmUoKSk7XG4gICAgICBsZXQgdHhEYXRhID0gcmV0LnJlc3VsdD8udHhEYXRhO1xuICAgICAgaWYgKCFyZXQucmVzdWx0Py50eERhdGE/LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICB0eERhdGEgPSBcIjB4XCIgKyB0eERhdGE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHR4RGF0YSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogdHhEYXRhLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UGVyc29uYWxTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LGlzTmF0aXZlKCkpO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgaXNOYXRpdmUgPSBmYWxzZSkge1xuICAgIGlmKGlzTmF0aXZlKXtcbiAgICAgIGNvbnNvbGUubG9nKCduYXRpdmUnKVxuICAgICAgICAvLyBkaWFsb2cuc2hvd01lc3NhZ2VCb3goe1xuICAgICAgICAvLyAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgLy8gICB0aXRsZTogJ+iuv+mXruivtOaYjicsXG4gICAgICAgIC8vICAgbWVzc2FnZTogJ+S9oOato+WcqOiuv+mXruesrOS4ieaWuURBUFBcXG4nICsgYXJnLFxuICAgICAgICAvLyAgIGJ1dHRvbnM6IFsnT0snLCAnQ2FuY2VsJ11cbiAgICAgICAgLy8gfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdkaWFsb2cgdGhlbicpXG4gICAgICAgIC8vICAgcmV0dXJuIGNhbGxOYXRpdmVBcGkoYXJnKVxuICAgICAgICAvLyB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdkaWFsb2cgZXJyb3InKVxuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgLy8gfSlcbiAgICAgIHJldHVybiBjYWxsTmF0aXZlQXBpKGFyZylcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKCdycGMnKVxuICAgICAgcmV0dXJuIGNhbGxScGNBcGkoYXJnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsbFJwY0FwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KXtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsTmF0aXZlQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICBjb25zdCBqc29uID0gYXBpcm91dGVyLmFwaShhcmcpXG4gIGlmIChqc29uLmVycm9yKSB7XG4gICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==