'use strict';
// const uuidv1 = require('uuid/v1');
const db = require('./db');


module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const TargetOne = db.defineModel(app, 'target_one', {
    label: { type: STRING, unique: true, allowNull: false }, // 一级标签名
    value: { type: STRING, unique: true, allowNull: false } // 一级标签值
  })

  TargetOne.associate = function() {
    TargetOne.hasMany(app.model.Target, {foreignKey: 'parentValue', sourceKey: 'value'});
  }

  // belongTo: 1:前端， 2： 后端语言，3：数据库与缓存，4：开发工具， 5：系统设备，6：其他
  return TargetOne;
}
