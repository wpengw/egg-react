const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];

  exports.sequelize = { // egg-sequelize 配置
    dialect: 'mysql', // db type
    database: 'egg_demo',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '106540719'
  };
  // exports.mysql = {
  //   client: {
  //     host: 'localhost',
  //     port: '3306',
  //     user: 'root',
  //     password: '106540719',
  //     database: 'egg_demo'
  //   },
  //   app: true,
  //   // load into agent, default is close
  //   agent: false
  // };

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/index.html')
  }
  exports.security = {
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  }

  return exports;
};
