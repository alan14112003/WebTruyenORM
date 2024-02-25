"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Category = _Sequelize["default"].define('Category', {
  name: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    set: function set(val) {
      this.setDataValue('name', val.toLowerCase());
    }
  },
  slug: {
    type: _sequelize.DataTypes.STRING,
    unique: true
  }
}, {
  timestamps: false // Tắt tự động thêm timestamps
});
var _default = exports["default"] = Category;