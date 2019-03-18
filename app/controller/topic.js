'use strict';

const Controller = require('../core/base_controller');

class TopicController extends Controller {
  async getAllTopicList() {
    const { ctx } = this;
    // const userId = ctx.query.uid;
    const topicList = await ctx.service.topic.findAll();
    this.success(topicList);
  }
}

module.exports = TopicController;
