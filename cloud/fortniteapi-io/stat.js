const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js'),
  getRandomLocalImage = require('../function/get-random-local-image.js'),
  path = require('path');

async function getStatFromApi(name) {
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
  stat.set("totalKd", s.global_stats.solo.kd + s.global_stats.duo.kd + s.global_stats.squad.kd);
  if (!stat.get('character')) {
    const dirPath = path.resolve(__dirname, '../assets/characters/');
    const file = await getRandomLocalImage(dirPath);
    stat.set("character", file);
  }
  await stat.save(null, {
    useMasterKey: true
  })
  await setRank(stat)
  /* Parse.Cloud.startJob('updateRank', {
    stat: stat
  }); */
  return stat;
}

async function setRank(stat) {
  const kd = stat.global_stats.solo.kd + stat.global_stats.duo.kd + stat.global_stats.squad.kd

  const statQuery = new Parse.Query("Stat");
  statQuery.greaterThan('totalKd', kd);
  statQuery.lessThan('totalKd', kd);
  const statReplace = await statQuery.first({
      useMasterKey: true
  })

  if (statReplace) {
    const rank = statReplace.get('rank')
    stat.set('rank', rank)
    statQuery = new Parse.Query("Stat");
    statQuery.lessThanOrEqualTo('rank', rank);
    statQuery.notEqualTo('objectId', stat.get('id'));
    const allStatBefore = await statQuery.find({
      useMasterKey: true
    })
    await Promise.all(allStatBefore.map(async (s) => {
      s.set('rank', s.get('rank') + 1)
      await s.save()
    }))
  } else {
    stat.set('rank', 1)
  }

  await stat.save(null, {
    useMasterKey: true
  })
}

module.exports = { getStatFromApi }