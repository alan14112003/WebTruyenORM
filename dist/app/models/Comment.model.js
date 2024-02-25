"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Comment = _Sequelize["default"].define('Comment', {
  content: {
    type: _sequelize.DataTypes.STRING(1000)
  },
  type: {
    type: _sequelize.DataTypes.TINYINT
  }
});
var _default = exports["default"] = Comment;