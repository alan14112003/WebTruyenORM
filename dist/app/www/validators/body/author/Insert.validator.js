"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AuthorObject = _joi["default"].object({
  name: _joi["default"].string().required()
});
var AuthorInsertValidator = _joi["default"].alternatives()["try"](AuthorObject, _joi["default"].array().items(AuthorObject));
var _default = exports["default"] = AuthorInsertValidator;