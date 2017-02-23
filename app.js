'use strict'

const reekoh = require('reekoh')
const _plugin = new reekoh.plugins.Logger()
const request = require('request')

let httpSource = null

_plugin.on('log', (logData) => {
  if (!logData) return

  request.post({
    url: httpSource,
    json: logData
  }, (error) => {
    if (error) {
      console.error('Error on Sumologic.', error)
      _plugin.logException(error)
    }
    _plugin.log(JSON.stringify({
      title: 'Log sent to Sumologic',
      data: logData
    }))
  })
})

_plugin.once('ready', () => {
  httpSource = _plugin.config.httpSource
  _plugin.log('Sumologic has been initialized.')
  _plugin.emit('init')
})

module.exports = _plugin

