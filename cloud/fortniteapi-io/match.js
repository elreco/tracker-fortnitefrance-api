const fortniteAPI = require('./index.js');

Parse.Cloud.define("match", async (req) => {
    return await fortniteAPI.getGlobalPlayerStats(req.params.acountId)
}, {
    fields: {
        acountId: {
            required: true,
            type: String,
            error: "You must provide an accountId"
        }
    }
});

module.exports = Parse