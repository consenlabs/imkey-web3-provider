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
        var _ret, _ret2, req, payload, _payload;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('request:\n' + JSON.stringify(args));
                _context.t0 = args.method;
                _context.next = _context.t0 === "eth_getChainId" ? 4 : _context.t0 === "personal_listAccounts" ? 5 : _context.t0 === "eth_accounts" ? 5 : _context.t0 === "eth_requestAccounts" ? 5 : _context.t0 === "eth_coinbase" ? 8 : _context.t0 === "personal_sign" ? 12 : _context.t0 === "eth_signTransaction" ? 15 : _context.t0 === "eth_sendTransaction" ? 18 : _context.t0 === "eth_sign" ? 25 : _context.t0 === "eth_signTypedData" ? 28 : _context.t0 === "eth_signTypedData_v3" ? 28 : _context.t0 === "eth_signTypedData_v4" ? 28 : _context.t0 === "eth_getTransactionReceipt" ? 29 : 33;
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
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 32;
                return _this.requestTransactionReceipt(payload);

              case 32:
                return _context.abrupt("return", _context.sent);

              case 33:
                console.log('request default');
                _payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 37;
                return _this.callInnerProviderApi(_payload);

              case 37:
                return _context.abrupt("return", _context.sent);

              case 38:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJyZXQiLCJTdHJpbmciLCJpbUtleVNpZ24iLCJpbUtleVNpZ25UcmFuc2FjdGlvbiIsInJlcSIsInJhdyIsImNhbGxJbm5lclByb3ZpZGVyQXBpIiwicGF5bG9hZCIsInJlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQiLCJycGNVcmwiLCJpbmZ1cmFJZCIsIm5ldHdvcmsiLCJoZWFkZXJzIiwiaWR4IiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsImh0dHBQcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2VuZCIsImVycm9yIiwiYWNjb3VudHMiLCJjaGFpbklkSGV4IiwiaGV4VG9OdW1iZXIiLCJFcnJvciIsImVtaXQiLCJjYWxsYmFjayIsInJlcXVlc3QiLCJ0aGVuIiwiZXJyIiwicGFsb2FkIiwiaSIsInNsZWVwIiwiY2FsbEltS2V5QXBpIiwicGF0aCIsImFkZHJlc3MiLCJ0cmFuc2FjdGlvbkNvbmZpZyIsInRvIiwiZnJvbSIsInRvQ2hlY2tzdW1BZGRyZXNzIiwiZ2FzUHJpY2UiLCJnYXNQcmljZURlYyIsImdhc1ByaWNlUmV0Iiwibm9uY2UiLCJnYXMiLCJnYXNMaW1pdCIsIm51bWJlclRvSGV4IiwiZGF0YSIsImdhc1JldCIsImZlZSIsIkJpZ0ludCIsImZyb21XZWkiLCJ0ZW1wIiwiTWF0aCIsImNlaWwiLCJOdW1iZXIiLCJ2YWx1ZUluV2VpIiwibXNnIiwic2hvd01lc3NhZ2VCb3hTeW5jIiwidHlwZSIsInRpdGxlIiwiYnV0dG9ucyIsInRyYW5zYWN0aW9uIiwicHJldmlldyIsInBheW1lbnQiLCJyZWNlaXZlciIsInNlbmRlciIsInNpZ25hdHVyZSIsInN0YXJ0c1dpdGgiLCJkZWNvZGVkIiwicmxwIiwiZGVjb2RlIiwicmxwVFgiLCJ0eCIsImlucHV0IiwiciIsImJ5dGVzVG9IZXgiLCJzIiwidiIsImhhc2giLCJ0eEhhc2giLCJkYXRhVG9TaWduIiwiaXNQZXJzb25hbFNpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsIm1zIiwic2V0VGltZW91dCIsImFyZyIsImNhbGxOYXRpdmVBcGkiLCJjYWxsUnBjQXBpIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJhcGkiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJyZXNwb25zZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7Ozs7OztBQWVBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxTQUFK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QUE7QUFBQTs7QUFBQSxrQkFJWSxJQUFJeEUsS0FBSixDQUFVLG9CQUFWLENBSlo7O0FBQUE7QUFBQSxrQkFNWSxJQUFJQSxLQUFKLENBQVV1RSxJQUFJLENBQUMzRSxLQUFMLENBQVc5QyxPQUFyQixDQU5aOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLCtDQVNXeUgsSUFUWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBYUEsU0FBU0QsUUFBVCxDQUFrQkksR0FBbEIsRUFBK0JuRCxJQUEvQixFQUE4RDtBQUM1RCxTQUFPb0QsS0FBSyxDQUFDRCxHQUFELEVBQU07QUFDaEJFLElBQUFBLElBQUksRUFBRTNHLElBQUksQ0FBQ0MsU0FBTCxDQUFlcUQsSUFBZixDQURVO0FBQ1k7QUFDNUJzRCxJQUFBQSxLQUFLLEVBQUUsVUFGUztBQUVHO0FBQ25CQyxJQUFBQSxXQUFXLEVBQUUsYUFIRztBQUdZO0FBQzVCOUYsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCMUMsSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQnlJLElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSjdFLElBWkksQ0FZQyxVQUFDOEUsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNYLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSXZFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmludGVyZmFjZSBJUHJvdmlkZXJPcHRpb25zIHtcbiAgcnBjVXJsPzogc3RyaW5nO1xuICBpbmZ1cmFJZD86IHN0cmluZztcbiAgY2hhaW5JZD86IG51bWJlcjtcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGFwaXJvdXRlcj86YW55O1xuICBkaWFsb2c/OmFueTtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xubGV0IGFwaXJvdXRlcjtcbnZhciBkaWFsb2c7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIiAmJiBXZWIzLnV0aWxzLmlzSGV4KG51bSkpIHtcbiAgICByZXR1cm4gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhudW0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGVzdDMzKCl7XG4gIGNvbnNvbGUubG9nKCd0ZXN0MzMnKVxuICByZXR1cm4gJ3Rlc3QzMydcbn1cblxuZnVuY3Rpb24gaXNOYXRpdmUoKXtcbiAgaWYoYXBpcm91dGVyJiZkaWFsb2cpe1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSB0cnVlJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9ZWxzZXtcbiAgICBjb25zb2xlLmxvZygnaXNOYXRpdmUgZmFsc2UnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaHR0cFByb3ZpZGVyOiBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG4gIHByaXZhdGUgY2hhaW5JZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVByb3ZpZGVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmw7XG4gICAgdGhpcy5jaGFpbklkID0gY29uZmlnLmNoYWluSWQgPz8gMTtcbiAgICBpZiAoY29uZmlnLmluZnVyYUlkKSB7XG4gICAgICBjb25zdCBuZXR3b3JrID0gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKHRoaXMuY2hhaW5JZCk7XG4gICAgICBycGNVcmwgPSBgaHR0cHM6Ly8ke25ldHdvcmt9LmluZnVyYS5pby92My8ke2NvbmZpZy5pbmZ1cmFJZH1gO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbGV0IGhlYWRlcnMgPSBudWxsO1xuICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpZHggaW4gY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKHsgbmFtZTogaWR4LCB2YWx1ZTogY29uZmlnLmhlYWRlcnNbaWR4XSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmh0dHBQcm92aWRlciA9IG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIocnBjVXJsLCB7XG4gICAgICBoZWFkZXJzLFxuICAgIH0pO1xuXG4gICAgYXBpcm91dGVyID0gY29uZmlnLmFwaXJvdXRlclxuICAgIGRpYWxvZyA9IGNvbmZpZy5kaWFsb2dcblxuICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnNvbGUubG9nKCdlbmFibGUnKVxuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyB0ZXN0MjIoKXtcbiAgICBjb25zb2xlLmxvZygndGVzdDIyJylcbiAgICByZXR1cm4gJzIyJ1xuICB9XG5cbiAgcmVxdWVzdDIoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PntcbiAgICBjb25zb2xlLmxvZyhhcmdzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgcmV0dXJuIHJlc29sdmUoJzB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYicpXG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0ID0gYXN5bmMgKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0OlxcbicgKyBKU09OLnN0cmluZ2lmeShhcmdzKSlcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX2NvaW5iYXNlXCI6IHtcbiAgICAgICAgbGV0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgICByZXR1cm4gU3RyaW5nKHJldFswXSlcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlTaWduKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMV0sXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0XCI6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQocGF5bG9hZClcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZGVmYXVsdCcpXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ3NlbmRBc3luYzpcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgIC8vIGlmKGFyZ3MubWV0aG9kICE9PSAnZXRoX2NhbGwnICYmIGFyZ3MubWV0aG9kICE9PSAnZXRoX2FjY291bnRzJyl7XG4gICAgLy8gICBjb25zb2xlLmxvZygncmV0dXJuICcgKyBhcmdzLm1ldGhvZClcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cbiAgICAvLyBpZihhcmdzLm1ldGhvZCA9PT0gJ2V0aF9jb2luYmFzZScpe1xuICAgIC8vICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsICcweDQwN2Q3M2Q4YTQ5ZWViODVkMzJjZjQ2NTUwN2RkNzFkNTA3MTAwYzEnKSlcbiAgICAvLyB9ZWxzZXtcbiAgICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgICAgLnRoZW4oKHJldCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCByZXQ6JyArIHJldCArICcgbWV0aG9kOicgKyBhcmdzLm1ldGhvZClcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmV0KSlcbiAgICAgICAgLy8gaWYoYXJncy5tZXRob2QgPT09ICdldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0Jyl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2RpZmYgcmV0OicgKyB0eXBlb2YgcmV0KVxuICAgICAgICAgIFxuICAgICAgICAvLyAgIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCB7XCJibG9ja0hhc2hcIjpcIjB4MDllNWQ0NTE1OGU3MWE2YzA3YWMxMDE0MmMzYWJmYjI0MDc4ZGU4MzhiZjhkM2I1YjY2NDFmYWM2N2Y0MjY4NFwiLFwiYmxvY2tOdW1iZXJcIjpcIjB4MTVmNTZlNFwiLFwiY29udHJhY3RBZGRyZXNzXCI6bnVsbCxcImN1bXVsYXRpdmVHYXNVc2VkXCI6XCIweGI2NGI1XCIsXCJmcm9tXCI6XCIweDYwMzE1NjRlN2IyZjVjYzMzNzM3ODA3YjJlNThkYWZmODcwYjU5MGJcIixcImdhc1VzZWRcIjpcIjB4NTIwOFwiLFwibG9nc1wiOltdLFwibG9nc0Jsb29tXCI6XCIweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXCIsXCJzdGF0dXNcIjpcIjB4MlwiLFwidG9cIjpcIjB4ZDZhNmJjMDg3ZDEyYWU4NjQ0OTEyNDBiZjQ1Nzg1NmM3MWQ0OGViOFwiLFwidHJhbnNhY3Rpb25IYXNoXCI6XCIweGJjODZlMTlhZTI4NTYwNjFiNGZhMzhiYmE2YWEwZTYwZDAyZTdkNTRiZTczOGRlMDg4MjQxZGY4MjBjNmVlMjRcIixcInRyYW5zYWN0aW9uSW5kZXhcIjpcIjB4MlwifSkpXG4gICAgICAgIC8vICAgLy8gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCArICcnKSlcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpXG4gICAgICAgIC8vIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBlcnInICsgZXJyKVxuICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgICB9KTtcbiAgICAvLyB9XG4gICAgXG4gICAgLy8gdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgLy8gLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgIC8vIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQocGFsb2FkOiBKc29uUnBjUGF5bG9hZCl7XG4gICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgYXdhaXQgc2xlZXAoMTAwMClcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0VHJhbnNhY3Rpb25SZWNlaXB0ICcgKyBpKVxuICAgICAgbGV0IHJldCA9ICBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBhbG9hZCk7XG4gICAgICBpZihyZXQpe1xuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlSZXF1ZXN0QWNjb3VudHMoXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLmdldEFkZHJlc3NcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBbcmV0LnJlc3VsdD8uYWRkcmVzc10pO1xuICAgICAgcmV0dXJuIFtyZXQucmVzdWx0Py5hZGRyZXNzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRyYW5zYWN0aW9uQ29uZmlnOiBUcmFuc2FjdGlvbkNvbmZpZyxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcudG8gfHwgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKC0zMjYwMiwgXCJleHBlY3RlZCB0byx2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fCB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZURlYzogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSkge1xuICAgICAgZ2FzUHJpY2VEZWMgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNQcmljZVJldCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlRGVjID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZVJldCk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZDtcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKSB7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbXG4gICAgICAgICAgdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICBcInBlbmRpbmdcIixcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZURlYykpLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIGNvbnN0IG1zZyA9IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlICsgJyBFVEhcXG4nXG4gICAgKyAn5pS25qy+5Zyw5Z2A77yaJyArIHRvICsgJ1xcbidcbiAgICArICfku5jmrL7lnLDlnYDvvJonICsgZnJvbSArICdcXG4nXG4gICAgKyAn55+/5bel6LS577yaJyArIGZlZSArICdcXG4nO1xuICAgIFxuICAgIGlmKGlzTmF0aXZlKXtcbiAgICAgIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgdGl0bGU6ICforr/pl67or7TmmI4nLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgYnV0dG9uczogWydPSycsICdDYW5jZWwnXVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgbGV0IHNpZ25hdHVyZSA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZTtcbiAgICAgIGlmICghc2lnbmF0dXJlLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWduYXR1cmUgPSBcIjB4XCIgKyBzaWduYXR1cmU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHNpZ25hdHVyZSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogc2lnbmF0dXJlLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgaXNQZXJzb25hbFNpZ246IGJvb2xlYW4sXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZCxcbiAgKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoYWRkcmVzcykpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgLTMyNjAyLFxuICAgICAgICBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiXG4gICAgICApO1xuICAgICAgY2FsbGJhY2s/LihcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiYWRkcmVzcyBpbnZhbGlkXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIixcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbFxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IFdlYjMudXRpbHMudG9VdGY4KGRhdGFUb1NpZ24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBkYXRhID0gZGF0YVRvU2lnbjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja3N1bUFkZHJlc3MgPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKGFkZHJlc3MgYXMgc3RyaW5nKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLnNpZ25NZXNzYWdlXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgaXNQZXJzb25hbFNpZ24sXG4gICAgICAgICAgc2VuZGVyOiBjaGVja3N1bUFkZHJlc3MsXG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0saXNOYXRpdmUoKSk7XG5cbiAgICAgIGxldCBzaWdSZXQgPSByZXQucmVzdWx0Py5zaWduYXR1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghc2lnUmV0LnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWdSZXQgPSBcIjB4XCIgKyBzaWdSZXQ7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgc2lnUmV0KTtcbiAgICAgIHJldHVybiBzaWdSZXQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNhbGxiYWNrPy4oZXJyb3IsIG51bGwpO1xuICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKVxufVxuXG5mdW5jdGlvbiBjYWxsSW1LZXlBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgaXNOYXRpdmUgPSBmYWxzZSkge1xuICAgIGlmKGlzTmF0aXZlKXtcbiAgICAgIGNvbnNvbGUubG9nKCduYXRpdmUyMjInKVxuICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJnKSlcbiAgICAgICAgLy8gY29uc3QgcmV0ID0gZGlhbG9nLnNob3dNZXNzYWdlQm94U3luYyh7XG4gICAgICAgIC8vICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAvLyAgIHRpdGxlOiAn6K6/6Zeu6K+05piOJyxcbiAgICAgICAgLy8gICBtZXNzYWdlOiAn5L2g5q2j5Zyo6K6/6Zeu56ys5LiJ5pa5REFQUFxcbicgKyBKU09OLnN0cmluZ2lmeShhcmcpLFxuICAgICAgICAvLyAgIGJ1dHRvbnM6IFsnT0snLCAnQ2FuY2VsJ11cbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmV0KVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGlhbG9nJylcbiAgICAgICAgLy8gaWYocmV0ID09PSAwKXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygwKVxuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnY2FsbE5hdGl2ZUFwaShhcmcpJylcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gY2FsbE5hdGl2ZUFwaShhcmcpXG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmxvZygncnBjJylcbiAgICAgIHJldHVybiBjYWxsUnBjQXBpKGFyZylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxScGNBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil7XG4gIHJldHVybiBwb3N0RGF0YShJTUtFWV9NQU5BR0VSX0VORFBPSU5ULCBhcmcpLnRoZW4oKGpzb24pID0+IHtcbiAgICBpZiAoanNvbi5lcnJvcikge1xuICAgICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FsbE5hdGl2ZUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KXtcbiAgY29uc3QganNvbiA9IGFwaXJvdXRlci5hcGkoYXJnKVxuICBpZiAoanNvbi5lcnJvcikge1xuICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBqc29uO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBvc3REYXRhKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikge1xuICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksIC8vIG11c3QgbWF0Y2ggJ0NvbnRlbnQtVHlwZScgaGVhZGVyXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIiwgLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZFxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsIC8vIGluY2x1ZGUsIHNhbWUtb3JpZ2luLCAqb21pdFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwidXNlci1hZ2VudFwiOiBcIk1vemlsbGEvNC4wIE1ETiBFeGFtcGxlXCIsXG4gICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG1ldGhvZDogXCJQT1NUXCIsIC8vICpHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBldGMuXG4gICAgbW9kZTogXCJjb3JzXCIsIC8vIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpblxuICAgIHJlZGlyZWN0OiBcImZvbGxvd1wiLCAvLyBtYW51YWwsICpmb2xsb3csIGVycm9yXG4gICAgcmVmZXJyZXI6IFwibm8tcmVmZXJyZXJcIiwgLy8gKmNsaWVudCwgbm8tcmVmZXJyZXJcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSHR0cEVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=