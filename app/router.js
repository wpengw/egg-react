
module.exports = app => {
  require('./router/web')(app);
  app.get('*', app.controller.app.index);
};
