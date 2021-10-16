const fortniteAPI = require('./index.js');

async function createMatchesFromApi(stat) {

  const apiMatches = await fortniteAPI.getPlayerRecentMatches(stat.get('apiId')).catch((error) => {
    console.log(error)
  });

  if (apiMatches && apiMatches.result) {
    let matches = [];
    matches = apiMatches.matches && apiMatches.matches.length ? apiMatches.matches.slice(0, 5) : [];
    await Promise.all(matches.map(async (m) => {
      await createMatch(m, stat)
    }))
  }
}

async function createMatch(m, stat) {

  const matchQuery = new Parse.Query("Match");
  matchQuery.equalTo('date', new Date(m.date));
  matchQuery.equalTo('score', m.score);
  matchQuery.equalTo('minutesplayed', m.minutesplayed);
  matchQuery.equalTo('accountId', stat.get('apiId'));
  const matchExists = await matchQuery.first({
    useMasterKey: true
  })

  if (!matchExists) {
    const Match = Parse.Object.extend("Match");
    const match = new Match();
    match.set("accountId", stat.get('apiId'));
    match.set("match_data", m);
    match.set("date", new Date(m.date));
    match.set("score", m.score);
    match.set("minutesplayed", m.minutesplayed);
    const savedMatch = await match.save(null, {
      useMasterKey: true
    })

    const statQuery = new Parse.Query("Stat");
    statQuery.equalTo('objectId', stat.id);
    const statRelation = await statQuery.first({
      useMasterKey: true
    })
    const relation = statRelation.relation("matches");
    relation.add(savedMatch);
    await statRelation.save(null, {
      useMasterKey: true
    })

    return savedMatch;
  }
}


module.exports = { createMatchesFromApi }
