'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;
  const { user, topic } = controller;
  apiV1Router.get('/user', user.info);
  apiV1Router.get('/getAllTopicList', topic.getAllTopicList);
  apiV1Router.get('/getTopicDetailById', topic.getTopicDetailById);
};
