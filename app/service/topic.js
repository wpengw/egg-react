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
  async findByTopicType(parentTarget) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Topic.findAll({
        order: [
          ['id', 'DESC']
        ],
        where: {
          parentTarget
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
      let res = await ctx.model.Topic.findOne({ where: { id } });
      if (res) {
        let res2 = await this.findTargets(res);
        res.update({ pageView: ++res.pageView })
        res.dataValues.targetsArr = res2;
        ctx.success(res);
      } else {
        ctx.failure('没找到数据！');
      }
    } catch (err) {
      ctx.failure('系统异常33！！', 4000);
    }
  }
  async findTargets (obj) {
    let _obj = obj.dataValues;
    const { ctx } = this;
    let _arr = [];
    let res = await ctx.model.TargetOne.findOne({
      attributes: ['label', 'value'],
      order: [
        ['id']
      ],
      include: [
        {
          model: ctx.model.Target,
          attributes: ['label', 'value', 'parentValue']
        }
      ],
      where: { value: _obj.parentTarget }
    });
    _arr.push({
      label: res.dataValues.label,
      value: res.dataValues.value
    })
    let _arr2 = res.dataValues.targets.filter(item => {
      return _obj.targets.includes(item.value);
    })
    _arr = _arr.concat(_arr2);
    return _arr;
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

  // 点赞
  async postLikeTopic(id, userId) {
    const { ctx } = this;
    try {
      let res = await ctx.model.Topic.findOne({ where: { id } });
      let { status } = await this.updateLikeDb(id, userId);
      if (res) {
        let likeNum = status ? ++res.likeNum : (res.likeNum > 0 ? --res.likeNum : 0);
        res.update({ likeNum });
        res.dataValues.likeStatus = status;
        ctx.success(res);
      } else {
        ctx.failure('这篇文章已经被主人召回了！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }
  // 操作点赞表
  async updateLikeDb(topicId, userId) {
    const { ctx } = this;
    return await ctx.model.LikeTopic.findOne({ where: { userId, topicId } }).then(obj => {
      if (obj) {
        return obj.update({ status: !obj.status });
      } else {
        return ctx.model.LikeTopic.create({ topicId, userId, status: true });
      }
    })
  }
}

module.exports = TopicService;
