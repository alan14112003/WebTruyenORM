"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("./auth"));
var _story = _interopRequireDefault(require("./story"));
var _util = _interopRequireDefault(require("./util"));
var _Auth = _interopRequireDefault(require("../../app/www/middleware/Auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var RouterV1 = _express["default"].Router();
RouterV1.use(_auth["default"]);

// những route này phải xác thực người dùng
RouterV1.use(_Auth["default"].checkAuth);
RouterV1.use(_story["default"]);
RouterV1.use(_util["default"]);
var _default = exports["default"] = RouterV1;