"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Category = _interopRequireDefault(require("./Category.routes"));
var _Author = _interopRequireDefault(require("./Author.routes"));
var _Story = _interopRequireDefault(require("./Story.routes"));
var _Chapter = _interopRequireDefault(require("./Chapter.routes"));
var _Purchase = _interopRequireDefault(require("./Purchase.routes"));
var _Comment = _interopRequireDefault(require("./Comment.routes"));
var _LikeStory = _interopRequireDefault(require("./LikeStory.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var StoryPackageRouter = _express["default"].Router();
StoryPackageRouter.use('/categories', _Category["default"]);
StoryPackageRouter.use('/authors', _Author["default"]);
StoryPackageRouter.use('/stories', _Story["default"]);
StoryPackageRouter.use('/chapters', _Chapter["default"]);
StoryPackageRouter.use('/purchases', _Purchase["default"]);
StoryPackageRouter.use('/comments', _Comment["default"]);
StoryPackageRouter.use('/like-stories', _LikeStory["default"]);
var _default = exports["default"] = StoryPackageRouter;