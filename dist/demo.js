"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./index"));

var _web = _interopRequireDefault(require("web3"));

var imkeyProvider = new _index["default"]({
  rpcUrl: "https://kovan.infura.io/v3/ab0ae463c282483a83e8116eb535e435",
  chainId: 42
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLnRzIl0sIm5hbWVzIjpbImlta2V5UHJvdmlkZXIiLCJJbUtleVByb3ZpZGVyIiwicnBjVXJsIiwiY2hhaW5JZCIsImVuYWJsZSIsIndlYjMiLCJXZWIzIiwib24iLCJjb2RlIiwicmVhc29uIiwiY29uc29sZSIsImxvZyIsImNvbm5lY3RJbmZvIiwiYnRuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzaG93UmVzdWx0IiwiZXJyb3IiLCJyZXN1bHQiLCJldGgiLCJyZXF1ZXN0QWNjb3VudHMiLCJ0aGVuIiwiYnRuQmFsYW5jZSIsImdldEJhbGFuY2UiLCJidG5TaWduVHJhbnNhY3Rpb24iLCJzaWduVHJhbnNhY3Rpb24iLCJmcm9tIiwidG8iLCJ2YWx1ZSIsImJ0blNpZ25NZXNzYWdlIiwic2lnbmF0dXJlIiwicGVyc29uYWwiLCJzaWduIiwibWVzc2FnZSIsImJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyIsInJlcXVlc3QiLCJtZXRob2QiLCJwYXJhbXMiLCJyZXQiLCJidG5SZXF1ZXN0X2V0aF9zaWduIiwiYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uIiwiZ2FzUHJpY2UiLCJub25jZSIsImdhcyIsImRhdGEiLCJib2R5IiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQVFBLElBQU1BLGFBQWEsR0FBRyxJQUFJQyxpQkFBSixDQUFrQjtBQUN0Q0MsRUFBQUEsTUFBTSxFQUFFLDZEQUQ4QjtBQUV0Q0MsRUFBQUEsT0FBTyxFQUFFO0FBRjZCLENBQWxCLENBQXRCO0FBSUFILGFBQWEsQ0FBQ0ksTUFBZDtBQUNBLElBQU1DLElBQUksR0FBRyxJQUFJQyxlQUFKLENBQVNOLGFBQVQsQ0FBYjtBQUVBQSxhQUFhLENBQUNPLEVBQWQsQ0FBaUIsWUFBakIsRUFBK0IsVUFBQ0MsSUFBRCxFQUFZQyxNQUFaLEVBQTRCO0FB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QUFPRTVCLGdCQUFBQSxPQUFPLEVBQUUsQ0FQWDtBQVFFNEMsZ0JBQUFBLElBQUksRUFBRTtBQVJSLGVBRE07QUFGRCxhQURYLEVBZ0JHdkIsSUFoQkgsQ0FnQlEsVUFBQ2lCLEdBQUQsRUFBUztBQUNiL0IsY0FBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk4QixHQUFaO0FBQ0QsYUFsQkgsV0FtQlMsVUFBQ3JCLEtBQUQsRUFBVztBQUNoQlYsY0FBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0QsYUFyQkg7O0FBRHVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXpEOztBQUFBO0FBQUE7QUFBQTtBQUFBLEssQ0F5QkE7O0FBQ0FHLFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQnBDLEdBQXJCO0FBQ0FDLFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQnhCLFVBQXJCO0FBQ0FYLFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQnRCLGtCQUFyQjtBQUNBYixRQUFRLENBQUNrQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJqQixjQUFyQjtBQUVBbEIsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCbkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBQXJCO0FBQ0FELFFBQVEsQ0FBQ2tDLElBQVQsQ0FBY0MsTUFBZCxDQUFxQlosOEJBQXJCO0FBQ0F2QixRQUFRLENBQUNrQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJQLG1CQUFyQjtBQUNBNUIsUUFBUSxDQUFDa0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCTiw4QkFBckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW1LZXlQcm92aWRlciBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IFdlYjMgZnJvbSBcIndlYjNcIjtcbmltcG9ydCB7IFJMUEVuY29kZWRUcmFuc2FjdGlvbiB9IGZyb20gXCJ3ZWIzLWV0aFwiO1xuXG5cbmludGVyZmFjZSBQcm92aWRlckNvbm5lY3RJbmZvIHtcbiAgcmVhZG9ubHkgY2hhaW5JZDogc3RyaW5nO1xufVxuXG5jb25zdCBpbWtleVByb3ZpZGVyID0gbmV3IEltS2V5UHJvdmlkZXIoe1xuICBycGNVcmw6IFwiaHR0cHM6Ly9rb3Zhbi5pbmZ1cmEuaW8vdjMvYWIwYWU0NjNjMjgyNDgzYTgzZTgxMTZlYjUzNWU0MzVcIixcbiAgY2hhaW5JZDogNDIsXG59KTtcbmlta2V5UHJvdmlkZXIuZW5hYmxlKCk7XG5jb25zdCB3ZWIzID0gbmV3IFdlYjMoaW1rZXlQcm92aWRlciBhcyBhbnkpO1xuXG5pbWtleVByb3ZpZGVyLm9uKFwiZGlzY29ubmVjdFwiLCAoY29kZTogYW55LCByZWFzb246IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGlvbiBjbG9zZWQ6ICR7cmVhc29ufS4gQ29kZTogJHtjb2RlfWApO1xufSk7XG5cbmlta2V5UHJvdmlkZXIub24oXCJjb25uZWN0XCIsIChjb25uZWN0SW5mbzogUHJvdmlkZXJDb25uZWN0SW5mbykgPT4ge1xuICBjb25zb2xlLmxvZyhcbiAgICBgRXRoZXJldW0gUHJvdmlkZXIgY29ubmVjdGVkIHN1Y2Nlc3MsIGNoYWluSWQ6ICR7Y29ubmVjdEluZm8uY2hhaW5JZH1gXG4gICk7XG59KTtcblxuY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bi5pbm5lclRleHQgPSBcInJlcXVlc3RBY2NvdW50c1wiO1xuYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBzdHJpbmdbXSkge1xuICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyByZXN1bHQ6IFwiLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHdlYjMuZXRoLnJlcXVlc3RBY2NvdW50cyhzaG93UmVzdWx0KS50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5CYWxhbmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0bkJhbGFuY2UuaW5uZXJUZXh0ID0gXCJHZXQgQmFsYW5jZVwiO1xuYnRuQmFsYW5jZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgd2ViMy5ldGhcbiAgICAuZ2V0QmFsYW5jZShcIjB4ODY2M2I4MTFjOTYwMWRiMWM1YTkzZTQxYjg5NDE5NjQwMGMxNGVkNlwiKVxuICAgIC50aGVuKGNvbnNvbGUubG9nKTtcbn0pO1xuXG5jb25zdCBidG5TaWduVHJhbnNhY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuU2lnblRyYW5zYWN0aW9uLmlubmVyVGV4dCA9IFwiU2lnbiBUcmFuc2FjdGlvblwiO1xuYnRuU2lnblRyYW5zYWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBmdW5jdGlvbiBzaG93UmVzdWx0KGVycm9yOiBFcnJvciwgcmVzdWx0OiBSTFBFbmNvZGVkVHJhbnNhY3Rpb24pIHtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IGVycm9yOiBcIiwgZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNob3cgcmVzdWx0OiBcIiwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICB3ZWIzLmV0aFxuICAgIC5zaWduVHJhbnNhY3Rpb24oXG4gICAgICB7XG4gICAgICAgIGZyb206IFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICAgIC8vIGdhc1ByaWNlOiBcIjIwMDAwMDAwMDA4XCIsXG4gICAgICAgIC8vIG5vbmNlOiA4LFxuICAgICAgICAvLyBnYXM6IFwiMjEwMDBcIixcbiAgICAgICAgdG86IFwiMHgzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1XCIsXG4gICAgICAgIHZhbHVlOiBcIjEwMDAwMDAwMDAwMDAwMDAwMFwiLFxuICAgICAgICAvLyBjaGFpbklkOiAzLFxuICAgICAgICAvLyBkYXRhOiBcIlwiLFxuICAgICAgfSxcbiAgICAgIHNob3dSZXN1bHRcbiAgICApXG4gICAgLnRoZW4oY29uc29sZS5sb2cpO1xufSk7XG5cbmNvbnN0IGJ0blNpZ25NZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blNpZ25NZXNzYWdlLmlubmVyVGV4dCA9IFwiU2lnbiBNZXNzYWdlXCI7XG5idG5TaWduTWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZnVuY3Rpb24gc2hvd1Jlc3VsdChlcnJvcjogRXJyb3IsIHNpZ25hdHVyZTogc3RyaW5nKSB7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2hvdyBlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzaG93IHJlc3VsdDogXCIsIHNpZ25hdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgd2ViMy5ldGgucGVyc29uYWxcbiAgICAuc2lnbihcbiAgICAgIFwiSGVsbG8gaW1LZXlcIixcbiAgICAgIFwiMHg2MDMxNTY0ZTdiMkY1Y2MzMzczNzgwN2IyRTU4RGFGRjg3MEI1OTBiXCIsXG4gICAgICBcIlwiLFxuICAgICAgc2hvd1Jlc3VsdFxuICAgIClcbiAgICAudGhlbihjb25zb2xlLmxvZylcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvciBtZXNzYWdlOiBcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgfSk7XG59KTtcblxuY29uc3QgYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cy5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3JlcXVlc3RBY2NvdW50c1wiO1xuYnRuUmVxdWVzdF9ldGhfcmVxdWVzdEFjY291bnRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAvLyBjb25zdCBhY2NvdW50cyA9IGV0aGVyZXVtLmVuYWJsZSgpO1xuICAvLyBjb25zdCBhY2NvdW50czIgPSBldGhlcmV1bS5zZW5kKCdldGhfcmVxdWVzdEFjY291bnRzJylcbiAgLy8gLnRoZW4oKHJldDogYW55KSA9PiB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhyZXQpO1xuICAvLyB9KVxuICAvLyAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgLy8gICAgIGNvbnNvbGUubG9nXG4gIC8vIH0pO1xuICAvLyBjb25zdCBhY2NvdW50czMgPSBhd2FpdCBldGhlcmV1bS5zZW5kQXN5bmMoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KTtcbiAgLy8gY29uc29sZS5sb2coXCJhY2NvdW50czM6IFwiLGFjY291bnRzMyk7XG4gIC8vIGNvbnN0IGFjY291bnRzNCA9IGF3YWl0IGV0aGVyZXVtLnJlcXVlc3QoeyBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyB9KVxuICAvLyBjb25zb2xlLmxvZyhcImFjY291bnRzNDogXCIsYWNjb3VudHM0KTtcblxuICBpbWtleVByb3ZpZGVyXG4gICAgLnJlcXVlc3QoeyBtZXRob2Q6IFwiZXRoX3JlcXVlc3RBY2NvdW50c1wiLCBwYXJhbXM6IFtdIH0pXG4gICAgLnRoZW4oKHJldCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmV0KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nO1xuICAgIH0pO1xufSk7XG5cbmNvbnN0IGJ0blJlcXVlc3RfZXRoX3NpZ24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuUmVxdWVzdF9ldGhfc2lnbi5pbm5lclRleHQgPSBcInJlcXVlc3QgZXRoX3NpZ25cIjtcbmJ0blJlcXVlc3RfZXRoX3NpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gIGlta2V5UHJvdmlkZXJcbiAgICAucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6IFwicGVyc29uYWxfc2lnblwiLFxuICAgICAgcGFyYW1zOiBbXG4gICAgICAgIFwiMHg0OTIwNjg2MTc2NjUyMDMxMzAzMGUyODJhY1wiLFxuICAgICAgICBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgXSxcbiAgICB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG5jb25zdCBidG5SZXF1ZXN0X2V0aF9zaWduVHJhbnNhY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuYnRuUmVxdWVzdF9ldGhfc2lnblRyYW5zYWN0aW9uLmlubmVyVGV4dCA9IFwicmVxdWVzdCBldGhfc2lnblRyYW5zYWN0aW9uXCI7XG5idG5SZXF1ZXN0X2V0aF9zaWduVHJhbnNhY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gIGlta2V5UHJvdmlkZXJcbiAgICAucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6IFwiZXRoX3NpZ25UcmFuc2FjdGlvblwiLFxuICAgICAgcGFyYW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmcm9tOiBcIjB4NjAzMTU2NGU3YjJGNWNjMzM3Mzc4MDdiMkU1OERhRkY4NzBCNTkwYlwiLFxuICAgICAgICAgIGdhc1ByaWNlOiBcIjB4NGE4MTdjODA4XCIsXG4gICAgICAgICAgbm9uY2U6IDgsXG4gICAgICAgICAgZ2FzOiBcIjB4NTIwOFwiLFxuICAgICAgICAgIHRvOiBcIjB4MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNTM1MzUzNVwiLFxuICAgICAgICAgIHZhbHVlOiBcIjB4MjAwXCIsXG4gICAgICAgICAgY2hhaW5JZDogMyxcbiAgICAgICAgICBkYXRhOiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KVxuICAgIC50aGVuKChyZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZztcbiAgICB9KTtcbn0pO1xuXG4vLyBkb2N1bWVudC5hcHBlbmRDaGlsZChidG4pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0bkJhbGFuY2UpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoYnRuU2lnblRyYW5zYWN0aW9uKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blNpZ25NZXNzYWdlKTtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blJlcXVlc3RfZXRoX3JlcXVlc3RBY2NvdW50cyk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZChidG5SZXF1ZXN0X2V0aF9zaWduKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGJ0blJlcXVlc3RfZXRoX3NpZ25UcmFuc2FjdGlvbik7XG4iXX0=