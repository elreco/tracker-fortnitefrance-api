const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js'),
  getRandomLocalImage = require('../function/get-random-local-image.js'),
  { createMatchesFromApi } = require('./match.js'),
  path = require('path');

async function getStatFromApi(name) {
  const statQuery = new Parse.Query("Stat");
  statQuery.equalTo('name_lowercase', name.toLowerCase());
  const stat = await statQuery.first({
    useMasterKey: true
  })
  if (!stat) {
    const accountId = await fortniteAPI.getAccountIdByUsername(encodeURIComponent(name)).catch((error) => {
      console.log(error)
    });

    if (!accountId.account_id) throw `Aucun résultat trouvé pour ${name}`

    const apiStat = await fortniteAPI.getGlobalPlayerStats(accountId.account_id).catch((error) => {
      console.log(error)
    });
    if (apiStat.result) {
      await createOrUpdateStat(apiStat, accountId.account_id)
    }

  } else if (dateDiff(stat.get('date')) > 3) {
  /* } else { */
    const apiStat = await fortniteAPI.getGlobalPlayerStats(stat.get('apiId')).catch((error) => {
      console.log(error)
    });
    if (apiStat.result) {
      await createOrUpdateStat(apiStat, stat.get('apiId'), stat)
    }
  }
}

async function createOrUpdateStat(s, accountId, stat = null) {
  if (!stat) {
    const Stat = Parse.Object.extend("Stat");
    stat = new Stat();
  }

  stat.set("apiId", accountId);
  stat.set("mode", s.mode);
  stat.set("name", s.name);
  stat.set("name_lowercase", s.name.toLowerCase());
  stat.set("account", s.account);
  stat.set("global_stats", s.global_stats);
  stat.set("per_input", s.per_input);
  stat.set("seasons_available", s.seasons_available);
  stat.set("season", s.season);
  stat.set("date", new Date());
  stat.set("totalKd", getTotalKd(s.global_stats));
  if (!stat.get('character')) {
    const dirPath = path.resolve(__dirname, '../assets/characters/');
    const file = await getRandomLocalImage(dirPath);
    stat.set("character", file);
  }
  await stat.save(null, {
    useMasterKey: true
  })
  await setRank(stat)
  await createMatchesFromApi(stat);

  return stat;
}

async function setRank(stat) {
  const kd = getTotalKd(stat.get('global_stats'))

  var statQuery = new Parse.Query("Stat");
  statQuery.ascending("totalKd");
  statQuery.greaterThanOrEqualTo('totalKd', kd);
  statQuery.notEqualTo('objectId', stat.id);
  const statReplace = await statQuery.first({
      useMasterKey: true
  })
  if (statReplace && statReplace.get('rank') > 300) return;
  if (statReplace) {
    var rank = statReplace.get('rank')
    stat.set('rank', rank + 1)
    var statQuery2 = new Parse.Query("Stat");
    statQuery2.descending("rank");
    statQuery2.greaterThan('rank', rank);
    statQuery2.notEqualTo('objectId', stat.id);
    if (rank != stat.get('rank')) {
      const allStatBefore = await statQuery2.find({
        useMasterKey: true
      })
      await Promise.all(allStatBefore.map(async (s) => {
        s.set('rank', s.get('rank') + 1)
        await s.save(null, {
          useMasterKey: true
        })
      }))
    }

  } else if (statReplace && statReplace.id != stat.id) {
    stat.set('rank', 1)
    if (1 != stat.get('rank')) {
      const allStatBefore = await statQuery2.find({
        useMasterKey: true
      })
      await Promise.all(allStatBefore.map(async (s) => {
        s.set('rank', s.get('rank') + 1)
        await s.save(null, {
          useMasterKey: true
        })
      }))
    }
  }

  if (statReplace) {
    await stat.save(null, {
      useMasterKey: true
    })
  }
}

function getTotalKd(global_stats) {
  var totalKd = 0;

  if (global_stats.solo && global_stats.solo.kd) {
    totalKd += global_stats.solo.kd
  }

  if (global_stats.duo && global_stats.duo.kd) {
    totalKd += global_stats.duo.kd
  }

  if (global_stats.squad && global_stats.squad.kd) {
    totalKd += global_stats.squad.kd
  }
  return totalKd;
}

module.exports = { getStatFromApi }