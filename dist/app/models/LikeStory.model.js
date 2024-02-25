"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LikeStory = _Sequelize["default"].define('LikeStory', {}, {
  timestamps: false
});
var _default = exports["default"] = LikeStory;