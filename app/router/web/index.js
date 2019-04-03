'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const UserInterceptor = app.middleware.userInterceptor({}, app);

  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;
  const { user, topic, target } = controller;
  /**
   * 用户相关接口
   */
  apiV1Router.get('/getUser', user.info); // 获取用户信息
  apiV1Router.post('/postRegister', user.postRegister); // 注册
  apiV1Router.post('/postLogin', user.postLogin); // 登录
  apiV1Router.post('/postLoginOut', user.postLoginOut); // 退出

  /**
   * topic相关接口
   */
  apiV1Router.get('/getAllTopicList', topic.getAllTopicList); // 获取topicList
  apiV1Router.get('/getTopicDetailById', topic.getTopicDetailById); // 查看topicDetail
  apiV1Router.post('/postCreateTopic', UserInterceptor, topic.postCreateTopic); // 创建tipic

  /**
   * target相关接口
   */
  apiV1Router.get('/getAllTarget', target.getAllTarget); // 获取target
};
