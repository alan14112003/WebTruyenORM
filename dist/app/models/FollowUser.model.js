"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var FollowUser = _Sequelize["default"].define('FollowUser', {}, {
  timestamps: false
});
var _default = exports["default"] = FollowUser;