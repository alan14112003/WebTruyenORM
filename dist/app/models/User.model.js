"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Role = _interopRequireDefault(require("./Role.model"));
var _Sequelize = _interopRequireDefault(require("../../config/Sequelize.config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var User = _Sequelize["default"].define('User', {
  firstName: {
    type: _sequelize.DataTypes.STRING
  },
  lastName: {
    type: _sequelize.DataTypes.STRING
  },
  fullName: {
    type: _sequelize.DataTypes.VIRTUAL,
    get: function get() {
      return "".concat(this.firstName, " ").concat(this.lastName);
    },
    set: function set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING
  },
  avatar: {
    type: _sequelize.DataTypes.STRING
  },
  gender: {
    type: _sequelize.DataTypes.TINYINT
  },
  status: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  roleCode: {
    type: _sequelize.DataTypes.STRING,
    references: {
      model: _Role["default"],
      key: 'code'
    },
    onDelete: 'CASCADE'
  },
  resetPassword: {
    type: _sequelize.DataTypes.STRING(6)
  },
  accountBalance: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  paranoid: true,
  timestamps: true
});
var _default = exports["default"] = User;