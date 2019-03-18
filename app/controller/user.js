'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.query.uid;
    const userInfo = await ctx.service.user.find(userId);
    // ctx.body = userInfo;
    this.success(userInfo);
  }
}

module.exports = UserController;
