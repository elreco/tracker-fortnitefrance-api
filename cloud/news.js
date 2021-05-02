const slugify = require('./function/slugify.js')

Parse.Cloud.afterSave("News", async (req) => {
    if (!req.object.get('slug')) {
        req.object.set('slug', slugify(req.object.get('title'), req.object.id))
        await req.object.save(null, {
        useMasterKey: true
        })
    }
});

module.exports = Parse