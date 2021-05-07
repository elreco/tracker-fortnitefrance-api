const request = require('request-promise');
const Parse = require('../../config/parse-js-config.js');

async function getImage(url) {
    const options = {
        uri: url,
        resolveWithFullResponse: true,
        encoding: null,
    };

    const response = await request(options);
    const data = Array.from(Buffer.from(response.body, 'binary'));
    const contentType = response.headers['content-type'];
    console.log(data);
    const file = new Parse.File('image', data, contentType);
    await file.save({
        useMasterKey: true
    }).catch((error) => console.log(error));

    return file;
}

module.exports = getImage