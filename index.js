const box1 = require('./box1')

module.exports = {
  name: 'private1',
  version: require('./package.json').version,
  manifest: {},
  init: (ssb, config) => {
    const { boxer, unboxer } = box1(ssb.keys)

    ssb.addBoxer(boxer)
    ssb.addUnboxer(unboxer)
  }
}
