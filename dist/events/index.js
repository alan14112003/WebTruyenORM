"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _socket = require("socket.io");
var _Emit = _interopRequireDefault(require("./Emit.event"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var initSocket = function initSocket(server) {
  var io = new _socket.Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: '*'
    }
  });
  io.on('connection', function (socket) {
    // thực hiện join vào một room cụ thể của user(mặc định)
    socket.on('join', function (room) {
      console.log("join room: \"".concat(room, "\", ").concat(_typeof(room)));
      socket.join(room); // phải có cái này (không được xóa nó)
    });
  });

  // bắn sự kiện đến một user nào đó từ server
  _Emit["default"].on(function (room, event) {
    var _io$to;
    console.log("event to room: \"".concat(room, "\", ").concat(_typeof(room), ", event: \"").concat(event, "\""));
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    (_io$to = io.to(room)).emit.apply(_io$to, [event].concat(args));
  });
};
var _default = exports["default"] = initSocket;