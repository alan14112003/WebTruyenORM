import Story from './Story.model'
import Author from './Author.model'
import Category from './Category.model'
import CategoryStory from './CategoryStory.model'
import Chapter from './Chapter.model'
import Comment from './Comment.model'
import FollowStory from './FollowStory.model'
import FollowUser from './FollowUser.model'
import HistoryStory from './HistoryStory.model'
import LikeStory from './LikeStory.model'
import Notification from './Notification.model'
import Purchase from './Purchase.model'
import Role from './Role.model'
import TransactionHistory from './TransactionHistory.model'
import User from './User.model'
import ViewStory from './ViewStory.model'

const initRelationship = () => {
  // author
  Author.hasMany(Story)

  // category
  Category.belongsToMany(Story, {
    through: CategoryStory,
  })

  // chapter
  Chapter.belongsTo(Story, {
    onDelete: 'CASCADE',
  })

  Chapter.belongsToMany(User, {
    through: Purchase,
  })

  Chapter.hasMany(ViewStory, {
    as: 'views',
  })

  // comment
  Comment.belongsTo(User, {
    onDelete: 'CASCADE',
  })

  Comment.belongsTo(Story, {
    onDelete: 'CASCADE',
  })

  Comment.belongsTo(Comment, {
    foreignKey: 'parentId',
    onDelete: 'CASCADE',
  })

  // notification
  Notification.belongsTo(User)

  // story
  Story.belongsTo(Author)

  Story.belongsTo(User)

  Story.belongsToMany(Category, {
    through: CategoryStory,
  })

  Story.hasMany(FollowStory)

  Story.belongsToMany(User, {
    through: FollowStory,
    as: 'follows',
    onDelete: 'CASCADE',
  })

  Story.belongsToMany(User, {
    through: LikeStory,
    as: 'likes',
  })

  Story.hasMany(ViewStory, {
    as: 'views',
  })

  Story.hasMany(Chapter)

  Story.hasMany(Comment)

  // transaction history
  TransactionHistory.belongsTo(User)

  // user
  User.hasMany(Story)

  User.belongsTo(Role, {
    foreignKey: 'roleCode',
    targetKey: 'code',
  })

  // story follows
  User.belongsToMany(Story, {
    through: FollowStory,
    as: 'storyFollows',
    onDelete: 'CASCADE',
  })

  // story likes
  User.belongsToMany(Story, {
    through: LikeStory,
    as: 'storyLikes',
  })

  // chapters
  User.belongsToMany(Chapter, {
    through: Purchase,
    as: 'chapterBuy',
  })

  // user follow
  User.belongsToMany(User, {
    through: FollowUser,
    as: 'following',
    foreignKey: 'userFromID',
    otherKey: 'userToId',
  })

  User.belongsToMany(User, {
    through: FollowUser,
    as: 'followers',
    foreignKey: 'userToId',
    otherKey: 'userFromID',
  })

  ViewStory.belongsTo(User)
  ViewStory.belongsTo(Story)
  ViewStory.belongsTo(Chapter)

  // history story
  HistoryStory.belongsTo(User)
  HistoryStory.belongsTo(Story)
  HistoryStory.belongsTo(Chapter)
}

export default initRelationship
