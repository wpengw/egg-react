'use strict';
const validator = require('validator');
const Controller = require('../core/base_controller');

class UserController extends Controller {
  // 查询用户详细信息
  async info() {
    const { ctx } = this;
    const userId = ctx.query.id;
    await ctx.service.user.findById(userId);
  }

  // 注册
  async postRegister() {
    const { ctx, app } = this;
    const { username, email, password } = ctx.request.body;
    let msg;
    // 验证信息的正确性
    if ([ username, email, password ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (username.length < 3) {
      msg = '用户名至少需要3个字符。';
    } else if (!ctx.helper.validateId(username)) {
      msg = '用户名不合法。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    }
    if (msg) {
      ctx.failure(msg)
      return;
    }
    await ctx.service.user.register({ username, email, password });
  }

  // 登录
  async postLogin() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    let msg = '';
    if ([username, password].some(item => {
      return item === ''
    })) {
      msg = '登录名或密码不能为空！';
    }
    if (msg) {
      ctx.failure(msg)
      return;
    }
    await ctx.service.user.login({ username, password });
  }

  // 退出
  async postLoginOut() {
    const { ctx, app } = this;
    let username = ctx.cookies.get('username', {signed: false});
    ctx.cookies.set('token', null);
    app.redis.set(username, null);
    ctx.success(null, '退成成功！');
  }
  
}

module.exports = UserController;
