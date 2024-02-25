"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TransactionHistory = _Sequelize["default"].define('TransactionHistory', {
  type: {
    type: _sequelize.DataTypes.TINYINT
  },
  money: {
    type: _sequelize.DataTypes.STRING
  }
}, {
  updatedAt: false
});
var _default = exports["default"] = TransactionHistory;