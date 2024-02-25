"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UserGenderEnum = {
  SECRET: 0,
  FEMALE: 1,
  MALE: 2,
  LGBT: 3,
  allName: function allName() {
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, this.SECRET, 'bí mật'), this.FEMALE, 'nữ'), this.MALE, 'nam'), this.LGBT, 'lgbt');
  },
  getNameByValue: function getNameByValue(value) {
    return this.allName()[value];
  },
  getValueByName: function getValueByName(name) {
    var _this = this;
    return Object.keys(this.allName()).find(function (key) {
      return _this.allName()[key] === name;
    });
  }
};
var _default = exports["default"] = UserGenderEnum;