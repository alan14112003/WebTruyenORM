"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Story = _Sequelize["default"].define('Story', {
  name: {
    type: _sequelize.DataTypes.STRING
  },
  slug: {
    type: _sequelize.DataTypes.STRING
  },
  isFull: {
    type: _sequelize.DataTypes.BOOLEAN
  },
  access: {
    type: _sequelize.DataTypes.TINYINT
  },
  descriptions: {
    type: _sequelize.DataTypes.TEXT
  },
  avatar: {
    type: _sequelize.DataTypes.STRING
  },
  type: {
    type: _sequelize.DataTypes.TINYINT
  }
}, {
  paranoid: true
});
var _default = exports["default"] = Story;