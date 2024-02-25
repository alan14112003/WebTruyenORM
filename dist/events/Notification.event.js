"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function createEventName(name) {
  return {
    NEW: name + 'new'
  };
}
var NotificationEvent = createEventName('notifications:');
var _default = exports["default"] = NotificationEvent;