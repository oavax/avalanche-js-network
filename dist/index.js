
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./avalanche-js-network.cjs.production.min.js')
} else {
  module.exports = require('./avalanche-js-network.cjs.development.js')
}
