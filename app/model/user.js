'use strict';
// const uuidv1 = require('uuid/v1');
const db = require('./db');


module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const User = db.defineModel(app, 'users', {
    username: { type: STRING, unique: true, allowNull: false }, // 用户名
    email: { type: STRING, unique: true, allowNull: false }, // 邮箱
    password: { type: STRING, allowNull: false }, // 密码
    name: STRING, // 姓名
    sex: INTEGER, // 用户性别：1男性, 2女性, 0未知
    age: INTEGER, // 年龄
    avatar: STRING, // 头像
    roleId: STRING, // 角色id
    status: STRING, // 用户状态
    token: STRING, // 认证 token
    lastSignInAt: DATE // 上次登录时间
  })

  return User;
}


// module.exports = app => {
//   const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
//   const User = app.model.define('users', 
//     {
//       login: STRING,
//       id: {
//         type: app.Sequelize.UUID,
//         primaryKey: true, // 做为主键
//         allowNull: false,
//         defaultValue: function() {
//           return uuidv1().replace(/-/g, '');
//         }
//         // autoIncrement: true
//       },
//       name: {
//         type: STRING(32),
//         validate: {
//           // 限制长度范围
//           min: 4,
//           max: 32
//         },
//         unique: true // 账号需要唯一性，登录时候使用
//       },
//       password: {
//         type: STRING(128),
//         allowNull: false
//       },
//       email: {
//         type: STRING(64),
//         allowNull: false,
//         validate: {
//           isEmail: true // 格式必须为 邮箱格式
//         }
//       },
//       age: INTEGER,
//       last_sign_in_at: DATE,
//       created_at: {
//         type: DATE,
//         defaultValue: NOW
//       },
//       updated_at: DATE
//     },
//     {
//       freezeTableName: true, // Model 对应的表名将与model名相同
//       timestamps: false
//     }
//   );
  
//   return User;
// };