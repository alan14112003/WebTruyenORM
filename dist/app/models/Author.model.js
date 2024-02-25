"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Author = _Sequelize["default"].define('Author', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true
  },
  slug: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  timestamps: false // Tắt tự động thêm timestamps
});
var _default = exports["default"] = Author;