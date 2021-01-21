"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHexPrefixed = isHexPrefixed;
exports.addHexPrefix = addHexPrefix;
exports.setUnlimitedAllowanceAsync = exports.toBN = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./index"));

var _web = _interopRequireDefault(require("web3"));

var _ethereumjsAbi = _interopRequireDefault(require("ethereumjs-abi"));

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var APPROVE_METHOD = "approve(address,uint256)";

var toBN = function toBN(x) {
  if (isNaN(Number(x))) return new _bignumber["default"](0);
  if (x instanceof _bignumber["default"]) return x;

  if (typeof x === "string") {
    if (x.indexOf("0x") === 0 || x.indexOf("-0x") === 0) {
      return new _bignumber["default"](x.replace("0x", ""), 16);
    }
  }

  return new _bignumber["default"](x);
};

exports.toBN = toBN;

function isHexPrefixed(str) {
  return str.slice(0, 2) === "0x";
}

function addHexPrefix(str) {
  if (typeof str !== "string") {
    return str;
  }

  return isHexPrefixed(str) ? str : "0x".concat(str);
}

var _getData = function _getData(spender) {
  var value = toBN(2).pow(256).minus(1).toString();

  var encoded = _ethereumjsAbi["default"].simpleEncode(APPROVE_METHOD, spender, value);

  var data = addHexPrefix(encoded.toString("hex"));
  return data;
};

var imkeyProvider = new _index["default"]({
  rpcUrl: "https://eth-mainnet.token.im",
  chainId: 1,
  headers: {
    agent: "ios:2.4.2:2"
  }
});
imkeyProvider.enable();
var web3 = new _web["default"](imkeyProvider);

