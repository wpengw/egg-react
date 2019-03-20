'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
  async findAll() {
    const topicList = await this.app.mysql.select('topics', { 
      // where: { status: 'draft' },
      orders: [
        ['id', 'asc']
      ], //降序desc，升序asc
      limit: 10,
      offset: 0
    });
    return topicList;
  }

  async findDetailById(id) {
    const topicDetail = await this.app.mysql.get('topics', { id });
    return topicDetail;
  }
}

module.exports = TopicService;
