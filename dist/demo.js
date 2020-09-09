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
    "": ""
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImhlYWRlcnMiLCJlbmFibGUiLCJ3ZWIzIiwiV2ViMyIsIm9uIiwiY29kZSIsInJlYXNvbiIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0SW5mbyIsImJ0biIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2hvd1Jlc3VsdCIsImVycm9yIiwicmVzdWx0IiwiZXRoIiwicmVxdWVzdEFjY291bnRzIiwidGhlbiIsImJ0bkJhbGFuY2UiLCJnZXRCYWxhbmNlIiwiYnRuU2lnblRyYW5zYWN0aW9uIiwic2lnblRyYW5zYWN0aW9uIiwiZnJvbSIsInRvIiwidmFsdWUiLCJidG5TZW5kVHJhbnNhY3Rpb24iLCJzZW5kVHJhbnNhY3Rpb24iLCJidG5TaWduTWVzc2FnZSIsInNpZ25hdHVyZSIsInBlcnNvbmFsIiwic2lnbiIsIm1lc3NhZ2UiLCJidG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMiLCJyZXF1ZXN0IiwibWV0aG9kIiwicGFyYW1zIiwicmV0IiwiYnRuUmVxdWVzdF9ldGhfc2lnbiIsImJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbiIsImdhc1ByaWNlIiwibm9uY2UiLCJnYXMiLCJkYXRhIiwiYm9keSIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFRQSxJQUFNQSxhQUFhLEdBQUcsSUFBSUMsaUJBQUosQ0FBa0I7QUFDdENDLEVBQUFBLE1BQU0sRUFBRSw4QkFEOEI7QUFFdENDLEVBQUFBLE9BQU8sRUFBRSxDQUY2QjtBQUd0Q0MsRUFBQUEsT0FBTyxFQUFFO0FBQ1AsUUFBSTtBQURHO0FBSDZCLENBQWxCLENBQXRCO0FBT0FKLGFBQWEsQ0FBQ0ssTUFBZDtBQUNBLElBQU1DLElBQUksR0FBRyxJQUFJ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ckJIOztBQUR1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUF6RDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLLENBeUJBOztBQUNBRyxRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJ0QyxHQUFyQjtBQUNBQyxRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUIxQixVQUFyQjtBQUNBWCxRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJ4QixrQkFBckI7QUFDQWIsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCakIsY0FBckI7QUFDQXBCLFFBQVEsQ0FBQ29DLElBQVQsQ0FBY0MsTUFBZCxDQUFxQm5CLGtCQUFyQjtBQUVBbEIsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCckMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBQXJCO0FBQ0FELFFBQVEsQ0FBQ29DLElBQVQsQ0FBY0MsTUFBZCxDQUFxQlosOEJBQXJCO0FBQ0F6QixRQUFRLENBQUNvQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJQLG1CQUFyQjtBQUNBOUIsUUFBUSxDQUFDb0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCTiw4QkFBckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1LZXlQcm92aWRlciBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuXG5cbmludGVyZmFjZSBQcm92aWRlckNvbm5lY3RJbmZvIHtcbiAgcmVhZG9ubHkgY2hhaW5JZDogc3RyaW5nO1xufVxuXG5jb25zdCBpbWtleVByb3ZpZGVyID0gbmV3IEltS2V5UHJvdmlkZXIoe1xuICBycGNVcmw6IFwicHV0IHlvdXIgaW5mdXJhIGFkZHJlc3MgaGVyZVwiLFxuICBjaGFpbklkOiAxLFxuICBoZWFkZXJzOiB7XG4gICAgXCJcIjogXCJcIlxuICB9XG59KTtcbmlta2V5UHJvdmlkZXIuZW5hYmxlKCk7XG5jb25zdCB3ZWIzID0gbmV3IFdlYjMoaW1rZXlQcm92aWRlciBhcyBhbnkpO1xuXG5pbWtleVByb3ZpZGVyLm9uKFwiZGlzY29ubmVjdFwiLCAoY29kZTogYW55LCByZWFzb246IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGlvbiBjbG9zZWQ6ICR7cmVhc29ufS4gQ29kZTogJHtjb2RlfWApO1xufSk7XG5cbmlta2V5UHJvdmlkZXIub24oXCJjb25uZWN0XCIsIChjb25uZWN0SW5mbzogUHJvdmlkZXJDb25uZWN0SW5mbykgPT4ge1xuICBjb25zb2xlLmxvZyhcbiAgICBgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGVkIHN1Y2Nlc3MsIGNoYWluSWQ6ICR7Y29ubmVjdEluZm8uY2hhaW5JZH1gXG4gICk7XG59KTtcblxuY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bi5pbm5lclRleHQgPSBcInJlcXVlc3RBY2NvdW50c1wiO1xuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBzdHJpbmdbXSkge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnJlcXVlc3RBY2NvdW50cyhzaG93UmVzdWx0KS50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5CYWxhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bkJhbGFuY2UuaW5uZXJUZXh0ID0gXCJHZXQgQmFsYW5jZVwiO1xuYnRuQmFsYW5jZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgd2ViMy5ldGhcbiAgICAuZ2V0QmFsYW5jZShcIjB4ODY2M2I4MTFjOTYwMWRiMWM1YTkzZTQxYjg5NDE5NjQwMGMxNGVkNlwiKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduVHJhbnNhY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuU2lnblRyYW5zYWN0aW9uLmlubmVyVGV4dCA9IFwiU2lnbiBUcmFuc2FjdGlvblwiO1xuYnRuU2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24pIHtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IGVycm9yOiBcIiwgZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgcmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICB3ZWIzLmV0aFxuICAgIC5zaWduVHJhbnNhY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGZyb206IFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICAgIC8vIGdhc1ByaWNlOiBcIjIwMDAwMDAwMDA4XCIsXG4gICAgICAgIC8vIG5vbmNlOiA4LFxuICAgICAgICAvLyBnYXM6IFwiMjEwMDBcIixcbiAgICAgICAgdG86IFwiMHgzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1XCIsXG4gICAgICAgIHZhbHVlOiBcIjEwMDAwMDAwMDAwMDAwMDAwMFwiLFxuICAgICAgICAvLyBjaGFpbklkOiAzLFxuICAgICAgICAvLyBkYXRhOiBcIlwiLFxuICAgICAgfSxcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0blNlbmRUcmFuc2FjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TZW5kVHJhbnNhY3Rpb24uaW5uZXJUZXh0ID0gXCJTZW5kIFRyYW5zYWN0aW9uXCI7XG5idG5TZW5kVHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCByZXN1bHQ6IFJMUEVuY29kZWRUcmFuc2FjdGlvbikge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoXG4gICAgLnNlbmRUcmFuc2FjdGlvbihcbiAgICAgIHtcbiAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgLy8gZ2FzUHJpY2U6IFwiMjAwMDAwMDAwMDhcIixcbiAgICAgICAgLy8gbm9uY2U6IDgsXG4gICAgICAgIC8vIGdhczogXCIyMTAwMFwiLFxuICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgdmFsdWU6IFwiMTAwMDAwMDAwMDAwMDAwMDAwXCIsXG4gICAgICAgIC8vIGNoYWluSWQ6IDMsXG4gICAgICAgIC8vIGRhdGE6IFwiXCIsXG4gICAgICB9XG4gICAgKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduTWVzc2FnZS5pbm5lclRleHQgPSBcIlNpZ24gTWVzc2FnZVwiO1xuYnRuU2lnbk1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCBzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnBlcnNvbmFsXG4gICAgLnNpZ24oXG4gICAgICBcIkhlbGxvIGltS2V5XCIsXG4gICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgXCJcIixcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZTogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMuaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9yZXF1ZXN0QWNjb3VudHNcIjtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgLy8gY29uc3QgYWNjb3VudHMgPSBldGhlcmV1bS5lbmFibGUoKTtcbiAgLy8gY29uc3QgYWNjb3VudHMyID0gZXRoZXJldW0uc2VuZCgnZXRoX3JlcXVlc3RBY2NvdW50cycpXG4gIC8vIC50aGVuKChyZXQ6IGFueSkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgLy8gfSlcbiAgLy8gLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZ1xuICAvLyB9KTtcbiAgLy8gY29uc3QgYWNjb3VudHMzID0gYXdhaXQgZXRoZXJldW0uc2VuZEFzeW5jKHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSk7XG4gIC8vIGNvbnNvbGUubG9nKFwiYWNjb3VudHMzOiBcIixhY2NvdW50czMpO1xuICAvLyBjb25zdCBhY2NvdW50czQgPSBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSlcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czQ6IFwiLGFjY291bnRzNCk7XG5cbiAgaW1rZXlQcm92aWRlclxuICAgIC5yZXF1ZXN0KHsgbWV0aG9kOiBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgcGFyYW1zOiBbXSB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5SZXF1ZXN0X2V0aF9zaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9zaWduXCI7XG5idG5SZXF1ZXN0X2V0aF9zaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcInBlcnNvbmFsX3NpZ25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICBcIjB4NDkyMDY4NjE3NjY1MjAzMTMwMzBlMjgyYWNcIixcbiAgICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25UcmFuc2FjdGlvblwiO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcImV0aF9zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgICBnYXNQcmljZTogXCIweDRhODE3YzgwOFwiLFxuICAgICAgICAgIG5vbmNlOiA4LFxuICAgICAgICAgIGdhczogXCIweDUyMDhcIixcbiAgICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgICB2YWx1ZTogXCIweDIwMFwiLFxuICAgICAgICAgIGNoYWluSWQ6IDMsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuLy8gZG9jdW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5CYWxhbmNlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25UcmFuc2FjdGlvbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TaWduTWVzc2FnZSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TZW5kVHJhbnNhY3Rpb24pO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blJlcXVlc3RfZXRoX3NpZ24pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uKTtcbiJdfQ==