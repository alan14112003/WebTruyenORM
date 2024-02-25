"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slugify = _interopRequireDefault(require("slugify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var slugifyConfig = function slugifyConfig(val) {
  return (0, _slugify["default"])(val, {
    replacement: '-',
    // replace spaces with replacement character, defaults to `-`
    remove: undefined,
    // remove characters that match regex, defaults to `undefined`
    lower: true,
    // convert to lower case, defaults to `false`
    strict: true,
    // strip special characters except replacement, defaults to `false`
    locale: 'vi',
    // language code of the locale to use
    trim: true // trim leading and trailing replacement chars, defaults to `true`
  });
};
var _default = exports["default"] = slugifyConfig;