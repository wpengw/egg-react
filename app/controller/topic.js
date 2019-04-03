'use strict';

const Controller = require('../core/base_controller');

class TopicController extends Controller {
  async getAllTopicList() {
    const { ctx } = this;
    const target = ctx.query.target;
    const topicType = ctx.query.topicType;
    if (target) {
      await ctx.service.topic.findByTarget(target);
    } else if (topicType) {
      await ctx.service.topic.findByTopicType(topicType);
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

  async postCreateTopic() {
    const { ctx } = this;
    const { authorId, authorName, title, topicType, targets, content } = ctx.request.body;

    let msg = '';
    if ([ authorId, authorName, title, topicType, targets, content ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    }
    if (msg) {
      ctx.failure(msg)
      return;
    }
    await ctx.service.topic.createTopic({ authorId, authorName, title, topicType, targets, content});
  }
}

module.exports = TopicController;
