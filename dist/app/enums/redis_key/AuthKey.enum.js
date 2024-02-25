"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function createKeyEnum(name) {
  return {
    ID: name + 'id',
    REFRESH: name + 'refresh'
  };
}
var AuthKeyEnum = createKeyEnum('auth:');
var _default = exports["default"] = AuthKeyEnum;