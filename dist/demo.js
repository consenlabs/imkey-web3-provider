"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./index"));

var _web = _interopRequireDefault(require("web3"));

var imkeyProvider = new _index["default"]({
  rpcUrl: "put your infura address here",
  chainId: 1,
  headers: {
    agent: "ios:25"
  }
});
imkeyProvider.enable();
var web3 = new _web["default"](imkeyProvider);
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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var btnRequest_eth_sign = document.createElement("button");
btnRequest_eth_sign.innerText = "request eth_sign";
btnRequest_eth_sign.addEventListener("click", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(e) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var btnRequest_eth_signTransaction = document.createElement("button");
btnRequest_eth_signTransaction.innerText = "request eth_signTransaction";
btnRequest_eth_signTransaction.addEventListener("click", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImhlYWRlcnMiLCJhZ2VudCIsImVuYWJsZSIsIndlYjMiLCJXZWIzIiwib24iLCJjb2RlIiwicmVhc29uIiwiY29uc29sZSIsImxvZyIsImNvbm5lY3RJbmZvIiwiYnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzaG93UmVzdWx0IiwiZXJyb3IiLCJyZXN1bHQiLCJldGgiLCJyZXF1ZXN0QWNjb3VudHMiLCJ0aGVuIiwiYnRuQmFsYW5jZSIsImdldEJhbGFuY2UiLCJidG5TaWduVHJhbnNhY3Rpb24iLCJzaWduVHJhbnNhY3Rpb24iLCJmcm9tIiwidG8iLCJ2YWx1ZSIsImJ0blNlbmRUcmFuc2FjdGlvbiIsInNlbmRUcmFuc2FjdGlvbiIsImJ0blNpZ25NZXNzYWdlIiwic2lnbmF0dXJlIiwicGVyc29uYWwiLCJzaWduIiwibWVzc2FnZSIsImJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyIsInJlcXVlc3QiLCJtZXRob2QiLCJwYXJhbXMiLCJyZXQiLCJidG5SZXF1ZXN0X2V0aF9zaWduIiwiYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uIiwiZ2FzUHJpY2UiLCJub25jZSIsImdhcyIsImRhdGEiLCJib2R5IiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQU9BLElBQU1BLGFBQWEsR0FBRyxJQUFJQyxpQkFBSixDQUFrQjtBQUN0Q0MsRUFBQUEsTUFBTSxFQUFFLDhCQUQ4QjtBQUV0Q0MsRUFBQUEsT0FBTyxFQUFFLENBRjZCO0FBR3RDQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsS0FBSyxFQUFFO0FBREE7QUFINkIsQ0FBbEIsQ0FBdEI7QUFPQUwsYUFBYSxDQUFDTSxNQUFkO0FBQ0Es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QUFPLENBQUNDLEdBQVI7QUFDRCxhQXJCSDs7QUFEdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSyxDQXlCQTs7QUFDQUcsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCdEMsR0FBckI7QUFDQUMsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCMUIsVUFBckI7QUFDQVgsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCeEIsa0JBQXJCO0FBQ0FiLFFBQVEsQ0FBQ29DLElBQVQsQ0FBY0MsTUFBZCxDQUFxQmpCLGNBQXJCO0FBQ0FwQixRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJuQixrQkFBckI7QUFFQWxCLFFBQVEsQ0FBQ29DLElBQVQsQ0FBY0MsTUFBZCxDQUFxQnJDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUFyQjtBQUNBRCxRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJaLDhCQUFyQjtBQUNBekIsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCUCxtQkFBckI7QUFDQTlCLFFBQVEsQ0FBQ29DLElBQVQsQ0FBY0MsTUFBZCxDQUFxQk4sOEJBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltS2V5UHJvdmlkZXIgZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgeyBSTFBFbmNvZGVkVHJhbnNhY3Rpb24gfSBmcm9tIFwid2ViMy1ldGhcIjtcblxuaW50ZXJmYWNlIFByb3ZpZGVyQ29ubmVjdEluZm8ge1xuICByZWFkb25seSBjaGFpbklkOiBzdHJpbmc7XG59XG5cbmNvbnN0IGlta2V5UHJvdmlkZXIgPSBuZXcgSW1LZXlQcm92aWRlcih7XG4gIHJwY1VybDogXCJwdXQgeW91ciBpbmZ1cmEgYWRkcmVzcyBoZXJlXCIsXG4gIGNoYWluSWQ6IDEsXG4gIGhlYWRlcnM6IHtcbiAgICBhZ2VudDogXCJpb3M6MjVcIixcbiAgfSxcbn0pO1xuaW1rZXlQcm92aWRlci5lbmFibGUoKTtcbmNvbnN0IHdlYjMgPSBuZXcgV2ViMyhpbWtleVByb3ZpZGVyIGFzIGFueSk7XG5cbmlta2V5UHJvdmlkZXIub24oXCJkaXNjb25uZWN0XCIsIChjb2RlOiBhbnksIHJlYXNvbjogYW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKGBFdGhlcmV1bSBQcm92aWRlciBjb25uZWN0aW9uIGNsb3NlZDogJHtyZWFzb259LiBDb2RlOiAke2NvZGV9YCk7XG59KTtcblxuaW1rZXlQcm92aWRlci5vbihcImNvbm5lY3RcIiwgKGNvbm5lY3RJbmZvOiBQcm92aWRlckNvbm5lY3RJbmZvKSA9PiB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGBFdGhlcmV1bSBQcm92aWRlciBjb25uZWN0ZWQgc3VjY2VzcywgY2hhaW5JZDogJHtjb25uZWN0SW5mby5jaGFpbklkfWBcbiAgKTtcbn0pO1xuXG5jb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuLmlubmVyVGV4dCA9IFwicmVxdWVzdEFjY291bnRzXCI7XG5idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGgucmVxdWVzdEFjY291bnRzKHNob3dSZXN1bHQpLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0bkJhbGFuY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuQmFsYW5jZS5pbm5lclRleHQgPSBcIkdldCBCYWxhbmNlXCI7XG5idG5CYWxhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICB3ZWIzLmV0aFxuICAgIC5nZXRCYWxhbmNlKFwiMHg4NjYzYjgxMWM5NjAxZGIxYzVhOTNlNDFiODk0MTk2NDAwYzE0ZWQ2XCIpXG4gICAgLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0blNpZ25UcmFuc2FjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduVHJhbnNhY3Rpb24uaW5uZXJUZXh0ID0gXCJTaWduIFRyYW5zYWN0aW9uXCI7XG5idG5TaWduVHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IFJMUEVuY29kZWRUcmFuc2FjdGlvbikge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoXG4gICAgLnNpZ25UcmFuc2FjdGlvbihcbiAgICAgIHtcbiAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgLy8gZ2FzUHJpY2U6IFwiMjAwMDAwMDAwMDhcIixcbiAgICAgICAgLy8gbm9uY2U6IDgsXG4gICAgICAgIC8vIGdhczogXCIyMTAwMFwiLFxuICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgdmFsdWU6IFwiMTAwMDAwMDAwMDAwMDAwMDAwXCIsXG4gICAgICAgIC8vIGNoYWluSWQ6IDMsXG4gICAgICAgIC8vIGRhdGE6IFwiXCIsXG4gICAgICB9LFxuICAgICAgc2hvd1Jlc3VsdFxuICAgIClcbiAgICAudGhlbihjb25zb2xlLmxvZyk7XG59KTtcblxuY29uc3QgYnRuU2VuZFRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blNlbmRUcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcIlNlbmQgVHJhbnNhY3Rpb25cIjtcbmJ0blNlbmRUcmFuc2FjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZnVuY3Rpb24gc2hvd1Jlc3VsdChlcnJvcjogRXJyb3IsIHJlc3VsdDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGhcbiAgICAuc2VuZFRyYW5zYWN0aW9uKHtcbiAgICAgIGZyb206IFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICAvLyBnYXNQcmljZTogXCIyMDAwMDAwMDAwOFwiLFxuICAgICAgLy8gbm9uY2U6IDgsXG4gICAgICAvLyBnYXM6IFwiMjEwMDBcIixcbiAgICAgIHRvOiBcIjB4MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNVwiLFxuICAgICAgdmFsdWU6IFwiMTAwMDAwMDAwMDAwMDAwMDAwXCIsXG4gICAgICAvLyBjaGFpbklkOiAzLFxuICAgICAgLy8gZGF0YTogXCJcIixcbiAgICB9KVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduTWVzc2FnZS5pbm5lclRleHQgPSBcIlNpZ24gTWVzc2FnZVwiO1xuYnRuU2lnbk1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCBzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnBlcnNvbmFsXG4gICAgLnNpZ24oXG4gICAgICBcIkhlbGxvIGltS2V5XCIsXG4gICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgXCJcIixcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZTogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMuaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9yZXF1ZXN0QWNjb3VudHNcIjtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgLy8gY29uc3QgYWNjb3VudHMgPSBldGhlcmV1bS5lbmFibGUoKTtcbiAgLy8gY29uc3QgYWNjb3VudHMyID0gZXRoZXJldW0uc2VuZCgnZXRoX3JlcXVlc3RBY2NvdW50cycpXG4gIC8vIC50aGVuKChyZXQ6IGFueSkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgLy8gfSlcbiAgLy8gLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZ1xuICAvLyB9KTtcbiAgLy8gY29uc3QgYWNjb3VudHMzID0gYXdhaXQgZXRoZXJldW0uc2VuZEFzeW5jKHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSk7XG4gIC8vIGNvbnNvbGUubG9nKFwiYWNjb3VudHMzOiBcIixhY2NvdW50czMpO1xuICAvLyBjb25zdCBhY2NvdW50czQgPSBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSlcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czQ6IFwiLGFjY291bnRzNCk7XG5cbiAgaW1rZXlQcm92aWRlclxuICAgIC5yZXF1ZXN0KHsgbWV0aG9kOiBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgcGFyYW1zOiBbXSB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5SZXF1ZXN0X2V0aF9zaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9zaWduXCI7XG5idG5SZXF1ZXN0X2V0aF9zaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcInBlcnNvbmFsX3NpZ25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICBcIjB4NDkyMDY4NjE3NjY1MjAzMTMwMzBlMjgyYWNcIixcbiAgICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25UcmFuc2FjdGlvblwiO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcImV0aF9zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgICBnYXNQcmljZTogXCIweDRhODE3YzgwOFwiLFxuICAgICAgICAgIG5vbmNlOiA4LFxuICAgICAgICAgIGdhczogXCIweDUyMDhcIixcbiAgICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgICB2YWx1ZTogXCIweDIwMFwiLFxuICAgICAgICAgIGNoYWluSWQ6IDMsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuLy8gZG9jdW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5CYWxhbmNlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25UcmFuc2FjdGlvbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TaWduTWVzc2FnZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TZW5kVHJhbnNhY3Rpb24pO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blJlcXVlc3RfZXRoX3NpZ24pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uKTtcbiJdfQ==