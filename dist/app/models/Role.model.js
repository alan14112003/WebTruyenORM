"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Role = _Sequelize["default"].define('Role', {
  name: {
    type: _sequelize.DataTypes.STRING
  },
  description: {
    type: _sequelize.DataTypes.TEXT
  },
  code: {
    type: _sequelize.DataTypes.STRING,
    unique: true
  },
  permissions: {
    type: _sequelize.DataTypes.TEXT
  }
}, {
  timestamps: false
});
var _default = exports["default"] = Role;