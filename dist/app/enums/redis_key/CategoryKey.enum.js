"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function createKeyEnum(name) {
  return {
    ALL: name + 'all',
    GET: name + 'get'
  };
}
var CategoryKeyEnum = createKeyEnum('categories:');
var _default = exports["default"] = CategoryKeyEnum;