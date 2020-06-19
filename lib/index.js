"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImKeyProvider = // endpoint: string;
function ImKeyProvider(provider) {
  _classCallCheck(this, ImKeyProvider);

  var web3 = new _web["default"](provider);
  web3.eth.requestAccounts = imKeyRequestAccounts;
};

exports["default"] = ImKeyProvider;

function imKeyRequestAccounts() {
  return new Promise(function (resolve, reject) {
    console.log('初始化');
    resolve(["0x32D7b16d736897c310f79020a464D4EC47D07430"]);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJJbUtleVByb3ZpZGVyIiwicHJvdmlkZXIiLCJ3ZWIzIiwiV2ViMyIsImV0aCIsInJlcXVlc3RBY2NvdW50cyIsImltS2V5UmVxdWVzdEFjY291bnRzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsYSxHQUVqQjtBQUVBLHVCQUFZQyxRQUFaLEVBQThCO0FBQUE7O0FBQzFCLE1BQUlDLElBQUksR0FBRyxJQUFJQyxlQUFKLENBQVNGLFFBQVQsQ0FBWDtBQUNBQyxFQUFBQSxJQUFJLENBQUNFLEdBQUwsQ0FBU0MsZUFBVCxHQUEyQkMsb0JBQTNCO0FBQ0gsQzs7OztBQUdMLFNBQVNBLG9CQUFULEdBQWdDO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFzQixVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDOUNDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFFQUgsSUFBQUEsT0FBTyxDQUFDLENBQUMsNENBQUQsQ0FBRCxDQUFQO0FBQ0gsR0FKTSxDQUFQO0FBS0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViMyBmcm9tICd3ZWIzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1LZXlQcm92aWRlciB7XG5cbiAgICAvLyBlbmRwb2ludDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJvdmlkZXI6IHN0cmluZykge1xuICAgICAgICBsZXQgd2ViMyA9IG5ldyBXZWIzKHByb3ZpZGVyKTtcbiAgICAgICAgd2ViMy5ldGgucmVxdWVzdEFjY291bnRzID0gaW1LZXlSZXF1ZXN0QWNjb3VudHM7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbUtleVJlcXVlc3RBY2NvdW50cygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+WIneWni+WMlicpO1xuXG4gICAgICAgIHJlc29sdmUoW1wiMHgzMkQ3YjE2ZDczNjg5N2MzMTBmNzkwMjBhNDY0RDRFQzQ3RDA3NDMwXCJdKTtcbiAgICB9KVxufVxuIl19