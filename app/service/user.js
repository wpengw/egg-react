'use strict';

const Service = require('egg').Service;
const ms = require('ms');
const Op = require('Sequelize').Op;

class UserService extends Service {
  async find(id) {
    const { ctx } = this;
    const user = await ctx.model.User.findAll();

    // const user = await this.app.mysql.get('users', { id });
    // 假定这里还有一些复杂的计算，然后返回需要的信息。
    // const picture = await this.getPicture(uid);

    return user
  }
  // async getPicture(uid) {
  //   return 'https://img-blog.csdn.net/20180718215056611?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NDQ2NjYz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70';
  //   // const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
  //   // return result.data;
  // }

  async register(params) {
    const { ctx } = this;
    const { username, email } = params;
    let resUsers = await ctx.model.User.findAll({ where: { [Op.or]: [ {username},{email} ] } });
    if (resUsers.length > 0) {
      return {
        code: 1,
        msg: '用户名已存在或该邮箱已经存在!'
      }
    }
    const res = await ctx.model.User.create(params);
    return {
      code: 0,
      data: res.username,
      msg: '注册成功！'
    };
  }

  async login(params) {
    const { ctx } = this;
    const { username, password } = params;
    let user = await ctx.model.User.findOne({ where: { username } });
    if (!user) {
      return {
        code: 2,
        msg: '用户名或密码错误'
      }
    }

    if (user.password == password) {
      ctx.session.uid = user.id;
      ctx.session.username = username;
      ctx.session.maxAge = ms('2h');
      return {
        code: 0,
        data: {
          id: user.id,
          username: user.id
        },
        msg: '登录成功！'
      }
    } else {
      return {
        code: 1,
        msg: '用户名或密码错误'
      }
    }

    return {
      code: 5,
      msg: '登录失败'
    }

    // let user = await ctx.model.User.findOne({where: {username}});
    // if (!user) {
    //     ctx.failure("用户名或密码错误!");
    //     return;
    // }
    // if (user.status=='C') {
    //     ctx.failure("该用户已禁止登录!");
    //     return;
    // }
    // let userLogin = await ctx.model.UserLogin.findOne({where: {loginString: username}});
    // if (!userLogin) {
    //     ctx.failure("用户登录信息不存在!");
    //     return;
    // }
  }
}

module.exports = UserService;
