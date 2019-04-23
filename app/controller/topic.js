'use strict';

const Controller = require('../core/base_controller');

class TopicController extends Controller {
  async getAllTopicList() {
    const { ctx } = this;
    const target = ctx.query.target;
    const parentTarget = ctx.query.parentTarget;
    if (target) {
      await ctx.service.topic.findByTarget(target);
    } else if (parentTarget) {
      await ctx.service.topic.findByTopicType(parentTarget);
    } else {
      await ctx.service.topic.findAll();
    }
  }

  /**
   * @查询topic详情
   * @params { id  }
  */
  async getTopicDetailById() {
    const { ctx } = this;
    const id = ctx.query.id;
    await ctx.service.topic.findDetailById(id);
  }

  /**
   * @创建topic
   * @params { authorId, authorName, title, topicType, targets, content }
  */
  async postCreateTopic() {
    const { ctx } = this;
    const { authorId, authorName, title, topicType, targets, content, parentTarget } = ctx.request.body;

    let msg = '';
    if ([ authorId, authorName, title, topicType, targets, content, parentTarget ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整！';
    }
    if (msg) {
      ctx.failure(msg)
      return;
    }
    await ctx.service.topic.createTopic({ authorId, authorName, title, topicType, targets, parentTarget, content});
  }

  /**
   * @点赞
   * @params { id }
  */
  async postLikeTopic() {
    const { ctx } = this;
    const { id, userId } = ctx.request.body;
    await ctx.service.topic.postLikeTopic(id, userId);
  }
}

module.exports = TopicController;
