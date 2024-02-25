"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _LikeStory = _interopRequireDefault(require("../../../app/www/controllers/story/LikeStory.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var LikeStoryRouter = _express["default"].Router();
var PERMISSION_NAME = 'like_stories.';
var PERMISSION_CODE = {
  get: PERMISSION_NAME + 'get',
  update: PERMISSION_NAME + 'update'
};
LikeStoryRouter.get('/:storyId', _Auth["default"].checkPermission(PERMISSION_CODE.get), _LikeStory["default"].get);
LikeStoryRouter.put('/:storyId', _Auth["default"].checkPermission(PERMISSION_CODE.update), _LikeStory["default"].update);
var _default = exports["default"] = LikeStoryRouter;