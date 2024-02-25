"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Purchase = _Sequelize["default"].define('Purchase', {
  price: {
    type: _sequelize.DataTypes.INTEGER
  }
});
var _default = exports["default"] = Purchase;