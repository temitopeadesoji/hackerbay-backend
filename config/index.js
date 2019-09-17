const development = require('./dev');
const production = require('./prod');


if (process.env.NODE_ENV === 'dev') {
  module.exports = production;
} else {
  module.exports = development;
}
