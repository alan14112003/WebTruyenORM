"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PermissionUpdateValidator = _joi["default"].object({
  name: _joi["default"].string(),
  description: _joi["default"].string(),
  code: _joi["default"].string()
});
var _default = exports["default"] = PermissionUpdateValidator;