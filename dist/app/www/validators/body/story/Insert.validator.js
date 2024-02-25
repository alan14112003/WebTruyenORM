"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _StoryType = _interopRequireDefault(require("../../../../enums/story/StoryType.enum"));
var _joi = _interopRequireDefault(require("joi"));
var _Joi$number$required$;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var StoryInsertValidator = _joi["default"].object({
  name: _joi["default"].string().required(),
  descriptions: _joi["default"].string().required(),
  avatar: _joi["default"].string().required(),
  type: (_Joi$number$required$ = _joi["default"].number().required().integer()).valid.apply(_Joi$number$required$, _toConsumableArray(Object.keys(_StoryType["default"].allName()).map(function (k) {
    return Number(k);
  }))),
  AuthorId: _joi["default"].number().required(),
  categories: _joi["default"].array().items(_joi["default"].number().required()).required()
});
var _default = exports["default"] = StoryInsertValidator;