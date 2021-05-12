const request = require('request-promise');
const Parse = require('../../config/parse-js-config.js');

async function getImage(url) {
    const options = {
        uri: url,
        resolveWithFullResponse: true,
        encoding: null,
    };

    const response = await request(options);
    if (!response || !response.body) return;
    const data = Array.from(Buffer.from(response.body, 'binary'));
    if (!data) return;
    const contentType = response.headers['content-type'];
    if (!contentType) return;
    const file = new Parse.File('image', data, contentType);
    if (!file) return;
    await file.save({
        useMasterKey: true
    }).catch((error) => console.log(error));

    return file;
}

module.exports = getImage