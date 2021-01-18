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
                _context.next = _context.t0 === "eth_getChainId" ? 4 : _context.t0 === "personal_listAccounts" ? 5 : _context.t0 === "eth_accounts" ? 5 : _context.t0 === "eth_requestAccounts" ? 5 : _context.t0 === "eth_coinbase" ? 8 : _context.t0 === "personal_sign" ? 12 : _context.t0 === "eth_signTransaction" ? 15 : _context.t0 === "eth_sendTransaction" ? 18 : _context.t0 === "eth_sign" ? 25 : _context.t0 === "eth_signTypedData" ? 25 : _context.t0 === "eth_signTypedData_v3" ? 25 : _context.t0 === "eth_signTypedData_v4" ? 25 : _context.t0 === "eth_getTransactionReceipt" ? 26 : 30;
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
                payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 29;
                return _this.requestTransactionReceipt(payload);

              case 29:
                return _context.abrupt("return", _context.sent);

              case 30:
                console.log('request default');
                _payload = {
                  jsonrpc: "2.0",
                  method: args.method,
                  params: args.params,
                  id: requestId++
                };
                _context.next = 34;
                return _this.callInnerProviderApi(_payload);

              case 34:
                return _context.abrupt("return", _context.sent);

              case 35:
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
    key: "imKeyPersonalSign",
    value: function () {
      var _imKeyPersonalSign = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, dataToSign, address, callback) {
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

      function imKeyPersonalSign(_x9, _x10, _x11, _x12) {
        return _imKeyPersonalSign.apply(this, arguments);
      }

      return imKeyPersonalSign;
    }()
  }]);
  return ImKeyProvider;
}(_eventEmitterEs["default"]);

exports["default"] = ImKeyProvider;

