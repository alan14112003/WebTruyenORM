"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PermissionObjectValidator = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string(),
  code: _joi["default"].string().required()
});
var PermissionInsertValidator = _joi["default"].alternatives()["try"](PermissionObjectValidator, _joi["default"].array().items(PermissionObjectValidator));
var _default = exports["default"] = PermissionInsertValidator;