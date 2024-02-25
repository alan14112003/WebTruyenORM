"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Permission = _Sequelize["default"].define('Permission', {
  name: {
    type: _sequelize.DataTypes.STRING
  },
  description: {
    type: _sequelize.DataTypes.TEXT
  },
  code: {
    type: _sequelize.DataTypes.STRING(50),
    unique: true
  }
}, {
  timestamps: false // Tắt tự động thêm timestamps
});
var _default = exports["default"] = Permission;