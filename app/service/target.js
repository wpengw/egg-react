'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize');

class TargetService extends Service {
  // 获取 target
  async getAllTarget() {
    const { ctx } = this;
    try {
      let res = await ctx.model.TargetOne.findAll({
        attributes: ['label', 'value', 'iconUrl'],
        order: [
          ['id', 'ASC']
        ],
        include: [
          {
            model: ctx.model.Target,
            attributes: ['label', 'value', 'parentValue']
          }
        ]
      });
    
      if (res.length >= 0) {
        return res;
      } else {
        ctx.failure('没找到数据！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }
}

module.exports = TargetService;
