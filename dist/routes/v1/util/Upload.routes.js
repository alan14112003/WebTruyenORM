"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Upload = _interopRequireDefault(require("../../../app/www/controllers/util/Upload.controller"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _DeleteMultiple = _interopRequireDefault(require("../../../app/www/validators/body/upload/DeleteMultiple.validator"));
var _Multer = _interopRequireDefault(require("../../../config/Multer.config"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var UploadRouter = _express["default"].Router();
var PERMISSION_NAME = 'uploads.';
var PERMISSION_CODE = {
  single: PERMISSION_NAME + 'single',
  multiple: PERMISSION_NAME + 'multiple',
  destroy: {
    single: PERMISSION_NAME + 'destroy.single',
    multiple: PERMISSION_NAME + 'destroy.multiple'
  }
};
UploadRouter["delete"]('/single', _Auth["default"].checkPermission(PERMISSION_CODE.destroy.single), _Upload["default"].deleteSingleFile);
UploadRouter["delete"]('/multiple', _Auth["default"].checkPermission(PERMISSION_CODE.destroy.multiple), _Validator["default"].validateBody(_DeleteMultiple["default"]), _Upload["default"].deleteMultipleFile);
UploadRouter.post('/single', _Auth["default"].checkPermission(PERMISSION_CODE.single), _Multer["default"].single('file'), _Upload["default"].uploadSingleFile);
UploadRouter.post('/multiple', _Auth["default"].checkPermission(PERMISSION_CODE.multiple), _Multer["default"].array('files', 100), _Upload["default"].uploadMultipleFile);
var _default = exports["default"] = UploadRouter;