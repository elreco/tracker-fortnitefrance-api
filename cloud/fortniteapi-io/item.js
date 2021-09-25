const fortniteAPI = require('./index.js'),
  dateDiff = require('../function/date-diff.js'),
    path = require('path');

async function setShop() {
    const dailyShop = await fortniteAPI.getDailyShop().catch((error) => {
        console.log(error)
    });

    /* const itemQuery = new Parse.Query("Item");
    const items = await itemQuery.find({
        useMasterKey: true
    })

    if (items) {

    } */
}

module.exports = { setShop }