'use strict';

const Controller = require('../core/base_controller');

class TopicController extends Controller {
  /**
   * @查询topic详情
   * @params { id  }
  */
  async getAllTarget() {
    const { ctx } = this;
    let res = await ctx.service.target.getAllTarget();
    if (res) {
      
      ctx.success(res);
    }
  }
}

module.exports = TopicController;
