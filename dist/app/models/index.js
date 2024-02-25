"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Story = _interopRequireDefault(require("./Story.model"));
var _Author = _interopRequireDefault(require("./Author.model"));
var _Category = _interopRequireDefault(require("./Category.model"));
var _CategoryStory = _interopRequireDefault(require("./CategoryStory.model"));
var _Chapter = _interopRequireDefault(require("./Chapter.model"));
var _Comment = _interopRequireDefault(require("./Comment.model"));
var _FollowStory = _interopRequireDefault(require("./FollowStory.model"));
var _FollowUser = _interopRequireDefault(require("./FollowUser.model"));
var _HistoryStory = _interopRequireDefault(require("./HistoryStory.model"));
var _LikeStory = _interopRequireDefault(require("./LikeStory.model"));
var _Notification = _interopRequireDefault(require("./Notification.model"));
var _Purchase = _interopRequireDefault(require("./Purchase.model"));
var _Role = _interopRequireDefault(require("./Role.model"));
var _TransactionHistory = _interopRequireDefault(require("./TransactionHistory.model"));
var _User = _interopRequireDefault(require("./User.model"));
var _ViewStory = _interopRequireDefault(require("./ViewStory.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initRelationship = function initRelationship() {
  // author
  _Author["default"].hasMany(_Story["default"]);

  // category
  _Category["default"].belongsToMany(_Story["default"], {
    through: _CategoryStory["default"]
  });

  // chapter
  _Chapter["default"].belongsTo(_Story["default"], {
    onDelete: 'CASCADE'
  });
  _Chapter["default"].belongsToMany(_User["default"], {
    through: _Purchase["default"]
  });

  // comment
  _Comment["default"].belongsTo(_User["default"], {
    onDelete: 'CASCADE'
  });
  _Comment["default"].belongsTo(_Story["default"], {
    onDelete: 'CASCADE'
  });
  _Comment["default"].belongsTo(_Comment["default"], {
    foreignKey: 'parentId',
    onDelete: 'CASCADE'
  });

  // notification
  _Notification["default"].belongsTo(_User["default"]);

  // story
  _Story["default"].belongsTo(_Author["default"]);
  _Story["default"].belongsTo(_User["default"]);
  _Story["default"].belongsToMany(_Category["default"], {
    through: _CategoryStory["default"]
  });
  _Story["default"].belongsToMany(_User["default"], {
    through: _FollowStory["default"],
    as: 'follows'
  });
  _Story["default"].belongsToMany(_User["default"], {
    through: _LikeStory["default"],
    as: 'likes'
  });
  _Story["default"].hasMany(_ViewStory["default"], {
    as: 'views'
  });
  _Story["default"].hasMany(_Chapter["default"]);
  _Story["default"].hasMany(_Comment["default"]);

  // transaction history
  _TransactionHistory["default"].belongsTo(_User["default"]);

  // user
  _User["default"].hasMany(_Story["default"]);
  _User["default"].belongsTo(_Role["default"], {
    foreignKey: 'roleCode',
    targetKey: 'code'
  });

  // story follows
  _User["default"].belongsToMany(_Story["default"], {
    through: _FollowStory["default"],
    as: 'storyFollows'
  });

  // story likes
  _User["default"].belongsToMany(_Story["default"], {
    through: _LikeStory["default"],
    as: 'storyLikes'
  });

  // chapters
  _User["default"].belongsToMany(_Chapter["default"], {
    through: _Purchase["default"],
    as: 'chapterBuy'
  });

  // user follow
  _User["default"].belongsToMany(_User["default"], {
    through: _FollowUser["default"],
    as: 'following',
    foreignKey: 'userFromID',
    otherKey: 'userToId'
  });
  _User["default"].belongsToMany(_User["default"], {
    through: _FollowUser["default"],
    as: 'followers',
    foreignKey: 'userToId',
    otherKey: 'userFromID'
  });
  _ViewStory["default"].belongsTo(_User["default"]);
  _ViewStory["default"].belongsTo(_Story["default"]);
  _ViewStory["default"].belongsTo(_Chapter["default"]);

  // history story
  _HistoryStory["default"].belongsTo(_User["default"]);
  _HistoryStory["default"].belongsTo(_Story["default"]);
  _HistoryStory["default"].belongsTo(_Chapter["default"]);
};
var _default = exports["default"] = initRelationship;