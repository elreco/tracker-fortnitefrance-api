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
    if (apiStat && apiStat.result) {
      await createOrUpdateStat(apiStat, accountId.account_id)
    }

  } else if (dateDiff(stat.get('date')) > 3) {
  /* } else { */
    const apiStat = await fortniteAPI.getGlobalPlayerStats(stat.get('apiId')).catch((error) => {
      console.log(error)
    });
    if (apiStat && apiStat.result) {
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
  stat.set("totalWins", getTotalWins(s.global_stats));
  if (!stat.get('character')) {
    const dirPath = path.resolve(__dirname, '../assets/characters/');
    const file = await getRandomLocalImage(dirPath);
    stat.set("character", file);
  }
  await stat.save(null, {
    useMasterKey: true
  })

  await createMatchesFromApi(stat);

  return stat;
}

async function setLadder() {
  const statQuery = new Parse.Query("Stat");
  statQuery.descending("totalWins");
  statQuery.addDescending("totalKd");
  statQuery.greaterThan("totalWins", 0);
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

function getTotalKd(global_stats) {
  let totalKd = 0;

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

function getTotalWins(global_stats) {
  let wins = 0;

  if (global_stats.solo && global_stats.solo.placetop1) {
    wins += global_stats.solo.placetop1
  }

  if (global_stats.duo && global_stats.duo.placetop1) {
    wins += global_stats.duo.placetop1
  }

  if (global_stats.squad && global_stats.squad.placetop1) {
    wins += global_stats.squad.placetop1
  }
  return wins;
}

module.exports = { getStatFromApi, setLadder }
