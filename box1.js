var ssbKeys = require('ssb-keys')
var isFeed = require('ssb-ref').isFeed

module.exports = function box1 (keys) {
  return {
    boxer: (content) => {
      if (!content.recps.every(isFeed)) return

      return ssbKeys.box(content, content.recps)
    },
    unboxer: {
      // init: (done) => {
      //   Optional feature not needed by this module
      //   done()
      // },
      key: (ciphertext, msg) => {
        if (!ciphertext.endsWith('.box')) return
        // todo move this inside of ssb-keys

        return ssbKeys.unboxKey(ciphertext, keys)
      },
      value: (ciphertext, msg, readKey) => {
        return ssbKeys.unboxBody(ciphertext, readKey)
      }
    }
  }
}
