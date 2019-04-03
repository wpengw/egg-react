'use strict';
const Sequelize = require('sequelize');
const Service = require('egg').Service;
const Op = Sequelize.Op;

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

  // 根据target获取list
  async findByTarget(target) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.findAll({
        order: [
          ['id', 'DESC']
        ],
        where: {
          targets: {
            [Op.like]: '%' + target + '%'
          }
        }
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

  // 根据topicType获取list
  async findByTopicType(topicType) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.findAll({
        order: [
          ['id', 'DESC']
        ],
        where: {
          topicType
        }
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
