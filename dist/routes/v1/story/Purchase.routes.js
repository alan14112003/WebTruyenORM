"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _Auth = _interopRequireDefault(require("../../../app/www/middleware/Auth.middleware"));
var _Validator = _interopRequireDefault(require("../../../app/www/middleware/Validator.middleware"));
var _BuyChapter = _interopRequireDefault(require("../../../app/www/validators/body/purchase/BuyChapter.validator"));
var _Purchase = _interopRequireDefault(require("../../../app/www/controllers/story/Purchase.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// lấy ra bộ định tuyến
var PurchaseRouter = _express["default"].Router();
var PERMISSION_NAME = 'purchases.';
var PERMISSION_CODE = {
  buyChapter: PERMISSION_NAME + 'buy_chapter'
};
PurchaseRouter.post('/buy-chapter', _Auth["default"].checkPermission(PERMISSION_CODE.buyChapter), _Validator["default"].validateBody(_BuyChapter["default"]), _Purchase["default"].buyChapter);
var _default = exports["default"] = PurchaseRouter;