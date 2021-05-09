const {
    getStatFromApi
} = require('./fortniteapi-io/stat.js')

Parse.Cloud.beforeFind("Stat", async (req) => {
    // aller chercher les résultats sur la table
    if (!req.master && req.query._where && req.query._where.name) {
        var name = req.query._where.name
        if (name) {
            await getStatFromApi(name);
        }
    }

    return req
}, {
    requireMaster: false,
    requireUser: false
});