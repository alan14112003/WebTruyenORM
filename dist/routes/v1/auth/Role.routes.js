"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Role = _interopRequireDefault(require("../../../app/www/controllers/auth/Role.controller"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _RoleInsert = _interopRequireDefault(require("../../../app/www/validators/body/role/RoleInsert.validator"));
var _RoleUpdate = _interopRequireDefault(require("../../../app/www/validators/body/role/RoleUpdate.validator"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var RoleRouter = _express["default"].Router();
var PERMISSION_NAME = 'roles.';
var PERMISSION_CODE = {
  all: PERMISSION_NAME + 'all',
  get: PERMISSION_NAME + 'get',
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
RoleRouter.get('/', _Auth["default"].checkPermission(PERMISSION_CODE.all), _Role["default"].all);
RoleRouter.get('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.get), _Role["default"].get);
RoleRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_RoleInsert["default"]), _Role["default"].insert);
RoleRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_RoleUpdate["default"]), _Role["default"].update);
RoleRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Role["default"]["delete"]);
var _default = exports["default"] = RoleRouter;