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
      content: {
        type: STRING,
        allowNull: false
      },
      authorName: STRING(32),
      authorId: INTEGER,
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