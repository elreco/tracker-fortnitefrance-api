const {
    getStatFromApi
} = require('./fortniteapi-io/stat.js')

Parse.Cloud.beforeFind("Stat", async (req) => {
    if (!req.master && req.query._where && req.query._where.name_lowercase) {
        var name = req.query._where.name_lowercase
        if (name) {
            await getStatFromApi(name);
        }
    }

    return req
}, {
    requireMaster: false,
    requireUser: false
});