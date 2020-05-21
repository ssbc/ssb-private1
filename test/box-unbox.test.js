var tape = require('tape')
var ssbKeys = require('ssb-keys')
var Server = require('./testbot')
var box1 = require('../box1')

tape('private box (v1)', (t) => {
  var server = Server()
  var bob = ssbKeys.generate()

  var original = {
    type: 'secret',
    okay: true,
    recps: [server.id, bob.id]
  }

  server.publish(original, (err, msg) => {
    if (err) throw err

    t.true(msg.value.content.endsWith('.box'), 'auto boxes')

    var { unboxer } = box1(bob)
    var key = unboxer.key(msg.value.content)
    var content = unboxer.value(msg.value.content, null, key)

    t.deepEqual(content, original, 'bob can unbox')

    server.get({ id: msg.key, private: true }, (err, value) => {
      if (err) throw err

      t.deepEqual(value.content, original, 'auto unboxes')

      t.end()
      server.close()
    })
  })
})
