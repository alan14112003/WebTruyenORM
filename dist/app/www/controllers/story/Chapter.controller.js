"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _Redis = _interopRequireDefault(require("../../../../config/Redis.config"));
var _Story = _interopRequireDefault(require("../../../models/Story.model"));
var _StoryAccess = _interopRequireDefault(require("../../../enums/story/StoryAccess.enum"));
var _Chapter = _interopRequireDefault(require("../../../utils/Chapter.util"));
var _Chapter2 = _interopRequireDefault(require("../../../models/Chapter.model"));
var _ChapterAccess = _interopRequireDefault(require("../../../enums/chapter/ChapterAccess.enum"));
var _Purchase = _interopRequireDefault(require("../../../utils/Purchase.util"));
var _History = _interopRequireDefault(require("../../../utils/History.util"));
var _ViewStory = _interopRequireDefault(require("../../../utils/ViewStory.util"));
var _ChapterKey = _interopRequireDefault(require("../../../enums/redis_key/ChapterKey.enum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var ChapterController = {
  allByStoryId: function () {
    var _allByStoryId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var slugId, order, _slugId$split, _slugId$split2, storySlug, storyId, redisKey, chapters;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            slugId = req.params.slugId;
            order = req.query.order;
            _slugId$split = slugId.split('.-.'), _slugId$split2 = _slicedToArray(_slugId$split, 2), storySlug = _slugId$split2[0], storyId = _slugId$split2[1];
            redisKey = "".concat(_ChapterKey["default"].ALL, ".\n        ").concat(storyId, ".\n        ").concat(order, ".\n        ");
            _context.next = 7;
            return _Redis["default"].get(redisKey);
          case 7:
            chapters = _context.sent;
            if (chapters) {
              _context.next = 12;
              break;
            }
            _context.next = 11;
            return _Chapter["default"].getAllByStory(storyId, storySlug, order, {
              moreWhere: {
                access: _ChapterAccess["default"].PUBLIC
              }
            });
          case 11:
            chapters = _context.sent;
          case 12:
            _Redis["default"].set(redisKey, chapters);
            return _context.abrupt("return", res.status(200).json(chapters));
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            next(_context.t0);
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 16]]);
    }));
    function allByStoryId(_x, _x2, _x3) {
      return _allByStoryId.apply(this, arguments);
    }
    return allByStoryId;
  }(),
  get: function () {
    var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
      var id, auth, redisKey, chapter, transaction;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            auth = req.user;
            redisKey = "".concat(_ChapterKey["default"].GET, ".").concat(id);
            _context2.next = 6;
            return _Redis["default"].get(redisKey);
          case 6:
            chapter = _context2.sent;
            if (chapter) {
              _context2.next = 11;
              break;
            }
            _context2.next = 10;
            return _Chapter["default"].getOneChapter(id, {
              moreWhere: {
                access: _StoryAccess["default"].PUBLIC
              }
            });
          case 10:
            chapter = _context2.sent;
          case 11:
            if (chapter) {
              _context2.next = 13;
              break;
            }
            return _context2.abrupt("return", res.status(404).json('not found'));
          case 13:
            _Redis["default"].set(redisKey, chapter);

            // thêm vào lịch sử đọc truyện và thêm view nếu chưa có
            _context2.next = 16;
            return Promise.all([_ViewStory["default"].setViewStory(auth.id, chapter.StoryId, chapter.id), _History["default"].setHistoryStory(auth.id, chapter.StoryId, chapter.id)]);
          case 16:
            if (!chapter.isFree) {
              _context2.next = 18;
              break;
            }
            return _context2.abrupt("return", res.status(200).json(chapter));
          case 18:
            _context2.next = 20;
            return _Purchase["default"].getTransaction(auth.id, chapter.id);
          case 20:
            transaction = _context2.sent;
            if (transaction) {
              _context2.next = 23;
              break;
            }
            return _context2.abrupt("return", res.status(403).json('you need to purchase this chapter before watching'));
          case 23:
            return _context2.abrupt("return", res.status(200).json(chapter));
          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            next(_context2.t0);
          case 30:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 26]]);
    }));
    function get(_x4, _x5, _x6) {
      return _get.apply(this, arguments);
    }
    return get;
  }(),
  insert: function () {
    var _insert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
      var auth, chapterDTO, story, chapter;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            auth = req.user;
            chapterDTO = req.body;
            chapterDTO.access = _StoryAccess["default"].PRIVATE;
            _context3.next = 6;
            return _Story["default"].findByPk(chapterDTO.StoryId);
          case 6:
            story = _context3.sent;
            if (story) {
              _context3.next = 9;
              break;
            }
            return _context3.abrupt("return", res.status(400).json('story not found'));
          case 9:
            if (!(story.UserId != auth.id)) {
              _context3.next = 11;
              break;
            }
            return _context3.abrupt("return", res.status(403).json('access denined'));
          case 11:
            _context3.next = 13;
            return _Chapter2["default"].create(chapterDTO);
          case 13:
            chapter = _context3.sent;
            _Redis["default"].delWithPrefix("".concat(_ChapterKey["default"].ALL, ".\n        ").concat(chapterDTO.StoryId, "."));
            return _context3.abrupt("return", res.status(201).json(chapter));
          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            next(_context3.t0);
          case 22:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 18]]);
    }));
    function insert(_x7, _x8, _x9) {
      return _insert.apply(this, arguments);
    }
    return insert;
  }(),
  update: function () {
    var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
      var auth, id, chapterDTO, chapter, _yield$Chapter$update, _yield$Chapter$update2, updatedCount;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            auth = req.user;
            id = req.params.id;
            chapterDTO = req.body;
            _context4.next = 6;
            return _Chapter2["default"].findByPk(id, {
              include: [{
                model: _Story["default"],
                required: true
              }]
            });
          case 6:
            chapter = _context4.sent;
            if (chapter) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", res.status(404).json('chapter not found'));
          case 9:
            if (!(chapter.Story.UserId != auth.id)) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", res.status(403).json('access denined'));
          case 11:
            _context4.next = 13;
            return _Chapter2["default"].update(chapterDTO, {
              where: {
                id: id
              }
            });
          case 13:
            _yield$Chapter$update = _context4.sent;
            _yield$Chapter$update2 = _slicedToArray(_yield$Chapter$update, 1);
            updatedCount = _yield$Chapter$update2[0];
            if (updatedCount) {
              _Redis["default"].delWithPrefix("".concat(_ChapterKey["default"].ALL, ".\n          ").concat(chapter.StoryId, "."));
              _Redis["default"].del("".concat(_ChapterKey["default"].GET, ".").concat(id));
            }
            return _context4.abrupt("return", res.status(200).json(updatedCount));
          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            next(_context4.t0);
          case 24:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 20]]);
    }));
    function update(_x10, _x11, _x12) {
      return _update.apply(this, arguments);
    }
    return update;
  }(),
  "delete": function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
      var auth, id, chapter, deletedCount;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            auth = req.user;
            id = req.params.id;
            _context5.next = 5;
            return _Chapter2["default"].findByPk(id, {
              include: [{
                model: _Story["default"],
                required: true
              }]
            });
          case 5:
            chapter = _context5.sent;
            if (chapter) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", res.status(404).json('chapter not found'));
          case 8:
            if (!(chapter.Story.UserId != auth.id)) {
              _context5.next = 10;
              break;
            }
            return _context5.abrupt("return", res.status(403).json('access denined'));
          case 10:
            if (!(chapter.access != _ChapterAccess["default"].PRIVATE)) {
              _context5.next = 12;
              break;
            }
            return _context5.abrupt("return", res.status(400).json('chapter is not private'));
          case 12:
            _context5.next = 14;
            return _Chapter2["default"].destroy({
              where: {
                id: id
              }
            });
          case 14:
            deletedCount = _context5.sent;
            if (deletedCount) {
              _Redis["default"].delWithPrefix("".concat(_ChapterKey["default"].ALL, ".\n          ").concat(chapter.StoryId, "."));
              _Redis["default"].del("".concat(_ChapterKey["default"].GET, ".").concat(id));
            }
            return _context5.abrupt("return", res.status(200).json(deletedCount));
          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);
          case 22:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 19]]);
    }));
    function _delete(_x13, _x14, _x15) {
      return _delete2.apply(this, arguments);
    }
    return _delete;
  }(),
  "public": function () {
    var _public2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
      var auth, ids, chapters, _iterator, _step, _chapter, _yield$Chapter$update3, _yield$Chapter$update4, updatedCount, _iterator2, _step2, chapter;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            auth = req.user;
            ids = req.body.ids;
            _context6.next = 5;
            return _Chapter2["default"].findAll({
              include: [{
                model: _Story["default"],
                required: true
              }],
              where: {
                id: _defineProperty({}, _sequelize.Op["in"], ids)
              }
            });
          case 5:
            chapters = _context6.sent;
            if (chapters) {
              _context6.next = 8;
              break;
            }
            return _context6.abrupt("return", res.status(400).json('chapters not found'));
          case 8:
            _iterator = _createForOfIteratorHelper(chapters);
            _context6.prev = 9;
            _iterator.s();
          case 11:
            if ((_step = _iterator.n()).done) {
              _context6.next = 19;
              break;
            }
            _chapter = _step.value;
            if (!(_chapter.Story.UserId !== auth.id)) {
              _context6.next = 15;
              break;
            }
            return _context6.abrupt("return", res.status(403).json("access denined for chapter id: ".concat(_chapter.id)));
          case 15:
            if (!(_chapter.access != _ChapterAccess["default"].PRIVATE)) {
              _context6.next = 17;
              break;
            }
            return _context6.abrupt("return", res.status(400).json("chapter id: ".concat(_chapter.id, " is not private")));
          case 17:
            _context6.next = 11;
            break;
          case 19:
            _context6.next = 24;
            break;
          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](9);
            _iterator.e(_context6.t0);
          case 24:
            _context6.prev = 24;
            _iterator.f();
            return _context6.finish(24);
          case 27:
            _context6.next = 29;
            return _Chapter2["default"].update({
              access: _ChapterAccess["default"].PUBLIC
            }, {
              where: {
                id: _defineProperty({}, _sequelize.Op["in"], ids)
              }
            });
          case 29:
            _yield$Chapter$update3 = _context6.sent;
            _yield$Chapter$update4 = _slicedToArray(_yield$Chapter$update3, 1);
            updatedCount = _yield$Chapter$update4[0];
            if (updatedCount) {
              _iterator2 = _createForOfIteratorHelper(chapters);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  chapter = _step2.value;
                  _Redis["default"].delWithPrefix("".concat(_ChapterKey["default"].ALL, ".\n          ").concat(chapter.StoryId, "."));
                  _Redis["default"].del("".concat(_ChapterKey["default"].GET, ".").concat(chapter.id));
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
            return _context6.abrupt("return", res.status(200).json(updatedCount));
          case 36:
            _context6.prev = 36;
            _context6.t1 = _context6["catch"](0);
            next(_context6.t1);
          case 39:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 36], [9, 21, 24, 27]]);
    }));
    function _public(_x16, _x17, _x18) {
      return _public2.apply(this, arguments);
    }
    return _public;
  }()
};
var _default = exports["default"] = ChapterController;