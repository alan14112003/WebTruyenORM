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
var AuthorKeyEnum = createKeyEnum('authors:');
var _default = exports["default"] = AuthorKeyEnum;