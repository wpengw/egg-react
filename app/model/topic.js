'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
  const Topic = app.model.define('topics', 
    {
      id: {
        type: INTEGER,
        primaryKey: true, // 做为主键
        autoIncrement: true
      },
      title: {
        type: STRING(64),
        validate: {
          // 限制长度范围
          min: 3,
          max: 64
        }
      },
      topicType: INTEGER,
      targets: STRING(255),
      content: {
        type: STRING,
        allowNull: false
      },
      likeNum: INTEGER, // 点赞量
      pageView: INTEGER, // 浏览量
      authorName: STRING(32),
      authorId: STRING(64),
      created_at: {
        type: DATE,
        defaultValue: NOW
      },
      updated_at: {
        type: DATE,
        defaultValue: NOW
      }
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false
    }
  );
  
  return Topic;
};