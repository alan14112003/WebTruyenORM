"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var JwtConfig = {
  createToken: function createToken(payload) {
    var exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1y';
    return _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY_JWT, {
      expiresIn: exp
    });
  },
  verifyToken: function verifyToken(token) {
    return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY_JWT);
  }
};
var _default = exports["default"] = JwtConfig;