'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  // success(res) {
  //   this.ctx.body = {
  //     code: 0,
  //     data: res.data,
  //     msg: res.msg || 'success'
  //   };
  // }

  error(data) {
    this.ctx.body = {
      code: data.code,
      data: data.data || null,
      msg: data.msg
    }
  }

  noFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
