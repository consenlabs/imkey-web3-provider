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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "request", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(args) {
        var _ret, req, payload;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // async request(args: RequestArguments): Promise<any> {
                console.log('request:\n' + JSON.stringify(args));
                _context.t0 = args.method;
                _context.next = _context.t0 === "eth_getChainId" ? 4 : _context.t0 === "personal_listAccounts" ? 5 : _context.t0 === "eth_accounts" ? 5 : _context.t0 === "eth_requestAccounts" ? 5 : _context.t0 === "eth_coinbase" ? 8 : _context.t0 === "personal_sign" ? 11 : _context.t0 === "eth_signTransaction" ? 14 : _context.t0 === "eth_sendTransaction" ? 17 : _context.t0 === "eth_sign" ? 24 : _context.t0 === "eth_signTypedData" ? 24 : _context.t0 === "eth_signTypedData_v3" ? 24 : _context.t0 === "eth_signTypedData_v4" ? 24 : 25;
                break;

              case 4:
                return _context.abrupt("return", _this.chainId);

              case 5:
                _context.next = 7;
                return _this.imKeyRequestAccounts(requestId++);

              case 7:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.next = 10;
                return _this.imKeyRequestAccounts(requestId++)[0];

              case 10:
                return _context.abrupt("return", _context.sent);

              case 11:
                _context.next = 13;
                return _this.imKeyPersonalSign(requestId++, args.params[0], args.params[1]);

              case 13:
                return _context.abrupt("return", _context.sent);

              case 14:
                _context.next = 16;
                return _this.imKeySignTransaction(requestId++, args.params[0]);

              case 16:
                return _context.abrupt("return", _context.sent);

              case 17:
                _context.next = 19;
                return _this.imKeySignTransaction(requestId++, args.params[0]);

              case 19:
                _ret = _context.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret.raw]);
                _context.next = 23;
                return _this.callInnerProviderApi(req);

              case 23:
                return _context.abrupt("return", _context.sent);

              case 24:
                return _context.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 25:
                console.log('request default');
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 29;
                return _this.callInnerProviderApi(payload);

              case 29:
                return _context.abrupt("return", _context.sent);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
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
    console.log((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ImKeyProvider, [{
    key: "callInnerProviderApi",
    value: function () {
      var _callInnerProviderApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
        var _this2 = this;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
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
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function callInnerProviderApi(_x2) {
        return _callInnerProviderApi.apply(this, arguments);
      }

      return callInnerProviderApi;
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
                console.log('enable');
                _context3.next = 3;
                return this.imKeyRequestAccounts(requestId++);

              case 3:
                accounts = _context3.sent;
                _context3.next = 6;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_chainId"));

              case 6:
                chainIdHex = _context3.sent;
                chainId = _web["default"].utils.hexToNumber(chainIdHex);

                if (!(chainId !== this.chainId)) {
                  _context3.next = 12;
                  break;
                }

                throw new Error("chain id and rpc endpoint don't match");

              case 12:
                this.emit("connect", {
                  chainId: chainId
                });
                return _context3.abrupt("return", accounts);

              case 14:
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
    key: "test22",
    value: function () {
      var _test2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('test22');
                return _context4.abrupt("return", '22');

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function test22() {
        return _test2.apply(this, arguments);
      }

      return test22;
    }()
  }, {
    key: "request2",
    value: function request2(args) {
      console.log(args);
      return new Promise(function (resolve, reject) {
        return resolve('0x6031564e7b2F5cc33737807b2E58DaFF870B590b');
      });
    }
  }, {
    key: "sendAsync",
    value: function sendAsync(args, callback) {
      console.log('sendAsync:\n' + JSON.stringify(args)); // if(args.method !== 'eth_call' && args.method !== 'eth_accounts'){
      //   console.log('return ' + args.method)
      //   return
      // }
      // if(args.method === 'eth_coinbase'){
      //   callback(null, createJsonRpcResponse(args.id, '0x407d73d8a49eeb85d32cf465507dd71d507100c1'))
      // }else{
      //   this.request(args)
      //   .then((ret) => {
      //     console.log('request ret:' + ret)
      //     callback(null, createJsonRpcResponse(args.id, ret))
      //   })
      //   .catch((err) => {
      //     console.log('request err' + err)
      //     callback(err, null)
      //   });
      // }

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
    console.log('native222');
    console.log(JSON.stringify(arg)); // const ret = dialog.showMessageBoxSync({
    //   type: 'info',
    //   title: '访问说明',
    //   message: '你正在访问第三方DAPP\n' + JSON.stringify(arg),
    //   buttons: ['OK', 'Cancel']
    // })
    // console.log(ret)
    // console.log('dialog')
    // if(ret === 0){
    //   console.log(0)
    // }else{
    //   console.log('callNativeApi(arg)')
    // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJpbUtleVBlcnNvbmFsU2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmV0IiwicmVxIiwicmF3IiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJwYXlsb2FkIiwicnBjVXJsIiwiaW5mdXJhSWQiLCJuZXR3b3JrIiwiaGVhZGVycyIsImlkeCIsInB1c2giLCJuYW1lIiwidmFsdWUiLCJodHRwUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJlcnJvciIsImFjY291bnRzIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwiZ2FzUHJpY2VEZWMiLCJnYXNQcmljZVJldCIsIm5vbmNlIiwiZ2FzIiwiZ2FzTGltaXQiLCJudW1iZXJUb0hleCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInR4RGF0YSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNJbnRlZ2VyIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0Iiwic2lnbmF0dXJlIiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJjYWxsTmF0aXZlQXBpIiwiY2FsbFJwY0FwaSIsInBvc3REYXRhIiwianNvbiIsImluY2x1ZGVzIiwiYXBpIiwidXJsIiwiZmV0Y2giLCJib2R5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOzs7Ozs7QUFlQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCO0FBQ0EsSUFBSUMsU0FBSjtBQUNBLElBQUlDLE1BQUo7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVOLFNBQVMsRUFEUjtB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LENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbnRlcmZhY2UgSVByb3ZpZGVyT3B0aW9ucyB7XG4gIHJwY1VybD86IHN0cmluZztcbiAgaW5mdXJhSWQ/OiBzdHJpbmc7XG4gIGNoYWluSWQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBhcGlyb3V0ZXI/OmFueTtcbiAgZGlhbG9nPzphbnk7XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbmNvbnN0IElNS0VZX01BTkFHRVJfRU5EUE9JTlQgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGkvaW1rZXlcIjtcbmNvbnN0IElNS0VZX0VUSF9QQVRIID0gXCJtLzQ0Jy82MCcvMCcvMC8wXCI7XG5sZXQgcmVxdWVzdElkID0gMDtcbmxldCBhcGlyb3V0ZXI7XG52YXIgZGlhbG9nO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRlc3QzMygpe1xuICBjb25zb2xlLmxvZygndGVzdDMzJylcbiAgcmV0dXJuICd0ZXN0MzMnXG59XG5cbmZ1bmN0aW9uIGlzTmF0aXZlKCl7XG4gIGlmKGFwaXJvdXRlciYmZGlhbG9nKXtcbiAgICBjb25zb2xlLmxvZygnaXNOYXRpdmUgdHJ1ZScpXG4gICAgcmV0dXJuIHRydWVcbiAgfWVsc2V7XG4gICAgY29uc29sZS5sb2coJ2lzTmF0aXZlIGZhbHNlJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbUtleVByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIGh0dHBQcm92aWRlcjogV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyO1xuICBwcml2YXRlIGNoYWluSWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElQcm92aWRlck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBycGNVcmwgPSBjb25maWcucnBjVXJsO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNvbmZpZy5jaGFpbklkID8/IDE7XG4gICAgaWYgKGNvbmZpZy5pbmZ1cmFJZCkge1xuICAgICAgY29uc3QgbmV0d29yayA9IGNoYWluSWQySW5mdXJhTmV0d29yayh0aGlzLmNoYWluSWQpO1xuICAgICAgcnBjVXJsID0gYGh0dHBzOi8vJHtuZXR3b3JrfS5pbmZ1cmEuaW8vdjMvJHtjb25maWcuaW5mdXJhSWR9YDtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGxldCBoZWFkZXJzID0gbnVsbDtcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaWR4IGluIGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgIGhlYWRlcnMucHVzaCh7IG5hbWU6IGlkeCwgdmFsdWU6IGNvbmZpZy5oZWFkZXJzW2lkeF0gfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5odHRwUHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHJwY1VybCwge1xuICAgICAgaGVhZGVycyxcbiAgICB9KTtcblxuICAgIGFwaXJvdXRlciA9IGNvbmZpZy5hcGlyb3V0ZXJcbiAgICBkaWFsb2cgPSBjb25maWcuZGlhbG9nXG5cbiAgICBjb25zb2xlLmxvZyh0aGlzKVxuICB9XG5cbiAgYXN5bmMgY2FsbElubmVyUHJvdmlkZXJBcGkocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaHR0cFByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGVuYWJsZSgpIHtcbiAgICBjb25zb2xlLmxvZygnZW5hYmxlJylcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgIGNvbnN0IGNoYWluSWRIZXggPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfY2hhaW5JZFwiKVxuICAgICk7XG4gICAgY29uc3QgY2hhaW5JZCA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIoY2hhaW5JZEhleCk7XG4gICAgaWYgKGNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhaW4gaWQgYW5kIHJwYyBlbmRwb2ludCBkb24ndCBtYXRjaFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdFwiLCB7IGNoYWluSWQgfSk7XG4gICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdGVzdDIyKCl7XG4gICAgY29uc29sZS5sb2coJ3Rlc3QyMicpXG4gICAgcmV0dXJuICcyMidcbiAgfVxuXG4gIHJlcXVlc3QyKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT57XG4gICAgY29uc29sZS5sb2coYXJncylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIHJldHVybiByZXNvbHZlKCcweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGInKVxuICAgIH0pO1xuICB9XG5cbiAgcmVxdWVzdCA9IGFzeW5jIChhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgLy8gYXN5bmMgcmVxdWVzdChhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zb2xlLmxvZygncmVxdWVzdDpcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJncykpXG4gICAgc3dpdGNoIChhcmdzLm1ldGhvZCkge1xuICAgICAgY2FzZSBcImV0aF9nZXRDaGFpbklkXCI6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5JZDtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwicGVyc29uYWxfbGlzdEFjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9hY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9jb2luYmFzZVwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKVswXTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduXCI6XG4gICAgICAvLyBodHRwczovL2RvY3MubWV0YW1hc2suaW8vZ3VpZGUvc2lnbmluZy1kYXRhLmh0bWwjYS1icmllZi1oaXN0b3J5XG4gICAgICAvL1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZGVmYXVsdCcpXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ3NlbmRBc3luYzpcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgIC8vIGlmKGFyZ3MubWV0aG9kICE9PSAnZXRoX2NhbGwnICYmIGFyZ3MubWV0aG9kICE9PSAnZXRoX2FjY291bnRzJyl7XG4gICAgLy8gICBjb25zb2xlLmxvZygncmV0dXJuICcgKyBhcmdzLm1ldGhvZClcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cbiAgICAvLyBpZihhcmdzLm1ldGhvZCA9PT0gJ2V0aF9jb2luYmFzZScpe1xuICAgIC8vICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsICcweDQwN2Q3M2Q4YTQ5ZWViODVkMzJjZjQ2NTUwN2RkNzFkNTA3MTAwYzEnKSlcbiAgICAvLyB9ZWxzZXtcbiAgICAvLyAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgIC8vICAgLnRoZW4oKHJldCkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVxdWVzdCByZXQ6JyArIHJldClcbiAgICAvLyAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpXG4gICAgLy8gICB9KVxuICAgIC8vICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZXJyJyArIGVycilcbiAgICAvLyAgICAgY2FsbGJhY2soZXJyLCBudWxsKVxuICAgIC8vICAgfSk7XG4gICAgLy8gfVxuICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSwgaXNOYXRpdmUoKSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy50byB8fCAhdHJhbnNhY3Rpb25Db25maWcudmFsdWUpIHtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoLTMyNjAyLCBcImV4cGVjdGVkIHRvLHZhbHVlXCIpO1xuICAgIH1cblxuICAgIC8vZnJvbVxuICAgIGxldCBmcm9tOiBzdHJpbmc7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIHx8IHR5cGVvZiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgZnJvbSA9IGFjY291bnRzWzBdIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbSA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcuZnJvbSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vZ2FzIHByaWNlXG4gICAgbGV0IGdhc1ByaWNlRGVjOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKSB7XG4gICAgICBnYXNQcmljZURlYyA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1ByaWNlUmV0ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2FzUHJpY2VcIiwgW10pXG4gICAgICApO1xuICAgICAgZ2FzUHJpY2VEZWMgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKGdhc1ByaWNlUmV0KTtcbiAgICB9XG5cbiAgICAvL2NoYWluIGlkXG4gICAgbGV0IGNoYWluSWQ6IG51bWJlcjtcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIC0zMjYwMixcbiAgICAgICAgICBcImV4cGVjdGVkIGNoYWluSWQgYW5kIGNvbm5lY3RlZCBjaGFpbklkIGFyZSBtaXNtYXRjaGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNoYWluSWQgPSB0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFpbklkID0gdGhpcy5jaGFpbklkO1xuICAgIH1cblxuICAgIC8vbm9uY2VcbiAgICBsZXQgbm9uY2U6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcubm9uY2UpIHtcbiAgICAgIG5vbmNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9uY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nZXRUcmFuc2FjdGlvbkNvdW50XCIsIFtcbiAgICAgICAgICB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgIFwicGVuZGluZ1wiLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIG5vbmNlID0gV2ViMy51dGlscy5oZXhUb051bWJlcihub25jZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2VzdGltYXRlIGdhc1xuICAgIGxldCBnYXNMaW1pdDogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpIHtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBXZWIzLnV0aWxzLm51bWJlclRvSGV4KGdhc1ByaWNlRGVjKSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bShnYXNSZXQpO1xuICAgIH1cblxuICAgIC8vZmVlXG4gICAgbGV0IGZlZSA9IChCaWdJbnQoZ2FzTGltaXQpICogQmlnSW50KGdhc1ByaWNlRGVjKSkudG9TdHJpbmcoKTsgLy93ZWlcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlLCBcIkd3ZWlcIik7IC8vdG8gR3dlaVxuICAgIGNvbnN0IHRlbXAgPSBNYXRoLmNlaWwoTnVtYmVyKGZlZSkpO1xuICAgIGZlZSA9ICh0ZW1wICogMTAwMDAwMDAwMCkudG9TdHJpbmcoKTsgLy90byBldGhlclxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUpICsgXCIgZXRoZXJcIjtcblxuICAgIGNvbnN0IHRvID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy50byk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcudmFsdWUpO1xuICAgIGNvbnN0IHZhbHVlSW5XZWkgPSBXZWIzLnV0aWxzLmZyb21XZWkodmFsdWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGxldCB0eERhdGEgPSByZXQucmVzdWx0Py50eERhdGE7XG4gICAgICBpZiAoIXJldC5yZXN1bHQ/LnR4RGF0YT8uc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHR4RGF0YSA9IFwiMHhcIiArIHR4RGF0YTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IHJscC5kZWNvZGUodHhEYXRhLCB0cnVlKTtcblxuICAgICAgY29uc3QgcmxwVFg6IFJMUEVuY29kZWRUcmFuc2FjdGlvbiA9IHtcbiAgICAgICAgcmF3OiB0eERhdGEsXG4gICAgICAgIHR4OiB7XG4gICAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICBnYXM6IGdhc0xpbWl0LFxuICAgICAgICAgIHRvOiB0byxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVJbldlaSxcbiAgICAgICAgICBpbnB1dDogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgcjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs3XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHM6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbOF0pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB2OiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzZdKSxcbiAgICAgICAgICBoYXNoOiByZXQucmVzdWx0Py50eEhhc2gsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBybHBUWCk7XG4gICAgICByZXR1cm4gcmxwVFg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkYXRhVG9TaWduOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0saXNOYXRpdmUoKSk7XG5cbiAgICAgIGxldCBzaWdSZXQgPSByZXQucmVzdWx0Py5zaWduYXR1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghc2lnUmV0LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBpc05hdGl2ZSA9IGZhbHNlKSB7XG4gICAgaWYoaXNOYXRpdmUpe1xuICAgICAgY29uc29sZS5sb2coJ25hdGl2ZTIyMicpXG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcmcpKVxuICAgICAgICAvLyBjb25zdCByZXQgPSBkaWFsb2cuc2hvd01lc3NhZ2VCb3hTeW5jKHtcbiAgICAgICAgLy8gICB0eXBlOiAnaW5mbycsXG4gICAgICAgIC8vICAgdGl0bGU6ICforr/pl67or7TmmI4nLFxuICAgICAgICAvLyAgIG1lc3NhZ2U6ICfkvaDmraPlnKjorr/pl67nrKzkuInmlrlEQVBQXFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZyksXG4gICAgICAgIC8vICAgYnV0dG9uczogWydPSycsICdDYW5jZWwnXVxuICAgICAgICAvLyB9KVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkaWFsb2cnKVxuICAgICAgICAvLyBpZihyZXQgPT09IDApe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKDApXG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdjYWxsTmF0aXZlQXBpKGFyZyknKVxuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiBjYWxsTmF0aXZlQXBpKGFyZylcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKCdycGMnKVxuICAgICAgcmV0dXJuIGNhbGxScGNBcGkoYXJnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsbFJwY0FwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KXtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsTmF0aXZlQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICBjb25zdCBqc29uID0gYXBpcm91dGVyLmFwaShhcmcpXG4gIGlmIChqc29uLmVycm9yKSB7XG4gICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==