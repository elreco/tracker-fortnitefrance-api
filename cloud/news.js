const slugify = require('./function/slugify.js'),
  {
    getNewsFromApi
  } = require('./fortniteapi-io/news.js')

Parse.Cloud.job("news", async (req) => {
  const {
    message
  } = req;
  message("News started");
  await getNewsFromApi()
  message("News created");
});

Parse.Cloud.afterSave("News", async (req) => {
  if (!req.object.get('slug')) {
    req.object.set('slug', slugify(req.object.get('title'), req.object.id))
    await req.object.save(null, {
      useMasterKey: true
    })
  }
});

Parse.Cloud.define("newsAddView", async (req) => {
  const newsQuery = new Parse.Query("News");
  newsQuery.equalTo('objectId', req.params.id);
  const news = await newsQuery.first({
    useMasterKey: true
  }).catch((error) => {
    throw error
  })
  news.set('views', news.get('views') ? news.get('views') + 1 : 1)
  return await news.save(null, {
    useMasterKey: true
  })
});

module.exports = Parse
