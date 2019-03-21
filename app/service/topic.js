'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  async findAll() {
    const { ctx } = this;
    const topicList = await ctx.model.Topic.findAll({
      order: [
        ['id', 'DESC']
      ]
    });

    return topicList;
  }

  async findDetailById(id) {
    const topicDetail = await this.app.mysql.get('topics', { id });
    return topicDetail;
  }
}

module.exports = TopicService;
