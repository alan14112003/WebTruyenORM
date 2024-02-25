"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _Author = _interopRequireDefault(require("../../../app/www/controllers/story/Author.controller"));
var _Insert = _interopRequireDefault(require("../../../app/www/validators/body/author/Insert.validator"));
var _Update = _interopRequireDefault(require("../../../app/www/validators/body/author/Update.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var AuthorRouter = _express["default"].Router();
var PERMISSION_NAME = 'authors.';
var PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
AuthorRouter.get('/', _Auth["default"].checkPermission(PERMISSION_CODE.all), _Author["default"].all);
AuthorRouter.get('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Author["default"].get);
AuthorRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_Insert["default"]), _Author["default"].insert);
AuthorRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_Update["default"]), _Author["default"].update);
AuthorRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Author["default"]["delete"]);
var _default = exports["default"] = AuthorRouter;