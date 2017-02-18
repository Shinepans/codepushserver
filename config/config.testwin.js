var os = require('os');

var config = {};
config.test = {
  db: {
    username: "root",
    password: "Password12!",
    database: "codepush_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false
  },
  local: {
    storageDir: os.tmpdir(),
    downloadUrl: "http://localhost:3000/download",
    public: '/download'
  },
  jwt: {
    tokenSecret: 'INSERT_RANDOM_TOKEN_KEY'
  },
  common: {
    tryLoginTimes: 10,
    diffNums: 3,
    dataDir: os.tmpdir(),
    storageType: "local",
    updateCheckCache: true
  },
  smtpConfig: false,
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
      }
    }
  }
}
config.test.log4js = {
  appenders: [
    { type: 'console'}
  ],
  levels : {
    "[all]": "ERROR",
    "startup": "INFO",
    "http" : "INFO"
  }
}
module.exports = config;
