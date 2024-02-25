"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Story = _interopRequireDefault(require("../../../app/www/controllers/story/Story.controller"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _Insert = _interopRequireDefault(require("../../../app/www/validators/body/story/Insert.validator"));
var _Update = _interopRequireDefault(require("../../../app/www/validators/body/story/Update.validator"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Chapter = _interopRequireDefault(require("../../../app/www/controllers/story/Chapter.controller"));
var _Comment = _interopRequireDefault(require("../../../app/www/controllers/story/Comment.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var StoryRouter = _express["default"].Router();
var PERMISSION_NAME = 'stories.';
var PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  chapters: PERMISSION_NAME + 'chapters',
  comments: PERMISSION_NAME + 'comments',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "public": PERMISSION_NAME + 'public',
  "delete": PERMISSION_NAME + 'delete',
  hardDelete: PERMISSION_NAME + 'hard_delete'
};
StoryRouter.get('/', _Auth["default"].checkPermission(PERMISSION_CODE.all), _Story["default"].all);
StoryRouter.get('/:slugId', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Story["default"].get);
StoryRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_Insert["default"]), _Story["default"].insert);
StoryRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_Update["default"]), _Story["default"].update);
StoryRouter.put('/:id/public', _Auth["default"].checkPermission(PERMISSION_CODE["public"]), _Story["default"]["public"]);
StoryRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Story["default"]["delete"]);
StoryRouter["delete"]('/:id/hard', _Auth["default"].checkPermission(PERMISSION_CODE.hardDelete), _Story["default"].hardDelete);

// chapters
StoryRouter.get('/:slugId/chapters', _Auth["default"].checkPermission(PERMISSION_CODE.chapters), _Chapter["default"].allByStoryId);

// comments
StoryRouter.get('/:slugId/comments', _Auth["default"].checkPermission(PERMISSION_CODE.comments), _Comment["default"].allByStoryId);
var _default = exports["default"] = StoryRouter;