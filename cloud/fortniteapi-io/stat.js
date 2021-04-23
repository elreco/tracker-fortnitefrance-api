const fortniteAPI = require('./index.js');

Parse.Cloud.define("stat", async (req) => {
  const accountId = await fortniteAPI.getAccountIdByUsername(req.params.name);
  if (accountId.result) {
    return await fortniteAPI.getGlobalPlayerStats(accountId.account_id)
  } else {
    return "sdgdsg"
  }
}, {
  requireMaster: false,
  fields: {
    name: {
      required: true,
      type: String
    }
  }
});

module.exports = Parse.Cloud