var setUnlimitedAllowanceAsync = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var from, spender, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            from = _ref.from, spender = _ref.spender, token = _ref.token;
            return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
                var contractAddress, params;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // @ts-ignore no-async-promise-executor
                        // const web3 = (window as any).web3;
                        contractAddress = token.address || token.contractAddress;
                        params = {
                          // gasPrice: "0x113",
                          // gas: "0x5208",
                          from: from,
                          to: "0x2497C6c5fCB011535ba7C5aAC6e49241c40c5CAF",
                          contractAddress: contractAddress,
                          value: "0x96",
                          decimal: 18,
                          data: "0x00"
                        };
                        web3.eth.sendTransaction(params, function (err, txHash) {
                          debugger; // @ts-ignore no-debugger

                          if (!err) {
                            resolve(txHash);
                          } else {
                            reject(err);
                          }
                        });

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function setUnlimitedAllowanceAsync(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setUnlimitedAllowanceAsync = setUnlimitedAllowanceAsync;

function allowanceTest() {
  return _allowanceTest.apply(this, arguments);
} // allowanceTest();


function _allowanceTest() {
  _allowanceTest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var txHash;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return setUnlimitedAllowanceAsync({
              from: "0xa7420a227eb03a5841543cc98601f7f0bf458e1a",
              spender: "0x41f8d14c9475444F30A80431C68cf24DC9A8369a",
              token: {
                address: "0x3212b29E33587A00FB1C83346f5dBFA69A458923"
              }
            });

          case 2:
            txHash = _context6.sent;
            console.log("txhash: ", txHash);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _allowanceTest.apply(this, arguments);
}

imkeyProvider.on("disconnect", function (code, reason) {
  console.log("Ethereum Provider connection closed: ".concat(reason, ". Code: ").concat(code));
});
imkeyProvider.on("connect", function (connectInfo) {
  console.log("Ethereum Provider connected success, chainId: ".concat(connectInfo.chainId));
});
var btn = document.createElement("button");
btn.innerText = "requestAccounts";
btn.addEventListener("click", function (e) {
  function showResult(error, result) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth.requestAccounts(showResult).then(console.log);
});
var btnBalance = document.createElement("button");
btnBalance.innerText = "Get Balance";
btnBalance.addEventListener("click", function (e) {
  web3.eth.getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6").then(console.log);
});
var btnSignTransaction = document.createElement("button");
btnSignTransaction.innerText = "Sign Transaction";
btnSignTransaction.addEventListener("click", function (e) {
  function showResult(error, result) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth.signTransaction({
    from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
    // gasPrice: "20000000008",
    // nonce: 8,
    // gas: "21000",
    to: "0x3535353535353535353535353535353535353535",
    value: "100000000000000000" // chainId: 3,
    // data: "",

  }, showResult).then(console.log);
});
var btnSendTransaction = document.createElement("button");
btnSendTransaction.innerText = "Send Transaction";
btnSendTransaction.addEventListener("click", function (e) {
  function showResult(error, result) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth.sendTransaction({
    from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
    // gasPrice: "20000000008",
    // nonce: 8,
    // gas: "21000",
    to: "0x3535353535353535353535353535353535353535",
    value: "100000000000000000" // chainId: 3,
    // data: "",

  }).then(console.log);
});
var btnSignPersonalMessage = document.createElement("button");
btnSignPersonalMessage.innerText = "Sign Personal Message";
btnSignPersonalMessage.addEventListener("click", function (e) {
  function showResult(error, signature) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", signature);
    }
  }

  web3.eth.personal.sign("Hello imKey", "0x6031564e7b2F5cc33737807b2E58DaFF870B590b", "", showResult).then(console.log) // @ts-ignore
  ["catch"](function (error) {
    console.log("error message: ", error.message);
  });
});
var btnSignMessage = document.createElement("button");
btnSignMessage.innerText = "Sign Message";
btnSignMessage.addEventListener("click", function (e) {
  function showResult(error, signature) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", signature);
    }
  }

  web3.eth.sign("Hello imKey", "0x6031564e7b2F5cc33737807b2E58DaFF870B590b", showResult).then(console.log) // @ts-ignore
  ["catch"](function (error) {
    console.log("error message: ", error.message);
  });
});
var btnRequest_eth_requestAccounts = document.createElement("button");
btnRequest_eth_requestAccounts.innerText = "request eth_requestAccounts";
btnRequest_eth_requestAccounts.addEventListener("click", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // const accounts = ethereum.enable();
            // const accounts2 = ethereum.send('eth_requestAccounts')
            // .then((ret: any) => {
            //     console.log(ret);
            // })
            // .catch((error: any) => {
            //     console.log
            // });
            // const accounts3 = await ethereum.sendAsync({ method: 'eth_requestAccounts' });
            // console.log("accounts3: ",accounts3);
            // const accounts4 = await ethereum.request({ method: 'eth_requestAccounts' })
            // console.log("accounts4: ",accounts4);
            imkeyProvider.request({
              method: "eth_requestAccounts",
              params: []
            }).then(function (ret) {
              console.log(ret);
            })["catch"](function (error) {
              console.log;
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
var btnRequest_eth_sign = document.createElement("button");
btnRequest_eth_sign.innerText = "request eth_sign";
btnRequest_eth_sign.addEventListener("click", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(e) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            imkeyProvider.request({
              method: "eth_sign",
              params: ["0x49206861766520313030e282ac", "0x6031564e7b2F5cc33737807b2E58DaFF870B590b"]
            }).then(function (ret) {
              console.log(ret);
            })["catch"](function (error) {
              console.log;
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}());
var btnRequest_eth_signTransaction = document.createElement("button");
btnRequest_eth_signTransaction.innerText = "request eth_signTransaction";
btnRequest_eth_signTransaction.addEventListener("click", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(e) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            imkeyProvider.request({
              method: "eth_signTransaction",
              params: [{
                from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
                gasPrice: "0x4a817c808",
                nonce: 8,
                gas: "0x5208",
                to: "0x3535353535353535353535353535353535353535",
                value: "0x200",
                chainId: 3,
                data: ""
              }]
            }).then(function (ret) {
              console.log(ret);
            })["catch"](function (error) {
              console.log;
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}()); // document.appendChild(btn);

document.body.append(btn);
document.body.append(btnBalance);
document.body.append(btnSignTransaction);
document.body.append(btnSignPersonalMessage);
document.body.append(btnSignMessage);
document.body.append(btnSendTransaction);
document.body.append(document.createElement("br"));
document.body.append(btnRequest_eth_requestAccounts);
document.body.append(btnRequest_eth_sign);
document.body.append(btnRequest_eth_signTransaction);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbIkFQUFJPVkVfTUVUSE9EIiwidG9CTiIsIngiLCJpc05hTiIsIk51bWJlciIsIkJOIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJpc0hleFByZWZpeGVkIiwic3RyIiwic2xpY2UiLCJhZGRIZXhQcmVmaXgiLCJfZ2V0RGF0YSIsInNwZW5kZXIiLCJ2YWx1ZSIsInBvdyIsIm1pbnVzIiwidG9TdHJpbmciLCJlbmNvZGVkIiwiYWJpIiwic2ltcGxlRW5jb2RlIiwiZGF0YSIsImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImhlYWRlcnMiLCJhZ2VudCIsImVuYWJsZSIsIndlYjMiLCJXZWIzIiwic2V0VW5saW1pdGVkQWxsb3dhbmNlQXN5bmMiLCJmcm9tIiwidG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnRyYWN0QWRkcmVzcyIsImFkZHJlc3MiLCJwYXJhbXMiLCJ0byIsImRlY2ltYWwiLCJldGgiLCJzZW5kVHJhbnNhY3Rpb24iLCJlcnIiLCJ0eEhhc2giLCJhbGxvd2FuY2VUZXN0IiwiY29uc29sZSIsImxvZyIsIm9uIiwiY29kZSIsInJlYXNvbiIsImNvbm5lY3RJbmZvIiwiYnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzaG93UmVzdWx0IiwiZXJyb3IiLCJyZXN1bHQiLCJyZXF1ZXN0QWNjb3VudHMiLCJ0aGVuIiwiYnRuQmFsYW5jZSIsImdldEJhbGFuY2UiLCJidG5TaWduVHJhbnNhY3Rpb24iLCJzaWduVHJhbnNhY3Rpb24iLCJidG5TZW5kVHJhbnNhY3Rpb24iLCJidG5TaWduUGVyc29uYWxNZXNzYWdlIiwic2lnbmF0dXJlIiwicGVyc29uYWwiLCJzaWduIiwibWVzc2FnZSIsImJ0blNpZ25NZXNzYWdlIiwiYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzIiwicmVxdWVzdCIsIm1ldGhvZCIsInJldCIsImJ0blJlcXVlc3RfZXRoX3NpZ24iLCJidG5SZXF1ZXN0X2V0aF9zaWduVHJhbnNhY3Rpb24iLCJnYXNQcmljZSIsIm5vbmNlIiwiZ2FzIiwiYm9keSIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUEsSUFBTUEsY0FBYyxHQUFHLDBCQUF2Qjs7QUFFTyxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDQyxDQUFELEVBQVc7QUFDN0IsTUFBSUMsS0FBSyxDQUFDQyxNQUFNLENBQUNGLENBQUQsQ0FBUCxDQUFULEVBQXNCLE9BQU8sSUFBSUcscUJBQUosQ0FBTyxDQUFQLENBQVA7QUFDdEIsTUFBSUgsQ0FBQyxZQUFZRyxxQkFBakIsRUFBcUIsT0FBT0gsQ0FBUDs7QUFFckIsTUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBakIsRUFBMkI7QUFDekIsUUFBSUEsQ0FBQyxDQUFDSSxPQUFGLENBQVUsSUFBVixNQUFvQixDQUFwQixJQUF5QkosQ0FBQyxDQUFDSSxPQUFGLENBQVUsS0FBVixNQUFxQixDQUFsRCxFQUFxRDtBQUNuRCxhQUFPLElBQUlELHFCQUFKLENBQU9ILENBQUMsQ0FBQ0ssT0FBRixDQUFVLElBQVYsRUFBZ0IsRUFBaEIsQ0FBUCxFQUE0QixFQUE1QixDQUFQO0FBQ0Q7QUFDRjs7QUFDRCxTQUFPLElBQUlGLHFCQUFKLENBQU9ILENBQVAsQ0FBUDtBQUNELENBVk07Ozs7QUFZQSxTQUFTTSxhQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUNqQyxTQUFPQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBYixNQUFvQixJQUEzQjtBQUNEOztBQUVNLFNBQVNDLFlBQVQsQ0FBc0JGLEdBQXRCLEVBQW1DO0FBQ3hDLE1BQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCLFdBQU9BLEdBQVA7QUFDRDs7QUFDRCxTQUFPRCxhQUFhLENBQUNDLEdBQUQsQ0FBYixHQUFxQkEsR0FBckIsZUFBZ0NBLEdBQWhDLENBQVA7QUFDRDs7QUFNRCxJQUFNRyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxPQUFELEVBQWE7QUFDNUIsTUFBTUMsS0FBSyxHQUFHYixJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFjLEdBQVIsQ0FBWSxHQUFaLEVBQWlCQyxLQUFqQixDQUF1QixDQUF2QixFQUEwQkMsUUFBMUIsRUFBZDs7QUFDQSxNQUFNQyxPQUFPLEdBQUdDLDBCQUFJQyxZQUFKLENBQWlCcEIsY0FBakIsRUFBaUNhLE9BQWpDLEVBQTBDQyxLQUExQyxDQUFoQjs7QUFDQSxNQUFNTyxJQUFJLEdBQUdWLFlBQVksQ0FBQ08sT0FBTyxDQUFDRCxRQUFSLENBQWlCLEtBQWpCLENBQUQsQ0FBekI7QUFDQSxTQUFPSSxJQUFQO0FBQ0QsQ0FMRDs7QUFPQSxJQUFNQyxhQUFhLEdBQUcsSUFBSUMsaUJBQUosQ0FBa0I7QUFDdENDLEVBQUFBLE1BQU0sRUFBRSw4QkFEOEI7QUFFdENDLEVBQUFBLE9BQU8sRUFBRSxDQUY2QjtBQUd0Q0MsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLEtBQUssRUFBRTtBQURBO0FBSDZCLENBQWxCLENBQXRCO0FBT0FMLGFBQWEsQ0FBQ00sTUFBZDtBQUNBLElBQU1DLElBQUksR0FBRyxJQUFJQyxlQUFKLENBQVNSLGFBQVQsQ0FBYjs7QUFFTyxJQUFNUywwQkFBMEI7QUFBQSw0RkFBRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBU0MsWUFBQUEsSUFBVCxRQUFTQSxJQUFULEVBQWVuQixPQUFmLFFBQWVBLE9BQWYsRUFBd0JvQixLQUF4QixRQUF3QkEsS0FBeEI7QUFBQSw4Q0FDakMsSUFBSUMsT0FBSjtBQUFBLHdHQUFZLGlCQUFPQyxPQUFQLEVBQWdCQyxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDakI7QUFDQTtBQUNNQyx3QkFBQUEsZUFIVyxHQUdPSixLQUFLLENBQUNLLE9BQU4sSUFBaUJMLEtBQUssQ0FBQ0ksZUFIOUI7QUFJWEUsd0JBQUFBLE1BSlcsR0FJRjtBQUNiO0FBQ0E7QUFDQVAsMEJBQUFBLElBQUksRUFBSkEsSUFIYTtBQUliUSwwQkFBQUEsRUFBRSxFQUFFLDRDQUpTO0FBS2JILDBCQUFBQSxlQUFlLEVBQWZBLGVBTGE7QUFNYnZCLDBCQUFBQSxLQUFLLEVBQUUsTUFOTTtBQU9iMkIsMEJBQUFBLE9BQU8sRUFBRSxFQVBJO0FBUWJwQiwwQkFBQUEsSUFBSSxFQUFFO0FBUk8seUJBSkU7QUFlakJRLHdCQUFBQSxJQUFJLENBQUNhLEdBQUwsQ0FBU0MsZUFBVCxDQUF5QkosTUFBekIsRUFBaUMsVUFBQ0ssR0FBRCxFQUFNQyxNQUFOLEVBQWlCO0FBQ2hELG1DQURnRCxDQUN0Qzs7QUFDViw4QkFBSSxDQUFDRCxHQUFMLEVBQVU7QUFDUlQsNEJBQUFBLE9BQU8sQ0FBQ1UsTUFBRCxDQUFQO0FBQ0QsMkJBRkQsTUFFTztBQUNMVCw0QkFBQUEsTUFBTSxDQUFDUSxHQUFELENBQU47QUFDRDtBQUNGLHlCQVBEOztBQWZpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURpQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUExQmIsMEJBQTBCO0FBQUE7QUFBQTtBQUFBLEdBQWhDOzs7O1NBMkJRZSxhOztFQVNmOzs7O2lHQVRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ3VCZiwwQkFBMEIsQ0FBQztBQUM5Q0MsY0FBQUEsSUFBSSxFQUFFLDRDQUR3QztBQUU5Q25CLGNBQUFBLE9BQU8sRUFBRSw0Q0FGcUM7QUFHOUNvQixjQUFBQSxLQUFLLEVBQUU7QUFBRUssZ0JBQUFBLE9BQU8sRUFBRTtBQUFYO0FBSHVDLGFBQUQsQ0FEakQ7O0FBQUE7QUFDUU8sWUFBQUEsTUFEUjtBQU1FRSxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCSCxNQUF4Qjs7QUFORjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBVUF2QixhQUFhLENBQUMyQixFQUFkLENBQWlCLFlBQWpCLEVBQStCLFVBQUNDLElBQUQsRUFBWUMsTUFBWixFQUE0QjtBQUN6REosRUFBQUEsT0FBTyxDQUFDQyxHQUFSLGdEQUFvREcsTUFBcEQscUJBQXFFRCxJQUFyRTtBQUNELENBRkQ7QUFJQTVCLGFBQWEsQ0FBQzJCLEVBQWQsQ0FBaUIsU0FBakIsRUFBNEIsVUFBQ0csV0FBRCxFQUFzQztBQUNoRUwsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLHlEQUNtREksV0FBVyxDQUFDM0IsT0FEL0Q7QUFHRCxDQUpEO0FBTUEsSUFBTTRCLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQVo7QUFDQUYsR0FBRyxDQUFDRyxTQUFKLEdBQWdCLGlCQUFoQjtBQUNBSCxHQUFHLENBQUNJLGdCQUFKLENBQXFCLE9BQXJCLEVBQThCLFVBQUNDLENBQUQsRUFBTztBQUNuQyxXQUFTQyxVQUFULENBQW9CQyxLQUFwQixFQUFrQ0MsTUFBbEMsRUFBb0Q7QUFDbEQsUUFBSUQsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakJiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBNEJZLEtBQTVCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJhLE1BQTdCO0FBQ0Q7QUFDRjs7QUFFRGhDLEVBQUFBLElBQUksQ0FBQ2EsR0FBTCxDQUFTb0IsZUFBVCxDQUF5QkgsVUFBekIsRUFBcUNJLElBQXJDLENBQTBDaEIsT0FBTyxDQUFDQyxHQUFsRDtBQUNELENBVkQ7QUFZQSxJQUFNZ0IsVUFBVSxHQUFHVixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBbkI7QUFDQVMsVUFBVSxDQUFDUixTQUFYLEdBQXVCLGFBQXZCO0FBQ0FRLFVBQVUsQ0FBQ1AsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQzFDN0IsRUFBQUEsSUFBSSxDQUFDYSxHQUFMLENBQ0d1QixVQURILENBQ2MsNENBRGQsRUFFR0YsSUFGSCxDQUVRaEIsT0FBTyxDQUFDQyxHQUZoQjtBQUdELENBSkQ7QUFNQSxJQUFNa0Isa0JBQWtCLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUEzQjtBQUNBVyxrQkFBa0IsQ0FBQ1YsU0FBbkIsR0FBK0Isa0JBQS9CO0FBQ0FVLGtCQUFrQixDQUFDVCxnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xELFdBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQWtDQyxNQUFsQyxFQUFpRTtBQUMvRCxRQUFJRCxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQmIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUE0QlksS0FBNUI7QUFDRCxLQUZELE1BRU87QUFDTGIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QmEsTUFBN0I7QUFDRDtBQUNGOztBQUVEaEMsRUFBQUEsSUFBSSxDQUFDYSxHQUFMLENBQ0d5QixlQURILENBRUk7QUFDRW5DLElBQUFBLElBQUksRUFBRSw0Q0FEUjtBQUVFO0FBQ0E7QUFDQTtBQUNBUSxJQUFBQSxFQUFFLEVBQUUsNENBTE47QUFNRTFCLElBQUFBLEtBQUssRUFBRSxvQkFOVCxDQU9FO0FBQ0E7O0FBUkYsR0FGSixFQVlJNkMsVUFaSixFQWNHSSxJQWRILENBY1FoQixPQUFPLENBQUNDLEdBZGhCO0FBZUQsQ0F4QkQ7QUEwQkEsSUFBTW9CLGtCQUFrQixHQUFHZCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBM0I7QUFDQWEsa0JBQWtCLENBQUNaLFNBQW5CLEdBQStCLGtCQUEvQjtBQUNBWSxrQkFBa0IsQ0FBQ1gsZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDLFVBQUNDLENBQUQsRUFBTztBQUNsRCxXQUFTQyxVQUFULENBQW9CQyxLQUFwQixFQUFrQ0MsTUFBbEMsRUFBaUU7QUFDL0QsUUFBSUQsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakJiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBNEJZLEtBQTVCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJhLE1BQTdCO0FBQ0Q7QUFDRjs7QUFFRGhDLEVBQUFBLElBQUksQ0FBQ2EsR0FBTCxDQUNHQyxlQURILENBQ21CO0FBQ2ZYLElBQUFBLElBQUksRUFBRSw0Q0FEUztBQUVmO0FBQ0E7QUFDQTtBQUNBUSxJQUFBQSxFQUFFLEVBQUUsNENBTFc7QUFNZjFCLElBQUFBLEtBQUssRUFBRSxvQkFOUSxDQU9mO0FBQ0E7O0FBUmUsR0FEbkIsRUFXR2lELElBWEgsQ0FXUWhCLE9BQU8sQ0FBQ0MsR0FYaEI7QUFZRCxDQXJCRDtBQXVCQSxJQUFNcUIsc0JBQXNCLEdBQUdmLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUEvQjtBQUNBYyxzQkFBc0IsQ0FBQ2IsU0FBdkIsR0FBbUMsdUJBQW5DO0FBQ0FhLHNCQUFzQixDQUFDWixnQkFBdkIsQ0FBd0MsT0FBeEMsRUFBaUQsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RELFdBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQWtDVSxTQUFsQyxFQUFxRDtBQUNuRCxRQUFJVixLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQmIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUE0QlksS0FBNUI7QUFDRCxLQUZELE1BRU87QUFDTGIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWixFQUE2QnNCLFNBQTdCO0FBQ0Q7QUFDRjs7QUFFRHpDLEVBQUFBLElBQUksQ0FBQ2EsR0FBTCxDQUFTNkIsUUFBVCxDQUNHQyxJQURILENBRUksYUFGSixFQUdJLDRDQUhKLEVBSUksRUFKSixFQUtJYixVQUxKLEVBT0dJLElBUEgsQ0FPUWhCLE9BQU8sQ0FBQ0MsR0FQaEIsRUFRRTtBQVJGLFlBU1MsVUFBQ1ksS0FBRCxFQUFXO0FBQ2hCYixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQlksS0FBSyxDQUFDYSxPQUFyQztBQUNELEdBWEg7QUFZRCxDQXJCRDtBQXVCQSxJQUFNQyxjQUFjLEdBQUdwQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkI7QUFDQW1CLGNBQWMsQ0FBQ2xCLFNBQWYsR0FBMkIsY0FBM0I7QUFDQWtCLGNBQWMsQ0FBQ2pCLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLFVBQUNDLENBQUQsRUFBTztBQUM5QyxXQUFTQyxVQUFULENBQW9CQyxLQUFwQixFQUFrQ1UsU0FBbEMsRUFBcUQ7QUFDbkQsUUFBSVYsS0FBSyxJQUFJLElBQWIsRUFBbUI7QUFDakJiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGNBQVosRUFBNEJZLEtBQTVCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xiLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJzQixTQUE3QjtBQUNEO0FBQ0Y7O0FBRUR6QyxFQUFBQSxJQUFJLENBQUNhLEdBQUwsQ0FDRzhCLElBREgsQ0FFSSxhQUZKLEVBR0ksNENBSEosRUFJSWIsVUFKSixFQU1HSSxJQU5ILENBTVFoQixPQUFPLENBQUNDLEdBTmhCLEVBT0U7QUFQRixZQVFTLFVBQUNZLEtBQUQsRUFBVztBQUNoQmIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVosRUFBK0JZLEtBQUssQ0FBQ2EsT0FBckM7QUFDRCxHQVZIO0FBV0QsQ0FwQkQ7QUFzQkEsSUFBTUUsOEJBQThCLEdBQUdyQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkM7QUFDQW9CLDhCQUE4QixDQUFDbkIsU0FBL0IsR0FBMkMsNkJBQTNDO0FBQ0FtQiw4QkFBOEIsQ0FBQ2xCLGdCQUEvQixDQUFnRCxPQUFoRDtBQUFBLDRGQUF5RCxrQkFBT0MsQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBcEMsWUFBQUEsYUFBYSxDQUNWc0QsT0FESCxDQUNXO0FBQUVDLGNBQUFBLE1BQU0sRUFBRSxxQkFBVjtBQUFpQ3RDLGNBQUFBLE1BQU0sRUFBRTtBQUF6QyxhQURYLEVBRUd3QixJQUZILENBRVEsVUFBQ2UsR0FBRCxFQUFTO0FBQ2IvQixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThCLEdBQVo7QUFDRCxhQUpILFdBS1MsVUFBQ2xCLEtBQUQsRUFBVztBQUNoQmIsY0FBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0QsYUFQSDs7QUFkdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF3QkEsSUFBTStCLG1CQUFtQixHQUFHekIsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQTVCO0FBQ0F3QixtQkFBbUIsQ0FBQ3ZCLFNBQXBCLEdBQWdDLGtCQUFoQztBQUNBdUIsbUJBQW1CLENBQUN0QixnQkFBcEIsQ0FBcUMsT0FBckM7QUFBQSw0RkFBOEMsa0JBQU9DLENBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM1Q3BDLFlBQUFBLGFBQWEsQ0FDVnNELE9BREgsQ0FDVztBQUNQQyxjQUFBQSxNQUFNLEVBQUUsVUFERDtBQUVQdEMsY0FBQUEsTUFBTSxFQUFFLENBQ04sOEJBRE0sRUFFTiw0Q0FGTTtBQUZELGFBRFgsRUFRR3dCLElBUkgsQ0FRUSxVQUFDZSxHQUFELEVBQVM7QUFDYi9CLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZOEIsR0FBWjtBQUNELGFBVkgsV0FXUyxVQUFDbEIsS0FBRCxFQUFXO0FBQ2hCYixjQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDRCxhQWJIOztBQUQ0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUE5Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCQSxJQUFNZ0MsOEJBQThCLEdBQUcxQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBdkM7QUFDQXlCLDhCQUE4QixDQUFDeEIsU0FBL0IsR0FBMkMsNkJBQTNDO0FBQ0F3Qiw4QkFBOEIsQ0FBQ3ZCLGdCQUEvQixDQUFnRCxPQUFoRDtBQUFBLDRGQUF5RCxrQkFBT0MsQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ3ZEcEMsWUFBQUEsYUFBYSxDQUNWc0QsT0FESCxDQUNXO0FBQ1BDLGNBQUFBLE1BQU0sRUFBRSxxQkFERDtBQUVQdEMsY0FBQUEsTUFBTSxFQUFFLENBQ047QUFDRVAsZ0JBQUFBLElBQUksRUFBRSw0Q0FEUjtBQUVFaUQsZ0JBQUFBLFFBQVEsRUFBRSxhQUZaO0FBR0VDLGdCQUFBQSxLQUFLLEVBQUUsQ0FIVDtBQUlFQyxnQkFBQUEsR0FBRyxFQUFFLFFBSlA7QUFLRTNDLGdCQUFBQSxFQUFFLEVBQUUsNENBTE47QUFNRTFCLGdCQUFBQSxLQUFLLEVBQUUsT0FOVDtBQU9FVyxnQkFBQUEsT0FBTyxFQUFFLENBUFg7QUFRRUosZ0JBQUFBLElBQUksRUFBRTtBQVJSLGVBRE07QUFGRCxhQURYLEVBZ0JHMEMsSUFoQkgsQ0FnQlEsVUFBQ2UsR0FBRCxFQUFTO0FBQ2IvQixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThCLEdBQVo7QUFDRCxhQWxCSCxXQW1CUyxVQUFDbEIsS0FBRCxFQUFXO0FBQ2hCYixjQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDRCxhQXJCSDs7QUFEdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSyxDQXlCQTs7QUFDQU0sUUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxNQUFkLENBQXFCaEMsR0FBckI7QUFDQUMsUUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxNQUFkLENBQXFCckIsVUFBckI7QUFDQVYsUUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxNQUFkLENBQXFCbkIsa0JBQXJCO0FBQ0FaLFFBQVEsQ0FBQzhCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQmhCLHNCQUFyQjtBQUNBZixRQUFRLENBQUM4QixJQUFULENBQWNDLE1BQWQsQ0FBcUJYLGNBQXJCO0FBQ0FwQixRQUFRLENBQUM4QixJQUFULENBQWNDLE1BQWQsQ0FBcUJqQixrQkFBckI7QUFFQWQsUUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxNQUFkLENBQXFCL0IsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBQXJCO0FBQ0FELFFBQVEsQ0FBQzhCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQlYsOEJBQXJCO0FBQ0FyQixRQUFRLENBQUM4QixJQUFULENBQWNDLE1BQWQsQ0FBcUJOLG1CQUFyQjtBQUNBekIsUUFBUSxDQUFDOEIsSUFBVCxDQUFjQyxNQUFkLENBQXFCTCw4QkFBckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1LZXlQcm92aWRlciBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuaW1wb3J0IGFiaSBmcm9tIFwiZXRoZXJldW1qcy1hYmlcIjtcbmltcG9ydCBCTiBmcm9tIFwiYmlnbnVtYmVyLmpzXCI7XG5cbmNvbnN0IEFQUFJPVkVfTUVUSE9EID0gXCJhcHByb3ZlKGFkZHJlc3MsdWludDI1NilcIjtcblxuZXhwb3J0IGNvbnN0IHRvQk4gPSAoeCk6IEJOID0+IHtcbiAgaWYgKGlzTmFOKE51bWJlcih4KSkpIHJldHVybiBuZXcgQk4oMCk7XG4gIGlmICh4IGluc3RhbmNlb2YgQk4pIHJldHVybiB4O1xuXG4gIGlmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICh4LmluZGV4T2YoXCIweFwiKSA9PT0gMCB8fCB4LmluZGV4T2YoXCItMHhcIikgPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgQk4oeC5yZXBsYWNlKFwiMHhcIiwgXCJcIiksIDE2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBCTih4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hleFByZWZpeGVkKHN0cikge1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIDIpID09PSBcIjB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRIZXhQcmVmaXgoc3RyOiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG4gIHJldHVybiBpc0hleFByZWZpeGVkKHN0cikgPyBzdHIgOiBgMHgke3N0cn1gO1xufVxuXG5pbnRlcmZhY2UgUHJvdmlkZXJDb25uZWN0SW5mbyB7XG4gIHJlYWRvbmx5IGNoYWluSWQ6IHN0cmluZztcbn1cblxuY29uc3QgX2dldERhdGEgPSAoc3BlbmRlcikgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHRvQk4oMikucG93KDI1NikubWludXMoMSkudG9TdHJpbmcoKTtcbiAgY29uc3QgZW5jb2RlZCA9IGFiaS5zaW1wbGVFbmNvZGUoQVBQUk9WRV9NRVRIT0QsIHNwZW5kZXIsIHZhbHVlKTtcbiAgY29uc3QgZGF0YSA9IGFkZEhleFByZWZpeChlbmNvZGVkLnRvU3RyaW5nKFwiaGV4XCIpKTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb25zdCBpbWtleVByb3ZpZGVyID0gbmV3IEltS2V5UHJvdmlkZXIoe1xuICBycGNVcmw6IFwiaHR0cHM6Ly9ldGgtbWFpbm5ldC50b2tlbi5pbVwiLFxuICBjaGFpbklkOiAxLFxuICBoZWFkZXJzOiB7XG4gICAgYWdlbnQ6IFwiaW9zOjIuNC4yOjJcIixcbiAgfSxcbn0pO1xuaW1rZXlQcm92aWRlci5lbmFibGUoKTtcbmNvbnN0IHdlYjMgPSBuZXcgV2ViMyhpbWtleVByb3ZpZGVyIGFzIGFueSk7XG5cbmV4cG9ydCBjb25zdCBzZXRVbmxpbWl0ZWRBbGxvd2FuY2VBc3luYyA9IGFzeW5jICh7IGZyb20sIHNwZW5kZXIsIHRva2VuIH0pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlIG5vLWFzeW5jLXByb21pc2UtZXhlY3V0b3JcbiAgICAvLyBjb25zdCB3ZWIzID0gKHdpbmRvdyBhcyBhbnkpLndlYjM7XG4gICAgY29uc3QgY29udHJhY3RBZGRyZXNzID0gdG9rZW4uYWRkcmVzcyB8fCB0b2tlbi5jb250cmFjdEFkZHJlc3M7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgLy8gZ2FzUHJpY2U6IFwiMHgxMTNcIixcbiAgICAgIC8vIGdhczogXCIweDUyMDhcIixcbiAgICAgIGZyb20sXG4gICAgICB0bzogXCIweDI0OTdDNmM1ZkNCMDExNTM1YmE3QzVhQUM2ZTQ5MjQxYzQwYzVDQUZcIixcbiAgICAgIGNvbnRyYWN0QWRkcmVzcyxcbiAgICAgIHZhbHVlOiBcIjB4OTZcIixcbiAgICAgIGRlY2ltYWw6IDE4LFxuICAgICAgZGF0YTogXCIweDAwXCIsXG4gICAgfTtcblxuICAgIHdlYjMuZXRoLnNlbmRUcmFuc2FjdGlvbihwYXJhbXMsIChlcnIsIHR4SGFzaCkgPT4ge1xuICAgICAgZGVidWdnZXI7IC8vIEB0cy1pZ25vcmUgbm8tZGVidWdnZXJcbiAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIHJlc29sdmUodHhIYXNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGFsbG93YW5jZVRlc3QoKSB7XG4gIGNvbnN0IHR4SGFzaCA9IGF3YWl0IHNldFVubGltaXRlZEFsbG93YW5jZUFzeW5jKHtcbiAgICBmcm9tOiBcIjB4YTc0MjBhMjI3ZWIwM2E1ODQxNTQzY2M5ODYwMWY3ZjBiZjQ1OGUxYVwiLFxuICAgIHNwZW5kZXI6IFwiMHg0MWY4ZDE0Yzk0NzU0NDRGMzBBODA0MzFDNjhjZjI0REM5QTgzNjlhXCIsXG4gICAgdG9rZW46IHsgYWRkcmVzczogXCIweDMyMTJiMjlFMzM1ODdBMDBGQjFDODMzNDZmNWRCRkE2OUE0NTg5MjNcIiB9LFxuICB9KTtcbiAgY29uc29sZS5sb2coXCJ0eGhhc2g6IFwiLCB0eEhhc2gpO1xufVxuXG4vLyBhbGxvd2FuY2VUZXN0KCk7XG5pbWtleVByb3ZpZGVyLm9uKFwiZGlzY29ubmVjdFwiLCAoY29kZTogYW55LCByZWFzb246IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGlvbiBjbG9zZWQ6ICR7cmVhc29ufS4gQ29kZTogJHtjb2RlfWApO1xufSk7XG5cbmlta2V5UHJvdmlkZXIub24oXCJjb25uZWN0XCIsIChjb25uZWN0SW5mbzogUHJvdmlkZXJDb25uZWN0SW5mbykgPT4ge1xuICBjb25zb2xlLmxvZyhcbiAgICBgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGVkIHN1Y2Nlc3MsIGNoYWluSWQ6ICR7Y29ubmVjdEluZm8uY2hhaW5JZH1gXG4gICk7XG59KTtcblxuY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bi5pbm5lclRleHQgPSBcInJlcXVlc3RBY2NvdW50c1wiO1xuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBzdHJpbmdbXSkge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnJlcXVlc3RBY2NvdW50cyhzaG93UmVzdWx0KS50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5CYWxhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bkJhbGFuY2UuaW5uZXJUZXh0ID0gXCJHZXQgQmFsYW5jZVwiO1xuYnRuQmFsYW5jZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgd2ViMy5ldGhcbiAgICAuZ2V0QmFsYW5jZShcIjB4ODY2M2I4MTFjOTYwMWRiMWM1YTkzZTQxYjg5NDE5NjQwMGMxNGVkNlwiKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduVHJhbnNhY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuU2lnblRyYW5zYWN0aW9uLmlubmVyVGV4dCA9IFwiU2lnbiBUcmFuc2FjdGlvblwiO1xuYnRuU2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24pIHtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IGVycm9yOiBcIiwgZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgcmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICB3ZWIzLmV0aFxuICAgIC5zaWduVHJhbnNhY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGZyb206IFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICAgIC8vIGdhc1ByaWNlOiBcIjIwMDAwMDAwMDA4XCIsXG4gICAgICAgIC8vIG5vbmNlOiA4LFxuICAgICAgICAvLyBnYXM6IFwiMjEwMDBcIixcbiAgICAgICAgdG86IFwiMHgzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1XCIsXG4gICAgICAgIHZhbHVlOiBcIjEwMDAwMDAwMDAwMDAwMDAwMFwiLFxuICAgICAgICAvLyBjaGFpbklkOiAzLFxuICAgICAgICAvLyBkYXRhOiBcIlwiLFxuICAgICAgfSxcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0blNlbmRUcmFuc2FjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TZW5kVHJhbnNhY3Rpb24uaW5uZXJUZXh0ID0gXCJTZW5kIFRyYW5zYWN0aW9uXCI7XG5idG5TZW5kVHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IFJMUEVuY29kZWRUcmFuc2FjdGlvbikge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoXG4gICAgLnNlbmRUcmFuc2FjdGlvbih7XG4gICAgICBmcm9tOiBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgLy8gZ2FzUHJpY2U6IFwiMjAwMDAwMDAwMDhcIixcbiAgICAgIC8vIG5vbmNlOiA4LFxuICAgICAgLy8gZ2FzOiBcIjIxMDAwXCIsXG4gICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgIHZhbHVlOiBcIjEwMDAwMDAwMDAwMDAwMDAwMFwiLFxuICAgICAgLy8gY2hhaW5JZDogMyxcbiAgICAgIC8vIGRhdGE6IFwiXCIsXG4gICAgfSlcbiAgICAudGhlbihjb25zb2xlLmxvZyk7XG59KTtcblxuY29uc3QgYnRuU2lnblBlcnNvbmFsTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduUGVyc29uYWxNZXNzYWdlLmlubmVyVGV4dCA9IFwiU2lnbiBQZXJzb25hbCBNZXNzYWdlXCI7XG5idG5TaWduUGVyc29uYWxNZXNzYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgc2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IGVycm9yOiBcIiwgZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgcmVzdWx0OiBcIiwgc2lnbmF0dXJlKTtcbiAgICB9XG4gIH1cblxuICB3ZWIzLmV0aC5wZXJzb25hbFxuICAgIC5zaWduKFxuICAgICAgXCJIZWxsbyBpbUtleVwiLFxuICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIFwiXCIsXG4gICAgICBzaG93UmVzdWx0XG4gICAgKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yIG1lc3NhZ2U6IFwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5TaWduTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduTWVzc2FnZS5pbm5lclRleHQgPSBcIlNpZ24gTWVzc2FnZVwiO1xuYnRuU2lnbk1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCBzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoXG4gICAgLnNpZ24oXG4gICAgICBcIkhlbGxvIGltS2V5XCIsXG4gICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgc2hvd1Jlc3VsdFxuICAgIClcbiAgICAudGhlbihjb25zb2xlLmxvZylcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvciBtZXNzYWdlOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3JlcXVlc3RBY2NvdW50c1wiO1xuYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAvLyBjb25zdCBhY2NvdW50cyA9IGV0aGVyZXVtLmVuYWJsZSgpO1xuICAvLyBjb25zdCBhY2NvdW50czIgPSBldGhlcmV1bS5zZW5kKCdldGhfcmVxdWVzdEFjY291bnRzJylcbiAgLy8gLnRoZW4oKHJldDogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAvLyB9KVxuICAvLyAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nXG4gIC8vIH0pO1xuICAvLyBjb25zdCBhY2NvdW50czMgPSBhd2FpdCBldGhlcmV1bS5zZW5kQXN5bmMoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KTtcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czM6IFwiLGFjY291bnRzMyk7XG4gIC8vIGNvbnN0IGFjY291bnRzNCA9IGF3YWl0IGV0aGVyZXVtLnJlcXVlc3QoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KVxuICAvLyBjb25zb2xlLmxvZyhcImFjY291bnRzNDogXCIsYWNjb3VudHM0KTtcblxuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3QoeyBtZXRob2Q6IFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiLCBwYXJhbXM6IFtdIH0pXG4gICAgLnRoZW4oKHJldCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3NpZ24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuUmVxdWVzdF9ldGhfc2lnbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25cIjtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gIGlta2V5UHJvdmlkZXJcbiAgICAucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6IFwiZXRoX3NpZ25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICBcIjB4NDkyMDY4NjE3NjY1MjAzMTMwMzBlMjgyYWNcIixcbiAgICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25UcmFuc2FjdGlvblwiO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcImV0aF9zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgICBnYXNQcmljZTogXCIweDRhODE3YzgwOFwiLFxuICAgICAgICAgIG5vbmNlOiA4LFxuICAgICAgICAgIGdhczogXCIweDUyMDhcIixcbiAgICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgICB2YWx1ZTogXCIweDIwMFwiLFxuICAgICAgICAgIGNoYWluSWQ6IDMsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuLy8gZG9jdW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5CYWxhbmNlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25UcmFuc2FjdGlvbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TaWduUGVyc29uYWxNZXNzYWdlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25NZXNzYWdlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNlbmRUcmFuc2FjdGlvbik7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfc2lnbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5SZXF1ZXN0X2V0aF9zaWduVHJhbnNhY3Rpb24pO1xuIl19