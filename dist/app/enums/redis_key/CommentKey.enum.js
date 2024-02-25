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
var CommentKeyEnum = createKeyEnum('comments:');
var _default = exports["default"] = CommentKeyEnum;