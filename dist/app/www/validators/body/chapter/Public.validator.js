"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ChapterPublicValidator = _joi["default"].object({
  ids: _joi["default"].array().required().items(_joi["default"].number().required())
});
var _default = exports["default"] = ChapterPublicValidator;