"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CategoryStory = _Sequelize["default"].define('CategoryStory', {}, {
  timestamps: false
});
var _default = exports["default"] = CategoryStory;