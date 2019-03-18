const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/src/app.js'
  },
  loaders:{
    sass: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/asset/style')
        ]
      }
    },
    scss: {
      options: {
        includePaths: [
          path.resolve(process.cwd(), 'app/web/asset/style')
        ]
      }
    }
  }
};
