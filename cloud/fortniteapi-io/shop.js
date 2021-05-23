const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js'),
    path = require('path');

async function setShop() {
    const statQuery = new Parse.Query("Shop");
    statQuery.descending("totalWins");
    statQuery.addDescending("totalKd");
    statQuery.limit(9999999);
    statQuery.select("rank");
    const stats = await statQuery.find({
        useMasterKey: true
    })

    var rank = 0;
    await Promise.all(stats.map(async (s) => {
        rank += 1;
        s.set('rank', rank);
        await s.save(null, {
        useMasterKey: true
        })
    }))
}

module.exports = { setShop }