'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
  const User = app.model.define('users', 
    {
      login: STRING,
      id: {
        type: INTEGER,
        primaryKey: true, // 做为主键
        autoIncrement: true
      },
      // accountId: {
      //   type: INTEGER.UNSIGNED,
      //   allowNull: false,
      //   // 账号id需要唯一性，这个是永远不能改变的值，特别是在分表的情况下，用自增ID不小心就会重复了
      //   unique: true
      // },
      name: {
        type: STRING(32),
        validate: {
          // 限制长度范围
          min: 4,
          max: 32
        },
        unique: true // 账号需要唯一性，登录时候使用
      },
      password: {
        type: STRING(128),
        allowNull: false
      },
      email: {
        type: STRING(64),
        allowNull: false,
        validate: {
          isEmail: true // 格式必须为 邮箱格式
        }
      },
      age: INTEGER,
      last_sign_in_at: DATE,
      created_at: {
        type: DATE,
        defaultValue: NOW
      },
      updated_at: DATE
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false
    }
  );
  
  return User;
};