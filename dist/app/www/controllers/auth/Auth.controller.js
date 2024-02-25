"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _UserGender = _interopRequireDefault(require("../../../enums/users/UserGender.enum"));
var _UserRole = _interopRequireDefault(require("../../../enums/users/UserRole.enum"));
var _User = _interopRequireDefault(require("../../../models/User.model"));
var _Auth = _interopRequireDefault(require("../../../utils/Auth.util"));
var _Bcrypt = _interopRequireDefault(require("../../../../config/Bcrypt.config"));
var _GoogleOauth = _interopRequireDefault(require("../../../../config/GoogleOauth2.config"));
var _Jwt = _interopRequireDefault(require("../../../../config/Jwt.config"));
var _Sequelize = _interopRequireDefault(require("../../../../config/Sequelize.config"));
var _Redis = _interopRequireDefault(require("../../../../config/Redis.config"));
var _AuthKey = _interopRequireDefault(require("../../../enums/redis_key/AuthKey.enum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP;
var AuthController = {
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var body, auth, checkAllowedAuth, authResult, token;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            body = req.body;
            _context.prev = 1;
            _context.next = 4;
            return _User["default"].findOne({
              where: {
                email: body.email
              },
              paranoid: false
            });
          case 4:
            auth = _context.sent;
            if (auth) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", res.status(401).json('invalid email or password'));
          case 7:
            if (_Bcrypt["default"].comparePass(body.password, auth.password)) {
              _context.next = 9;
              break;
            }
            return _context.abrupt("return", res.status(401).json('invalid email or password'));
          case 9:
            checkAllowedAuth = _Auth["default"].checkAllowed(auth);
            if (checkAllowedAuth.status) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return", res.status(401).json(checkAllowedAuth.message));
          case 12:
            authResult = _Auth["default"].getAuthResult(auth);
            token = _Auth["default"].generateToken(authResult);
            authResult.accessToken = token.accessToken;
            res.cookie('refreshToken', token.refreshToken, {
              maxAge: REFRESH_TOKEN_EXP
            });
            return _context.abrupt("return", res.status(200).json(authResult));
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);
            trx.rollback();
            next(_context.t0);
          case 23:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 19]]);
    }));
    function login(_x, _x2, _x3) {
      return _login.apply(this, arguments);
    }
    return login;
  }(),
  loginWithGoogle: function () {
    var _loginWithGoogle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
      var body, trx, payload, auth, avatar, userDTO, checkAllowedAuth, authResult, token;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            body = req.body;
            _context2.next = 3;
            return _Sequelize["default"].transaction();
          case 3:
            trx = _context2.sent;
            _context2.prev = 4;
            _context2.next = 7;
            return _GoogleOauth["default"].verify(body.token);
          case 7:
            payload = _context2.sent;
            _context2.next = 10;
            return _User["default"].findOne({
              where: {
                email: payload.email
              },
              paranoid: false
            });
          case 10:
            auth = _context2.sent;
            if (auth) {
              _context2.next = 19;
              break;
            }
            _context2.next = 14;
            return _Auth["default"].uploadAvatar(payload.picture);
          case 14:
            avatar = _context2.sent;
            userDTO = {
              firstName: payload.given_name,
              lastName: payload.family_name,
              email: payload.email,
              password: _Bcrypt["default"].hashPass('123'),
              gender: _UserGender["default"].SECRET,
              status: true,
              roleCode: _UserRole["default"].USER,
              avatar: avatar
            };
            _context2.next = 18;
            return _User["default"].create(userDTO, {
              transaction: trx
            });
          case 18:
            auth = _context2.sent;
          case 19:
            checkAllowedAuth = _Auth["default"].checkAllowed(auth);
            if (checkAllowedAuth.status) {
              _context2.next = 22;
              break;
            }
            return _context2.abrupt("return", res.status(401).json(checkAllowedAuth.message));
          case 22:
            authResult = _Auth["default"].getAuthResult(auth);
            token = _Auth["default"].generateToken(authResult);
            authResult.accessToken = token.accessToken;
            trx.commit();
            res.cookie('refreshToken', token.refreshToken, {
              maxAge: REFRESH_TOKEN_EXP
            });
            return _context2.abrupt("return", res.status(200).json(authResult));
          case 30:
            _context2.prev = 30;
            _context2.t0 = _context2["catch"](4);
            console.log('error', _context2.t0);
            trx.rollback();
            next(_context2.t0);
          case 35:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 30]]);
    }));
    function loginWithGoogle(_x4, _x5, _x6) {
      return _loginWithGoogle.apply(this, arguments);
    }
    return loginWithGoogle;
  }(),
  register: function () {
    var _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
      var body, trx, userExist, auth, authResult, activeMailToken;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            body.roleCode = _UserRole["default"].USER;
            _context3.next = 4;
            return _Sequelize["default"].transaction();
          case 4:
            trx = _context3.sent;
            _context3.prev = 5;
            _context3.next = 8;
            return _User["default"].findOne({
              where: {
                email: body.email
              },
              paranoid: false
            });
          case 8:
            userExist = _context3.sent;
            if (!userExist) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", res.status(409).json('the account by email is exist'));
          case 11:
            body.password = _Bcrypt["default"].hashPass(body.password);
            _context3.next = 14;
            return _User["default"].create(body, {
              transaction: trx
            });
          case 14:
            auth = _context3.sent;
            authResult = _Auth["default"].getAuthResult(auth);
            activeMailToken = _Jwt["default"].createToken(authResult, '1h');
            _Auth["default"].sendActiveMail(authResult, activeMailToken);
            trx.commit();
            return _context3.abrupt("return", res.status(201).json(authResult));
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](5);
            trx.rollback();
            next(_context3.t0);
          case 26:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[5, 22]]);
    }));
    function register(_x7, _x8, _x9) {
      return _register.apply(this, arguments);
    }
    return register;
  }(),
  activeEmail: function () {
    var _activeEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
      var token, payload, auth;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            token = req.query.token;
            _context4.prev = 1;
            payload = _Jwt["default"].verifyToken(token);
            _context4.next = 5;
            return _User["default"].findByPk(payload.id);
          case 5:
            auth = _context4.sent;
            if (auth) {
              _context4.next = 8;
              break;
            }
            return _context4.abrupt("return", res.status(401).send('account is blocked'));
          case 8:
            if (auth.status) {
              _context4.next = 12;
              break;
            }
            auth.status = true;
            _context4.next = 12;
            return auth.save();
          case 12:
            return _context4.abrupt("return", res.status(200).send('email has been activated'));
          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](1);
            if (!(_context4.t0.message == 'jwt expired')) {
              _context4.next = 19;
              break;
            }
            return _context4.abrupt("return", res.status(401).json('token expired'));
          case 19:
            next(_context4.t0);
          case 20:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[1, 15]]);
    }));
    function activeEmail(_x10, _x11, _x12) {
      return _activeEmail.apply(this, arguments);
    }
    return activeEmail;
  }(),
  requestResetPassword: function () {
    var _requestResetPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
      var body, user, resetCode;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            body = req.body;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findOne({
              where: {
                email: body.email
              },
              paranoid: false
            });
          case 4:
            user = _context5.sent;
            if (user) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", res.status(401).json('account by email is not exist'));
          case 7:
            resetCode = Math.floor(100000 + Math.random() * 900000);
            user.resetPassword = resetCode;
            _context5.next = 11;
            return user.save();
          case 11:
            _Auth["default"].sendResetPasswordMail(_Auth["default"].getAuthResult(user), resetCode);
            return _context5.abrupt("return", res.status(200).send('check your email to get code please'));
          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](1);
            next(_context5.t0);
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 15]]);
    }));
    function requestResetPassword(_x13, _x14, _x15) {
      return _requestResetPassword.apply(this, arguments);
    }
    return requestResetPassword;
  }(),
  handleResetPassword: function () {
    var _handleResetPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
      var _req$body, email, newPassword, code, user;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, newPassword = _req$body.newPassword, code = _req$body.code;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findOne({
              where: {
                email: email
              },
              paranoid: false
            });
          case 4:
            user = _context6.sent;
            if (user) {
              _context6.next = 7;
              break;
            }
            return _context6.abrupt("return", res.status(401).json('account by email is not exist'));
          case 7:
            if (!(code !== user.resetPassword)) {
              _context6.next = 9;
              break;
            }
            return _context6.abrupt("return", res.status(400).json('code not match'));
          case 9:
            _context6.next = 11;
            return _User["default"].update({
              resetPassword: null,
              password: _Bcrypt["default"].hashPass(newPassword)
            }, {
              where: {
                id: user.id
              }
            });
          case 11:
            return _context6.abrupt("return", res.status(200).send('success'));
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](1);
            next(_context6.t0);
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[1, 14]]);
    }));
    function handleResetPassword(_x16, _x17, _x18) {
      return _handleResetPassword.apply(this, arguments);
    }
    return handleResetPassword;
  }(),
  changePassword: function () {
    var _changePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
      var _req$body2, oldPassword, newPassword, user;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword;
            _context7.prev = 1;
            user = req.user;
            if (_Bcrypt["default"].comparePass(oldPassword, user.password)) {
              _context7.next = 5;
              break;
            }
            return _context7.abrupt("return", res.status(400).json('old password not match'));
          case 5:
            _context7.next = 7;
            return _User["default"].update({
              password: _Bcrypt["default"].hashPass(newPassword)
            }, {
              where: {
                id: user.id
              }
            });
          case 7:
            return _context7.abrupt("return", res.status(200).send('success'));
          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            next(_context7.t0);
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[1, 10]]);
    }));
    function changePassword(_x19, _x20, _x21) {
      return _changePassword.apply(this, arguments);
    }
    return changePassword;
  }(),
  changeInfo: function () {
    var _changeInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
      var body, user, userExist;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            body = req.body;
            user = req.user;
            _context8.prev = 2;
            if (!body.email) {
              _context8.next = 9;
              break;
            }
            _context8.next = 6;
            return _User["default"].findOne({
              where: {
                email: _defineProperty(_defineProperty({}, _sequelize.Op.ne, user.email), _sequelize.Op.eq, body.email)
              },
              paranoid: false
            });
          case 6:
            userExist = _context8.sent;
            if (!userExist) {
              _context8.next = 9;
              break;
            }
            return _context8.abrupt("return", res.status(409).send('the account by email is exist'));
          case 9:
            _context8.next = 11;
            return _User["default"].update(body, {
              where: {
                id: user.id
              }
            });
          case 11:
            return _context8.abrupt("return", res.status(200).send('success'));
          case 14:
            _context8.prev = 14;
            _context8.t0 = _context8["catch"](2);
            next(_context8.t0);
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[2, 14]]);
    }));
    function changeInfo(_x22, _x23, _x24) {
      return _changeInfo.apply(this, arguments);
    }
    return changeInfo;
  }(),
  refresh: function () {
    var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
      var refreshToken, payload, redisKey, auth, checkAllowedAuth, authResult, token;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return", res.status(401).json('no refresh token in header'));
          case 4:
            payload = _Jwt["default"].verifyToken(refreshToken);
            redisKey = "".concat(_AuthKey["default"].REFRESH, ".").concat(payload.id);
            _context9.next = 8;
            return _Redis["default"].get(redisKey);
          case 8:
            auth = _context9.sent;
            if (auth) {
              _context9.next = 13;
              break;
            }
            _context9.next = 12;
            return _User["default"].findOne({
              where: {
                id: payload.id
              },
              paranoid: false
            });
          case 12:
            auth = _context9.sent;
          case 13:
            if (auth) {
              _context9.next = 15;
              break;
            }
            return _context9.abrupt("return", res.status(401).json('un authorization'));
          case 15:
            _Redis["default"].set(redisKey, auth);
            checkAllowedAuth = _Auth["default"].checkAllowed(auth);
            if (checkAllowedAuth.status) {
              _context9.next = 19;
              break;
            }
            return _context9.abrupt("return", res.status(401).json(checkAllowedAuth.message));
          case 19:
            authResult = _Auth["default"].getAuthResult(auth);
            token = _Auth["default"].generateToken(authResult);
            res.cookie('refreshToken', token.refreshToken, {
              maxAge: REFRESH_TOKEN_EXP
            });
            return _context9.abrupt("return", res.status(200).json({
              accessToken: token.accessToken
            }));
          case 25:
            _context9.prev = 25;
            _context9.t0 = _context9["catch"](0);
            next(_context9.t0);
          case 28:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 25]]);
    }));
    function refresh(_x25, _x26, _x27) {
      return _refresh.apply(this, arguments);
    }
    return refresh;
  }()
};
var _default = exports["default"] = AuthController;