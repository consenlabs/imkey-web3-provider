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
        var _ret, _ret2, req, payload;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('request:\n' + JSON.stringify(args));
                _context.t0 = args.method;
                _context.next = _context.t0 === "eth_getChainId" ? 4 : _context.t0 === "personal_listAccounts" ? 5 : _context.t0 === "eth_accounts" ? 5 : _context.t0 === "eth_requestAccounts" ? 5 : _context.t0 === "eth_coinbase" ? 8 : _context.t0 === "personal_sign" ? 12 : _context.t0 === "eth_signTransaction" ? 15 : _context.t0 === "eth_sendTransaction" ? 18 : _context.t0 === "eth_sign" ? 25 : _context.t0 === "eth_signTypedData" ? 25 : _context.t0 === "eth_signTypedData_v3" ? 25 : _context.t0 === "eth_signTypedData_v4" ? 25 : 26;
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
                return _this.imKeyRequestAccounts(requestId++);

              case 10:
                _ret = _context.sent;
                return _context.abrupt("return", String(_ret[0]));

              case 12:
                _context.next = 14;
                return _this.imKeyPersonalSign(requestId++, args.params[0], args.params[1]);

              case 14:
                return _context.abrupt("return", _context.sent);

              case 15:
                _context.next = 17;
                return _this.imKeySignTransaction(requestId++, args.params[0]);

              case 17:
                return _context.abrupt("return", _context.sent);

              case 18:
                _context.next = 20;
                return _this.imKeySignTransaction(requestId++, args.params[0]);

              case 20:
                _ret2 = _context.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret2.raw]);
                _context.next = 24;
                return _this.callInnerProviderApi(req);

              case 24:
                return _context.abrupt("return", _context.sent);

              case 25:
                return _context.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 26:
                console.log('request default');
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 30;
                return _this.callInnerProviderApi(payload);

              case 30:
                return _context.abrupt("return", _context.sent);

              case 31:
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
      // this.request(args)
      // .then((ret) => {
      //   console.log('request ret:' + ret + ' method:' + args.method)
      //   if(args.method === 'eth_coinbase'){
      //     console.log('diff ret:' + typeof ret)
      //     // callback(null, createJsonRpcResponse(args.id, '0x6031564e7b2F5cc33737807b2E58DaFF870B590b'))
      //     callback(null, createJsonRpcResponse(args.id, ret + ''))
      //   }else{
      //     callback(null, createJsonRpcResponse(args.id, ret))
      //   }
      // })
      // .catch((err) => {
      //   console.log('request err' + err)
      //   callback(err, null)
      // });
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
        var _ret3$result, _ret3$result2, _ret3;

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
                _ret3 = _context5.sent;
                callback === null || callback === void 0 ? void 0 : callback(null, [(_ret3$result = _ret3.result) === null || _ret3$result === void 0 ? void 0 : _ret3$result.address]);
                return _context5.abrupt("return", [(_ret3$result2 = _ret3.result) === null || _ret3$result2 === void 0 ? void 0 : _ret3$result2.address]);

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
        var from, accounts, gasPriceDec, gasPriceRet, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret4$result, _ret4$result2, _ret4$result2$txData, _ret4$result3, _ret4, txData, decoded, rlpTX;

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
                _ret4 = _context6.sent;
                txData = (_ret4$result = _ret4.result) === null || _ret4$result === void 0 ? void 0 : _ret4$result.txData;

                if (!((_ret4$result2 = _ret4.result) === null || _ret4$result2 === void 0 ? void 0 : (_ret4$result2$txData = _ret4$result2.txData) === null || _ret4$result2$txData === void 0 ? void 0 : _ret4$result2$txData.startsWith("0x"))) {
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
                    hash: (_ret4$result3 = _ret4.result) === null || _ret4$result3 === void 0 ? void 0 : _ret4$result3.txHash
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
        var _error, data, checksumAddress, _ret5$result, _ret5, sigRet;

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
                _ret5 = _context7.sent;
                sigRet = (_ret5$result = _ret5.result) === null || _ret5$result === void 0 ? void 0 : _ret5$result.signature.toLowerCase();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJyZXQiLCJTdHJpbmciLCJpbUtleVBlcnNvbmFsU2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmVxIiwicmF3IiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJwYXlsb2FkIiwicnBjVXJsIiwiaW5mdXJhSWQiLCJuZXR3b3JrIiwiaGVhZGVycyIsImlkeCIsInB1c2giLCJuYW1lIiwidmFsdWUiLCJodHRwUHJvdmlkZXIiLCJwcm92aWRlcnMiLCJIdHRwUHJvdmlkZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNlbmQiLCJlcnJvciIsImFjY291bnRzIiwiY2hhaW5JZEhleCIsImhleFRvTnVtYmVyIiwiRXJyb3IiLCJlbWl0IiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidGhlbiIsImVyciIsImNhbGxJbUtleUFwaSIsInBhdGgiLCJhZGRyZXNzIiwidHJhbnNhY3Rpb25Db25maWciLCJ0byIsImZyb20iLCJ0b0NoZWNrc3VtQWRkcmVzcyIsImdhc1ByaWNlIiwiZ2FzUHJpY2VEZWMiLCJnYXNQcmljZVJldCIsIm5vbmNlIiwiZ2FzIiwiZ2FzTGltaXQiLCJudW1iZXJUb0hleCIsImRhdGEiLCJnYXNSZXQiLCJmZWUiLCJCaWdJbnQiLCJmcm9tV2VpIiwidGVtcCIsIk1hdGgiLCJjZWlsIiwiTnVtYmVyIiwidmFsdWVJbldlaSIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInR4RGF0YSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNJbnRlZ2VyIiwidG9VdGY4IiwiY2hlY2tzdW1BZGRyZXNzIiwic2lnUmV0Iiwic2lnbmF0dXJlIiwidG9Mb3dlckNhc2UiLCJFdmVudEVtaXR0ZXIiLCJhcmciLCJjYWxsTmF0aXZlQXBpIiwiY2FsbFJwY0FwaSIsInBvc3REYXRhIiwianNvbiIsImluY2x1ZGVzIiwiYXBpIiwidXJsIiwiZmV0Y2giLCJib2R5IiwiY2FjaGUiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwicmVzcG9uc2UiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUdBOztBQUVBOztBQUNBOzs7Ozs7QUFlQSxJQUFNQSxzQkFBc0IsR0FBRyxpQ0FBL0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsa0JBQXZCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLENBQWhCO0FBQ0EsSUFBSUMsU0FBSjtBQUNBLElBQUlDLE1BQUo7O0FBRUEsU0FBU0Msb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQWtFO0FBQUEsTUFBcEJDLE1BQW9CLHVFQUFKLEVBQUk7QUFDaEUsU0FBTztBQUNMQyxJQUFBQSxFQUFFLEVBQUVOLFNB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SUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDWCxJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUk3RCxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbnRlcmZhY2UgSVByb3ZpZGVyT3B0aW9ucyB7XG4gIHJwY1VybD86IHN0cmluZztcbiAgaW5mdXJhSWQ/OiBzdHJpbmc7XG4gIGNoYWluSWQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBhcGlyb3V0ZXI/OmFueTtcbiAgZGlhbG9nPzphbnk7XG59XG5cbmludGVyZmFjZSBSZXF1ZXN0QXJndW1lbnRzIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbmNvbnN0IElNS0VZX01BTkFHRVJfRU5EUE9JTlQgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGkvaW1rZXlcIjtcbmNvbnN0IElNS0VZX0VUSF9QQVRIID0gXCJtLzQ0Jy82MCcvMCcvMC8wXCI7XG5sZXQgcmVxdWVzdElkID0gMDtcbmxldCBhcGlyb3V0ZXI7XG52YXIgZGlhbG9nO1xuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVxdWVzdChtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgbWV0aG9kLFxuICAgIHBhcmFtcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIHJlc3VsdDogYW55KSB7XG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICByZXN1bHQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlLFxuICAgIGNvZGUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoYWluSWQySW5mdXJhTmV0d29yayhjaGFpbklkOiBudW1iZXIpIHtcbiAgc3dpdGNoIChjaGFpbklkKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIFwicm9wc3RlblwiO1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBcInJpbmtlYnlcIjtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gXCJnb2VybGlcIjtcbiAgICBjYXNlIDQyOlxuICAgICAgcmV0dXJuIFwia292YW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwibWFpbm5ldFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXJnc051bShudW06IHN0cmluZyB8IG51bWJlciB8IEJOKSB7XG4gIGlmIChudW0gaW5zdGFuY2VvZiBCTikge1xuICAgIHJldHVybiBudW0udG9OdW1iZXIoKS50b1N0cmluZygpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBudW0gPT09IFwic3RyaW5nXCIgJiYgV2ViMy51dGlscy5pc0hleChudW0pKSB7XG4gICAgcmV0dXJuIFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcobnVtKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRlc3QzMygpe1xuICBjb25zb2xlLmxvZygndGVzdDMzJylcbiAgcmV0dXJuICd0ZXN0MzMnXG59XG5cbmZ1bmN0aW9uIGlzTmF0aXZlKCl7XG4gIGlmKGFwaXJvdXRlciYmZGlhbG9nKXtcbiAgICBjb25zb2xlLmxvZygnaXNOYXRpdmUgdHJ1ZScpXG4gICAgcmV0dXJuIHRydWVcbiAgfWVsc2V7XG4gICAgY29uc29sZS5sb2coJ2lzTmF0aXZlIGZhbHNlJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbUtleVByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBwcml2YXRlIGh0dHBQcm92aWRlcjogV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyO1xuICBwcml2YXRlIGNoYWluSWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElQcm92aWRlck9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBycGNVcmwgPSBjb25maWcucnBjVXJsO1xuICAgIHRoaXMuY2hhaW5JZCA9IGNvbmZpZy5jaGFpbklkID8/IDE7XG4gICAgaWYgKGNvbmZpZy5pbmZ1cmFJZCkge1xuICAgICAgY29uc3QgbmV0d29yayA9IGNoYWluSWQySW5mdXJhTmV0d29yayh0aGlzLmNoYWluSWQpO1xuICAgICAgcnBjVXJsID0gYGh0dHBzOi8vJHtuZXR3b3JrfS5pbmZ1cmEuaW8vdjMvJHtjb25maWcuaW5mdXJhSWR9YDtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGxldCBoZWFkZXJzID0gbnVsbDtcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaWR4IGluIGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgIGhlYWRlcnMucHVzaCh7IG5hbWU6IGlkeCwgdmFsdWU6IGNvbmZpZy5oZWFkZXJzW2lkeF0gfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5odHRwUHJvdmlkZXIgPSBuZXcgV2ViMy5wcm92aWRlcnMuSHR0cFByb3ZpZGVyKHJwY1VybCwge1xuICAgICAgaGVhZGVycyxcbiAgICB9KTtcblxuICAgIGFwaXJvdXRlciA9IGNvbmZpZy5hcGlyb3V0ZXJcbiAgICBkaWFsb2cgPSBjb25maWcuZGlhbG9nXG5cbiAgICBjb25zb2xlLmxvZyh0aGlzKVxuICB9XG5cbiAgYXN5bmMgY2FsbElubmVyUHJvdmlkZXJBcGkocmVxOiBKc29uUnBjUGF5bG9hZCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuaHR0cFByb3ZpZGVyLnNlbmQoXG4gICAgICAgIHJlcSxcbiAgICAgICAgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IEpzb25ScGNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGVuYWJsZSgpIHtcbiAgICBjb25zb2xlLmxvZygnZW5hYmxlJylcbiAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgIGNvbnN0IGNoYWluSWRIZXggPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfY2hhaW5JZFwiKVxuICAgICk7XG4gICAgY29uc3QgY2hhaW5JZCA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIoY2hhaW5JZEhleCk7XG4gICAgaWYgKGNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2hhaW4gaWQgYW5kIHJwYyBlbmRwb2ludCBkb24ndCBtYXRjaFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KFwiY29ubmVjdFwiLCB7IGNoYWluSWQgfSk7XG4gICAgICByZXR1cm4gYWNjb3VudHM7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdGVzdDIyKCl7XG4gICAgY29uc29sZS5sb2coJ3Rlc3QyMicpXG4gICAgcmV0dXJuICcyMidcbiAgfVxuXG4gIHJlcXVlc3QyKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT57XG4gICAgY29uc29sZS5sb2coYXJncylcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIHJldHVybiByZXNvbHZlKCcweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGInKVxuICAgIH0pO1xuICB9XG5cbiAgcmVxdWVzdCA9IGFzeW5jIChhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zb2xlLmxvZygncmVxdWVzdDpcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJncykpXG4gICAgc3dpdGNoIChhcmdzLm1ldGhvZCkge1xuICAgICAgY2FzZSBcImV0aF9nZXRDaGFpbklkXCI6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5JZDtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwicGVyc29uYWxfbGlzdEFjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9hY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9jb2luYmFzZVwiOiB7XG4gICAgICAgIGxldCByZXQgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhyZXRbMF0pXG4gICAgICB9XG4gICAgICBjYXNlIFwicGVyc29uYWxfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UGVyc29uYWxTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24ocmVxdWVzdElkKyssIGFyZ3MucGFyYW1zIVswXSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NlbmRUcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX3NlbmRSYXdUcmFuc2FjdGlvblwiLCBbcmV0LnJhd10pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblwiOlxuICAgICAgLy8gaHR0cHM6Ly9kb2NzLm1ldGFtYXNrLmlvL2d1aWRlL3NpZ25pbmctZGF0YS5odG1sI2EtYnJpZWYtaGlzdG9yeVxuICAgICAgLy9cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICA0MjAwLFxuICAgICAgICAgIGAke2FyZ3MubWV0aG9kfSBpcyBub3Qgc3VwcG9ydCBub3dgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGRlZmF1bHQnKVxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdzZW5kQXN5bmM6XFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAvLyBpZihhcmdzLm1ldGhvZCAhPT0gJ2V0aF9jYWxsJyAmJiBhcmdzLm1ldGhvZCAhPT0gJ2V0aF9hY2NvdW50cycpe1xuICAgIC8vICAgY29uc29sZS5sb2coJ3JldHVybiAnICsgYXJncy5tZXRob2QpXG4gICAgLy8gICByZXR1cm5cbiAgICAvLyB9XG4gICAgLy8gaWYoYXJncy5tZXRob2QgPT09ICdldGhfY29pbmJhc2UnKXtcbiAgICAvLyAgIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCAnMHg0MDdkNzNkOGE0OWVlYjg1ZDMyY2Y0NjU1MDdkZDcxZDUwNzEwMGMxJykpXG4gICAgLy8gfWVsc2V7XG4gICAgICAvLyB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC8vIC50aGVuKChyZXQpID0+IHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ3JlcXVlc3QgcmV0OicgKyByZXQgKyAnIG1ldGhvZDonICsgYXJncy5tZXRob2QpXG4gICAgICAvLyAgIGlmKGFyZ3MubWV0aG9kID09PSAnZXRoX2NvaW5iYXNlJyl7XG4gICAgICAvLyAgICAgY29uc29sZS5sb2coJ2RpZmYgcmV0OicgKyB0eXBlb2YgcmV0KVxuICAgICAgICAgIFxuICAgICAgLy8gICAgIC8vIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCAnMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiJykpXG4gICAgICAvLyAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCArICcnKSlcbiAgICAgIC8vICAgfWVsc2V7XG4gICAgICAvLyAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgICAvLyAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygncmVxdWVzdCBlcnInICsgZXJyKVxuICAgICAgLy8gICBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgICAvLyB9KTtcbiAgICAvLyB9XG4gICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgbGV0IHR4RGF0YSA9IHJldC5yZXN1bHQ/LnR4RGF0YTtcbiAgICAgIGlmICghcmV0LnJlc3VsdD8udHhEYXRhPy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgdHhEYXRhID0gXCIweFwiICsgdHhEYXRhO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvZGVkID0gcmxwLmRlY29kZSh0eERhdGEsIHRydWUpO1xuXG4gICAgICBjb25zdCBybHBUWDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uID0ge1xuICAgICAgICByYXc6IHR4RGF0YSxcbiAgICAgICAgdHg6IHtcbiAgICAgICAgICBub25jZTogbm9uY2UsXG4gICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgIGdhczogZ2FzTGltaXQsXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUluV2VpLFxuICAgICAgICAgIGlucHV0OiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICByOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzddKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgczogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs4XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHY6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbNl0pLFxuICAgICAgICAgIGhhc2g6IHJldC5yZXN1bHQ/LnR4SGFzaCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHJscFRYKTtcbiAgICAgIHJldHVybiBybHBUWDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVBlcnNvbmFsU2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhZGRyZXNzKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCJcbiAgICAgICk7XG4gICAgICBjYWxsYmFjaz8uKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhZGRyZXNzIGludmFsaWRcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiLFxuICAgICAgICB9LFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gV2ViMy51dGlscy50b1V0ZjgoZGF0YVRvU2lnbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRhdGEgPSBkYXRhVG9TaWduO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrc3VtQWRkcmVzcyA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcyBhcyBzdHJpbmcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnbk1lc3NhZ2VcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBzZW5kZXI6IGNoZWNrc3VtQWRkcmVzcyxcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSxpc05hdGl2ZSgpKTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFzaWdSZXQuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGlzTmF0aXZlID0gZmFsc2UpIHtcbiAgICBpZihpc05hdGl2ZSl7XG4gICAgICBjb25zb2xlLmxvZygnbmF0aXZlMjIyJylcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZykpXG4gICAgICAgIC8vIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgICAvLyAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgLy8gICB0aXRsZTogJ+iuv+mXruivtOaYjicsXG4gICAgICAgIC8vICAgbWVzc2FnZTogJ+S9oOato+WcqOiuv+mXruesrOS4ieaWuURBUFBcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJnKSxcbiAgICAgICAgLy8gICBidXR0b25zOiBbJ09LJywgJ0NhbmNlbCddXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJldClcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RpYWxvZycpXG4gICAgICAgIC8vIGlmKHJldCA9PT0gMCl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coMClcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2NhbGxOYXRpdmVBcGkoYXJnKScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIGNhbGxOYXRpdmVBcGkoYXJnKVxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coJ3JwYycpXG4gICAgICByZXR1cm4gY2FsbFJwY0FwaShhcmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxsUnBjQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxOYXRpdmVBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil7XG4gIGNvbnN0IGpzb24gPSBhcGlyb3V0ZXIuYXBpKGFyZylcbiAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19