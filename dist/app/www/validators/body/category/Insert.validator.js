"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CategoryObject = _joi["default"].object({
  name: _joi["default"].string().required()
});
var CategoryInsertValidator = _joi["default"].alternatives()["try"](CategoryObject, _joi["default"].array().items(CategoryObject));
var _default = exports["default"] = CategoryInsertValidator;