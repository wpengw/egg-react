'use strict';

const Service = require('egg').Service;
const ms = require('ms');
const Op = require('Sequelize').Op;

class UserService extends Service {
  async findById(id) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findOne({ where: { id } });
      if(user) {
        ctx.success(user);
      } else {
        ctx.failure('这个人被妖怪抓走了！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }

  async register(params) {
    const { ctx } = this;
    try {
      const { username, email } = params;
      let resUsers = await ctx.model.User.findAll({ where: { [Op.or]: [ {username},{email} ] } });
      if (resUsers.length > 0) {
        ctx.failure('用户名已存在或该邮箱已经存在');
      }
      const res = await ctx.model.User.create(params);
      if (res) {
        ctx.success(res.username, '注册成功！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }

  async updateAvatar(params) {
    const { ctx } = this;
    try {
      const { avatarUrl } = params;
      let res = await ctx.model.User.findOne({ where: { id: ctx.session.userId } });
      res.update({ avatarUrl });
      ctx.success(avatarUrl);
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }

  async login(params) {
    const { ctx, app } = this;
    try {
      const { username, password } = params;
      let user = await ctx.model.User.findOne({ where: { username } });
      if (!user) {
        ctx.failure('用户名或密码错误！');
      }
  
      if (user.password == password) {
        ctx.session.userId = user.id;
        // ctx.session.username = username;
        // ctx.session.maxAge = ms('2h');
        const token = ctx.helper.generateToken({id: user.id}, 7200);
        app.redis.set(user.username, token); // 保存到redis
        let data = {
          id: user.id,
          username: user.username
        }
        ctx.cookies.set('token', token, {
          maxAge: 7200 * 1000,
          // path: '/',
          // domain: 'localhost',
          httpOnly: false
        });
        
        ctx.success(data, '登录成功！');
      } else {
        ctx.failure('用户名或密码错误！');
      }
    } catch (err) {
      ctx.failure('系统异常！！', 4000);
    }
  }
}

module.exports = UserService;
