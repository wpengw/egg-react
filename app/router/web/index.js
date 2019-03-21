'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;
  const { user, topic } = controller;
  /**
   * 用户相关接口
   */
  apiV1Router.get('/getUser', user.info); // 获取用户信息
  apiV1Router.post('/postRegister', user.postRegister); // 

  /**
   * topic相关接口
   */
  apiV1Router.get('/getAllTopicList', topic.getAllTopicList); // 获取topicList
  apiV1Router.get('/getTopicDetailById', topic.getTopicDetailById); // 查看topicDetail
  
};
