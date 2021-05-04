const fortniteapiIo = require('./index.js');
const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js')

Parse.Cloud.beforeFind("Stat", async (req) => {
  // aller chercher les résultats sur la table
  if (req.query.name) {
    const statQuery = new Parse.Query("Stat");
    statQuery.equalTo('name', req.query.name);
    const stat = await statQuery.first({
      useMasterKey: true
    })

    if (!stat) {
      const accountId = await fortniteAPI.getAccountIdByUsername(req.params.name).catch((error) => {
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
});

async function createOrUpdateStat(s, accountId, stat = null) {
  if (!s.result) {
    throw 'Aucun résultat trouvé'
  }
  var create = false
  if (!stat) {
    create = true
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

  if (create) {
    await stat.save(null, {
      useMasterKey: true
    })
  } else {
    await stat.update(null, {
      useMasterKey: true
    })
  }

  return stat;
}

module.exports = Parse.Cloud