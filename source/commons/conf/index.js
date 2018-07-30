const nconf = require('nconf');

nconf.argv()
  .env()
  .file('config/store-curso-config.json')
  .defaults({
    PORT: 3000
  });

module.exports = nconf;