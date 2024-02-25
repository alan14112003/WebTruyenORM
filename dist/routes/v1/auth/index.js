"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Role = _interopRequireDefault(require("./Role.routes"));
var _Permission = _interopRequireDefault(require("./Permission.routes"));
var _Auth2 = _interopRequireDefault(require("./Auth.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var AuthPackageRouter = _express["default"].Router();
AuthPackageRouter.use('/roles', _Auth["default"].checkAuth, _Role["default"]);
AuthPackageRouter.use('/permissions', _Auth["default"].checkAuth, _Permission["default"]);
AuthPackageRouter.use('/auth', _Auth2["default"]);
var _default = exports["default"] = AuthPackageRouter;