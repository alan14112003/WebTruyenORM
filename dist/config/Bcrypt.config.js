"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var salt = _bcryptjs["default"].genSaltSync(10);
var BcryptConfig = {
  hashPass: function hashPass(value) {
    return _bcryptjs["default"].hashSync(value, salt);
  },
  comparePass: function comparePass(value, hash) {
    return _bcryptjs["default"].compareSync(value, hash);
  }
};
var _default = exports["default"] = BcryptConfig;