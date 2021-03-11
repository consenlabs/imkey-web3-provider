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

var _eip = _interopRequireDefault(require("./eip712"));

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
  _test = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log('test33');
            return _context9.abrupt("return", 'test33');

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
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
        var _ret, _ret2, req, jsonobj, eip712HashHexWithoutSha3, payload, _payload;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('request:\n' + JSON.stringify(args));
                _context.t0 = args.method;
                _context.next = _context.t0 === "eth_getChainId" ? 4 : _context.t0 === "personal_listAccounts" ? 5 : _context.t0 === "eth_accounts" ? 5 : _context.t0 === "eth_requestAccounts" ? 5 : _context.t0 === "eth_coinbase" ? 8 : _context.t0 === "personal_sign" ? 12 : _context.t0 === "eth_signTransaction" ? 15 : _context.t0 === "eth_sendTransaction" ? 18 : _context.t0 === "eth_sign" ? 25 : _context.t0 === "eth_signTypedData" ? 28 : _context.t0 === "eth_signTypedData_v3" ? 28 : _context.t0 === "eth_signTypedData_v4" ? 29 : _context.t0 === "eth_getTransactionReceipt" ? 34 : 38;
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
                return _this.imKeySign(requestId++, args.params[0], args.params[1], true);

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
                _context.next = 27;
                return _this.imKeySign(requestId++, args.params[1], args.params[0], false);

              case 27:
                return _context.abrupt("return", _context.sent);

              case 28:
                return _context.abrupt("return", createProviderRpcError(4200, "".concat(args.method, " is not support now")));

              case 29:
                jsonobj = JSON.parse(args.params[1]);
                eip712HashHexWithoutSha3 = _eip["default"].signHashHex(jsonobj, true);
                _context.next = 33;
                return _this.imKeySign(requestId++, eip712HashHexWithoutSha3, args.params[0], false);

              case 33:
                return _context.abrupt("return", _context.sent);

              case 34:
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 37;
                return _this.requestTransactionReceipt(payload);

              case 37:
                return _context.abrupt("return", _context.sent);

              case 38:
                console.log('request default');
                _payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 42;
                return _this.callInnerProviderApi(_payload);

              case 42:
                return _context.abrupt("return", _context.sent);

              case 43:
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

      this.request(args).then(function (ret) {
        console.log('request ret:' + ret + ' method:' + args.method);
        console.log(JSON.stringify(ret)); // if(args.method === 'eth_getTransactionReceipt'){
        //   console.log('diff ret:' + typeof ret)
        //   callback(null, createJsonRpcResponse(args.id, {"blockHash":"0x09e5d45158e71a6c07ac10142c3abfb24078de838bf8d3b5b6641fac67f42684","blockNumber":"0x15f56e4","contractAddress":null,"cumulativeGasUsed":"0xb64b5","from":"0x6031564e7b2f5cc33737807b2e58daff870b590b","gasUsed":"0x5208","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x2","to":"0xd6a6bc087d12ae864491240bf457856c71d48eb8","transactionHash":"0xbc86e19ae2856061b4fa38bba6aa0e60d02e7d54be738de088241df820c6ee24","transactionIndex":"0x2"}))
        //   // callback(null, createJsonRpcResponse(args.id, ret + ''))
        // }else{

        callback(null, createJsonRpcResponse(args.id, ret)); // }
      })["catch"](function (err) {
        console.log('request err' + err);
        callback(err, null);
      }); // }
      // this.request(args)
      // .then((ret) => callback(null, createJsonRpcResponse(args.id, ret)))
      // .catch((err) => callback(err, null));
    }
  }, {
    key: "requestTransactionReceipt",
    value: function () {
      var _requestTransactionReceipt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(paload) {
        var i, _ret3;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < 10)) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 4;
                return sleep(1000);

              case 4:
                console.log('requestTransactionReceipt ' + i);
                _context5.next = 7;
                return this.callInnerProviderApi(paload);

              case 7:
                _ret3 = _context5.sent;

                if (!_ret3) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", _ret3);

              case 10:
                i++;
                _context5.next = 1;
                break;

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function requestTransactionReceipt(_x3) {
        return _requestTransactionReceipt.apply(this, arguments);
      }

      return requestTransactionReceipt;
    }()
  }, {
    key: "imKeyRequestAccounts",
    value: function () {
      var _imKeyRequestAccounts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, callback) {
        var _ret4$result, _ret4$result2, _ret4;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return callImKeyApi({
                  jsonrpc: "2.0",
                  method: "eth.getAddress",
                  params: {
                    path: IMKEY_ETH_PATH
                  },
                  id: requestId++
                }, isNative());

              case 3:
                _ret4 = _context6.sent;
                callback === null || callback === void 0 ? void 0 : callback(null, [(_ret4$result = _ret4.result) === null || _ret4$result === void 0 ? void 0 : _ret4$result.address]);
                return _context6.abrupt("return", [(_ret4$result2 = _ret4.result) === null || _ret4$result2 === void 0 ? void 0 : _ret4$result2.address]);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                callback === null || callback === void 0 ? void 0 : callback(_context6.t0, null);
                throw createProviderRpcError(4001, _context6.t0);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      function imKeyRequestAccounts(_x4, _x5) {
        return _imKeyRequestAccounts.apply(this, arguments);
      }

      return imKeyRequestAccounts;
    }()
  }, {
    key: "imKeySignTransaction",
    value: function () {
      var _imKeySignTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id, transactionConfig, callback) {
        var from, accounts, gasPriceDec, gasPriceRet, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, msg, _ret5, _ret6$result, _ret6$result2, _ret6, signature, decoded, rlpTX;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!transactionConfig.to || !transactionConfig.value)) {
                  _context7.next = 2;
                  break;
                }

                throw createProviderRpcError(-32602, "expected to,value");

              case 2:
                if (!(!transactionConfig.from || typeof transactionConfig.from === "number")) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 5;
                return this.imKeyRequestAccounts(requestId++);

              case 5:
                accounts = _context7.sent;
                from = accounts[0];
                _context7.next = 10;
                break;

              case 9:
                from = _web["default"].utils.toChecksumAddress(transactionConfig.from);

              case 10:
                if (!transactionConfig.gasPrice) {
                  _context7.next = 14;
                  break;
                }

                gasPriceDec = parseArgsNum(transactionConfig.gasPrice);
                _context7.next = 18;
                break;

              case 14:
                _context7.next = 16;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_gasPrice", []));

              case 16:
                gasPriceRet = _context7.sent;
                gasPriceDec = _web["default"].utils.hexToNumberString(gasPriceRet);

              case 18:
                if (!transactionConfig.chainId) {
                  _context7.next = 24;
                  break;
                }

                if (!(transactionConfig.chainId !== this.chainId)) {
                  _context7.next = 21;
                  break;
                }

                throw createProviderRpcError(-32602, "expected chainId and connected chainId are mismatched");

              case 21:
                chainId = transactionConfig.chainId;
                _context7.next = 25;
                break;

              case 24:
                chainId = this.chainId;

              case 25:
                if (!transactionConfig.nonce) {
                  _context7.next = 29;
                  break;
                }

                nonce = parseArgsNum(transactionConfig.nonce);
                _context7.next = 33;
                break;

              case 29:
                _context7.next = 31;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_getTransactionCount", [transactionConfig.from, "pending"]));

              case 31:
                nonce = _context7.sent;
                nonce = _web["default"].utils.hexToNumber(nonce).toString();

              case 33:
                if (!transactionConfig.gas) {
                  _context7.next = 37;
                  break;
                }

                gasLimit = parseArgsNum(transactionConfig.gas);
                _context7.next = 41;
                break;

              case 37:
                _context7.next = 39;
                return this.callInnerProviderApi(createJsonRpcRequest("eth_estimateGas", [{
                  from: transactionConfig.from,
                  to: transactionConfig.to,
                  gas: transactionConfig.gas,
                  gasPrice: _web["default"].utils.numberToHex(gasPriceDec),
                  value: transactionConfig.value,
                  data: transactionConfig.data
                }]));

              case 39:
                gasRet = _context7.sent;
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
                msg = transactionConfig.value + ' ETH\n' + '收款地址：' + to + '\n' + '付款地址：' + from + '\n' + '矿工费：' + fee + '\n';

                if (isNative) {
                  _ret5 = dialog.showMessageBoxSync({
                    type: 'info',
                    title: '访问说明',
                    message: msg,
                    buttons: ['OK', 'Cancel']
                  });
                }

                _context7.prev = 51;
                _context7.next = 54;
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

              case 54:
                _ret6 = _context7.sent;
                signature = (_ret6$result = _ret6.result) === null || _ret6$result === void 0 ? void 0 : _ret6$result.signature;

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
                    hash: (_ret6$result2 = _ret6.result) === null || _ret6$result2 === void 0 ? void 0 : _ret6$result2.txHash
                  }
                };
                callback === null || callback === void 0 ? void 0 : callback(null, rlpTX);
                return _context7.abrupt("return", rlpTX);

              case 63:
                _context7.prev = 63;
                _context7.t0 = _context7["catch"](51);
                callback === null || callback === void 0 ? void 0 : callback(_context7.t0, null);
                throw createProviderRpcError(4001, _context7.t0);

              case 67:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[51, 63]]);
      }));

      function imKeySignTransaction(_x6, _x7, _x8) {
        return _imKeySignTransaction.apply(this, arguments);
      }

      return imKeySignTransaction;
    }()
  }, {
    key: "imKeySign",
    value: function () {
      var _imKeySign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, dataToSign, address, isPersonalSign, callback) {
        var _error, data, checksumAddress, _ret7$result, _ret7, sigRet;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!Number.isInteger(address)) {
                  _context8.next = 4;
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
                _context8.prev = 7;
                _context8.next = 10;
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
                }, isNative());

              case 10:
                _ret7 = _context8.sent;
                sigRet = (_ret7$result = _ret7.result) === null || _ret7$result === void 0 ? void 0 : _ret7$result.signature.toLowerCase();

                if (!sigRet.startsWith("0x")) {
                  sigRet = "0x" + sigRet;
                }

                callback === null || callback === void 0 ? void 0 : callback(null, sigRet);
                return _context8.abrupt("return", sigRet);

              case 17:
                _context8.prev = 17;
                _context8.t0 = _context8["catch"](7);
                callback === null || callback === void 0 ? void 0 : callback(_context8.t0, null);
                throw createProviderRpcError(4001, _context8.t0);

              case 21:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[7, 17]]);
      }));

      function imKeySign(_x9, _x10, _x11, _x12, _x13) {
        return _imKeySign.apply(this, arguments);
      }

      return imKeySign;
    }()
  }]);
  return ImKeyProvider;
}(_eventEmitterEs["default"]);

