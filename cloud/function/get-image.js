const request = require('request-promise');
const Parse = require('../../config/parse-js-config.js');

async function getImage(url) {
    const options = {
        uri: url,
        resolveWithFullResponse: true,
        encoding: null,
    };

    const response = await request(options);
    if (response && response.body) {
        const data = Array.from(Buffer.from(response.body, 'binary'));
        if (response.headers && response.headers['content-type']) {
            const contentType = response.headers['content-type'];
            if (data) {
                const file = new Parse.File('image', data, contentType);
                await file.save({
                    useMasterKey: true
                }).catch((error) => console.log(error));
                return file;
            }
        }
    } else {
        return null;
    }
}

module.exports = getImage