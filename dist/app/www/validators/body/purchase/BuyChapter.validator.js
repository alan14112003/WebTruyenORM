"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PurchaseBuyChapterValidator = _joi["default"].object({
  ChapterId: _joi["default"].number().required()
});
var _default = exports["default"] = PurchaseBuyChapterValidator;