"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./index"));

var _web = _interopRequireDefault(require("web3"));

var imkeyProvider = new _index["default"]({
  rpcUrl: "https://kovan.infura.io/v3/ab0ae463c282483a83e8116eb535e435",
  chainId: 3
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
    value: "512" // chainId: 3,
    // data: "",

  }, showResult).then(console.log);
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
document.body.append(document.createElement("br"));
document.body.append(btnRequest_eth_requestAccounts);
document.body.append(btnRequest_eth_sign);
document.body.append(btnRequest_eth_signTransaction);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImVuYWJsZSIsIndlYjMiLCJXZWIzIiwib24iLCJjb2RlIiwicmVhc29uIiwiY29uc29sZSIsImxvZyIsImNvbm5lY3RJbmZvIiwiYnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzaG93UmVzdWx0IiwiZXJyb3IiLCJyZXN1bHQiLCJldGgiLCJyZXF1ZXN0QWNjb3VudHMiLCJ0aGVuIiwiYnRuQmFsYW5jZSIsImdldEJhbGFuY2UiLCJidG5TaWduVHJhbnNhY3Rpb24iLCJzaWduVHJhbnNhY3Rpb24iLCJmcm9tIiwidG8iLCJ2YWx1ZSIsImJ0blNpZ25NZXNzYWdlIiwic2lnbmF0dXJlIiwicGVyc29uYWwiLCJzaWduIiwibWVzc2FnZSIsImJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyIsInJlcXVlc3QiLCJtZXRob2QiLCJwYXJhbXMiLCJyZXQiLCJidG5SZXF1ZXN0X2V0aF9zaWduIiwiYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uIiwiZ2FzUHJpY2UiLCJub25jZSIsImdhcyIsImRhdGEiLCJib2R5IiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQVFBLElBQU1BLGFBQWEsR0FBRyxJQUFJQyxpQkFBSixDQUFrQjtBQUN0Q0MsRUFBQUEsTUFBTSxFQUFFLDZEQUQ4QjtBQUV0Q0MsRUFBQUEsT0FBTyxFQUFFO0FBRjZCLENBQWxCLENBQXRCO0FBSUFILGFBQWEsQ0FBQ0ksTUFBZDtBQUNBLElBQU1DLElBQUksR0FBRyxJQUFJQyxlQUFKLENBQVNOLGFBQVQsQ0FBYjtBQUVBQSxhQUFhLENBQUNPLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsVUFBQ0MsSUFBRCxFQUFZQyxNQUFaLEVBQTRCO0FB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QU9FNUIsZ0JBQUFBLE9BQU8sRUFBRSxDQVBYO0FBUUU0QyxnQkFBQUEsSUFBSSxFQUFFO0FBUlIsZUFETTtBQUZELGFBRFgsRUFnQkd2QixJQWhCSCxDQWdCUSxVQUFDaUIsR0FBRCxFQUFTO0FBQ2IvQixjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWThCLEdBQVo7QUFDRCxhQWxCSCxXQW1CUyxVQUFDckIsS0FBRCxFQUFXO0FBQ2hCVixjQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDRCxhQXJCSDs7QUFEdUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBekQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSyxDQXlCQTs7QUFDQUcsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCcEMsR0FBckI7QUFDQUMsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCeEIsVUFBckI7QUFDQVgsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCdEIsa0JBQXJCO0FBQ0FiLFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQmpCLGNBQXJCO0FBRUFsQixRQUFRLENBQUNrQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJuQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBckI7QUFDQUQsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCWiw4QkFBckI7QUFDQXZCLFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQlAsbUJBQXJCO0FBQ0E1QixRQUFRLENBQUNrQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJOLDhCQUFyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbUtleVByb3ZpZGVyIGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgV2ViMyBmcm9tIFwid2ViM1wiO1xuaW1wb3J0IHsgUkxQRW5jb2RlZFRyYW5zYWN0aW9uIH0gZnJvbSBcIndlYjMtZXRoXCI7XG5cblxuaW50ZXJmYWNlIFByb3ZpZGVyQ29ubmVjdEluZm8ge1xuICByZWFkb25seSBjaGFpbklkOiBzdHJpbmc7XG59XG5cbmNvbnN0IGlta2V5UHJvdmlkZXIgPSBuZXcgSW1LZXlQcm92aWRlcih7XG4gIHJwY1VybDogXCJodHRwczovL2tvdmFuLmluZnVyYS5pby92My9hYjBhZTQ2M2MyODI0ODNhODNlODExNmViNTM1ZTQzNVwiLFxuICBjaGFpbklkOiAzLFxufSk7XG5pbWtleVByb3ZpZGVyLmVuYWJsZSgpO1xuY29uc3Qgd2ViMyA9IG5ldyBXZWIzKGlta2V5UHJvdmlkZXIgYXMgYW55KTtcblxuaW1rZXlQcm92aWRlci5vbihcImRpc2Nvbm5lY3RcIiwgKGNvZGU6IGFueSwgcmVhc29uOiBhbnkpID0+IHtcbiAgY29uc29sZS5sb2coYEV0aGVyZXVtIFByb3ZpZGVyIGNvbm5lY3Rpb24gY2xvc2VkOiAke3JlYXNvbn0uIENvZGU6ICR7Y29kZX1gKTtcbn0pO1xuXG5pbWtleVByb3ZpZGVyLm9uKFwiY29ubmVjdFwiLCAoY29ubmVjdEluZm86IFByb3ZpZGVyQ29ubmVjdEluZm8pID0+IHtcbiAgY29uc29sZS5sb2coXG4gICAgYEV0aGVyZXVtIFByb3ZpZGVyIGNvbm5lY3RlZCBzdWNjZXNzLCBjaGFpbklkOiAke2Nvbm5lY3RJbmZvLmNoYWluSWR9YFxuICApO1xufSk7XG5cbmNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG4uaW5uZXJUZXh0ID0gXCJyZXF1ZXN0QWNjb3VudHNcIjtcbmJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZnVuY3Rpb24gc2hvd1Jlc3VsdChlcnJvcjogRXJyb3IsIHJlc3VsdDogc3RyaW5nW10pIHtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IGVycm9yOiBcIiwgZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgcmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICB3ZWIzLmV0aC5yZXF1ZXN0QWNjb3VudHMoc2hvd1Jlc3VsdCkudGhlbihjb25zb2xlLmxvZyk7XG59KTtcblxuY29uc3QgYnRuQmFsYW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5CYWxhbmNlLmlubmVyVGV4dCA9IFwiR2V0IEJhbGFuY2VcIjtcbmJ0bkJhbGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIHdlYjMuZXRoXG4gICAgLmdldEJhbGFuY2UoXCIweDg2NjNiODExYzk2MDFkYjFjNWE5M2U0MWI4OTQxOTY0MDBjMTRlZDZcIilcbiAgICAudGhlbihjb25zb2xlLmxvZyk7XG59KTtcblxuY29uc3QgYnRuU2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blNpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcIlNpZ24gVHJhbnNhY3Rpb25cIjtcbmJ0blNpZ25UcmFuc2FjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZnVuY3Rpb24gc2hvd1Jlc3VsdChlcnJvcjogRXJyb3IsIHJlc3VsdDogUkxQRW5jb2RlZFRyYW5zYWN0aW9uKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGhcbiAgICAuc2lnblRyYW5zYWN0aW9uKFxuICAgICAge1xuICAgICAgICBmcm9tOiBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgICAvLyBnYXNQcmljZTogXCIyMDAwMDAwMDAwOFwiLFxuICAgICAgICAvLyBub25jZTogOCxcbiAgICAgICAgLy8gZ2FzOiBcIjIxMDAwXCIsXG4gICAgICAgIHRvOiBcIjB4MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNVwiLFxuICAgICAgICB2YWx1ZTogXCI1MTJcIixcbiAgICAgICAgLy8gY2hhaW5JZDogMyxcbiAgICAgICAgLy8gZGF0YTogXCJcIixcbiAgICAgIH0sXG4gICAgICBzaG93UmVzdWx0XG4gICAgKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5TaWduTWVzc2FnZS5pbm5lclRleHQgPSBcIlNpZ24gTWVzc2FnZVwiO1xuYnRuU2lnbk1lc3NhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQoZXJyb3I6IEVycm9yLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCBzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnBlcnNvbmFsXG4gICAgLnNpZ24oXG4gICAgICBcIkhlbGxvIGltS2V5XCIsXG4gICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgXCJcIixcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgbWVzc2FnZTogXCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5idG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMuaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9yZXF1ZXN0QWNjb3VudHNcIjtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgLy8gY29uc3QgYWNjb3VudHMgPSBldGhlcmV1bS5lbmFibGUoKTtcbiAgLy8gY29uc3QgYWNjb3VudHMyID0gZXRoZXJldW0uc2VuZCgnZXRoX3JlcXVlc3RBY2NvdW50cycpXG4gIC8vIC50aGVuKChyZXQ6IGFueSkgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgLy8gfSlcbiAgLy8gLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZ1xuICAvLyB9KTtcbiAgLy8gY29uc3QgYWNjb3VudHMzID0gYXdhaXQgZXRoZXJldW0uc2VuZEFzeW5jKHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSk7XG4gIC8vIGNvbnNvbGUubG9nKFwiYWNjb3VudHMzOiBcIixhY2NvdW50czMpO1xuICAvLyBjb25zdCBhY2NvdW50czQgPSBhd2FpdCBldGhlcmV1bS5yZXF1ZXN0KHsgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cycgfSlcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czQ6IFwiLGFjY291bnRzNCk7XG5cbiAgaW1rZXlQcm92aWRlclxuICAgIC5yZXF1ZXN0KHsgbWV0aG9kOiBcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgcGFyYW1zOiBbXSB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5SZXF1ZXN0X2V0aF9zaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uaW5uZXJUZXh0ID0gXCJyZXF1ZXN0IGV0aF9zaWduXCI7XG5idG5SZXF1ZXN0X2V0aF9zaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcInBlcnNvbmFsX3NpZ25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICBcIjB4NDkyMDY4NjE3NjY1MjAzMTMwMzBlMjgyYWNcIixcbiAgICAgICAgXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25UcmFuc2FjdGlvblwiO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcImV0aF9zaWduVHJhbnNhY3Rpb25cIixcbiAgICAgIHBhcmFtczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJvbTogXCIweDYwMzE1NjRlN2IyRjVjYzMzNzM3ODA3YjJFNThEYUZGODcwQjU5MGJcIixcbiAgICAgICAgICBnYXNQcmljZTogXCIweDRhODE3YzgwOFwiLFxuICAgICAgICAgIG5vbmNlOiA4LFxuICAgICAgICAgIGdhczogXCIweDUyMDhcIixcbiAgICAgICAgICB0bzogXCIweDM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzVcIixcbiAgICAgICAgICB2YWx1ZTogXCIweDIwMFwiLFxuICAgICAgICAgIGNoYWluSWQ6IDMsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSlcbiAgICAudGhlbigocmV0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2c7XG4gICAgfSk7XG59KTtcblxuLy8gZG9jdW1lbnQuYXBwZW5kQ2hpbGQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5CYWxhbmNlKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25UcmFuc2FjdGlvbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5TaWduTWVzc2FnZSk7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5SZXF1ZXN0X2V0aF9yZXF1ZXN0QWNjb3VudHMpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuUmVxdWVzdF9ldGhfc2lnbik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5SZXF1ZXN0X2V0aF9zaWduVHJhbnNhY3Rpb24pO1xuIl19