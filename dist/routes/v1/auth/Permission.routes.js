"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Permission = _interopRequireDefault(require("../../../app/www/controllers/auth/Permission.controller"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _PermissionInsert = _interopRequireDefault(require("../../../app/www/validators/body/permission/PermissionInsert.validator"));
var _PermissionUpdate = _interopRequireDefault(require("../../../app/www/validators/body/permission/PermissionUpdate.validator"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var PermissionRouter = _express["default"].Router();
var PERMISSION_NAME = 'permissions.';
var PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
PermissionRouter.get('/', _Auth["default"].checkPermission(PERMISSION_CODE.all), _Permission["default"].all);
PermissionRouter.get('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Permission["default"].get);
PermissionRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_PermissionInsert["default"]), _Permission["default"].insert);
PermissionRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_PermissionUpdate["default"]), _Permission["default"].update);
PermissionRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Permission["default"]["delete"]);
var _default = exports["default"] = PermissionRouter;