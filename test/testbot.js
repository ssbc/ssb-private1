const TestServer = require('scuttle-testbot')

module.exports = function Server (opts = {}) {
  return TestServer
    .use(require('../'))
    .call(null, opts)
}
