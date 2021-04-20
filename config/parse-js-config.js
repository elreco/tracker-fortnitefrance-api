const Parse = require('parse/node')
const config = require('./parse-config')

Parse.initialize(config.appId, "", config.masterKey);
Parse.serverURL = config.serverURL

module.exports = Parse