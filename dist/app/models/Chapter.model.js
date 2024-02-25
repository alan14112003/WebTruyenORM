"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Chapter = _Sequelize["default"].define('Chapter', {
  number: {
    type: _sequelize.DataTypes.INTEGER
  },
  name: {
    type: _sequelize.DataTypes.STRING
  },
  content: {
    type: _sequelize.DataTypes.TEXT('long')
  },
  isFree: {
    type: _sequelize.DataTypes.BOOLEAN
  },
  privateEnd: {
    type: _sequelize.DataTypes.DATE
  },
  price: {
    type: _sequelize.DataTypes.INTEGER
  },
  access: {
    type: _sequelize.DataTypes.TINYINT
  },
  type: {
    type: _sequelize.DataTypes.TINYINT
  }
}, {
  paranoid: true
});
var _default = exports["default"] = Chapter;