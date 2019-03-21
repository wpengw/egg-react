module.exports = app => {
  // app.beforeStart(async function () {
  //   await app.model.sync({ force: true });
  // });
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.renderAsset('app.js', { url: ctx.path });
    }
  };
};