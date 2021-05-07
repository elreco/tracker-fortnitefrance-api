const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js'),
  getRandomLocalImage = require('../function/get-random-local-image.js'),
  path = require('path');

Parse.Cloud.beforeFind("Stat", async (req) => {
  // aller chercher les résultats sur la table
  if (!req.master && req.query._where && req.query._where.name) {
    var name = req.query._where.name
    const statQuery = new Parse.Query("Stat");
    statQuery.equalTo('name', name);
    const stat = await statQuery.first({
      useMasterKey: true
    })

    if (!stat) {
      const accountId = await fortniteAPI.getAccountIdByUsername(name).catch((error) => {
        throw error
      });
      if (!accountId.account_id) throw 'Aucun résultat trouvé'

      const apiStat = await fortniteAPI.getGlobalPlayerStats(accountId.account_id).catch((error) => {
        throw error
      });
      await createOrUpdateStat(apiStat, accountId.account_id)
    } else if (dateDiff(stat.get('date')) > 3) {
      const apiStat = await fortniteAPI.getGlobalPlayerStats(stat.get('apiId')).catch((error) => {
        throw error
      });
      await createOrUpdateStat(apiStat, stat.get('apiId'), stat)
    }
  }

  return req
}, {
  requireMaster: false,
  requireUser: false
});

async function createOrUpdateStat(s, accountId, stat = null) {
  if (!s.result) {
    throw 'Aucun résultat trouvé'
  }
  if (!stat) {
    const Stat = Parse.Object.extend("Stat");
    stat = new Stat();
  }

  stat.set("apiId", accountId);
  stat.set("mode", s.mode);
  stat.set("name", s.name);
  stat.set("account", s.account);
  stat.set("global_stats", s.global_stats);
  stat.set("per_input", s.per_input);
  stat.set("seasons_available", s.seasons_available);
  stat.set("season", s.season);
  stat.set("date", new Date());
  if (!stat.get('character')) {
    const dirPath = path.resolve(__dirname, '../assets/characters/');
    const file = await getRandomLocalImage(dirPath);
    stat.set("character", file);
  }
  await stat.save(null, {
    useMasterKey: true
  })

  return stat;
}

module.exports = Parse.Cloud