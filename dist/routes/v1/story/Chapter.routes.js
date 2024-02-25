"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _Chapter = _interopRequireDefault(require("../../../app/www/controllers/story/Chapter.controller"));
var _Insert = _interopRequireDefault(require("../../../app/www/validators/body/chapter/Insert.validator"));
var _Update = _interopRequireDefault(require("../../../app/www/validators/body/chapter/Update.validator"));
var _Public = _interopRequireDefault(require("../../../app/www/validators/body/chapter/Public.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var ChapterRouter = _express["default"].Router();
var PERMISSION_NAME = 'chapters.';
var PERMISSION_CODE = {
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  "public": PERMISSION_NAME + 'public',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
ChapterRouter.get('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Chapter["default"].get);
ChapterRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_Insert["default"]), _Chapter["default"].insert);
ChapterRouter.put('/public', _Auth["default"].checkPermission(PERMISSION_CODE["public"]), _Validator["default"].validateBody(_Public["default"]), _Chapter["default"]["public"]);
ChapterRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_Update["default"]), _Chapter["default"].update);
ChapterRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Chapter["default"]["delete"]);
var _default = exports["default"] = ChapterRouter;