exports["default"] = ImKeyProvider;

function sleep(_x14) {
  return _sleep.apply(this, arguments);
}

function _sleep() {
  _sleep = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(ms) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", new Promise(function (resolve) {
              return setTimeout(resolve, ms);
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _sleep.apply(this, arguments);
}

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

function callNativeApi(_x15) {
  return _callNativeApi.apply(this, arguments);
}

function _callNativeApi() {
  _callNativeApi = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(arg) {
    var json;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            json = apirouter.api(arg);

            if (!json.error) {
              _context11.next = 9;
              break;
            }

            if (!json.error.message.includes("ImkeyUserNotConfirmed")) {
              _context11.next = 6;
              break;
            }

            throw new Error("user not confirmed");

          case 6:
            throw new Error(json.error.message);

          case 7:
            _context11.next = 10;
            break;

          case 9:
            return _context11.abrupt("return", json);

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJyZXQiLCJTdHJpbmciLCJpbUtleVNpZ24iLCJpbUtleVNpZ25UcmFuc2FjdGlvbiIsInJlcSIsInJhdyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwianNvbm9iaiIsInBhcnNlIiwiZWlwNzEySGFzaEhleFdpdGhvdXRTaGEzIiwiaW1Ub2tlbkVpcDcxMlV0aWxzIiwic2lnbkhhc2hIZXgiLCJwYXlsb2FkIiwicmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdCIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJhY2NvdW50cyIsImNoYWluSWRIZXgiLCJoZXhUb051bWJlciIsIkVycm9yIiwiZW1pdCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJwYWxvYWQiLCJpIiwic2xlZXAiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJmcm9tIiwidG9DaGVja3N1bUFkZHJlc3MiLCJnYXNQcmljZSIsImdhc1ByaWNlRGVjIiwiZ2FzUHJpY2VSZXQiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwibnVtYmVyVG9IZXgiLCJkYXRhIiwiZ2FzUmV0IiwiZmVlIiwiQmlnSW50IiwiZnJvbVdlaSIsInRlbXAiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsInZhbHVlSW5XZWkiLCJtc2ciLCJzaG93TWVzc2FnZUJveFN5bmMiLCJ0eXBlIiwidGl0bGUiLCJidXR0b25zIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwic2lnbmF0dXJlIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc1BlcnNvbmFsU2lnbiIsImlzSW50ZWdlciIsInRvVXRmOCIsImNoZWNrc3VtQWRkcmVzcyIsInNpZ1JldCIsInRvTG93ZXJDYXNlIiwiRXZlbnRFbWl0dGVyIiwibXMiLCJzZXRUaW1lb3V0IiwiYXJnIiwiY2FsbE5hdGl2ZUFwaSIsImNhbGxScGNBcGkiLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsImFwaSIsInVybCIsImZldGNoIiwiYm9keSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFFQTs7QUFDQTs7QUFHQTs7Ozs7O0FBZ0JBLElBQU1BLHNC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SSxJQUFBQSxJQUFJLEVBQUUsTUFUVTtBQVNGO0FBQ2RDLElBQUFBLFFBQVEsRUFBRSxRQVZNO0FBVUk7QUFDcEJDLElBQUFBLFFBQVEsRUFBRSxhQVhNLENBV1M7O0FBWFQsR0FBTixDQUFMLENBWUo3RSxJQVpJLENBWUMsVUFBQzhFLFFBQUQsRUFBYztBQUNwQixRQUFJQSxRQUFRLENBQUNDLE1BQVQsSUFBbUIsR0FBdkIsRUFBNEI7QUFDMUIsYUFBT0QsUUFBUSxDQUFDWCxJQUFULEVBQVA7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUl2RSxLQUFKLENBQVUsV0FBVixDQUFOO0FBQ0Q7QUFDRixHQWxCTSxDQUFQO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IEpzb25ScGNQYXlsb2FkLCBKc29uUnBjUmVzcG9uc2UgfSBmcm9tIFwid2ViMy1jb3JlLWhlbHBlcnNcIjtcblxuaW1wb3J0ICogYXMgcmxwIGZyb20gXCJybHBcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25Db25maWcgfSBmcm9tIFwid2ViMy1ldGhcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50LWVtaXR0ZXItZXM2XCI7XG5pbXBvcnQgQk4gZnJvbSBcImJuLmpzXCI7XG5pbXBvcnQgKiBhcyBzaWd1dGlsIGZyb20gXCJldGgtc2lnLXV0aWxcIjtcbmltcG9ydCAqIGFzIGV0aFV0aWwgZnJvbSAnZXRoZXJldW1qcy11dGlsJ1xuaW1wb3J0IGltVG9rZW5FaXA3MTJVdGlscyBmcm9tICcuL2VpcDcxMic7XG5cbmludGVyZmFjZSBJUHJvdmlkZXJPcHRpb25zIHtcbiAgcnBjVXJsPzogc3RyaW5nO1xuICBpbmZ1cmFJZD86IHN0cmluZztcbiAgY2hhaW5JZD86IG51bWJlcjtcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGFwaXJvdXRlcj86YW55O1xuICBkaWFsb2c/OmFueTtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xubGV0IGFwaXJvdXRlcjtcbnZhciBkaWFsb2c7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIiAmJiBXZWIzLnV0aWxzLmlzSGV4KG51bSkpIHtcbiAgICByZXR1cm4gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhudW0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGVzdDMzKCl7XG4gIGNvbnNvbGUubG9nKCd0ZXN0MzMnKVxuICByZXR1cm4gJ3Rlc3QzMydcbn1cblxuZnVuY3Rpb24gaXNOYXRpdmUoKXtcbiAgaWYoYXBpcm91dGVyJiZkaWFsb2cpe1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSB0cnVlJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9ZWxzZXtcbiAgICBjb25zb2xlLmxvZygnaXNOYXRpdmUgZmFsc2UnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaHR0cFByb3ZpZGVyOiBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG4gIHByaXZhdGUgY2hhaW5JZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVByb3ZpZGVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmw7XG4gICAgdGhpcy5jaGFpbklkID0gY29uZmlnLmNoYWluSWQgPz8gMTtcbiAgICBpZiAoY29uZmlnLmluZnVyYUlkKSB7XG4gICAgICBjb25zdCBuZXR3b3JrID0gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKHRoaXMuY2hhaW5JZCk7XG4gICAgICBycGNVcmwgPSBgaHR0cHM6Ly8ke25ldHdvcmt9LmluZnVyYS5pby92My8ke2NvbmZpZy5pbmZ1cmFJZH1gO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbGV0IGhlYWRlcnMgPSBudWxsO1xuICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpZHggaW4gY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKHsgbmFtZTogaWR4LCB2YWx1ZTogY29uZmlnLmhlYWRlcnNbaWR4XSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmh0dHBQcm92aWRlciA9IG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIocnBjVXJsLCB7XG4gICAgICBoZWFkZXJzLFxuICAgIH0pO1xuXG4gICAgYXBpcm91dGVyID0gY29uZmlnLmFwaXJvdXRlclxuICAgIGRpYWxvZyA9IGNvbmZpZy5kaWFsb2dcblxuICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnNvbGUubG9nKCdlbmFibGUnKVxuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyB0ZXN0MjIoKXtcbiAgICBjb25zb2xlLmxvZygndGVzdDIyJylcbiAgICByZXR1cm4gJzIyJ1xuICB9XG5cbiAgcmVxdWVzdDIoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PntcbiAgICBjb25zb2xlLmxvZyhhcmdzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgcmV0dXJuIHJlc29sdmUoJzB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYicpXG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0ID0gYXN5bmMgKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0OlxcbicgKyBKU09OLnN0cmluZ2lmeShhcmdzKSlcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX2NvaW5iYXNlXCI6IHtcbiAgICAgICAgbGV0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgICByZXR1cm4gU3RyaW5nKHJldFswXSlcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICA0MjAwLFxuICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgKTtcbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIGNvbnN0IGpzb25vYmogPSBKU09OLnBhcnNlKGFyZ3MucGFyYW1zIVsxXSlcbiAgICAgICAgY29uc3QgZWlwNzEySGFzaEhleFdpdGhvdXRTaGEzID0gaW1Ub2tlbkVpcDcxMlV0aWxzLnNpZ25IYXNoSGV4KFxuICAgICAgICAgIGpzb25vYmosXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBlaXA3MTJIYXNoSGV4V2l0aG91dFNoYTMsXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX2dldFRyYW5zYWN0aW9uUmVjZWlwdFwiOiB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXF1ZXN0VHJhbnNhY3Rpb25SZWNlaXB0KHBheWxvYWQpXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGRlZmF1bHQnKVxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGF5bG9hZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2VuZEFzeW5jKFxuICAgIGFyZ3M6IEpzb25ScGNQYXlsb2FkLFxuICAgIGNhbGxiYWNrOiAoZXJyOiBFcnJvciB8IG51bGwsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGNvbnNvbGUubG9nKCdzZW5kQXN5bmM6XFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAvLyBpZihhcmdzLm1ldGhvZCAhPT0gJ2V0aF9jYWxsJyAmJiBhcmdzLm1ldGhvZCAhPT0gJ2V0aF9hY2NvdW50cycpe1xuICAgIC8vICAgY29uc29sZS5sb2coJ3JldHVybiAnICsgYXJncy5tZXRob2QpXG4gICAgLy8gICByZXR1cm5cbiAgICAvLyB9XG4gICAgLy8gaWYoYXJncy5tZXRob2QgPT09ICdldGhfY29pbmJhc2UnKXtcbiAgICAvLyAgIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCAnMHg0MDdkNzNkOGE0OWVlYjg1ZDMyY2Y0NjU1MDdkZDcxZDUwNzEwMGMxJykpXG4gICAgLy8gfWVsc2V7XG4gICAgICB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgcmV0OicgKyByZXQgKyAnIG1ldGhvZDonICsgYXJncy5tZXRob2QpXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJldCkpXG4gICAgICAgIC8vIGlmKGFyZ3MubWV0aG9kID09PSAnZXRoX2dldFRyYW5zYWN0aW9uUmVjZWlwdCcpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdkaWZmIHJldDonICsgdHlwZW9mIHJldClcbiAgICAgICAgICBcbiAgICAgICAgLy8gICBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwge1wiYmxvY2tIYXNoXCI6XCIweDA5ZTVkNDUxNThlNzFhNmMwN2FjMTAxNDJjM2FiZmIyNDA3OGRlODM4YmY4ZDNiNWI2NjQxZmFjNjdmNDI2ODRcIixcImJsb2NrTnVtYmVyXCI6XCIweDE1ZjU2ZTRcIixcImNvbnRyYWN0QWRkcmVzc1wiOm51bGwsXCJjdW11bGF0aXZlR2FzVXNlZFwiOlwiMHhiNjRiNVwiLFwiZnJvbVwiOlwiMHg2MDMxNTY0ZTdiMmY1Y2MzMzczNzgwN2IyZTU4ZGFmZjg3MGI1OTBiXCIsXCJnYXNVc2VkXCI6XCIweDUyMDhcIixcImxvZ3NcIjpbXSxcImxvZ3NCbG9vbVwiOlwiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMFwiLFwic3RhdHVzXCI6XCIweDJcIixcInRvXCI6XCIweGQ2YTZiYzA4N2QxMmFlODY0NDkxMjQwYmY0NTc4NTZjNzFkNDhlYjhcIixcInRyYW5zYWN0aW9uSGFzaFwiOlwiMHhiYzg2ZTE5YWUyODU2MDYxYjRmYTM4YmJhNmFhMGU2MGQwMmU3ZDU0YmU3MzhkZTA4ODI0MWRmODIwYzZlZTI0XCIsXCJ0cmFuc2FjdGlvbkluZGV4XCI6XCIweDJcIn0pKVxuICAgICAgICAvLyAgIC8vIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQgKyAnJykpXG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKVxuICAgICAgICAvLyB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZXJyJyArIGVycilcbiAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKVxuICAgICAgfSk7XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIHRoaXMucmVxdWVzdChhcmdzKVxuICAgIC8vIC50aGVuKChyZXQpID0+IGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCByZXQpKSlcbiAgICAvLyAuY2F0Y2goKGVycikgPT4gY2FsbGJhY2soZXJyLCBudWxsKSk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0VHJhbnNhY3Rpb25SZWNlaXB0KHBhbG9hZDogSnNvblJwY1BheWxvYWQpe1xuICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKXtcbiAgICAgIGF3YWl0IHNsZWVwKDEwMDApXG4gICAgICBjb25zb2xlLmxvZygncmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdCAnICsgaSlcbiAgICAgIGxldCByZXQgPSAgYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYWxvYWQpO1xuICAgICAgaWYocmV0KXtcbiAgICAgICAgcmV0dXJuIHJldFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UmVxdWVzdEFjY291bnRzKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5nZXRBZGRyZXNzXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgW3JldC5yZXN1bHQ/LmFkZHJlc3NdKTtcbiAgICAgIHJldHVybiBbcmV0LnJlc3VsdD8uYWRkcmVzc107XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlTaWduVHJhbnNhY3Rpb24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICB0cmFuc2FjdGlvbkNvbmZpZzogVHJhbnNhY3Rpb25Db25maWcsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLnRvIHx8ICF0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSkge1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcigtMzI2MDIsIFwiZXhwZWN0ZWQgdG8sdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLy9mcm9tXG4gICAgbGV0IGZyb206IHN0cmluZztcbiAgICBpZiAoIXRyYW5zYWN0aW9uQ29uZmlnLmZyb20gfHwgdHlwZW9mIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICBmcm9tID0gYWNjb3VudHNbMF0gYXMgc3RyaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIGFzIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy9nYXMgcHJpY2VcbiAgICBsZXQgZ2FzUHJpY2VEZWM6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpIHtcbiAgICAgIGdhc1ByaWNlRGVjID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUHJpY2VSZXQgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nYXNQcmljZVwiLCBbXSlcbiAgICAgICk7XG4gICAgICBnYXNQcmljZURlYyA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXJTdHJpbmcoZ2FzUHJpY2VSZXQpO1xuICAgIH1cblxuICAgIC8vY2hhaW4gaWRcbiAgICBsZXQgY2hhaW5JZDogbnVtYmVyO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgLTMyNjAyLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgY2hhaW5JZCBhbmQgY29ubmVjdGVkIGNoYWluSWQgYXJlIG1pc21hdGNoZWRcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2hhaW5JZCA9IHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYWluSWQgPSB0aGlzLmNoYWluSWQ7XG4gICAgfVxuXG4gICAgLy9ub25jZVxuICAgIGxldCBub25jZTogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSkge1xuICAgICAgbm9uY2UgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcubm9uY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub25jZSA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dldFRyYW5zYWN0aW9uQ291bnRcIiwgW1xuICAgICAgICAgIHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgXCJwZW5kaW5nXCIsXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgbm9uY2UgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKG5vbmNlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8vZXN0aW1hdGUgZ2FzXG4gICAgbGV0IGdhc0xpbWl0OiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhcykge1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ2FzUmV0OiBzdHJpbmcgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9lc3RpbWF0ZUdhc1wiLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJvbTogdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICAgIHRvOiB0cmFuc2FjdGlvbkNvbmZpZy50byxcbiAgICAgICAgICAgIGdhczogdHJhbnNhY3Rpb25Db25maWcuZ2FzLFxuICAgICAgICAgICAgZ2FzUHJpY2U6IFdlYjMudXRpbHMubnVtYmVyVG9IZXgoZ2FzUHJpY2VEZWMpLFxuICAgICAgICAgICAgdmFsdWU6IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdHJhbnNhY3Rpb25Db25maWcuZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKGdhc1JldCk7XG4gICAgfVxuXG4gICAgLy9mZWVcbiAgICBsZXQgZmVlID0gKEJpZ0ludChnYXNMaW1pdCkgKiBCaWdJbnQoZ2FzUHJpY2VEZWMpKS50b1N0cmluZygpOyAvL3dlaVxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUsIFwiR3dlaVwiKTsgLy90byBHd2VpXG4gICAgY29uc3QgdGVtcCA9IE1hdGguY2VpbChOdW1iZXIoZmVlKSk7XG4gICAgZmVlID0gKHRlbXAgKiAxMDAwMDAwMDAwKS50b1N0cmluZygpOyAvL3RvIGV0aGVyXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSkgKyBcIiBldGhlclwiO1xuXG4gICAgY29uc3QgdG8gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLnRvKTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSk7XG4gICAgY29uc3QgdmFsdWVJbldlaSA9IFdlYjMudXRpbHMuZnJvbVdlaSh2YWx1ZSk7XG5cbiAgICBjb25zdCBtc2cgPSB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSArICcgRVRIXFxuJ1xuICAgICsgJ+aUtuasvuWcsOWdgO+8micgKyB0byArICdcXG4nXG4gICAgKyAn5LuY5qy+5Zyw5Z2A77yaJyArIGZyb20gKyAnXFxuJ1xuICAgICsgJ+efv+W3pei0ue+8micgKyBmZWUgKyAnXFxuJztcbiAgICBcbiAgICBpZihpc05hdGl2ZSl7XG4gICAgICBjb25zdCByZXQgPSBkaWFsb2cuc2hvd01lc3NhZ2VCb3hTeW5jKHtcbiAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgIHRpdGxlOiAn6K6/6Zeu6K+05piOJyxcbiAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgIGJ1dHRvbnM6IFsnT0snLCAnQ2FuY2VsJ11cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGxldCBzaWduYXR1cmUgPSByZXQucmVzdWx0Py5zaWduYXR1cmU7XG4gICAgICBpZiAoIXNpZ25hdHVyZS5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnbmF0dXJlID0gXCIweFwiICsgc2lnbmF0dXJlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvZGVkID0gcmxwLmRlY29kZShzaWduYXR1cmUsIHRydWUpO1xuXG4gICAgICBjb25zdCBybHBUWDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uID0ge1xuICAgICAgICByYXc6IHNpZ25hdHVyZSxcbiAgICAgICAgdHg6IHtcbiAgICAgICAgICBub25jZTogbm9uY2UsXG4gICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgIGdhczogZ2FzTGltaXQsXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUluV2VpLFxuICAgICAgICAgIGlucHV0OiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICByOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzddKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgczogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs4XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHY6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbNl0pLFxuICAgICAgICAgIGhhc2g6IHJldC5yZXN1bHQ/LnR4SGFzaCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHJscFRYKTtcbiAgICAgIHJldHVybiBybHBUWDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ24oXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBkYXRhVG9TaWduOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGlzUGVyc29uYWxTaWduOiBib29sZWFuLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWQsXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIGlzUGVyc29uYWxTaWduLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LGlzTmF0aXZlKCkpO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGlzTmF0aXZlID0gZmFsc2UpIHtcbiAgICBpZihpc05hdGl2ZSl7XG4gICAgICBjb25zb2xlLmxvZygnbmF0aXZlMjIyJylcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZykpXG4gICAgICAgIC8vIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgICAvLyAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgLy8gICB0aXRsZTogJ+iuv+mXruivtOaYjicsXG4gICAgICAgIC8vICAgbWVzc2FnZTogJ+S9oOato+WcqOiuv+mXruesrOS4ieaWuURBUFBcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJnKSxcbiAgICAgICAgLy8gICBidXR0b25zOiBbJ09LJywgJ0NhbmNlbCddXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJldClcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RpYWxvZycpXG4gICAgICAgIC8vIGlmKHJldCA9PT0gMCl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coMClcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2NhbGxOYXRpdmVBcGkoYXJnKScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIGNhbGxOYXRpdmVBcGkoYXJnKVxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coJ3JwYycpXG4gICAgICByZXR1cm4gY2FsbFJwY0FwaShhcmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxsUnBjQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxOYXRpdmVBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil7XG4gIGNvbnN0IGpzb24gPSBhcGlyb3V0ZXIuYXBpKGFyZylcbiAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19