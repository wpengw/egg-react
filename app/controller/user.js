'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.query.id;
    const userInfo = await ctx.service.user.find(userId);
    // ctx.body = userInfo;
    this.success(userInfo);
  }

  // register
  async postRegister() {
    const { ctx, app } = this;
    const params = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password
    }
    const res = await ctx.service.user.register(params);
    console.log('res------', res)
    this.success(res);
  }
}

module.exports = UserController;
