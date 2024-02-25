"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var UserUtil = {
  getPublicInfoAttribute: function getPublicInfoAttribute() {
    var hasEmail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var attributes = [];
    if (hasEmail) {
      attributes.push('email');
    }
    return ['id', 'firstName', 'lastName', 'fullName', 'avatar'].concat(attributes);
  }
};
var _default = exports["default"] = UserUtil;