# ssb-private1

A scuttlebutt plugin which adds private box (v1) support to your `ssb-server` or `secret-stack` app.

## Example Usage

```js
const Server = require('ssb-server')

Server
  .use(require('ssb-db'}) // << required
  .use(require('ssb-private1'})

const server = Server()


const hey = {
  type: 'post',
  text: 'tongiht 8pm NZT suit me!',
  recps: [
    "@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519",
    "@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519",
  ]
}

server.publish(hey, (err, msg) => {
  console.log(msg.value.content)
  // => xU0u+8H2osHpfcqn.....keb+gn3/x8924tonhtJ3KshG/0cLexziQ==.box

  server.close()
})
```

## Dependencies

requires `ssb-db` >= 20.0.0

## history

Previously this boxing / unboxing functionality was hard-coded into `ssb-db`.
With the advent of private groups and different types of boxing / unboxing, I wanted to
provide the option to leave out the original private-box style encryption, so that apps
that don't use this older format can save energy trying to decrypt messages.

