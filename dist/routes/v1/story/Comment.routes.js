"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _Insert = _interopRequireDefault(require("../../../app/www/validators/body/comment/Insert.validator"));
var _Comment = _interopRequireDefault(require("../../../app/www/controllers/story/Comment.controller"));
var _Update = _interopRequireDefault(require("../../../app/www/validators/body/comment/Update.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var CommentRouter = _express["default"].Router();
var PERMISSION_NAME = 'comments.';
var PERMISSION_CODE = {
  insert: PERMISSION_NAME + 'insert',
  update: PERMISSION_NAME + 'update',
  "delete": PERMISSION_NAME + 'delete'
};
CommentRouter.post('/', _Auth["default"].checkPermission(PERMISSION_CODE.insert), _Validator["default"].validateBody(_Insert["default"]), _Comment["default"].insert);
CommentRouter.put('/:id', _Auth["default"].checkPermission(PERMISSION_CODE.update), _Validator["default"].validateBody(_Update["default"]), _Comment["default"].update);
CommentRouter["delete"]('/:id', _Auth["default"].checkPermission(PERMISSION_CODE["delete"]), _Comment["default"]["delete"]);
var _default = exports["default"] = CommentRouter;