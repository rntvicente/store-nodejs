const nconf = require('nconf');

nconf.argv()
  .env()
  .file('config/store-curso-config.json')
  .defaults({
    PORT: 3000,
    MONGO_URL: 'mongodb://127.0.0.1/store-nodejs' 
  });

module.exports = nconf;