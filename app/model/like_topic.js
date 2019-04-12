'use strict';
// const uuidv1 = require('uuid/v1');
const db = require('./db');

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;

  const LikeTopic = db.defineModel(app, 'like_topic', {
    userId: { type: STRING, allowNull: false }, // 用户id
    topicId: { type: STRING, allowNull: false }, // 文章id
    status: { type: BOOLEAN, allowNull: false } 
  })

  return LikeTopic;
}