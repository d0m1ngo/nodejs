const config = require('config');
const path = require('path');

const params = parseDBString(config.get('database.url'));
module.exports = {
  development: params,
  testing: params,
  production: params,
};

function parseDBString(url) {
  const [dialect, tail] = url.split('://');
  if (dialect !== 'sqlite') {
    return { dialect, url };
  }

  if (tail === ':memory:') {
    return { dialect, url: 'sqlite:/:memory:' };
  }

  return {
    dialect,
    url: `sqlite:${path.join(__dirname, tail)}`,
    storage: path.join(__dirname, tail),
  };
}
