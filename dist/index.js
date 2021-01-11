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
    console.log((0, _assertThisInitialized2["default"])(_this));
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
                console.log('callInnerProviderApi:\n' + req);
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this2.httpProvider.send(req, function (error, result) {
                    if (error) {
                      reject(createProviderRpcError(4001, error.message));
                    } else {
                      resolve(result.result);
                    }
                  });
                }));

              case 2:
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
                console.log('enable');
                _context2.next = 3;
                return this.imKeyRequestAccounts(requestId++);

              case 3:
                accounts = _context2.sent;
                _context2.next = 6;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_chainId"));

              case 6:
                chainIdHex = _context2.sent;
                // const chainIdHex = 42
                chainId = _web["default"].utils.hexToNumber(chainIdHex);

                if (!(chainId !== this.chainId)) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("chain id and rpc endpoint don't match");

              case 12:
                this.emit("connect", {
                  chainId: chainId
                });
                return _context2.abrupt("return", accounts);

              case 14:
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
    key: "request2",
    value: function request2(args) {
      console.log(args);
      return new Promise(function (resolve, reject) {
        return resolve('0x6031564e7b2F5cc33737807b2E58DaFF870B590b');
      });
    }
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(args) {
        var _ret, req;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('request:\n' + JSON.stringify(args));
                _context4.t0 = args.method;
                _context4.next = _context4.t0 === "eth_getChainId" ? 4 : _context4.t0 === "personal_listAccounts" ? 5 : _context4.t0 === "eth_accounts" ? 5 : _context4.t0 === "eth_call" ? 5 : _context4.t0 === "eth_requestAccounts" ? 5 : _context4.t0 === "personal_sign" ? 9 : _context4.t0 === "eth_signTransaction" ? 12 : _context4.t0 === "eth_sendTransaction" ? 15 : _context4.t0 === "eth_sign" ? 22 : _context4.t0 === "eth_signTypedData" ? 22 : _context4.t0 === "eth_signTypedData_v3" ? 22 : _context4.t0 === "eth_signTypedData_v4" ? 22 : 23;
                break;

              case 4:
                return _context4.abrupt("return", this.chainId);

              case 5:
                console.log('come on');
                _context4.next = 8;
                return this.imKeyRequestAccounts(requestId++);

              case 8:
                return _context4.abrupt("return", _context4.sent);

              case 9:
                _context4.next = 11;
                return this.imKeyPersonalSign(requestId++, args.params[0], args.params[1]);

              case 11:
                return _context4.abrupt("return", _context4.sent);

              case 12:
                _context4.next = 14;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 14:
                return _context4.abrupt("return", _context4.sent);

              case 15:
                _context4.next = 17;
                return this.imKeySignTransaction(requestId++, args.params[0]);

              case 17:
                _ret = _context4.sent;
                req = createJsonRpcRequest("eth_sendRawTransaction", [_ret.raw]);
                _context4.next = 21;
                return this.callInnerProviderApi(req);

              case 21:
                return _context4.abrupt("return", _context4.sent);

              case 22:
                return _context4.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 23:
                console.log('request default'); // const payload = {
                //   jsonrpc: "2.0",
                //   method: args.method,
                //   params: args.params,
                //   id: requestId++,
                // };
                // let ret =  await this.callInnerProviderApi(payload);
                // console.log(ret)
                // throw createProviderRpcError(4001, 'error')

                return _context4.abrupt("return", '0x');

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
      console.log('sendAsync:\n' + JSON.stringify(args));
      console.log('sendAsync this:' + JSON.stringify(this));

      if (args.method !== 'eth_call' && args.method !== 'eth_accounts') {
        console.log('return ' + args.method);
        return;
      } // if(args.method === 'eth_call'){
      //   const payload = {
      //     "id": 1337,
      //     "jsonrpc": "2.0",
      //     "method": "eth_accounts",
      //     "params": [{
      //         "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
      //         "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
      //         "gas": "0x76c0",
      //         "gasPrice": "0x9184e72a000",
      //         "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
      //         "value": "0x9184e72a"
      //     }]
      // }
      //   this.callInnerProviderApi(payload)
      //   .then(console.log).catch(console.log)
      //   return '0x'
      // }
      // let pram = {
      //   method:'eth_call',
      //   params:[]
      // }
      // console.log(await this.request(pram))
      // let ret = await this.request(args);
      // callback(ret.errror,createJsonRpcResponse(args.id, ret));


      this.request(args) // .then(console.log).catch(console.log)
      .then(function (ret) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwicmVxIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJpbUtleVJlcXVlc3RBY2NvdW50cyIsImFjY291bnRzIiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJhcmdzIiwiSlNPTiIsInN0cmluZ2lmeSIsImltS2V5UGVyc29uYWxTaWduIiwiaW1LZXlTaWduVHJhbnNhY3Rpb24iLCJyZXQiLCJyYXciLCJjYWxsYmFjayIsInJlcXVlc3QiLCJ0aGVuIiwiZXJyIiwiY2FsbEltS2V5QXBpIiwicGF0aCIsImFkZHJlc3MiLCJ0cmFuc2FjdGlvbkNvbmZpZyIsInRvIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJnYXNQcmljZURlYyIsImdhc1ByaWNlUmV0Iiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsIm51bWJlclRvSGV4IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwidHhEYXRhIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJzaWduYXR1cmUiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsImFyZyIsImNhbGxOYXRpdmVBcGkiLCJjYWxsUnBjQXBpIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJhcGkiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJyZXNwb25zZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7Ozs7OztBQWVBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsSUFBSUMsTUFBSjs7QUFFQSxTQUFTQyxvQkFBVCxDQUE4QkMsTUFBOUIsRUFBa0U7QUFBQSxNQUFwQkMsTUFBb0IsdUVBQUosRUFBSTtBQUNoRSxTQUFPO0FBQ0xDLElBQUFBLEVBQUUsRUFBRU4sU0FBUyxFQURSO0FBRUxPLElBQUFB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Q0FBV2xDLE9BQXJCLENBTlo7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsOENBU1c0RyxJQVRYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFhQSxTQUFTRCxRQUFULENBQWtCSSxHQUFsQixFQUErQjVDLElBQS9CLEVBQThEO0FBQzVELFNBQU82QyxLQUFLLENBQUNELEdBQUQsRUFBTTtBQUNoQkUsSUFBQUEsSUFBSSxFQUFFdEUsSUFBSSxDQUFDQyxTQUFMLENBQWV1QixJQUFmLENBRFU7QUFDWTtBQUM1QitDLElBQUFBLEtBQUssRUFBRSxVQUZTO0FBRUc7QUFDbkJDLElBQUFBLFdBQVcsRUFBRSxhQUhHO0FBR1k7QUFDNUI5RixJQUFBQSxPQUFPLEVBQUU7QUFDUCxvQkFBYyx5QkFEUDtBQUVQLHNCQUFnQjtBQUZULEtBSk87QUFRaEI3QixJQUFBQSxNQUFNLEVBQUUsTUFSUTtBQVFBO0FBQ2hCNEgsSUFBQUEsSUFBSSxFQUFFLE1BVFU7QUFTRjtBQUNkQyxJQUFBQSxRQUFRLEVBQUUsUUFWTTtBQVVJO0FBQ3BCQyxJQUFBQSxRQUFRLEVBQUUsYUFYTSxDQVdTOztBQVhULEdBQU4sQ0FBTCxDQVlKbkUsSUFaSSxDQVlDLFVBQUNvRSxRQUFELEVBQWM7QUFDcEIsUUFBSUEsUUFBUSxDQUFDQyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGFBQU9ELFFBQVEsQ0FBQ1gsSUFBVCxFQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJcEUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FsQk0sQ0FBUDtBQW1CRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgeyBKc29uUnBjUGF5bG9hZCwgSnNvblJwY1Jlc3BvbnNlIH0gZnJvbSBcIndlYjMtY29yZS1oZWxwZXJzXCI7XG5cbmltcG9ydCAqIGFzIHJscCBmcm9tIFwicmxwXCI7XG5pbXBvcnQgeyBSTFBFbmNvZGVkVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uQ29uZmlnIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudC1lbWl0dGVyLWVzNlwiO1xuaW1wb3J0IEJOIGZyb20gXCJibi5qc1wiO1xuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgYXBpcm91dGVyPzphbnk7XG4gIGRpYWxvZz86YW55O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5sZXQgYXBpcm91dGVyO1xudmFyIGRpYWxvZztcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiICYmIFdlYjMudXRpbHMuaXNIZXgobnVtKSkge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0MzMoKXtcbiAgY29uc29sZS5sb2coJ3Rlc3QzMycpXG4gIHJldHVybiAndGVzdDMzJ1xufVxuXG5mdW5jdGlvbiBpc05hdGl2ZSgpe1xuICBpZihhcGlyb3V0ZXImJmRpYWxvZyl7XG4gICAgY29uc29sZS5sb2coJ2lzTmF0aXZlIHRydWUnKVxuICAgIHJldHVybiB0cnVlXG4gIH1lbHNle1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSBmYWxzZScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBhcGlyb3V0ZXIgPSBjb25maWcuYXBpcm91dGVyXG4gICAgZGlhbG9nID0gY29uZmlnLmRpYWxvZ1xuXG4gICAgY29uc29sZS5sb2codGhpcylcbiAgfVxuXG4gIGFzeW5jIGNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUubG9nKCdjYWxsSW5uZXJQcm92aWRlckFwaTpcXG4nICsgcmVxKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmh0dHBQcm92aWRlci5zZW5kKFxuICAgICAgICByZXEsXG4gICAgICAgIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBKc29uUnBjUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBlbmFibGUoKSB7XG4gICAgY29uc29sZS5sb2coJ2VuYWJsZScpXG4gICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICBjb25zdCBjaGFpbklkSGV4ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2NoYWluSWRcIilcbiAgICApO1xuICAgIC8vIGNvbnN0IGNoYWluSWRIZXggPSA0MlxuICAgIGNvbnN0IGNoYWluSWQgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKGNoYWluSWRIZXgpO1xuICAgIGlmIChjaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYWluIGlkIGFuZCBycGMgZW5kcG9pbnQgZG9uJ3QgbWF0Y2hcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RcIiwgeyBjaGFpbklkIH0pO1xuICAgICAgcmV0dXJuIGFjY291bnRzO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRlc3QyMigpe1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0MjInKVxuICAgIHJldHVybiAnMjInXG4gIH1cblxuICByZXF1ZXN0MihhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+e1xuICAgIGNvbnNvbGUubG9nKGFyZ3MpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgnMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiJylcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc29sZS5sb2coJ3JlcXVlc3Q6XFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKVxuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2NhbGxcIjpcbiAgICAgIGNhc2UgXCJldGhfcmVxdWVzdEFjY291bnRzXCI6IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbWUgb24nKVxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwicGVyc29uYWxfc2lnblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UGVyc29uYWxTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2lnblRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24ocmVxdWVzdElkKyssIGFyZ3MucGFyYW1zIVswXSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NlbmRUcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJlcSA9IGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX3NlbmRSYXdUcmFuc2FjdGlvblwiLCBbcmV0LnJhd10pO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShyZXEpO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblwiOlxuICAgICAgLy8gaHR0cHM6Ly9kb2NzLm1ldGFtYXNrLmlvL2d1aWRlL3NpZ25pbmctZGF0YS5odG1sI2EtYnJpZWYtaGlzdG9yeVxuICAgICAgLy9cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFcIjpcbiAgICAgIC8vIGNhc2UgJ2V0aF9zaWduVHlwZWREYXRhX3YxJzpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25UeXBlZERhdGFfdjRcIjoge1xuICAgICAgICByZXR1cm4gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICA0MjAwLFxuICAgICAgICAgIGAke2FyZ3MubWV0aG9kfSBpcyBub3Qgc3VwcG9ydCBub3dgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGRlZmF1bHQnKVxuICAgICAgICAvLyBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAvLyAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIC8vICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgLy8gICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAvLyAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gbGV0IHJldCA9ICBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXQpXG4gICAgICAgIFxuICAgICAgICAvLyB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsICdlcnJvcicpXG4gICAgICAgIHJldHVybiAnMHgnXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdzZW5kQXN5bmM6XFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICBjb25zb2xlLmxvZygnc2VuZEFzeW5jIHRoaXM6JyArIEpTT04uc3RyaW5naWZ5KHRoaXMpKVxuICAgIGlmKGFyZ3MubWV0aG9kICE9PSAnZXRoX2NhbGwnICYmIGFyZ3MubWV0aG9kICE9PSAnZXRoX2FjY291bnRzJyl7XG4gICAgICBjb25zb2xlLmxvZygncmV0dXJuICcgKyBhcmdzLm1ldGhvZClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBcblxuICAgIC8vIGlmKGFyZ3MubWV0aG9kID09PSAnZXRoX2NhbGwnKXtcbiAgICAvLyAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgLy8gICAgIFwiaWRcIjogMTMzNyxcbiAgICAvLyAgICAgXCJqc29ucnBjXCI6IFwiMi4wXCIsXG4gICAgLy8gICAgIFwibWV0aG9kXCI6IFwiZXRoX2FjY291bnRzXCIsXG4gICAgLy8gICAgIFwicGFyYW1zXCI6IFt7XG4gICAgLy8gICAgICAgICBcImRhdGFcIjogXCIweGQ0NmU4ZGQ2N2M1ZDMyYmU4ZDQ2ZThkZDY3YzVkMzJiZTgwNThiYjhlYjk3MDg3MGYwNzI0NDU2NzUwNThiYjhlYjk3MDg3MGYwNzI0NDU2NzVcIixcbiAgICAvLyAgICAgICAgIFwiZnJvbVwiOiBcIjB4YjYwZThkZDYxYzVkMzJiZTgwNThiYjhlYjk3MDg3MGYwNzIzMzE1NVwiLFxuICAgIC8vICAgICAgICAgXCJnYXNcIjogXCIweDc2YzBcIixcbiAgICAvLyAgICAgICAgIFwiZ2FzUHJpY2VcIjogXCIweDkxODRlNzJhMDAwXCIsXG4gICAgLy8gICAgICAgICBcInRvXCI6IFwiMHhkNDZlOGRkNjdjNWQzMmJlODA1OGJiOGViOTcwODcwZjA3MjQ0NTY3XCIsXG4gICAgLy8gICAgICAgICBcInZhbHVlXCI6IFwiMHg5MTg0ZTcyYVwiXG4gICAgLy8gICAgIH1dXG4gICAgLy8gfVxuICAgIC8vICAgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKVxuICAgIC8vICAgLnRoZW4oY29uc29sZS5sb2cpLmNhdGNoKGNvbnNvbGUubG9nKVxuICAgIC8vICAgcmV0dXJuICcweCdcbiAgICAvLyB9XG4gICAgXG4gICAgLy8gbGV0IHByYW0gPSB7XG4gICAgLy8gICBtZXRob2Q6J2V0aF9jYWxsJyxcbiAgICAvLyAgIHBhcmFtczpbXVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyhhd2FpdCB0aGlzLnJlcXVlc3QocHJhbSkpXG4gICAgLy8gbGV0IHJldCA9IGF3YWl0IHRoaXMucmVxdWVzdChhcmdzKTtcbiAgICAvLyBjYWxsYmFjayhyZXQuZXJycm9yLGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKTtcblxuICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgIC8vIC50aGVuKGNvbnNvbGUubG9nKS5jYXRjaChjb25zb2xlLmxvZylcbiAgICAgIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgbGV0IHR4RGF0YSA9IHJldC5yZXN1bHQ/LnR4RGF0YTtcbiAgICAgIGlmICghcmV0LnJlc3VsdD8udHhEYXRhPy5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgdHhEYXRhID0gXCIweFwiICsgdHhEYXRhO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvZGVkID0gcmxwLmRlY29kZSh0eERhdGEsIHRydWUpO1xuXG4gICAgICBjb25zdCBybHBUWDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uID0ge1xuICAgICAgICByYXc6IHR4RGF0YSxcbiAgICAgICAgdHg6IHtcbiAgICAgICAgICBub25jZTogbm9uY2UsXG4gICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgIGdhczogZ2FzTGltaXQsXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUluV2VpLFxuICAgICAgICAgIGlucHV0OiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICByOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzddKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgczogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs4XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHY6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbNl0pLFxuICAgICAgICAgIGhhc2g6IHJldC5yZXN1bHQ/LnR4SGFzaCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHJscFRYKTtcbiAgICAgIHJldHVybiBybHBUWDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVBlcnNvbmFsU2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhZGRyZXNzKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCJcbiAgICAgICk7XG4gICAgICBjYWxsYmFjaz8uKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhZGRyZXNzIGludmFsaWRcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiLFxuICAgICAgICB9LFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gV2ViMy51dGlscy50b1V0ZjgoZGF0YVRvU2lnbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRhdGEgPSBkYXRhVG9TaWduO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrc3VtQWRkcmVzcyA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcyBhcyBzdHJpbmcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnbk1lc3NhZ2VcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBzZW5kZXI6IGNoZWNrc3VtQWRkcmVzcyxcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSxpc05hdGl2ZSgpKTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFzaWdSZXQuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGlzTmF0aXZlID0gZmFsc2UpIHtcbiAgICBpZihpc05hdGl2ZSl7XG4gICAgICBjb25zb2xlLmxvZygnbmF0aXZlMjIyJylcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZykpXG4gICAgICAgIC8vIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgICAvLyAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgLy8gICB0aXRsZTogJ+iuv+mXruivtOaYjicsXG4gICAgICAgIC8vICAgbWVzc2FnZTogJ+S9oOato+WcqOiuv+mXruesrOS4ieaWuURBUFBcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJnKSxcbiAgICAgICAgLy8gICBidXR0b25zOiBbJ09LJywgJ0NhbmNlbCddXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJldClcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RpYWxvZycpXG4gICAgICAgIC8vIGlmKHJldCA9PT0gMCl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coMClcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2NhbGxOYXRpdmVBcGkoYXJnKScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIGNhbGxOYXRpdmVBcGkoYXJnKVxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coJ3JwYycpXG4gICAgICByZXR1cm4gY2FsbFJwY0FwaShhcmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxsUnBjQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxOYXRpdmVBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil7XG4gIGNvbnN0IGpzb24gPSBhcGlyb3V0ZXIuYXBpKGFyZylcbiAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19