"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Redis = _interopRequireDefault(require("../../../../config/Redis.config"));
var _Slugify = _interopRequireDefault(require("../../../../config/Slugify.config"));
var _Story = _interopRequireDefault(require("../../../models/Story.model"));
var _StoryAccess = _interopRequireDefault(require("../../../enums/story/StoryAccess.enum"));
var _CategoryStory = _interopRequireDefault(require("../../../models/CategoryStory.model"));
var _Sequelize = _interopRequireDefault(require("../../../../config/Sequelize.config"));
var _Story2 = _interopRequireDefault(require("../../../utils/Story.util"));
var _Chapter = _interopRequireDefault(require("../../../utils/Chapter.util"));
var _StoryKey = _interopRequireDefault(require("../../../enums/redis_key/StoryKey.enum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var StoryController = {
  all: function () {
    var _all = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var _req$query, page, perPage, type, isFull, categoryIn, categoryNotIn, authorId, userId, order, redisKey, stories;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$query = req.query, page = _req$query.page, perPage = _req$query.perPage, type = _req$query.type, isFull = _req$query.isFull, categoryIn = _req$query.categoryIn, categoryNotIn = _req$query.categoryNotIn, authorId = _req$query.authorId, userId = _req$query.userId, order = _req$query.order;
            redisKey = "".concat(_StoryKey["default"].ALL, ".\n        ").concat(perPage, ".\n        ").concat(page, ".\n        ").concat(type, ".\n        ").concat(isFull, ".\n        ").concat(categoryIn, ".\n        ").concat(categoryNotIn, ".\n        ").concat(authorId, ".\n        ").concat(userId, ".\n        ").concat(order, ".\n        ");
            _context.next = 5;
            return _Redis["default"].get(redisKey);
          case 5:
            stories = _context.sent;
            if (stories) {
              _context.next = 10;
              break;
            }
            _context.next = 9;
            return _Story2["default"].getAllStories({
              page: page,
              perPage: perPage,
              type: type,
              isFull: isFull,
              categoryIn: categoryIn,
              categoryNotIn: categoryNotIn,
              authorId: authorId,
              userId: userId,
              order: order
            }, {
              moreWhere: {
                access: _StoryAccess["default"].PUBLIC
              }
            });
          case 9:
            stories = _context.sent;
          case 10:
            _Redis["default"].set(redisKey, stories);
            return _context.abrupt("return", res.status(200).json(stories));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            next(_context.t0);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    function all(_x, _x2, _x3) {
      return _all.apply(this, arguments);
    }
    return all;
  }(),
  get: function () {
    var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
      var slugId, _slugId$split, _slugId$split2, slug, id, redisKey, story;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            slugId = req.params.slugId;
            _slugId$split = slugId.split('.-.'), _slugId$split2 = _slicedToArray(_slugId$split, 2), slug = _slugId$split2[0], id = _slugId$split2[1];
            redisKey = "".concat(_StoryKey["default"].GET, ".").concat(id);
            _context2.next = 6;
            return _Redis["default"].get(redisKey);
          case 6:
            story = _context2.sent;
            if (story) {
              _context2.next = 11;
              break;
            }
            _context2.next = 10;
            return _Story2["default"].getOneStory(id, slug, {
              moreWhere: {
                access: _StoryAccess["default"].PUBLIC
              }
            });
          case 10:
            story = _context2.sent;
          case 11:
            if (story) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(404).json('story not found'));
          case 13:
            _Redis["default"].set(redisKey, story);
            return _context2.abrupt("return", res.status(200).json(story));
          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            next(_context2.t0);
          case 21:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 17]]);
    }));
    function get(_x4, _x5, _x6) {
      return _get.apply(this, arguments);
    }
    return get;
  }(),
  insert: function () {
    var _insert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
      var trx, auth, storyDTO, story;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Sequelize["default"].transaction();
          case 2:
            trx = _context3.sent;
            _context3.prev = 3;
            auth = req.user;
            storyDTO = req.body;
            storyDTO.slug = (0, _Slugify["default"])(storyDTO.name);
            storyDTO.UserId = auth.id;
            storyDTO.isFull = false;
            storyDTO.access = _StoryAccess["default"].PRIVATE;
            _context3.next = 12;
            return _Story["default"].create(storyDTO, {
              transaction: trx
            });
          case 12:
            story = _context3.sent;
            _context3.next = 15;
            return _CategoryStory["default"].bulkCreate(storyDTO.categories.map(function (categoryId) {
              return {
                CategoryId: categoryId,
                StoryId: story.id
              };
            }), {
              transaction: trx
            });
          case 15:
            _Redis["default"].delWithPrefix(_StoryKey["default"].ALL);
            trx.commit();
            return _context3.abrupt("return", res.status(201).json(story));
          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            trx.rollback();
            next(_context3.t0);
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[3, 20]]);
    }));
    function insert(_x7, _x8, _x9) {
      return _insert.apply(this, arguments);
    }
    return insert;
  }(),
  update: function () {
    var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
      var trx, auth, id, body, story, _yield$Story$update, _yield$Story$update2, updatedCount;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Sequelize["default"].transaction();
          case 2:
            trx = _context4.sent;
            _context4.prev = 3;
            auth = req.user;
            id = req.params.id;
            body = req.body;
            _context4.next = 9;
            return _Story["default"].findByPk(id);
          case 9:
            story = _context4.sent;
            if (story) {
              _context4.next = 12;
              break;
            }
            return _context4.abrupt("return", res.status(404).json('story not found'));
          case 12:
            if (!(story.UserId != auth.id)) {
              _context4.next = 14;
              break;
            }
            return _context4.abrupt("return", res.status(403).json('access denined'));
          case 14:
            if (body.name) {
              body.slug = (0, _Slugify["default"])(body.name);
            }
            _context4.next = 17;
            return _Story["default"].update(body, {
              where: {
                id: id
              },
              transaction: trx
            });
          case 17:
            _yield$Story$update = _context4.sent;
            _yield$Story$update2 = _slicedToArray(_yield$Story$update, 1);
            updatedCount = _yield$Story$update2[0];
            if (!body.categories) {
              _context4.next = 23;
              break;
            }
            _context4.next = 23;
            return _Story2["default"].updateCategories(body.categories, id, trx);
          case 23:
            if (updatedCount) {
              _Redis["default"].delWithPrefix(_StoryKey["default"].ALL);
              _Redis["default"].del("".concat(_StoryKey["default"].GET, ".").concat(id));
            }
            _context4.next = 26;
            return trx.commit();
          case 26:
            return _context4.abrupt("return", res.status(200).json('success'));
          case 29:
            _context4.prev = 29;
            _context4.t0 = _context4["catch"](3);
            _context4.next = 33;
            return trx.rollback();
          case 33:
            next(_context4.t0);
          case 34:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[3, 29]]);
    }));
    function update(_x10, _x11, _x12) {
      return _update.apply(this, arguments);
    }
    return update;
  }(),
  "delete": function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
      var auth, id, deletedCount;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            auth = req.user;
            id = req.params.id;
            _context5.next = 5;
            return _Story["default"].destroy({
              where: {
                id: id,
                UserId: auth.id
              }
            });
          case 5:
            deletedCount = _context5.sent;
            if (deletedCount) {
              _Redis["default"].delWithPrefix(_StoryKey["default"].ALL);
              _Redis["default"].del("".concat(_StoryKey["default"].GET, ".").concat(id));
            }
            return _context5.abrupt("return", res.status(200).json(deletedCount));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);
          case 13:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 10]]);
    }));
    function _delete(_x13, _x14, _x15) {
      return _delete2.apply(this, arguments);
    }
    return _delete;
  }(),
  hardDelete: function () {
    var _hardDelete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
      var auth, id, deletedCount;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            auth = req.user;
            id = req.params.id;
            _context6.next = 5;
            return _Story["default"].destroy({
              where: {
                id: id,
                UserId: auth.id,
                deletedAt: _defineProperty({}, _sequelize.Op.not, null)
              },
              force: true
            });
          case 5:
            deletedCount = _context6.sent;
            if (deletedCount) {
              _Redis["default"].delWithPrefix(_StoryKey["default"].ALL);
              _Redis["default"].del("".concat(_StoryKey["default"].GET, ".").concat(id));
            }
            return _context6.abrupt("return", res.status(200).json(deletedCount));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            next(_context6.t0);
          case 13:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 10]]);
    }));
    function hardDelete(_x16, _x17, _x18) {
      return _hardDelete.apply(this, arguments);
    }
    return hardDelete;
  }(),
  "public": function () {
    var _public2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
      var auth, id, story, chapterPublicExist, _yield$Story$update3, _yield$Story$update4, updatedCount;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            auth = req.user;
            id = req.params.id;
            _context7.next = 5;
            return _Story["default"].findOne({
              where: {
                id: id
              }
            });
          case 5:
            story = _context7.sent;
            if (story) {
              _context7.next = 8;
              break;
            }
            return _context7.abrupt("return", res.status(404).json('story not found'));
          case 8:
            if (!(story.UserId !== auth.id)) {
              _context7.next = 10;
              break;
            }
            return _context7.abrupt("return", res.status(403).json("access denined"));
          case 10:
            if (!(story.access != _StoryAccess["default"].PRIVATE)) {
              _context7.next = 12;
              break;
            }
            return _context7.abrupt("return", res.status(400).json("story is not private"));
          case 12:
            _context7.next = 14;
            return _Chapter["default"].checkChapterPublicExist(id);
          case 14:
            chapterPublicExist = _context7.sent;
            if (chapterPublicExist) {
              _context7.next = 17;
              break;
            }
            return _context7.abrupt("return", res.status(400).json("must have at least 1 published chapter"));
          case 17:
            _context7.next = 19;
            return _Story["default"].update({
              access: _StoryAccess["default"].PUBLIC
            }, {
              where: {
                id: id
              }
            });
          case 19:
            _yield$Story$update3 = _context7.sent;
            _yield$Story$update4 = _slicedToArray(_yield$Story$update3, 1);
            updatedCount = _yield$Story$update4[0];
            if (updatedCount) {
              _Redis["default"].delWithPrefix(_StoryKey["default"].ALL);
              _Redis["default"].del("".concat(_StoryKey["default"].GET, ".").concat(id));
            }
            return _context7.abrupt("return", res.status(200).json(updatedCount));
          case 26:
            _context7.prev = 26;
            _context7.t0 = _context7["catch"](0);
            next(_context7.t0);
          case 29:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 26]]);
    }));
    function _public(_x19, _x20, _x21) {
      return _public2.apply(this, arguments);
    }
    return _public;
  }()
};
var _default = exports["default"] = StoryController;