"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Category = _interopRequireDefault(require("../../../app/www/controllers/story/Category.controller"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _Insert = _interopRequireDefault(require("../../../app/www/validators/body/category/Insert.validator"));
var _Update = _interopRequireDefault(require("../../../app/www/validators/body/category/Update.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var CategoryRouter = _express["default"].Router();
var PERMISSION_NAME = 'categories.';
var PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
CategoryRouter.get('/', _Auth["default"].checkPermission(PERMISSION_CODE.all), _Category["default"].all);
CategoryRouter.get('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Category["default"].get);
CategoryRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_Insert["default"]), _Category["default"].insert);
CategoryRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_Update["default"]), _Category["default"].update);
CategoryRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Category["default"]["delete"]);
var _default = exports["default"] = CategoryRouter;