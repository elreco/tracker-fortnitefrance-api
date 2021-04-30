const FortniteAPI = require("fortnite-api-io");

module.exports = new FortniteAPI(process.env.FORTNITE_IO_API_KEY, {
    defaultLanguage: 'fr'
})