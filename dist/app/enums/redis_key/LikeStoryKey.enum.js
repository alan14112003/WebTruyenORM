"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function createKeyEnum(name) {
  return {
    GET: name + 'get'
  };
}
var LikeStoryKeyEnum = createKeyEnum('likeStories:');
var _default = exports["default"] = LikeStoryKeyEnum;