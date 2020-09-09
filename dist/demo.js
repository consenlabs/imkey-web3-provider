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

  web3.eth.personal.sign("Hello imKey", "0x6031564e7b2F5cc33737807b2E58DaFF870B590b", "", showResult).then(console.log) // @ts-ignore
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
              method: "personal_sign",
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
document.body.append(btnSignMessage);
document.body.append(btnSendTransaction);
document.body.append(document.createElement("br"));
document.body.append(btnRequest_eth_requestAccounts);
document.body.append(btnRequest_eth_sign);
document.body.append(btnRequest_eth_signTransaction);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbIkFQUFJPVkVfTUVUSE9EIiwidG9CTiIsIngiLCJpc05hTiIsIk51bWJlciIsIkJOIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJpc0hleFByZWZpeGVkIiwic3RyIiwic2xpY2UiLCJhZGRIZXhQcmVmaXgiLCJfZ2V0RGF0YSIsInNwZW5kZXIiLCJ2YWx1ZSIsInBvdyIsIm1pbnVzIiwidG9TdHJpbmciLCJlbmNvZGVkIiwiYWJpIiwic2ltcGxlRW5jb2RlIiwiZGF0YSIsImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImhlYWRlcnMiLCJhZ2VudCIsImVuYWJsZSIsIndlYjMiLCJXZWIzIiwic2V0VW5saW1pdGVkQWxsb3dhbmNlQXN5bmMiLCJmcm9tIiwidG9rZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnRyYWN0QWRkcmVzcyIsImFkZHJlc3MiLCJwYXJhbXMiLCJ0byIsImRlY2ltYWwiLCJldGgiLCJzZW5kVHJhbnNhY3Rpb24iLCJlcnIiLCJ0eEhhc2giLCJhbGxvd2FuY2VUZXN0IiwiY29uc29sZSIsImxvZyIsIm9uIiwiY29kZSIsInJlYXNvbiIsImNvbm5lY3RJbmZvIiwiYnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzaG93UmVzdWx0IiwiZXJyb3IiLCJyZXN1bHQiLCJyZXF1ZXN0QWNjb3VudHMiLCJ0aGVuIiwiYnRuQmFsYW5jZSIsImdldEJhbGFuY2UiLCJidG5TaWduVHJhbnNhY3Rpb24iLCJzaWduVHJhbnNhY3Rpb24iLCJidG5TZW5kVHJhbnNhY3Rpb24iLCJidG5TaWduTWVzc2FnZSIsInNpZ25hdHVyZSIsInBlcnNvbmFsIiwic2lnbiIsIm1lc3NhZ2UiLCJidG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMiLCJyZXF1ZXN0IiwibWV0aG9kIiwicmV0IiwiYnRuUmVxdWVzdF9ldGhfc2lnbiIsImJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbiIsImdhc1ByaWNlIiwibm9uY2UiLCJnYXMiLCJib2R5IiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQSxJQUFNQSxjQUFjLEdBQUcsMEJBQXZCOztBQUVPLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNDLENBQUQsRUFBVztBQUM3QixNQUFJQyxLQUFLLENBQUNDLE1BQU0sQ0FBQ0YsQ0FBRCxDQUFQLENBQVQsRUFBc0IsT0FBTyxJQUFJRyxxQkFBSixDQUFPLENBQVAsQ0FBUDtBQUN0QixNQUFJSCxDQUFDLFlBQVlHLHFCQUFqQixFQUFxQixPQUFPSCxDQUFQOztBQUVyQixNQUFJLE9BQU9BLENBQVAsS0FBYSxRQUFqQixFQUEyQjtBQUN6QixRQUFJQSxDQUFDLENBQUNJLE9BQUYsQ0FBVSxJQUFWLE1BQW9CLENBQXBCLElBQXlCSixDQUFDLENBQUNJLE9BQUYsQ0FBVSxLQUFWLE1BQXFCLENBQWxELEVBQXFEO0FBQ25ELGFBQU8sSUFBSUQscUJBQUosQ0FBT0gsQ0FBQyxDQUFDSyxPQUFGLENBQVUsSUFBVixFQUFnQixFQUFoQixDQUFQLEVBQTRCLEVBQTVCLENBQVA7QUFDRDtBQUNGOztBQUNELFNBQU8sSUFBSUYscUJBQUosQ0FBT0gsQ0FBUCxDQUFQO0FBQ0QsQ0FWTTs7OztBQVlBLFNBQVNNLGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCO0FBQ2pDLFNBQU9BLEdBQUcsQ0FBQ0MsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFiLE1BQW9CLElBQTNCO0FBQ0Q7O0FBRU0sU0FBU0MsWUFBVCxDQUFzQkYsR0FBdEIsRUFBbUM7QUFDeEMsTUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0IsV0FBT0EsR0FBUDtBQUNEOztBQUNELFNBQU9ELGFBQWEsQ0FBQ0MsR0FBRCxDQUFiLEdBQXFCQSxHQUFyQixl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Qkg7O0FBRHVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXpEOztBQUFBO0FBQUE7QUFBQTtBQUFBLEssQ0F5QkE7O0FBQ0FNLFFBQVEsQ0FBQzZCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQi9CLEdBQXJCO0FBQ0FDLFFBQVEsQ0FBQzZCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQnBCLFVBQXJCO0FBQ0FWLFFBQVEsQ0FBQzZCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQmxCLGtCQUFyQjtBQUNBWixRQUFRLENBQUM2QixJQUFULENBQWNDLE1BQWQsQ0FBcUJmLGNBQXJCO0FBQ0FmLFFBQVEsQ0FBQzZCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQmhCLGtCQUFyQjtBQUVBZCxRQUFRLENBQUM2QixJQUFULENBQWNDLE1BQWQsQ0FBcUI5QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBckI7QUFDQUQsUUFBUSxDQUFDNkIsSUFBVCxDQUFjQyxNQUFkLENBQXFCViw4QkFBckI7QUFDQXBCLFFBQVEsQ0FBQzZCLElBQVQsQ0FBY0MsTUFBZCxDQUFxQk4sbUJBQXJCO0FBQ0F4QixRQUFRLENBQUM2QixJQUFULENBQWNDLE1BQWQsQ0FBcUJMLDhCQUFyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbUtleVByb3ZpZGVyIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5pbXBvcnQgYWJpIGZyb20gXCJldGhlcmV1bWpzLWFiaVwiO1xuaW1wb3J0IEJOIGZyb20gXCJiaWdudW1iZXIuanNcIjtcblxuY29uc3QgQVBQUk9WRV9NRVRIT0QgPSBcImFwcHJvdmUoYWRkcmVzcyx1aW50MjU2KVwiO1xuXG5leHBvcnQgY29uc3QgdG9CTiA9ICh4KTogQk4gPT4ge1xuICBpZiAoaXNOYU4oTnVtYmVyKHgpKSkgcmV0dXJuIG5ldyBCTigwKTtcbiAgaWYgKHggaW5zdGFuY2VvZiBCTikgcmV0dXJuIHg7XG5cbiAgaWYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKHguaW5kZXhPZihcIjB4XCIpID09PSAwIHx8IHguaW5kZXhPZihcIi0weFwiKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBCTih4LnJlcGxhY2UoXCIweFwiLCBcIlwiKSwgMTYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3IEJOKHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGV4UHJlZml4ZWQoc3RyKSB7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgMikgPT09IFwiMHhcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhleFByZWZpeChzdHI6IHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbiAgcmV0dXJuIGlzSGV4UHJlZml4ZWQoc3RyKSA/IHN0ciA6IGAweCR7c3RyfWA7XG59XG5cbmludGVyZmFjZSBQcm92aWRlckNvbm5lY3RJbmZvIHtcbiAgcmVhZG9ubHkgY2hhaW5JZDogc3RyaW5nO1xufVxuXG5jb25zdCBfZ2V0RGF0YSA9IChzcGVuZGVyKSA9PiB7XG4gIGNvbnN0IHZhbHVlID0gdG9CTigyKS5wb3coMjU2KS5taW51cygxKS50b1N0cmluZygpO1xuICBjb25zdCBlbmNvZGVkID0gYWJpLnNpbXBsZUVuY29kZShBUFBST1ZFX01FVEhPRCwgc3BlbmRlciwgdmFsdWUpO1xuICBjb25zdCBkYXRhID0gYWRkSGV4UHJlZml4KGVuY29kZWQudG9TdHJpbmcoXCJoZXhcIikpO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IGlta2V5UHJvdmlkZXIgPSBuZXcgSW1LZXlQcm92aWRlcih7XG4gIHJwY1VybDogXCJodHRwczovL2V0aC1tYWlubmV0LnRva2VuLmltXCIsXG4gIGNoYWluSWQ6IDEsXG4gIGhlYWRlcnM6IHtcbiAgICBhZ2VudDogXCJpb3M6Mi40LjI6MlwiLFxuICB9LFxufSk7XG5pbWtleVByb3ZpZGVyLmVuYWJsZSgpO1xuY29uc3Qgd2ViMyA9IG5ldyBXZWIzKGlta2V5UHJvdmlkZXIgYXMgYW55KTtcblxuZXhwb3J0IGNvbnN0IHNldFVubGltaXRlZEFsbG93YW5jZUFzeW5jID0gYXN5bmMgKHsgZnJvbSwgc3BlbmRlciwgdG9rZW4gfSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIEB0cy1pZ25vcmUgbm8tYXN5bmMtcHJvbWlzZS1leGVjdXRvclxuICAgIC8vIGNvbnN0IHdlYjMgPSAod2luZG93IGFzIGFueSkud2ViMztcbiAgICBjb25zdCBjb250cmFjdEFkZHJlc3MgPSB0b2tlbi5hZGRyZXNzIHx8IHRva2VuLmNvbnRyYWN0QWRkcmVzcztcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAvLyBnYXNQcmljZTogXCIweDExM1wiLFxuICAgICAgLy8gZ2FzOiBcIjB4NTIwOFwiLFxuICAgICAgZnJvbSxcbiAgICAgIHRvOiBcIjB4MjQ5N0M2YzVmQ0IwMTE1MzViYTdDNWFBQzZlNDkyNDFjNDBjNUNBRlwiLFxuICAgICAgY29udHJhY3RBZGRyZXNzLFxuICAgICAgdmFsdWU6IFwiMHg5NlwiLFxuICAgICAgZGVjaW1hbDogMTgsXG4gICAgICBkYXRhOiBcIjB4MDBcIixcbiAgICB9O1xuXG4gICAgd2ViMy5ldGguc2VuZFRyYW5zYWN0aW9uKHBhcmFtcywgKGVyciwgdHhIYXNoKSA9PiB7XG4gICAgICBkZWJ1Z2dlcjsgLy8gQHRzLWlnbm9yZSBuby1kZWJ1Z2dlclxuICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgcmVzb2x2ZSh0eEhhc2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYWxsb3dhbmNlVGVzdCgpIHtcbiAgY29uc3QgdHhIYXNoID0gYXdhaXQgc2V0VW5saW1pdGVkQWxsb3dhbmNlQXN5bmMoe1xuICAgIGZyb206IFwiMHhhNzQyMGEyMjdlYjAzYTU4NDE1NDNjYzk4NjAxZjdmMGJmNDU4ZTFhXCIsXG4gICAgc3BlbmRlcjogXCIweDQxZjhkMTRjOTQ3NTQ0NEYzMEE4MDQzMUM2OGNmMjREQzlBODM2OWFcIixcbiAgICB0b2tlbjogeyBhZGRyZXNzOiBcIjB4MzIxMmIyOUUzMzU4N0EwMEZCMUM4MzM0NmY1ZEJGQTY5QTQ1ODkyM1wiIH0sXG4gIH0pO1xuICBjb25zb2xlLmxvZyhcInR4aGFzaDogXCIsIHR4SGFzaCk7XG59XG5cbi8vIGFsbG93YW5jZVRlc3QoKTtcbmlta2V5UHJvdmlkZXIub24oXCJkaXNjb25uZWN0XCIsIChjb2RlOiBhbnksIHJlYXNvbjogYW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKGBFdGhlcmV1bSBQcm92aWRlciBjb25uZWN0aW9uIGNsb3NlZDogJHtyZWFzb259LiBDb2RlOiAke2NvZGV9YCk7XG59KTtcblxuaW1rZXlQcm92aWRlci5vbihcImNvbm5lY3RcIiwgKGNvbm5lY3RJbmZvOiBQcm92aWRlckNvbm5lY3RJbmZvKSA9PiB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGBFdGhlcmV1bSBQcm92aWRlciBjb25uZWN0ZWQgc3VjY2VzcywgY2hhaW5JZDogJHtjb25uZWN0SW5mby5jaGFpbklkfWBcbiAgKTtcbn0pO1xuXG5jb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuLmlubmVyVGV4dCA9IFwicmVxdWVzdEFjY291bnRzXCI7XG5idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGgucmVxdWVzdEFjY291bnRzKHNob3dSZXN1bHQpLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0bkJhbGFuY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuQmFsYW5jZS5pbm5lclRleHQgPSBcIkdldCBCYWxhbmNlXCI7XG5idG5CYWxhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICB3ZWIzLmV0aFxuICAgIC5nZXRCYWxhbmNlKFwiMHg4NjYzYjgxMWM5NjAxZGIxYzVhOTNlNDFiODk0MTk2NDAwYzE0ZWQ2XCIpXG4gICAgLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0blNpZ25UcmFuc2FjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduVHJhbnNhY3Rpb24uaW5uZXJUZXh0ID0gXCJTaWduIFRyYW5zYWN0aW9uXCI7XG5idG5TaWduVHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IFJMUEVuY29kZWRUcmFuc2FjdGlvbikge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoXG4gICAgLnNpZ25UcmFuc2FjdGlvbihcbiAgICAgIHtcbiAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgLy8gZ2FzUHJpY2U6IFwiMjAwMDAwMDAwMDhcIixcbiAgICAgICAgLy8gbm9uY2U6IDgsXG4gICAgICAgIC8vIGdhczogXCIyMTAwMFwiLFxuICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgdmFsdWU6IFwiMTAwMDAwMDAwMDAwMDAwMDAwXCIsXG4gICAgICAgIC8vIGNoYWluSWQ6IDMsXG4gICAgICAgIC8vIGRhdGE6IFwiXCIsXG4gICAgICB9LFxuICAgICAgc2hvd1Jlc3VsdFxuICAgIClcbiAgICAudGhlbihjb25zb2xlLmxvZyk7XG59KTtcblxuY29uc3QgYnRuU2VuZFRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blNlbmRUcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcIlNlbmQgVHJhbnNhY3Rpb25cIjtcbmJ0blNlbmRUcmFuc2FjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZnVuY3Rpb24gc2hvd1Jlc3VsdChlcnJvcjogRXJyb3IsIHJlc3VsdDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGhcbiAgICAuc2VuZFRyYW5zYWN0aW9uKHtcbiAgICAgIGZyb206IFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICAvLyBnYXNQcmljZTogXCIyMDAwMDAwMDAwOFwiLFxuICAgICAgLy8gbm9uY2U6IDgsXG4gICAgICAvLyBnYXM6IFwiMjEwMDBcIixcbiAgICAgIHRvOiBcIjB4MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNVwiLFxuICAgICAgdmFsdWU6IFwiMTAwMDAwMDAwMDAwMDAwMDAwXCIsXG4gICAgICAvLyBjaGFpbklkOiAzLFxuICAgICAgLy8gZGF0YTogXCJcIixcbiAgICB9KVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduTWVzc2FnZS5pbm5lclRleHQgPSBcIlNpZ24gTWVzc2FnZVwiO1xuYnRuU2lnbk1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCBzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnBlcnNvbmFsXG4gICAgLnNpZ24oXG4gICAgICBcIkhlbGxvIGltS2V5XCIsXG4gICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgXCJcIixcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZTogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMuaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9yZXF1ZXN0QWNjb3VudHNcIjtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgLy8gY29uc3QgYWNjb3VudHMgPSBldGhlcmV1bS5lbmFibGUoKTtcbiAgLy8gY29uc3QgYWNjb3VudHMyID0gZXRoZXJldW0uc2VuZCgnZXRoX3JlcXVlc3RBY2NvdW50cycpXG4gIC8vIC50aGVuKChyZXQ6IGFueSkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgLy8gfSlcbiAgLy8gLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZ1xuICAvLyB9KTtcbiAgLy8gY29uc3QgYWNjb3VudHMzID0gYXdhaXQgZXRoZXJldW0uc2VuZEFzeW5jKHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSk7XG4gIC8vIGNvbnNvbGUubG9nKFwiYWNjb3VudHMzOiBcIixhY2NvdW50czMpO1xuICAvLyBjb25zdCBhY2NvdW50czQgPSBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSlcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czQ6IFwiLGFjY291bnRzNCk7XG5cbiAgaW1rZXlQcm92aWRlclxuICAgIC5yZXF1ZXN0KHsgbWV0aG9kOiBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgcGFyYW1zOiBbXSB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5SZXF1ZXN0X2V0aF9zaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9zaWduXCI7XG5idG5SZXF1ZXN0X2V0aF9zaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcInBlcnNvbmFsX3NpZ25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICBcIjB4NDkyMDY4NjE3NjY1MjAzMTMwMzBlMjgyYWNcIixcbiAgICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25UcmFuc2FjdGlvblwiO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcImV0aF9zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgICBnYXNQcmljZTogXCIweDRhODE3YzgwOFwiLFxuICAgICAgICAgIG5vbmNlOiA4LFxuICAgICAgICAgIGdhczogXCIweDUyMDhcIixcbiAgICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgICB2YWx1ZTogXCIweDIwMFwiLFxuICAgICAgICAgIGNoYWluSWQ6IDMsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuLy8gZG9jdW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5CYWxhbmNlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25UcmFuc2FjdGlvbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TaWduTWVzc2FnZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TZW5kVHJhbnNhY3Rpb24pO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blJlcXVlc3RfZXRoX3NpZ24pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uKTtcbiJdfQ==