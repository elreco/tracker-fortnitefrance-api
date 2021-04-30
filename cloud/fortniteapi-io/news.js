const fortniteAPI = require('./index.js');
const getImage = require('../function/get-image.js')

Parse.Cloud.beforeFind("News", async (req) => {
    if (!req.master) {
        const apiNews = await fortniteAPI.getNews("br").catch(() => {});
        if (apiNews.result) {
            await Promise.all(apiNews.news.map(async (n) => {
                const newsQuery = new Parse.Query("News");
                newsQuery.equalTo('apiId', n.id);
                const news = await newsQuery.first({
                    useMasterKey: true
                })
                if (!news) {
                    await createNews(n)
                }
            }))
        }
    }
});

async function createNews(n) {
    const News = Parse.Object.extend("News");
    const news = new News();
    news.set("apiId", n.id);
    news.set("title", n.title);
    if (n.tabTitle.localeCompare(n.title) !== 0) {
        news.set("subtitle", n.tabTitle);
    }
    news.set("text", n.body);
    news.set("adspace", n.adspace);
    news.set("date", new Date(n.date));
    news.set("video", n.video);
    news.set("type", "normal");
    if (n.image) {
        const file = await getImage(n.image);
        news.set("image", file);
    }
    await news.save(null, {
        useMasterKey: true
    })
    return news;
}



module.exports = Parse