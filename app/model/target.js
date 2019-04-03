'use strict';
// const uuidv1 = require('uuid/v1');
const db = require('./db');


module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Targets = db.defineModel(app, 'targets', {
    label: { type: STRING, unique: true, allowNull: false }, // 标签名
    value: { type: STRING, unique: true, allowNull: false }, // 标签值
    parentValue: { type: STRING } // 属于什么分类
  })
  
  Targets.associate = function() {
    Targets.belongsTo(app.model.TargetOne, {as: 'include'});
    // Targets.belongsTo(app.model.TargetOne, {foreignKey: 'value', targetKey: 'parentValue'});
  }

  // belongTo: 1:前端， 2： 后端语言，3：数据库与缓存，4：开发工具， 5：系统设备，6：其他
  return Targets;
}