function sleep(_x13) {
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

function callNativeApi(_x14) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJyZXQiLCJTdHJpbmciLCJpbUtleVBlcnNvbmFsU2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmVxIiwicmF3IiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJwYXlsb2FkIiwicmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdCIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJhY2NvdW50cyIsImNoYWluSWRIZXgiLCJoZXhUb051bWJlciIsIkVycm9yIiwiZW1pdCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJwYWxvYWQiLCJpIiwic2xlZXAiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJmcm9tIiwidG9DaGVja3N1bUFkZHJlc3MiLCJnYXNQcmljZSIsImdhc1ByaWNlRGVjIiwiZ2FzUHJpY2VSZXQiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwibnVtYmVyVG9IZXgiLCJkYXRhIiwiZ2FzUmV0IiwiZmVlIiwiQmlnSW50IiwiZnJvbVdlaSIsInRlbXAiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsInZhbHVlSW5XZWkiLCJtc2ciLCJzaG93TWVzc2FnZUJveFN5bmMiLCJ0eXBlIiwidGl0bGUiLCJidXR0b25zIiwidHJhbnNhY3Rpb24iLCJwcmV2aWV3IiwicGF5bWVudCIsInJlY2VpdmVyIiwic2VuZGVyIiwic2lnbmF0dXJlIiwic3RhcnRzV2l0aCIsImRlY29kZWQiLCJybHAiLCJkZWNvZGUiLCJybHBUWCIsInR4IiwiaW5wdXQiLCJyIiwiYnl0ZXNUb0hleCIsInMiLCJ2IiwiaGFzaCIsInR4SGFzaCIsImRhdGFUb1NpZ24iLCJpc0ludGVnZXIiLCJ0b1V0ZjgiLCJjaGVja3N1bUFkZHJlc3MiLCJzaWdSZXQiLCJ0b0xvd2VyQ2FzZSIsIkV2ZW50RW1pdHRlciIsIm1zIiwic2V0VGltZW91dCIsImFyZyIsImNhbGxOYXRpdmVBcGkiLCJjYWxsUnBjQXBpIiwicG9zdERhdGEiLCJqc29uIiwiaW5jbHVkZXMiLCJhcGkiLCJ1cmwiLCJmZXRjaCIsImJvZHkiLCJjYWNoZSIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJyZXNwb25zZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRUE7O0FBQ0E7Ozs7OztBQWVBLElBQU1BLHNCQUFzQixHQUFHLGlDQUEvQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxrQkFBdkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxTQUFKO0FBQ0EsSUFB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VCxDQUFrQkksR0FBbEIsRUFBK0JsRCxJQUEvQixFQUE4RDtBQUM1RCxTQUFPbUQsS0FBSyxDQUFDRCxHQUFELEVBQU07QUFDaEJFLElBQUFBLElBQUksRUFBRTFHLElBQUksQ0FBQ0MsU0FBTCxDQUFlcUQsSUFBZixDQURVO0FBQ1k7QUFDNUJxRCxJQUFBQSxLQUFLLEVBQUUsVUFGUztBQUVHO0FBQ25CQyxJQUFBQSxXQUFXLEVBQUUsYUFIRztBQUdZO0FBQzVCN0YsSUFBQUEsT0FBTyxFQUFFO0FBQ1Asb0JBQWMseUJBRFA7QUFFUCxzQkFBZ0I7QUFGVCxLQUpPO0FBUWhCMUMsSUFBQUEsTUFBTSxFQUFFLE1BUlE7QUFRQTtBQUNoQndJLElBQUFBLElBQUksRUFBRSxNQVRVO0FBU0Y7QUFDZEMsSUFBQUEsUUFBUSxFQUFFLFFBVk07QUFVSTtBQUNwQkMsSUFBQUEsUUFBUSxFQUFFLGFBWE0sQ0FXUzs7QUFYVCxHQUFOLENBQUwsQ0FZSjVFLElBWkksQ0FZQyxVQUFDNkUsUUFBRCxFQUFjO0FBQ3BCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPRCxRQUFRLENBQUNYLElBQVQsRUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSXRFLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDtBQUNGLEdBbEJNLENBQVA7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgSnNvblJwY1BheWxvYWQsIEpzb25ScGNSZXNwb25zZSB9IGZyb20gXCJ3ZWIzLWNvcmUtaGVscGVyc1wiO1xuXG5pbXBvcnQgKiBhcyBybHAgZnJvbSBcInJscFwiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkNvbmZpZyB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnQtZW1pdHRlci1lczZcIjtcbmltcG9ydCBCTiBmcm9tIFwiYm4uanNcIjtcbmludGVyZmFjZSBJUHJvdmlkZXJPcHRpb25zIHtcbiAgcnBjVXJsPzogc3RyaW5nO1xuICBpbmZ1cmFJZD86IHN0cmluZztcbiAgY2hhaW5JZD86IG51bWJlcjtcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGFwaXJvdXRlcj86YW55O1xuICBkaWFsb2c/OmFueTtcbn1cblxuaW50ZXJmYWNlIFJlcXVlc3RBcmd1bWVudHMge1xuICBtZXRob2Q6IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuY29uc3QgSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2FwaS9pbWtleVwiO1xuY29uc3QgSU1LRVlfRVRIX1BBVEggPSBcIm0vNDQnLzYwJy8wJy8wLzBcIjtcbmxldCByZXF1ZXN0SWQgPSAwO1xubGV0IGFwaXJvdXRlcjtcbnZhciBkaWFsb2c7XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KG1ldGhvZDogc3RyaW5nLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogcmVxdWVzdElkKyssXG4gICAganNvbnJwYzogXCIyLjBcIixcbiAgICBtZXRob2QsXG4gICAgcGFyYW1zLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVKc29uUnBjUmVzcG9uc2UoaWQ6IHN0cmluZyB8IG51bWJlciwgcmVzdWx0OiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIHJlc3VsdCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJScGNFcnJvcihjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZykge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2UsXG4gICAgY29kZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKGNoYWluSWQ6IG51bWJlcikge1xuICBzd2l0Y2ggKGNoYWluSWQpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gXCJyb3BzdGVuXCI7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIFwicmlua2VieVwiO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBcImdvZXJsaVwiO1xuICAgIGNhc2UgNDI6XG4gICAgICByZXR1cm4gXCJrb3ZhblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJtYWlubmV0XCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VBcmdzTnVtKG51bTogc3RyaW5nIHwgbnVtYmVyIHwgQk4pIHtcbiAgaWYgKG51bSBpbnN0YW5jZW9mIEJOKSB7XG4gICAgcmV0dXJuIG51bS50b051bWJlcigpLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG51bSA9PT0gXCJzdHJpbmdcIiAmJiBXZWIzLnV0aWxzLmlzSGV4KG51bSkpIHtcbiAgICByZXR1cm4gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhudW0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGVzdDMzKCl7XG4gIGNvbnNvbGUubG9nKCd0ZXN0MzMnKVxuICByZXR1cm4gJ3Rlc3QzMydcbn1cblxuZnVuY3Rpb24gaXNOYXRpdmUoKXtcbiAgaWYoYXBpcm91dGVyJiZkaWFsb2cpe1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSB0cnVlJylcbiAgICByZXR1cm4gdHJ1ZVxuICB9ZWxzZXtcbiAgICBjb25zb2xlLmxvZygnaXNOYXRpdmUgZmFsc2UnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltS2V5UHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvLyBAdHMtaWdub3JlXG4gIHByaXZhdGUgaHR0cFByb3ZpZGVyOiBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXI7XG4gIHByaXZhdGUgY2hhaW5JZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogSVByb3ZpZGVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IHJwY1VybCA9IGNvbmZpZy5ycGNVcmw7XG4gICAgdGhpcy5jaGFpbklkID0gY29uZmlnLmNoYWluSWQgPz8gMTtcbiAgICBpZiAoY29uZmlnLmluZnVyYUlkKSB7XG4gICAgICBjb25zdCBuZXR3b3JrID0gY2hhaW5JZDJJbmZ1cmFOZXR3b3JrKHRoaXMuY2hhaW5JZCk7XG4gICAgICBycGNVcmwgPSBgaHR0cHM6Ly8ke25ldHdvcmt9LmluZnVyYS5pby92My8ke2NvbmZpZy5pbmZ1cmFJZH1gO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbGV0IGhlYWRlcnMgPSBudWxsO1xuICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpZHggaW4gY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKHsgbmFtZTogaWR4LCB2YWx1ZTogY29uZmlnLmhlYWRlcnNbaWR4XSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmh0dHBQcm92aWRlciA9IG5ldyBXZWIzLnByb3ZpZGVycy5IdHRwUHJvdmlkZXIocnBjVXJsLCB7XG4gICAgICBoZWFkZXJzLFxuICAgIH0pO1xuXG4gICAgYXBpcm91dGVyID0gY29uZmlnLmFwaXJvdXRlclxuICAgIGRpYWxvZyA9IGNvbmZpZy5kaWFsb2dcblxuICAgIGNvbnNvbGUubG9nKHRoaXMpXG4gIH1cblxuICBhc3luYyBjYWxsSW5uZXJQcm92aWRlckFwaShyZXE6IEpzb25ScGNQYXlsb2FkKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5odHRwUHJvdmlkZXIuc2VuZChcbiAgICAgICAgcmVxLFxuICAgICAgICAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogSnNvblJwY1Jlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoY3JlYXRlUHJvdmlkZXJScGNFcnJvcig0MDAxLCBlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LnJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlKCkge1xuICAgIGNvbnNvbGUubG9nKCdlbmFibGUnKVxuICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgY29uc3QgY2hhaW5JZEhleCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9jaGFpbklkXCIpXG4gICAgKTtcbiAgICBjb25zdCBjaGFpbklkID0gV2ViMy51dGlscy5oZXhUb051bWJlcihjaGFpbklkSGV4KTtcbiAgICBpZiAoY2hhaW5JZCAhPT0gdGhpcy5jaGFpbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFpbiBpZCBhbmQgcnBjIGVuZHBvaW50IGRvbid0IG1hdGNoXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoXCJjb25uZWN0XCIsIHsgY2hhaW5JZCB9KTtcbiAgICAgIHJldHVybiBhY2NvdW50cztcbiAgICB9XG4gIH1cblxuICBhc3luYyB0ZXN0MjIoKXtcbiAgICBjb25zb2xlLmxvZygndGVzdDIyJylcbiAgICByZXR1cm4gJzIyJ1xuICB9XG5cbiAgcmVxdWVzdDIoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PntcbiAgICBjb25zb2xlLmxvZyhhcmdzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgcmV0dXJuIHJlc29sdmUoJzB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYicpXG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0ID0gYXN5bmMgKGFyZ3M6IFJlcXVlc3RBcmd1bWVudHMpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0OlxcbicgKyBKU09OLnN0cmluZ2lmeShhcmdzKSlcbiAgICBzd2l0Y2ggKGFyZ3MubWV0aG9kKSB7XG4gICAgICBjYXNlIFwiZXRoX2dldENoYWluSWRcIjoge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbklkO1xuICAgICAgfVxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9saXN0QWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX2FjY291bnRzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX2NvaW5iYXNlXCI6IHtcbiAgICAgICAgbGV0IHJldCA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgICByZXR1cm4gU3RyaW5nKHJldFswXSlcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJwZXJzb25hbF9zaWduXCI6IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW1LZXlQZXJzb25hbFNpZ24oXG4gICAgICAgICAgcmVxdWVzdElkKyssXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzBdLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVsxXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zaWduVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihyZXF1ZXN0SWQrKywgYXJncy5wYXJhbXMhWzBdKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfc2VuZFRyYW5zYWN0aW9uXCI6IHtcbiAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVxID0gY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfc2VuZFJhd1RyYW5zYWN0aW9uXCIsIFtyZXQucmF3XSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcSk7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduXCI6XG4gICAgICAvLyBodHRwczovL2RvY3MubWV0YW1hc2suaW8vZ3VpZGUvc2lnbmluZy1kYXRhLmh0bWwjYS1icmllZi1oaXN0b3J5XG4gICAgICAvL1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YVwiOlxuICAgICAgLy8gY2FzZSAnZXRoX3NpZ25UeXBlZERhdGFfdjEnOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92M1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfc2lnblR5cGVkRGF0YV92NFwiOiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIDQyMDAsXG4gICAgICAgICAgYCR7YXJncy5tZXRob2R9IGlzIG5vdCBzdXBwb3J0IG5vd2BcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0XCI6IHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQocGF5bG9hZClcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZGVmYXVsdCcpXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgICBtZXRob2Q6IGFyZ3MubWV0aG9kLFxuICAgICAgICAgIHBhcmFtczogYXJncy5wYXJhbXMsXG4gICAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShwYXlsb2FkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQXN5bmMoXG4gICAgYXJnczogSnNvblJwY1BheWxvYWQsXG4gICAgY2FsbGJhY2s6IChlcnI6IEVycm9yIHwgbnVsbCwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgY29uc29sZS5sb2coJ3NlbmRBc3luYzpcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgIC8vIGlmKGFyZ3MubWV0aG9kICE9PSAnZXRoX2NhbGwnICYmIGFyZ3MubWV0aG9kICE9PSAnZXRoX2FjY291bnRzJyl7XG4gICAgLy8gICBjb25zb2xlLmxvZygncmV0dXJuICcgKyBhcmdzLm1ldGhvZClcbiAgICAvLyAgIHJldHVyblxuICAgIC8vIH1cbiAgICAvLyBpZihhcmdzLm1ldGhvZCA9PT0gJ2V0aF9jb2luYmFzZScpe1xuICAgIC8vICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsICcweDQwN2Q3M2Q4YTQ5ZWViODVkMzJjZjQ2NTUwN2RkNzFkNTA3MTAwYzEnKSlcbiAgICAvLyB9ZWxzZXtcbiAgICAgIHRoaXMucmVxdWVzdChhcmdzKVxuICAgICAgLnRoZW4oKHJldCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCByZXQ6JyArIHJldCArICcgbWV0aG9kOicgKyBhcmdzLm1ldGhvZClcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmV0KSlcbiAgICAgICAgLy8gaWYoYXJncy5tZXRob2QgPT09ICdldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0Jyl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2RpZmYgcmV0OicgKyB0eXBlb2YgcmV0KVxuICAgICAgICAgIFxuICAgICAgICAvLyAgIGNhbGxiYWNrKG51bGwsIGNyZWF0ZUpzb25ScGNSZXNwb25zZShhcmdzLmlkLCB7XCJibG9ja0hhc2hcIjpcIjB4MDllNWQ0NTE1OGU3MWE2YzA3YWMxMDE0MmMzYWJmYjI0MDc4ZGU4MzhiZjhkM2I1YjY2NDFmYWM2N2Y0MjY4NFwiLFwiYmxvY2tOdW1iZXJcIjpcIjB4MTVmNTZlNFwiLFwiY29udHJhY3RBZGRyZXNzXCI6bnVsbCxcImN1bXVsYXRpdmVHYXNVc2VkXCI6XCIweGI2NGI1XCIsXCJmcm9tXCI6XCIweDYwMzE1NjRlN2IyZjVjYzMzNzM3ODA3YjJlNThkYWZmODcwYjU5MGJcIixcImdhc1VzZWRcIjpcIjB4NTIwOFwiLFwibG9nc1wiOltdLFwibG9nc0Jsb29tXCI6XCIweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwXCIsXCJzdGF0dXNcIjpcIjB4MlwiLFwidG9cIjpcIjB4ZDZhNmJjMDg3ZDEyYWU4NjQ0OTEyNDBiZjQ1Nzg1NmM3MWQ0OGViOFwiLFwidHJhbnNhY3Rpb25IYXNoXCI6XCIweGJjODZlMTlhZTI4NTYwNjFiNGZhMzhiYmE2YWEwZTYwZDAyZTdkNTRiZTczOGRlMDg4MjQxZGY4MjBjNmVlMjRcIixcInRyYW5zYWN0aW9uSW5kZXhcIjpcIjB4MlwifSkpXG4gICAgICAgIC8vICAgLy8gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCArICcnKSlcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpXG4gICAgICAgIC8vIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBlcnInICsgZXJyKVxuICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgICB9KTtcbiAgICAvLyB9XG4gICAgXG4gICAgLy8gdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgLy8gLnRoZW4oKHJldCkgPT4gY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHJldCkpKVxuICAgIC8vIC5jYXRjaCgoZXJyKSA9PiBjYWxsYmFjayhlcnIsIG51bGwpKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQocGFsb2FkOiBKc29uUnBjUGF5bG9hZCl7XG4gICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspe1xuICAgICAgYXdhaXQgc2xlZXAoMTAwMClcbiAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0VHJhbnNhY3Rpb25SZWNlaXB0ICcgKyBpKVxuICAgICAgbGV0IHJldCA9ICBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBhbG9hZCk7XG4gICAgICBpZihyZXQpe1xuICAgICAgICByZXR1cm4gcmV0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW1LZXlSZXF1ZXN0QWNjb3VudHMoXG4gICAgaWQ6IHN0cmluZyB8IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBhd2FpdCBjYWxsSW1LZXlBcGkoe1xuICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICBtZXRob2Q6IFwiZXRoLmdldEFkZHJlc3NcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgY2FsbGJhY2s/LihudWxsLCBbcmV0LnJlc3VsdD8uYWRkcmVzc10pO1xuICAgICAgcmV0dXJuIFtyZXQucmVzdWx0Py5hZGRyZXNzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVNpZ25UcmFuc2FjdGlvbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIHRyYW5zYWN0aW9uQ29uZmlnOiBUcmFuc2FjdGlvbkNvbmZpZyxcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcudG8gfHwgIXRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKSB7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKC0zMjYwMiwgXCJleHBlY3RlZCB0byx2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvL2Zyb21cbiAgICBsZXQgZnJvbTogc3RyaW5nO1xuICAgIGlmICghdHJhbnNhY3Rpb25Db25maWcuZnJvbSB8fCB0eXBlb2YgdHJhbnNhY3Rpb25Db25maWcuZnJvbSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIGZyb20gPSBhY2NvdW50c1swXSBhcyBzdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20gPSBXZWIzLnV0aWxzLnRvQ2hlY2tzdW1BZGRyZXNzKHRyYW5zYWN0aW9uQ29uZmlnLmZyb20gYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvL2dhcyBwcmljZVxuICAgIGxldCBnYXNQcmljZURlYzogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSkge1xuICAgICAgZ2FzUHJpY2VEZWMgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcuZ2FzUHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNQcmljZVJldCA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2dhc1ByaWNlXCIsIFtdKVxuICAgICAgKTtcbiAgICAgIGdhc1ByaWNlRGVjID0gV2ViMy51dGlscy5oZXhUb051bWJlclN0cmluZyhnYXNQcmljZVJldCk7XG4gICAgfVxuXG4gICAgLy9jaGFpbiBpZFxuICAgIGxldCBjaGFpbklkOiBudW1iZXI7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlUHJvdmlkZXJScGNFcnJvcihcbiAgICAgICAgICAtMzI2MDIsXG4gICAgICAgICAgXCJleHBlY3RlZCBjaGFpbklkIGFuZCBjb25uZWN0ZWQgY2hhaW5JZCBhcmUgbWlzbWF0Y2hlZFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjaGFpbklkID0gdHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhaW5JZCA9IHRoaXMuY2hhaW5JZDtcbiAgICB9XG5cbiAgICAvL25vbmNlXG4gICAgbGV0IG5vbmNlOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKSB7XG4gICAgICBub25jZSA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5ub25jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vbmNlID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2V0VHJhbnNhY3Rpb25Db3VudFwiLCBbXG4gICAgICAgICAgdHJhbnNhY3Rpb25Db25maWcuZnJvbSxcbiAgICAgICAgICBcInBlbmRpbmdcIixcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBub25jZSA9IFdlYjMudXRpbHMuaGV4VG9OdW1iZXIobm9uY2UpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9lc3RpbWF0ZSBnYXNcbiAgICBsZXQgZ2FzTGltaXQ6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuZ2FzKSB7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnYXNSZXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkoXG4gICAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2VzdGltYXRlR2FzXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmcm9tOiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uQ29uZmlnLnRvLFxuICAgICAgICAgICAgZ2FzOiB0cmFuc2FjdGlvbkNvbmZpZy5nYXMsXG4gICAgICAgICAgICBnYXNQcmljZTogV2ViMy51dGlscy5udW1iZXJUb0hleChnYXNQcmljZURlYyksXG4gICAgICAgICAgICB2YWx1ZTogdHJhbnNhY3Rpb25Db25maWcudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApO1xuICAgICAgZ2FzTGltaXQgPSBwYXJzZUFyZ3NOdW0oZ2FzUmV0KTtcbiAgICB9XG5cbiAgICAvL2ZlZVxuICAgIGxldCBmZWUgPSAoQmlnSW50KGdhc0xpbWl0KSAqIEJpZ0ludChnYXNQcmljZURlYykpLnRvU3RyaW5nKCk7IC8vd2VpXG4gICAgZmVlID0gV2ViMy51dGlscy5mcm9tV2VpKGZlZSwgXCJHd2VpXCIpOyAvL3RvIEd3ZWlcbiAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKE51bWJlcihmZWUpKTtcbiAgICBmZWUgPSAodGVtcCAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKCk7IC8vdG8gZXRoZXJcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlKSArIFwiIGV0aGVyXCI7XG5cbiAgICBjb25zdCB0byA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcudG8pO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlKTtcbiAgICBjb25zdCB2YWx1ZUluV2VpID0gV2ViMy51dGlscy5mcm9tV2VpKHZhbHVlKTtcblxuICAgIGNvbnN0IG1zZyA9IHRyYW5zYWN0aW9uQ29uZmlnLnZhbHVlICsgJyBFVEhcXG4nXG4gICAgKyAn5pS25qy+5Zyw5Z2A77yaJyArIHRvICsgJ1xcbidcbiAgICArICfku5jmrL7lnLDlnYDvvJonICsgZnJvbSArICdcXG4nXG4gICAgKyAn55+/5bel6LS577yaJyArIGZlZSArICdcXG4nO1xuICAgIFxuICAgIGlmKGlzTmF0aXZlKXtcbiAgICAgIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgdGl0bGU6ICforr/pl67or7TmmI4nLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgYnV0dG9uczogWydPSycsICdDYW5jZWwnXVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgICBnYXNMaW1pdCxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZURlYyxcbiAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGNoYWluSWQsXG4gICAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIHBheW1lbnQ6IHZhbHVlSW5XZWkgKyBcIiBFVEhcIixcbiAgICAgICAgICAgIHJlY2VpdmVyOiB0byxcbiAgICAgICAgICAgIHNlbmRlcjogZnJvbSxcbiAgICAgICAgICAgIGZlZTogZmVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgIH0sIGlzTmF0aXZlKCkpO1xuICAgICAgbGV0IHNpZ25hdHVyZSA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZTtcbiAgICAgIGlmICghc2lnbmF0dXJlLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgICAgICBzaWduYXR1cmUgPSBcIjB4XCIgKyBzaWduYXR1cmU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZWQgPSBybHAuZGVjb2RlKHNpZ25hdHVyZSwgdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHJscFRYOiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgIHJhdzogc2lnbmF0dXJlLFxuICAgICAgICB0eDoge1xuICAgICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgZ2FzOiBnYXNMaW1pdCxcbiAgICAgICAgICB0bzogdG8sXG4gICAgICAgICAgdmFsdWU6IHZhbHVlSW5XZWksXG4gICAgICAgICAgaW5wdXQ6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHI6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbN10pLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzhdKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdjogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs2XSksXG4gICAgICAgICAgaGFzaDogcmV0LnJlc3VsdD8udHhIYXNoLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNhbGxiYWNrPy4obnVsbCwgcmxwVFgpO1xuICAgICAgcmV0dXJuIHJscFRYO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5UGVyc29uYWxTaWduKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgZGF0YVRvU2lnbjogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZyB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86IChlcnJvcjogRXJyb3IsIHJldDogYW55KSA9PiB2b2lkXG4gICkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGFkZHJlc3MpKSB7XG4gICAgICBjb25zdCBlcnJvciA9IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgIC0zMjYwMixcbiAgICAgICAgXCJQYXNzIHRoZSBhZGRyZXNzIHRvIHNpZ24gZGF0YSB3aXRoIGZvciBub3dcIlxuICAgICAgKTtcbiAgICAgIGNhbGxiYWNrPy4oXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImFkZHJlc3MgaW52YWxpZFwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCIsXG4gICAgICAgIH0sXG4gICAgICAgIG51bGxcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBXZWIzLnV0aWxzLnRvVXRmOChkYXRhVG9TaWduKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZGF0YSA9IGRhdGFUb1NpZ247XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tzdW1BZGRyZXNzID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyhhZGRyZXNzIGFzIHN0cmluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmV0ID0gYXdhaXQgY2FsbEltS2V5QXBpKHtcbiAgICAgICAganNvbnJwYzogXCIyLjBcIixcbiAgICAgICAgbWV0aG9kOiBcImV0aC5zaWduTWVzc2FnZVwiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgIHNlbmRlcjogY2hlY2tzdW1BZGRyZXNzLFxuICAgICAgICAgIHBhdGg6IElNS0VZX0VUSF9QQVRILFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LGlzTmF0aXZlKCkpO1xuXG4gICAgICBsZXQgc2lnUmV0ID0gcmV0LnJlc3VsdD8uc2lnbmF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIXNpZ1JldC5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnUmV0ID0gXCIweFwiICsgc2lnUmV0O1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHNpZ1JldCk7XG4gICAgICByZXR1cm4gc2lnUmV0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSlcbn1cblxuZnVuY3Rpb24gY2FsbEltS2V5QXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGlzTmF0aXZlID0gZmFsc2UpIHtcbiAgICBpZihpc05hdGl2ZSl7XG4gICAgICBjb25zb2xlLmxvZygnbmF0aXZlMjIyJylcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZykpXG4gICAgICAgIC8vIGNvbnN0IHJldCA9IGRpYWxvZy5zaG93TWVzc2FnZUJveFN5bmMoe1xuICAgICAgICAvLyAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgLy8gICB0aXRsZTogJ+iuv+mXruivtOaYjicsXG4gICAgICAgIC8vICAgbWVzc2FnZTogJ+S9oOato+WcqOiuv+mXruesrOS4ieaWuURBUFBcXG4nICsgSlNPTi5zdHJpbmdpZnkoYXJnKSxcbiAgICAgICAgLy8gICBidXR0b25zOiBbJ09LJywgJ0NhbmNlbCddXG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJldClcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RpYWxvZycpXG4gICAgICAgIC8vIGlmKHJldCA9PT0gMCl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coMClcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coJ2NhbGxOYXRpdmVBcGkoYXJnKScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIGNhbGxOYXRpdmVBcGkoYXJnKVxuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coJ3JwYycpXG4gICAgICByZXR1cm4gY2FsbFJwY0FwaShhcmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYWxsUnBjQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICByZXR1cm4gcG9zdERhdGEoSU1LRVlfTUFOQUdFUl9FTkRQT0lOVCwgYXJnKS50aGVuKChqc29uKSA9PiB7XG4gICAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICAgIGlmIChqc29uLmVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJJbWtleVVzZXJOb3RDb25maXJtZWRcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGpzb24uZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH1cbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGxOYXRpdmVBcGkoYXJnOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPil7XG4gIGNvbnN0IGpzb24gPSBhcGlyb3V0ZXIuYXBpKGFyZylcbiAgaWYgKGpzb24uZXJyb3IpIHtcbiAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VyIG5vdCBjb25maXJtZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb3N0RGF0YSh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCAvLyBtdXN0IG1hdGNoICdDb250ZW50LVR5cGUnIGhlYWRlclxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWRcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLCAvLyBpbmNsdWRlLCBzYW1lLW9yaWdpbiwgKm9taXRcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcInVzZXItYWdlbnRcIjogXCJNb3ppbGxhLzQuMCBNRE4gRXhhbXBsZVwiLFxuICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfSxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLCAvLyAqR0VULCBQT1NULCBQVVQsIERFTEVURSwgZXRjLlxuICAgIG1vZGU6IFwiY29yc1wiLCAvLyBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW5cbiAgICByZWRpcmVjdDogXCJmb2xsb3dcIiwgLy8gbWFudWFsLCAqZm9sbG93LCBlcnJvclxuICAgIHJlZmVycmVyOiBcIm5vLXJlZmVycmVyXCIsIC8vICpjbGllbnQsIG5vLXJlZmVycmVyXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBFcnJvclwiKTtcbiAgICB9XG4gIH0pO1xufVxuIl19