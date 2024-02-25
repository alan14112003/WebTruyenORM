"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RoleObjectValidator = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string(),
  code: _joi["default"].string().required(),
  permissions: _joi["default"].string().required()
});
var RoleInsertValidator = _joi["default"].alternatives()["try"](RoleObjectValidator, _joi["default"].array().items(RoleObjectValidator));
var _default = exports["default"] = RoleInsertValidator;