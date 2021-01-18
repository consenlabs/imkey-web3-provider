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
        var from, accounts, gasPriceDec, gasPriceRet, chainId, nonce, gasLimit, gasRet, fee, temp, to, value, valueInWei, _ret5$result, _ret5$result2, _ret5, signature, decoded, rlpTX;

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
                _context7.prev = 49;
                _context7.next = 52;
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
                _ret5 = _context7.sent;
                signature = (_ret5$result = _ret5.result) === null || _ret5$result === void 0 ? void 0 : _ret5$result.signature;

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
                    hash: (_ret5$result2 = _ret5.result) === null || _ret5$result2 === void 0 ? void 0 : _ret5$result2.txHash
                  }
                };
                callback === null || callback === void 0 ? void 0 : callback(null, rlpTX);
                return _context7.abrupt("return", rlpTX);

              case 61:
                _context7.prev = 61;
                _context7.t0 = _context7["catch"](49);
                callback === null || callback === void 0 ? void 0 : callback(_context7.t0, null);
                throw createProviderRpcError(4001, _context7.t0);

              case 65:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[49, 61]]);
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
        var _error, data, checksumAddress, _ret6$result, _ret6, sigRet;

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
                _ret6 = _context8.sent;
                sigRet = (_ret6$result = _ret6.result) === null || _ret6$result === void 0 ? void 0 : _ret6$result.signature.toLowerCase();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJTUtFWV9NQU5BR0VSX0VORFBPSU5UIiwiSU1LRVlfRVRIX1BBVEgiLCJyZXF1ZXN0SWQiLCJhcGlyb3V0ZXIiLCJkaWFsb2ciLCJjcmVhdGVKc29uUnBjUmVxdWVzdCIsIm1ldGhvZCIsInBhcmFtcyIsImlkIiwianNvbnJwYyIsImNyZWF0ZUpzb25ScGNSZXNwb25zZSIsInJlc3VsdCIsImNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IiLCJjb2RlIiwibWVzc2FnZSIsImNoYWluSWQySW5mdXJhTmV0d29yayIsImNoYWluSWQiLCJwYXJzZUFyZ3NOdW0iLCJudW0iLCJCTiIsInRvTnVtYmVyIiwidG9TdHJpbmciLCJXZWIzIiwidXRpbHMiLCJpc0hleCIsImhleFRvTnVtYmVyU3RyaW5nIiwidGVzdDMzIiwiY29uc29sZSIsImxvZyIsImlzTmF0aXZlIiwiSW1LZXlQcm92aWRlciIsImNvbmZpZyIsImFyZ3MiLCJKU09OIiwic3RyaW5naWZ5IiwiaW1LZXlSZXF1ZXN0QWNjb3VudHMiLCJyZXQiLCJTdHJpbmciLCJpbUtleVBlcnNvbmFsU2lnbiIsImltS2V5U2lnblRyYW5zYWN0aW9uIiwicmVxIiwicmF3IiwiY2FsbElubmVyUHJvdmlkZXJBcGkiLCJwYXlsb2FkIiwicmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdCIsInJwY1VybCIsImluZnVyYUlkIiwibmV0d29yayIsImhlYWRlcnMiLCJpZHgiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwiaHR0cFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZW5kIiwiZXJyb3IiLCJhY2NvdW50cyIsImNoYWluSWRIZXgiLCJoZXhUb051bWJlciIsIkVycm9yIiwiZW1pdCIsImNhbGxiYWNrIiwicmVxdWVzdCIsInRoZW4iLCJlcnIiLCJwYWxvYWQiLCJpIiwic2xlZXAiLCJjYWxsSW1LZXlBcGkiLCJwYXRoIiwiYWRkcmVzcyIsInRyYW5zYWN0aW9uQ29uZmlnIiwidG8iLCJmcm9tIiwidG9DaGVja3N1bUFkZHJlc3MiLCJnYXNQcmljZSIsImdhc1ByaWNlRGVjIiwiZ2FzUHJpY2VSZXQiLCJub25jZSIsImdhcyIsImdhc0xpbWl0IiwibnVtYmVyVG9IZXgiLCJkYXRhIiwiZ2FzUmV0IiwiZmVlIiwiQmlnSW50IiwiZnJvbVdlaSIsInRlbXAiLCJNYXRoIiwiY2VpbCIsIk51bWJlciIsInZhbHVlSW5XZWkiLCJ0cmFuc2FjdGlvbiIsInByZXZpZXciLCJwYXltZW50IiwicmVjZWl2ZXIiLCJzZW5kZXIiLCJzaWduYXR1cmUiLCJzdGFydHNXaXRoIiwiZGVjb2RlZCIsInJscCIsImRlY29kZSIsInJscFRYIiwidHgiLCJpbnB1dCIsInIiLCJieXRlc1RvSGV4IiwicyIsInYiLCJoYXNoIiwidHhIYXNoIiwiZGF0YVRvU2lnbiIsImlzSW50ZWdlciIsInRvVXRmOCIsImNoZWNrc3VtQWRkcmVzcyIsInNpZ1JldCIsInRvTG93ZXJDYXNlIiwiRXZlbnRFbWl0dGVyIiwibXMiLCJzZXRUaW1lb3V0IiwiYXJnIiwiY2FsbE5hdGl2ZUFwaSIsImNhbGxScGNBcGkiLCJwb3N0RGF0YSIsImpzb24iLCJpbmNsdWRlcyIsImFwaSIsInVybCIsImZldGNoIiwiYm9keSIsImNhY2hlIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVkaXJlY3QiLCJyZWZlcnJlciIsInJlc3BvbnNlIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFFQTs7QUFDQTs7Ozs7O0FBZUEsSUFBTUEsc0JBQXNCLEdBQUcsaUNBQS9CO0FBQ0EsSUFBTUMsY0FBYyxHQUFHLGtCQUF2QjtBQUNBLElBQUlDLFNBQVMsR0FBRyxDQUFoQjtBQUNBLElBQUlDLFNBQUo7QUFDQSxJQUFJQyxNQUFKOztBQUVBLFNBQVNDLG9CQUFULENBQThCQyxNQUE5QixFQUFrRTtBQUFBLE1B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QUFELEVBQWM7QUFDcEIsUUFBSUEsUUFBUSxDQUFDQyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGFBQU9ELFFBQVEsQ0FBQ1gsSUFBVCxFQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBTSxJQUFJakUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNEO0FBQ0YsR0FsQk0sQ0FBUDtBQW1CRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgeyBKc29uUnBjUGF5bG9hZCwgSnNvblJwY1Jlc3BvbnNlIH0gZnJvbSBcIndlYjMtY29yZS1oZWxwZXJzXCI7XG5cbmltcG9ydCAqIGFzIHJscCBmcm9tIFwicmxwXCI7XG5pbXBvcnQgeyBSTFBFbmNvZGVkVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uQ29uZmlnIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudC1lbWl0dGVyLWVzNlwiO1xuaW1wb3J0IEJOIGZyb20gXCJibi5qc1wiO1xuaW50ZXJmYWNlIElQcm92aWRlck9wdGlvbnMge1xuICBycGNVcmw/OiBzdHJpbmc7XG4gIGluZnVyYUlkPzogc3RyaW5nO1xuICBjaGFpbklkPzogbnVtYmVyO1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgYXBpcm91dGVyPzphbnk7XG4gIGRpYWxvZz86YW55O1xufVxuXG5pbnRlcmZhY2UgUmVxdWVzdEFyZ3VtZW50cyB7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5jb25zdCBJTUtFWV9NQU5BR0VSX0VORFBPSU5UID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODEvYXBpL2lta2V5XCI7XG5jb25zdCBJTUtFWV9FVEhfUEFUSCA9IFwibS80NCcvNjAnLzAnLzAvMFwiO1xubGV0IHJlcXVlc3RJZCA9IDA7XG5sZXQgYXBpcm91dGVyO1xudmFyIGRpYWxvZztcblxuZnVuY3Rpb24gY3JlYXRlSnNvblJwY1JlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4ge1xuICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgIG1ldGhvZCxcbiAgICBwYXJhbXMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUpzb25ScGNSZXNwb25zZShpZDogc3RyaW5nIHwgbnVtYmVyLCByZXN1bHQ6IGFueSkge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgcmVzdWx0LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlclJwY0Vycm9yKGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nKSB7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZSxcbiAgICBjb2RlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFpbklkMkluZnVyYU5ldHdvcmsoY2hhaW5JZDogbnVtYmVyKSB7XG4gIHN3aXRjaCAoY2hhaW5JZCkge1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBcInJvcHN0ZW5cIjtcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gXCJyaW5rZWJ5XCI7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIFwiZ29lcmxpXCI7XG4gICAgY2FzZSA0MjpcbiAgICAgIHJldHVybiBcImtvdmFuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcIm1haW5uZXRcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUFyZ3NOdW0obnVtOiBzdHJpbmcgfCBudW1iZXIgfCBCTikge1xuICBpZiAobnVtIGluc3RhbmNlb2YgQk4pIHtcbiAgICByZXR1cm4gbnVtLnRvTnVtYmVyKCkudG9TdHJpbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiICYmIFdlYjMudXRpbHMuaXNIZXgobnVtKSkge1xuICAgIHJldHVybiBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKG51bSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bS50b1N0cmluZygpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0MzMoKXtcbiAgY29uc29sZS5sb2coJ3Rlc3QzMycpXG4gIHJldHVybiAndGVzdDMzJ1xufVxuXG5mdW5jdGlvbiBpc05hdGl2ZSgpe1xuICBpZihhcGlyb3V0ZXImJmRpYWxvZyl7XG4gICAgY29uc29sZS5sb2coJ2lzTmF0aXZlIHRydWUnKVxuICAgIHJldHVybiB0cnVlXG4gIH1lbHNle1xuICAgIGNvbnNvbGUubG9nKCdpc05hdGl2ZSBmYWxzZScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcHJpdmF0ZSBodHRwUHJvdmlkZXI6IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcjtcbiAgcHJpdmF0ZSBjaGFpbklkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBJUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgcnBjVXJsID0gY29uZmlnLnJwY1VybDtcbiAgICB0aGlzLmNoYWluSWQgPSBjb25maWcuY2hhaW5JZCA/PyAxO1xuICAgIGlmIChjb25maWcuaW5mdXJhSWQpIHtcbiAgICAgIGNvbnN0IG5ldHdvcmsgPSBjaGFpbklkMkluZnVyYU5ldHdvcmsodGhpcy5jaGFpbklkKTtcbiAgICAgIHJwY1VybCA9IGBodHRwczovLyR7bmV0d29ya30uaW5mdXJhLmlvL3YzLyR7Y29uZmlnLmluZnVyYUlkfWA7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBsZXQgaGVhZGVycyA9IG51bGw7XG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGlkeCBpbiBjb25maWcuaGVhZGVycykge1xuICAgICAgICBoZWFkZXJzLnB1c2goeyBuYW1lOiBpZHgsIHZhbHVlOiBjb25maWcuaGVhZGVyc1tpZHhdIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHR0cFByb3ZpZGVyID0gbmV3IFdlYjMucHJvdmlkZXJzLkh0dHBQcm92aWRlcihycGNVcmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgfSk7XG5cbiAgICBhcGlyb3V0ZXIgPSBjb25maWcuYXBpcm91dGVyXG4gICAgZGlhbG9nID0gY29uZmlnLmRpYWxvZ1xuXG4gICAgY29uc29sZS5sb2codGhpcylcbiAgfVxuXG4gIGFzeW5jIGNhbGxJbm5lclByb3ZpZGVyQXBpKHJlcTogSnNvblJwY1BheWxvYWQpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmh0dHBQcm92aWRlci5zZW5kKFxuICAgICAgICByZXEsXG4gICAgICAgIChlcnJvcjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiBKc29uUnBjUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBlbmFibGUoKSB7XG4gICAgY29uc29sZS5sb2coJ2VuYWJsZScpXG4gICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICBjb25zdCBjaGFpbklkSGV4ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgIGNyZWF0ZUpzb25ScGNSZXF1ZXN0KFwiZXRoX2NoYWluSWRcIilcbiAgICApO1xuICAgIGNvbnN0IGNoYWluSWQgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyKGNoYWluSWRIZXgpO1xuICAgIGlmIChjaGFpbklkICE9PSB0aGlzLmNoYWluSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNoYWluIGlkIGFuZCBycGMgZW5kcG9pbnQgZG9uJ3QgbWF0Y2hcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChcImNvbm5lY3RcIiwgeyBjaGFpbklkIH0pO1xuICAgICAgcmV0dXJuIGFjY291bnRzO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRlc3QyMigpe1xuICAgIGNvbnNvbGUubG9nKCd0ZXN0MjInKVxuICAgIHJldHVybiAnMjInXG4gIH1cblxuICByZXF1ZXN0MihhcmdzOiBSZXF1ZXN0QXJndW1lbnRzKTogUHJvbWlzZTxhbnk+e1xuICAgIGNvbnNvbGUubG9nKGFyZ3MpXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgnMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiJylcbiAgICB9KTtcbiAgfVxuXG4gIHJlcXVlc3QgPSBhc3luYyAoYXJnczogUmVxdWVzdEFyZ3VtZW50cyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc29sZS5sb2coJ3JlcXVlc3Q6XFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKVxuICAgIHN3aXRjaCAoYXJncy5tZXRob2QpIHtcbiAgICAgIGNhc2UgXCJldGhfZ2V0Q2hhaW5JZFwiOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluSWQ7XG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcInBlcnNvbmFsX2xpc3RBY2NvdW50c1wiOlxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIGNhc2UgXCJldGhfYWNjb3VudHNcIjpcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5UmVxdWVzdEFjY291bnRzKHJlcXVlc3RJZCsrKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgXCJldGhfY29pbmJhc2VcIjoge1xuICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5pbUtleVJlcXVlc3RBY2NvdW50cyhyZXF1ZXN0SWQrKyk7XG4gICAgICAgIHJldHVybiBTdHJpbmcocmV0WzBdKVxuICAgICAgfVxuICAgICAgY2FzZSBcInBlcnNvbmFsX3NpZ25cIjoge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbUtleVBlcnNvbmFsU2lnbihcbiAgICAgICAgICByZXF1ZXN0SWQrKyxcbiAgICAgICAgICBhcmdzLnBhcmFtcyFbMF0sXG4gICAgICAgICAgYXJncy5wYXJhbXMhWzFdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlIFwiZXRoX3NpZ25UcmFuc2FjdGlvblwiOiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKHJlcXVlc3RJZCsrLCBhcmdzLnBhcmFtcyFbMF0pO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9zZW5kVHJhbnNhY3Rpb25cIjoge1xuICAgICAgICBjb25zdCByZXQgPSBhd2FpdCB0aGlzLmltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgICAgICAgIHJlcXVlc3RJZCsrLFxuICAgICAgICAgIGFyZ3MucGFyYW1zIVswXVxuICAgICAgICApO1xuICAgICAgICBjb25zdCByZXEgPSBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9zZW5kUmF3VHJhbnNhY3Rpb25cIiwgW3JldC5yYXddKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocmVxKTtcbiAgICAgIH1cbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWZhbGx0aHJvdWdoICovXG4gICAgICBjYXNlIFwiZXRoX3NpZ25cIjpcbiAgICAgIC8vIGh0dHBzOi8vZG9jcy5tZXRhbWFzay5pby9ndWlkZS9zaWduaW5nLWRhdGEuaHRtbCNhLWJyaWVmLWhpc3RvcnlcbiAgICAgIC8vXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhXCI6XG4gICAgICAvLyBjYXNlICdldGhfc2lnblR5cGVkRGF0YV92MSc6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3YzXCI6XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1mYWxsdGhyb3VnaCAqL1xuICAgICAgY2FzZSBcImV0aF9zaWduVHlwZWREYXRhX3Y0XCI6IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoXG4gICAgICAgICAgNDIwMCxcbiAgICAgICAgICBgJHthcmdzLm1ldGhvZH0gaXMgbm90IHN1cHBvcnQgbm93YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSBcImV0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHRcIjoge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgICAgbWV0aG9kOiBhcmdzLm1ldGhvZCxcbiAgICAgICAgICBwYXJhbXM6IGFyZ3MucGFyYW1zLFxuICAgICAgICAgIGlkOiByZXF1ZXN0SWQrKyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdChwYXlsb2FkKVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdCBkZWZhdWx0JylcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBqc29ucnBjOiBcIjIuMFwiLFxuICAgICAgICAgIG1ldGhvZDogYXJncy5tZXRob2QsXG4gICAgICAgICAgcGFyYW1zOiBhcmdzLnBhcmFtcyxcbiAgICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKHBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBc3luYyhcbiAgICBhcmdzOiBKc29uUnBjUGF5bG9hZCxcbiAgICBjYWxsYmFjazogKGVycjogRXJyb3IgfCBudWxsLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnc2VuZEFzeW5jOlxcbicgKyBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgLy8gaWYoYXJncy5tZXRob2QgIT09ICdldGhfY2FsbCcgJiYgYXJncy5tZXRob2QgIT09ICdldGhfYWNjb3VudHMnKXtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdyZXR1cm4gJyArIGFyZ3MubWV0aG9kKVxuICAgIC8vICAgcmV0dXJuXG4gICAgLy8gfVxuICAgIC8vIGlmKGFyZ3MubWV0aG9kID09PSAnZXRoX2NvaW5iYXNlJyl7XG4gICAgLy8gICBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgJzB4NDA3ZDczZDhhNDllZWI4NWQzMmNmNDY1NTA3ZGQ3MWQ1MDcxMDBjMScpKVxuICAgIC8vIH1lbHNle1xuICAgICAgdGhpcy5yZXF1ZXN0KGFyZ3MpXG4gICAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IHJldDonICsgcmV0ICsgJyBtZXRob2Q6JyArIGFyZ3MubWV0aG9kKVxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXQpKVxuICAgICAgICAvLyBpZihhcmdzLm1ldGhvZCA9PT0gJ2V0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQnKXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnZGlmZiByZXQ6JyArIHR5cGVvZiByZXQpXG4gICAgICAgICAgXG4gICAgICAgIC8vICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlSnNvblJwY1Jlc3BvbnNlKGFyZ3MuaWQsIHtcImJsb2NrSGFzaFwiOlwiMHgwOWU1ZDQ1MTU4ZTcxYTZjMDdhYzEwMTQyYzNhYmZiMjQwNzhkZTgzOGJmOGQzYjViNjY0MWZhYzY3ZjQyNjg0XCIsXCJibG9ja051bWJlclwiOlwiMHgxNWY1NmU0XCIsXCJjb250cmFjdEFkZHJlc3NcIjpudWxsLFwiY3VtdWxhdGl2ZUdhc1VzZWRcIjpcIjB4YjY0YjVcIixcImZyb21cIjpcIjB4NjAzMTU2NGU3YjJmNWNjMzM3Mzc4MDdiMmU1OGRhZmY4NzBiNTkwYlwiLFwiZ2FzVXNlZFwiOlwiMHg1MjA4XCIsXCJsb2dzXCI6W10sXCJsb2dzQmxvb21cIjpcIjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBcIixcInN0YXR1c1wiOlwiMHgyXCIsXCJ0b1wiOlwiMHhkNmE2YmMwODdkMTJhZTg2NDQ5MTI0MGJmNDU3ODU2YzcxZDQ4ZWI4XCIsXCJ0cmFuc2FjdGlvbkhhc2hcIjpcIjB4YmM4NmUxOWFlMjg1NjA2MWI0ZmEzOGJiYTZhYTBlNjBkMDJlN2Q1NGJlNzM4ZGUwODgyNDFkZjgyMGM2ZWUyNFwiLFwidHJhbnNhY3Rpb25JbmRleFwiOlwiMHgyXCJ9KSlcbiAgICAgICAgLy8gICAvLyBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0ICsgJycpKVxuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgICBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSlcbiAgICAgICAgLy8gfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGVycicgKyBlcnIpXG4gICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbClcbiAgICAgIH0pO1xuICAgIC8vIH1cbiAgICBcbiAgICAvLyB0aGlzLnJlcXVlc3QoYXJncylcbiAgICAvLyAudGhlbigocmV0KSA9PiBjYWxsYmFjayhudWxsLCBjcmVhdGVKc29uUnBjUmVzcG9uc2UoYXJncy5pZCwgcmV0KSkpXG4gICAgLy8gLmNhdGNoKChlcnIpID0+IGNhbGxiYWNrKGVyciwgbnVsbCkpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFRyYW5zYWN0aW9uUmVjZWlwdChwYWxvYWQ6IEpzb25ScGNQYXlsb2FkKXtcbiAgICBmb3IgKGxldCBpPTA7IGk8MTA7IGkrKyl7XG4gICAgICBhd2FpdCBzbGVlcCgxMDAwKVxuICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3RUcmFuc2FjdGlvblJlY2VpcHQgJyArIGkpXG4gICAgICBsZXQgcmV0ID0gIGF3YWl0IHRoaXMuY2FsbElubmVyUHJvdmlkZXJBcGkocGFsb2FkKTtcbiAgICAgIGlmKHJldCl7XG4gICAgICAgIHJldHVybiByZXRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVJlcXVlc3RBY2NvdW50cyhcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguZ2V0QWRkcmVzc1wiLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSwgaXNOYXRpdmUoKSk7XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIFtyZXQucmVzdWx0Py5hZGRyZXNzXSk7XG4gICAgICByZXR1cm4gW3JldC5yZXN1bHQ/LmFkZHJlc3NdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjaz8uKGVycm9yLCBudWxsKTtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoNDAwMSwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGltS2V5U2lnblRyYW5zYWN0aW9uKFxuICAgIGlkOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgdHJhbnNhY3Rpb25Db25maWc6IFRyYW5zYWN0aW9uQ29uZmlnLFxuICAgIGNhbGxiYWNrPzogKGVycm9yOiBFcnJvciwgcmV0OiBhbnkpID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy50byB8fCAhdHJhbnNhY3Rpb25Db25maWcudmFsdWUpIHtcbiAgICAgIHRocm93IGNyZWF0ZVByb3ZpZGVyUnBjRXJyb3IoLTMyNjAyLCBcImV4cGVjdGVkIHRvLHZhbHVlXCIpO1xuICAgIH1cblxuICAgIC8vZnJvbVxuICAgIGxldCBmcm9tOiBzdHJpbmc7XG4gICAgaWYgKCF0cmFuc2FjdGlvbkNvbmZpZy5mcm9tIHx8IHR5cGVvZiB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCBhY2NvdW50cyA9IGF3YWl0IHRoaXMuaW1LZXlSZXF1ZXN0QWNjb3VudHMocmVxdWVzdElkKyspO1xuICAgICAgZnJvbSA9IGFjY291bnRzWzBdIGFzIHN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbSA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3ModHJhbnNhY3Rpb25Db25maWcuZnJvbSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vZ2FzIHByaWNlXG4gICAgbGV0IGdhc1ByaWNlRGVjOiBzdHJpbmc7XG4gICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmdhc1ByaWNlKSB7XG4gICAgICBnYXNQcmljZURlYyA9IHBhcnNlQXJnc051bSh0cmFuc2FjdGlvbkNvbmZpZy5nYXNQcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1ByaWNlUmV0ID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZ2FzUHJpY2VcIiwgW10pXG4gICAgICApO1xuICAgICAgZ2FzUHJpY2VEZWMgPSBXZWIzLnV0aWxzLmhleFRvTnVtYmVyU3RyaW5nKGdhc1ByaWNlUmV0KTtcbiAgICB9XG5cbiAgICAvL2NoYWluIGlkXG4gICAgbGV0IGNoYWluSWQ6IG51bWJlcjtcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcuY2hhaW5JZCkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uQ29uZmlnLmNoYWluSWQgIT09IHRoaXMuY2hhaW5JZCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAgIC0zMjYwMixcbiAgICAgICAgICBcImV4cGVjdGVkIGNoYWluSWQgYW5kIGNvbm5lY3RlZCBjaGFpbklkIGFyZSBtaXNtYXRjaGVkXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNoYWluSWQgPSB0cmFuc2FjdGlvbkNvbmZpZy5jaGFpbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFpbklkID0gdGhpcy5jaGFpbklkO1xuICAgIH1cblxuICAgIC8vbm9uY2VcbiAgICBsZXQgbm9uY2U6IHN0cmluZztcbiAgICBpZiAodHJhbnNhY3Rpb25Db25maWcubm9uY2UpIHtcbiAgICAgIG5vbmNlID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLm5vbmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9uY2UgPSBhd2FpdCB0aGlzLmNhbGxJbm5lclByb3ZpZGVyQXBpKFxuICAgICAgICBjcmVhdGVKc29uUnBjUmVxdWVzdChcImV0aF9nZXRUcmFuc2FjdGlvbkNvdW50XCIsIFtcbiAgICAgICAgICB0cmFuc2FjdGlvbkNvbmZpZy5mcm9tLFxuICAgICAgICAgIFwicGVuZGluZ1wiLFxuICAgICAgICBdKVxuICAgICAgKTtcbiAgICAgIG5vbmNlID0gV2ViMy51dGlscy5oZXhUb051bWJlcihub25jZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2VzdGltYXRlIGdhc1xuICAgIGxldCBnYXNMaW1pdDogc3RyaW5nO1xuICAgIGlmICh0cmFuc2FjdGlvbkNvbmZpZy5nYXMpIHtcbiAgICAgIGdhc0xpbWl0ID0gcGFyc2VBcmdzTnVtKHRyYW5zYWN0aW9uQ29uZmlnLmdhcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdhc1JldDogc3RyaW5nID0gYXdhaXQgdGhpcy5jYWxsSW5uZXJQcm92aWRlckFwaShcbiAgICAgICAgY3JlYXRlSnNvblJwY1JlcXVlc3QoXCJldGhfZXN0aW1hdGVHYXNcIiwgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZyb206IHRyYW5zYWN0aW9uQ29uZmlnLmZyb20sXG4gICAgICAgICAgICB0bzogdHJhbnNhY3Rpb25Db25maWcudG8sXG4gICAgICAgICAgICBnYXM6IHRyYW5zYWN0aW9uQ29uZmlnLmdhcyxcbiAgICAgICAgICAgIGdhc1ByaWNlOiBXZWIzLnV0aWxzLm51bWJlclRvSGV4KGdhc1ByaWNlRGVjKSxcbiAgICAgICAgICAgIHZhbHVlOiB0cmFuc2FjdGlvbkNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zYWN0aW9uQ29uZmlnLmRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICk7XG4gICAgICBnYXNMaW1pdCA9IHBhcnNlQXJnc051bShnYXNSZXQpO1xuICAgIH1cblxuICAgIC8vZmVlXG4gICAgbGV0IGZlZSA9IChCaWdJbnQoZ2FzTGltaXQpICogQmlnSW50KGdhc1ByaWNlRGVjKSkudG9TdHJpbmcoKTsgLy93ZWlcbiAgICBmZWUgPSBXZWIzLnV0aWxzLmZyb21XZWkoZmVlLCBcIkd3ZWlcIik7IC8vdG8gR3dlaVxuICAgIGNvbnN0IHRlbXAgPSBNYXRoLmNlaWwoTnVtYmVyKGZlZSkpO1xuICAgIGZlZSA9ICh0ZW1wICogMTAwMDAwMDAwMCkudG9TdHJpbmcoKTsgLy90byBldGhlclxuICAgIGZlZSA9IFdlYjMudXRpbHMuZnJvbVdlaShmZWUpICsgXCIgZXRoZXJcIjtcblxuICAgIGNvbnN0IHRvID0gV2ViMy51dGlscy50b0NoZWNrc3VtQWRkcmVzcyh0cmFuc2FjdGlvbkNvbmZpZy50byk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUFyZ3NOdW0odHJhbnNhY3Rpb25Db25maWcudmFsdWUpO1xuICAgIGNvbnN0IHZhbHVlSW5XZWkgPSBXZWIzLnV0aWxzLmZyb21XZWkodmFsdWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnblRyYW5zYWN0aW9uXCIsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBkYXRhOiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgICAgZ2FzTGltaXQsXG4gICAgICAgICAgICBnYXNQcmljZTogZ2FzUHJpY2VEZWMsXG4gICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBjaGFpbklkLFxuICAgICAgICAgICAgcGF0aDogSU1LRVlfRVRIX1BBVEgsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgICBwYXltZW50OiB2YWx1ZUluV2VpICsgXCIgRVRIXCIsXG4gICAgICAgICAgICByZWNlaXZlcjogdG8sXG4gICAgICAgICAgICBzZW5kZXI6IGZyb20sXG4gICAgICAgICAgICBmZWU6IGZlZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBpZDogcmVxdWVzdElkKyssXG4gICAgICB9LCBpc05hdGl2ZSgpKTtcbiAgICAgIGxldCBzaWduYXR1cmUgPSByZXQucmVzdWx0Py5zaWduYXR1cmU7XG4gICAgICBpZiAoIXNpZ25hdHVyZS5zdGFydHNXaXRoKFwiMHhcIikpIHtcbiAgICAgICAgc2lnbmF0dXJlID0gXCIweFwiICsgc2lnbmF0dXJlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvZGVkID0gcmxwLmRlY29kZShzaWduYXR1cmUsIHRydWUpO1xuXG4gICAgICBjb25zdCBybHBUWDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uID0ge1xuICAgICAgICByYXc6IHNpZ25hdHVyZSxcbiAgICAgICAgdHg6IHtcbiAgICAgICAgICBub25jZTogbm9uY2UsXG4gICAgICAgICAgZ2FzUHJpY2U6IGdhc1ByaWNlRGVjLFxuICAgICAgICAgIGdhczogZ2FzTGltaXQsXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUluV2VpLFxuICAgICAgICAgIGlucHV0OiB0cmFuc2FjdGlvbkNvbmZpZy5kYXRhLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICByOiBXZWIzLnV0aWxzLmJ5dGVzVG9IZXgoZGVjb2RlZC5kYXRhWzddKSxcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgczogV2ViMy51dGlscy5ieXRlc1RvSGV4KGRlY29kZWQuZGF0YVs4XSksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHY6IFdlYjMudXRpbHMuYnl0ZXNUb0hleChkZWNvZGVkLmRhdGFbNl0pLFxuICAgICAgICAgIGhhc2g6IHJldC5yZXN1bHQ/LnR4SGFzaCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjYWxsYmFjaz8uKG51bGwsIHJscFRYKTtcbiAgICAgIHJldHVybiBybHBUWDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbUtleVBlcnNvbmFsU2lnbihcbiAgICBpZDogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgIGRhdGFUb1NpZ246IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgY2FsbGJhY2s/OiAoZXJyb3I6IEVycm9yLCByZXQ6IGFueSkgPT4gdm9pZFxuICApIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihhZGRyZXNzKSkge1xuICAgICAgY29uc3QgZXJyb3IgPSBjcmVhdGVQcm92aWRlclJwY0Vycm9yKFxuICAgICAgICAtMzI2MDIsXG4gICAgICAgIFwiUGFzcyB0aGUgYWRkcmVzcyB0byBzaWduIGRhdGEgd2l0aCBmb3Igbm93XCJcbiAgICAgICk7XG4gICAgICBjYWxsYmFjaz8uKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhZGRyZXNzIGludmFsaWRcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlBhc3MgdGhlIGFkZHJlc3MgdG8gc2lnbiBkYXRhIHdpdGggZm9yIG5vd1wiLFxuICAgICAgICB9LFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gV2ViMy51dGlscy50b1V0ZjgoZGF0YVRvU2lnbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGRhdGEgPSBkYXRhVG9TaWduO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrc3VtQWRkcmVzcyA9IFdlYjMudXRpbHMudG9DaGVja3N1bUFkZHJlc3MoYWRkcmVzcyBhcyBzdHJpbmcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJldCA9IGF3YWl0IGNhbGxJbUtleUFwaSh7XG4gICAgICAgIGpzb25ycGM6IFwiMi4wXCIsXG4gICAgICAgIG1ldGhvZDogXCJldGguc2lnbk1lc3NhZ2VcIixcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICBzZW5kZXI6IGNoZWNrc3VtQWRkcmVzcyxcbiAgICAgICAgICBwYXRoOiBJTUtFWV9FVEhfUEFUSCxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHJlcXVlc3RJZCsrLFxuICAgICAgfSxpc05hdGl2ZSgpKTtcblxuICAgICAgbGV0IHNpZ1JldCA9IHJldC5yZXN1bHQ/LnNpZ25hdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCFzaWdSZXQuc3RhcnRzV2l0aChcIjB4XCIpKSB7XG4gICAgICAgIHNpZ1JldCA9IFwiMHhcIiArIHNpZ1JldDtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2s/LihudWxsLCBzaWdSZXQpO1xuICAgICAgcmV0dXJuIHNpZ1JldDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2FsbGJhY2s/LihlcnJvciwgbnVsbCk7XG4gICAgICB0aHJvdyBjcmVhdGVQcm92aWRlclJwY0Vycm9yKDQwMDEsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpXG59XG5cbmZ1bmN0aW9uIGNhbGxJbUtleUFwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBpc05hdGl2ZSA9IGZhbHNlKSB7XG4gICAgaWYoaXNOYXRpdmUpe1xuICAgICAgY29uc29sZS5sb2coJ25hdGl2ZTIyMicpXG4gICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcmcpKVxuICAgICAgICAvLyBjb25zdCByZXQgPSBkaWFsb2cuc2hvd01lc3NhZ2VCb3hTeW5jKHtcbiAgICAgICAgLy8gICB0eXBlOiAnaW5mbycsXG4gICAgICAgIC8vICAgdGl0bGU6ICforr/pl67or7TmmI4nLFxuICAgICAgICAvLyAgIG1lc3NhZ2U6ICfkvaDmraPlnKjorr/pl67nrKzkuInmlrlEQVBQXFxuJyArIEpTT04uc3RyaW5naWZ5KGFyZyksXG4gICAgICAgIC8vICAgYnV0dG9uczogWydPSycsICdDYW5jZWwnXVxuICAgICAgICAvLyB9KVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXQpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkaWFsb2cnKVxuICAgICAgICAvLyBpZihyZXQgPT09IDApe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKDApXG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdjYWxsTmF0aXZlQXBpKGFyZyknKVxuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiBjYWxsTmF0aXZlQXBpKGFyZylcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKCdycGMnKVxuICAgICAgcmV0dXJuIGNhbGxScGNBcGkoYXJnKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2FsbFJwY0FwaShhcmc6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KXtcbiAgcmV0dXJuIHBvc3REYXRhKElNS0VZX01BTkFHRVJfRU5EUE9JTlQsIGFyZykudGhlbigoanNvbikgPT4ge1xuICAgIGlmIChqc29uLmVycm9yKSB7XG4gICAgICBpZiAoanNvbi5lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiSW1rZXlVc2VyTm90Q29uZmlybWVkXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInVzZXIgbm90IGNvbmZpcm1lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihqc29uLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsTmF0aXZlQXBpKGFyZzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pe1xuICBjb25zdCBqc29uID0gYXBpcm91dGVyLmFwaShhcmcpXG4gIGlmIChqc29uLmVycm9yKSB7XG4gICAgaWYgKGpzb24uZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIklta2V5VXNlck5vdENvbmZpcm1lZFwiKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXNlciBub3QgY29uZmlybWVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoanNvbi5lcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9zdERhdGEodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB7XG4gIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSwgLy8gbXVzdCBtYXRjaCAnQ29udGVudC1UeXBlJyBoZWFkZXJcbiAgICBjYWNoZTogXCJuby1jYWNoZVwiLCAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIiwgLy8gaW5jbHVkZSwgc2FtZS1vcmlnaW4sICpvbWl0XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ1c2VyLWFnZW50XCI6IFwiTW96aWxsYS80LjAgTUROIEV4YW1wbGVcIixcbiAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgbWV0aG9kOiBcIlBPU1RcIiwgLy8gKkdFVCwgUE9TVCwgUFVULCBERUxFVEUsIGV0Yy5cbiAgICBtb2RlOiBcImNvcnNcIiwgLy8gbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luXG4gICAgcmVkaXJlY3Q6IFwiZm9sbG93XCIsIC8vIG1hbnVhbCwgKmZvbGxvdywgZXJyb3JcbiAgICByZWZlcnJlcjogXCJuby1yZWZlcnJlclwiLCAvLyAqY2xpZW50LCBuby1yZWZlcnJlclxuICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwRXJyb3JcIik7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==