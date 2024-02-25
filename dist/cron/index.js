"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ClearUploadFolder = _interopRequireDefault(require("./ClearUploadFolder.task"));
var _PublicChapter = _interopRequireDefault(require("./PublicChapter.task"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initCron = function initCron() {
  _ClearUploadFolder["default"].start();
  _PublicChapter["default"].start();
};
var _default = exports["default"] = initCron;