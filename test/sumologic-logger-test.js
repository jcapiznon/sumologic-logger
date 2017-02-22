'use strict'

const amqp = require('amqplib')

let assert = require('assert')
let cp = require('child_process')
let _channel = null
let _conn = null

let sumologicLogger = null

describe('Loggly Logger', function () {
  before('init', () => {
    process.env.PORT = 8081
    process.env.INPUT_PIPE = 'demo.pipe.logger'
    process.env.BROKER = 'amqp://guest:guest@127.0.0.1/'
    process.env.CONFIG = '{"httpSource":"https://collectors.au.sumologic.com/receiver/v1/http/ZaVnC4dhaV01us6YeH9k0uNFZ_lqsku0ZYyU8YYCJnrD38Qg91zMzqehM_oAbFv5uZ3PkBIwFY7y8DPZQJ1NgkpogcpD_A6qLFYvsUg-JVPv_1zLKXfc7Q=="}'


    amqp.connect(process.env.BROKER)
      .then((conn) => {
        _conn = conn
        return conn.createChannel()
      }).then((channel) => {
      _channel = channel
    }).catch((err) => {
      console.log(err)
    })
  })

  after('terminate child process', function (done) {
    this.timeout(8000)

    setTimeout(function () {
      sumologicLogger.kill('SIGKILL')
      done()
    }, 5000)
  })

  describe('#spawn', function () {
    it('should spawn a child process', function () {
      assert.ok(sumologicLogger = cp.fork(process.cwd()), 'Child process not spawned.')
    })
  })

  describe('#handshake', function () {
    it('should notify the parent process when ready within 8 second', function (done) {
      this.timeout(8000)
      sumologicLogger.on('message', (msg) => {
        if (msg.type === 'ready') done()
      })
    })

    it('should process JSON log data', function (done) {
      let dummyData = {foo: 'reekohtest1'}
      _channel.sendToQueue('demo.pipe.logger', new Buffer(JSON.stringify(dummyData)))

      done()
    })
  })
})
