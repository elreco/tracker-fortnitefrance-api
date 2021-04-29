const fortniteAPI = require('./index.js');

Parse.Cloud.beforeFind("Match", async (req) => {
    if (req.query.get('accountId')) {
        // aller chercher les résultats sur la table
        // if pas de résultats || date résultat > 3 minutes ==>
        return await fortniteAPI.getPlayerRecentMatches(accountId)
        // if résultats :
        // renseigner la table Parse
        // endif
    }
},
{
    requireMaster: false,
    fields: {
        accountId: {
          required: true,
          type: String
        }
      }
});

module.exports = Parse