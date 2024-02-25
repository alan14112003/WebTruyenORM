"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/controllers/auth/Auth.controller"));
var _Auth2 = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _ChangeInfo = _interopRequireDefault(require("../../../app/www/validators/body/auth/ChangeInfo.validator"));
var _Login = _interopRequireDefault(require("../../../app/www/validators/body/auth/Login.validator"));
var _Register = _interopRequireDefault(require("../../../app/www/validators/body/auth/Register.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var AuthRouter = _express["default"].Router();
AuthRouter.post('/register', _Validator["default"].validateBody(_Register["default"]), _Auth["default"].register);
AuthRouter.post('/login', _Validator["default"].validateBody(_Login["default"]), _Auth["default"].login);
AuthRouter.post('/login-google', _Auth["default"].loginWithGoogle);
AuthRouter.post('/request-reset-password', _Auth["default"].requestResetPassword);
AuthRouter.post('/handle-reset-password', _Auth["default"].handleResetPassword);
AuthRouter.post('/change-password', _Auth2["default"].checkAuth, _Auth["default"].changePassword);
AuthRouter.post('/change-info', _Auth2["default"].checkAuth, _Validator["default"].validateBody(_ChangeInfo["default"]), _Auth["default"].changeInfo);
AuthRouter.get('/active-email', _Auth["default"].activeEmail);
AuthRouter.post('/refresh', _Auth["default"].refresh);
var _default = exports["default"] = AuthRouter;