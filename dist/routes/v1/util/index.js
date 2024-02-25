"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Upload = _interopRequireDefault(require("./Upload.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var UtilPackageRouter = _express["default"].Router();
UtilPackageRouter.use('/uploads', _Upload["default"]);
var _default = exports["default"] = UtilPackageRouter;