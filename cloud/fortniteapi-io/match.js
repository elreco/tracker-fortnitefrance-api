const fortniteAPI = require('./index.js');

async function createMatchesFromApi(stat) {

  const apiMatches = await fortniteAPI.getPlayerRecentMatches(stat.get('apiId')).catch((error) => {
    throw error
  });
  //return apiMatches;
  if (!apiMatches.result) {
    throw 'Aucun résultat trouvé'
  } else {
    await Promise.all(apiMatches.matches.map(async (m) => {
      await createMatch(m, stat)
    }))
  }
}

async function createMatch(m, stat) {

  var matchQuery = new Parse.Query("Match");
  matchQuery.equalTo('date', m.date);
  matchQuery.equalTo('score', m.score);
  matchQuery.equalTo('minutesplayed', m.minutesplayed);
  matchQuery.equalTo('account', stat.get('apiId'));
  const matchExists = await matchQuery.first({
      useMasterKey: true
  })

  if (!matchExists) {
    const Match = Parse.Object.extend("Match");
    match = new Match();
    match.set("account", stat.get('apiId'));
    match.set("match_data", m);
    match.set("date", m.date);
    match.set("score", m.score);
    match.set("minutesplayed", m.minutesplayed);
    const savedMatch = await match.save(null, {
      useMasterKey: true
    })

    const relation = stat.relation("matches");
    await relation.add(savedMatch);
    await stat.save(null, {
      useMasterKey: true
    })
  }
}


module.exports = { createMatchesFromApi }