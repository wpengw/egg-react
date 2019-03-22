'use strict';
const validator = require('validator');
const Controller = require('../core/base_controller');

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.query.id;
    const userInfo = await ctx.service.user.find(userId);
    // ctx.body = userInfo;
    this.success(userInfo);
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
      this.error({
        code: 3, 
        msg
      })
      return;
    }

    const res = await ctx.service.user.register({ username, email, password });
    if (res.code === 0) {
      this.success(res);
    } else {
      this.error(res);
    }
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
      this.error({
        code: 3, 
        msg
      })
      return;
    }

    const res = await ctx.service.user.login({ username, password });
    if (res.code === 0) {
      const token = ctx.helper.generateToken({id: res.data.id}, 7200);
      res.data.token = token;
      ctx.cookies.set('token', token, {
        maxAge: 7200 * 1000,
        // path: '/',
        // domain: 'localhost',
        httpOnly: false
      });

      // 保存到redis
      app.redis.set(res.username, token);

      this.success(res);
    } else {
      this.error(res);
    }
  }
  
}

module.exports = UserController;
