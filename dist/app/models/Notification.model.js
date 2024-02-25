"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Notification = _Sequelize["default"].define('Notification', {
  content: {
    type: _sequelize.DataTypes.TEXT
  },
  checked: {
    type: _sequelize.DataTypes.BOOLEAN
  },
  avatar: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  timestamps: true,
  updatedAt: false
});
var _default = exports["default"] = Notification;