module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(function*() {
      yield app.model.sync({ force: false });
    });
  }
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.renderAsset('app.js', { url: ctx.path });
    }
  };
};