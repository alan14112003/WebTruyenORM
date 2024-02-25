"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = require("dotenv");
var _path = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./routes"));
var _events = _interopRequireDefault(require("./events"));
var _models = _interopRequireDefault(require("./app/models"));
var _cron = _interopRequireDefault(require("./cron"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Cấu hình dotenv
(0, _dotenv.configDotenv)();

// tạo app là đường dẫn gốc trong thư mục
var app = (0, _express["default"])();

// Cấu hình thư mục public cho static
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));

// sử dụng cors để kiểm tra origin
app.use((0, _cors["default"])());
app.use((0, _cookieParser["default"])());

// sử dụng body-parser để parse body
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());

// Cấu hình sử dụng routes để định tuyến các tuyến đường cho app
app.use('/', _routes["default"]);

// middleware bắt lỗi
app.use(function (err, req, res, next) {
  var status = err.status || 500;
  return res.status(status).json(err);
});

// gắn nghe cho app và gán vào server
var server = app.listen(process.env.PORT || 80, function () {
  console.log("Server \u0111ang ch\u1EA1y \u1EDF c\u1ED5ng ".concat(process.env.PORT));
});

// mô tả các mối quan hệ
(0, _models["default"])();

// khởi động socket
(0, _events["default"])(server);

// khởi động cronjob
(0, _cron["default"])();