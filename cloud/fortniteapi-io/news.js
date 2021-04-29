const fortniteAPI = require('./index.js');

Parse.Cloud.beforeFind("News", async (req) => {

    // aller chercher les 20 dernières news sur l'api
    return await fortniteAPI.getNews("br")
    // consolider les ids
    // parcourir les news sur la table Parse
    // if tableParse.news_id not exists in fortniteAPi.newsid alors
    // remplir la table Parse
});

module.exports = Parse