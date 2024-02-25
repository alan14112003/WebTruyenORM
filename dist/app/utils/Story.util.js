"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _CategoryStory = _interopRequireDefault(require("../models/CategoryStory.model"));
var _Pagination = _interopRequireDefault(require("./Pagination.util"));
var _Story = _interopRequireDefault(require("../models/Story.model"));
var _Category = _interopRequireDefault(require("../models/Category.model"));
var _Author = _interopRequireDefault(require("../models/Author.model"));
var _User = _interopRequireDefault(require("../models/User.model"));
var _User2 = _interopRequireDefault(require("./User.util"));
var _ChapterAccess = _interopRequireDefault(require("../enums/chapter/ChapterAccess.enum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var StoryUtil = {
  /**
   * @param { import("sequelize").Transaction } trx
   * @param {number[]} categories
   */
  updateCategories: function () {
    var _updateCategories = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(categories, storyId, trx) {
      var oldCategories, oldCategoriesArr, catIns, catDel, promises;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _CategoryStory["default"].findAll({
              where: {
                StoryId: storyId
              },
              attributes: ['CategoryId'],
              raw: true
            });
          case 2:
            oldCategories = _context.sent;
            oldCategoriesArr = oldCategories.map(function (category) {
              return category.CategoryId;
            });
            catIns = categories.filter(function (element) {
              return !oldCategoriesArr.includes(element);
            });
            catDel = oldCategoriesArr.filter(function (element) {
              return !categories.includes(element);
            });
            promises = [];
            if (catIns.length > 0) {
              promises.push(_CategoryStory["default"].bulkCreate(catIns.map(function (catId) {
                return {
                  StoryId: storyId,
                  CategoryId: catId
                };
              }), {
                transaction: trx
              }));
            }
            if (catDel.length > 0) {
              promises.push(_CategoryStory["default"].destroy({
                where: {
                  CategoryId: _defineProperty({}, _sequelize.Op["in"], catDel)
                },
                transaction: trx
              }));
            }
            _context.next = 11;
            return Promise.all(promises);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function updateCategories(_x, _x2, _x3) {
      return _updateCategories.apply(this, arguments);
    }
    return updateCategories;
  }(),
  includeCountsAttr: function includeCountsAttr() {
    return [[_sequelize.Sequelize.literal("(SELECT count(*) from viewstories ViewStory where ViewStory.StoryId = Story.id)"), 'viewCount'], [_sequelize.Sequelize.literal("(SELECT count(*) from likestories LikeStory where LikeStory.StoryId = Story.id)"), 'likeCount'], [_sequelize.Sequelize.literal("(SELECT count(*) from followstories FollowStory where FollowStory.StoryId = Story.id)"), 'followCount']];
  },
  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getAllStories: function () {
    var _getAllStories = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref, options) {
      var page, perPage, type, isFull, categoryIn, categoryNotIn, authorId, userId, order, categoryWhere, storyWhere, orderBy, categoryInArr;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            page = _ref.page, perPage = _ref.perPage, type = _ref.type, isFull = _ref.isFull, categoryIn = _ref.categoryIn, categoryNotIn = _ref.categoryNotIn, authorId = _ref.authorId, userId = _ref.userId, order = _ref.order;
            categoryWhere = {};
            storyWhere = {};
            orderBy = []; // where của category
            if (categoryIn) {
              categoryInArr = categoryIn.split(',');
              categoryWhere['id'] = _defineProperty({}, _sequelize.Op["in"], _sequelize.Sequelize.literal("(select c.StoryId\n          from categorystories c \n          where c.CategoryId in (".concat(categoryIn, ")\n          group by c.StoryId \n          having (count(c.CategoryId) = ").concat(categoryInArr.length, "))")));
            }
            if (categoryNotIn) {
              categoryWhere['id'] = _objectSpread(_objectSpread({}, categoryWhere['id']), {}, _defineProperty({}, _sequelize.Op.notIn, _sequelize.Sequelize.literal("(select distinct(c.StoryId)\n          from categorystories c \n          where c.CategoryId in (".concat(categoryNotIn, "))"))));
            }

            // where của story
            if (isFull) {
              storyWhere.isFull = isFull;
            }
            if (type) {
              storyWhere.type = type;
            }
            if (authorId) {
              storyWhere.authorId = authorId;
            }
            if (userId) {
              storyWhere.userId = userId;
            }
            _context2.t0 = order;
            _context2.next = _context2.t0 === 'update' ? 13 : _context2.t0 === 'views' ? 15 : _context2.t0 === 'likes' ? 17 : _context2.t0 === 'chapters' ? 19 : _context2.t0 === 'isFull' ? 21 : 23;
            break;
          case 13:
            orderBy.push(['updatedAt', 'DESC']);
            return _context2.abrupt("break", 25);
          case 15:
            orderBy.push(['viewCount', 'DESC']);
            return _context2.abrupt("break", 25);
          case 17:
            orderBy.push(['likeCount', 'DESC']);
            return _context2.abrupt("break", 25);
          case 19:
            orderBy.push(['lastChapter', 'DESC']);
            return _context2.abrupt("break", 25);
          case 21:
            orderBy.push(['isFull', 'DESC']);
            return _context2.abrupt("break", 25);
          case 23:
            orderBy.push(['updatedAt', 'DESC'], ['viewCount', 'DESC'], ['likeCount', 'DESC'], ['lastChapter', 'DESC'], ['isFull', 'DESC']);
            return _context2.abrupt("break", 25);
          case 25:
            _context2.next = 27;
            return _Pagination["default"].paginate(_Story["default"], page, perPage, _objectSpread({
              where: _objectSpread(_objectSpread(_objectSpread({}, storyWhere), categoryWhere), options.moreWhere),
              subQuery: false,
              attributes: {
                include: [].concat(_toConsumableArray(StoryUtil.includeCountsAttr()), [[_sequelize.Sequelize.literal("(SELECT Chapter.number \n              from chapters Chapter \n              where Chapter.StoryId = Story.id \n              and Chapter.deletedAt is null\n              and Chapter.access = ".concat(_ChapterAccess["default"].PUBLIC, "\n              order by Chapter.number desc\n              limit 1\n              )")), 'lastChapter']])
              },
              include: [{
                model: _Category["default"],
                required: true,
                through: {
                  attributes: []
                }
              }, {
                model: _User["default"],
                required: true,
                attributes: _toConsumableArray(_User2["default"].getPublicInfoAttribute())
              }],
              order: orderBy
            }, options.moreOptions));
          case 27:
            return _context2.abrupt("return", _context2.sent);
          case 28:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function getAllStories(_x4, _x5) {
      return _getAllStories.apply(this, arguments);
    }
    return getAllStories;
  }(),
  /**
   * @param { {
   * moreWhere: import("sequelize").Filterable<any>["where"],
   * moreOptions: import("sequelize").FindAndCountOptions
   * }  } options
   */
  getOneStory: function () {
    var _getOneStory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, slug, options) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Story["default"].findOne(_objectSpread({
              attributes: {
                include: _toConsumableArray(StoryUtil.includeCountsAttr())
              },
              where: _objectSpread({
                id: id,
                slug: slug
              }, options.moreWhere),
              include: [{
                model: _Author["default"]
              }, {
                model: _Category["default"],
                required: true,
                through: {
                  attributes: []
                }
              }, {
                model: _User["default"],
                required: true,
                attributes: _toConsumableArray(_User2["default"].getPublicInfoAttribute())
              }]
            }, options.moreOptions));
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function getOneStory(_x6, _x7, _x8) {
      return _getOneStory.apply(this, arguments);
    }
    return getOneStory;
  }()
};
var _default = exports["default"] = StoryUtil;