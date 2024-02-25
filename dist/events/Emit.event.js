"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _events = _interopRequireDefault(require("events"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var eventEmitter = new _events["default"]();
var EVENT_NAME = 'message.to.room';
var EmitEvent = {
  emit: function emit(room, event) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return eventEmitter.emit.apply(eventEmitter, [EVENT_NAME, room, event].concat(args));
  },
  /**
   *
   * @param {(room, event, ...args) => {}} cb
   */
  on: function on(cb) {
    eventEmitter.on(EVENT_NAME, cb);
  }
};
var _default = exports["default"] = EmitEvent;