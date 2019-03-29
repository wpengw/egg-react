'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  // 获取 topicList
  async findAll() {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.findAll({
        order: [
          ['id', 'DESC']
        ]
      });

      if (res.length >= 0) {
        ctx.success(res);
      } else {
        ctx.failure('没找到数据！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }

  // 查询详情
  async findDetailById(id) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.findOne({ where: { id } });
      if (res) {
        ctx.success(res);
      } else {
        ctx.failure('没找到数据！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }
  
  // 新建topic
  async createTopic(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.create(params);
      if (res) {
        ctx.success(res.title);
      } else {
        ctx.failure('新建失败！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }
}

module.exports = TopicService;
