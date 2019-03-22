'use strict';

const Controller = require('../core/base_controller');

class TopicController extends Controller {
  async getAllTopicList() {
    const { ctx } = this;
    // const userId = ctx.query.uid;
    const res = await ctx.service.topic.findAll();

    this.success(res);
  }

  /**
   * @查询topic详情
   * @params { id  }
  */
  async getTopicDetailById() {
    const { ctx } = this;
    const id = ctx.query.id;
    const topicDetail = await ctx.service.topic.findDetailById(id);
    this.success(topicDetail);
  }
}

module.exports = TopicController;
