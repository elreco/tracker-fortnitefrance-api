const fortniteAPI = require('./index.js');

Parse.Cloud.define("stat", async (req) => {
  const accountId = await fortniteAPI.getAccountIdByUsername(req.params.name);
  if (accountId.result) {
    return await fortniteAPI.getGlobalPlayerStats(accountId.account_id)
  }
},{
  requireMaster: false,
  requireUser: false,
  fields: {
    name: {
      required: true,
      type: String,
      error: "You must provide a name"
    }
  }
});

module.exports = Parse