const {
setShop
} = require('./fortniteapi-io/item.js')

Parse.Cloud.job("shop", async (req) => {
    const {
        message
    } = req;
    message("Shop update started");
    await setShop()
    message("Shop update finished");
});