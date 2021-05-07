const Parse = require('../../config/parse-js-config.js'),
  fs = require('fs')

async function getRandomLocalImage(path) {
    var files = await fs.readdirSync(path)
    let chosenFile = files[Math.floor(Math.random() * files.length)]
    const fileData = await fs.readFileSync(`${path}/${chosenFile}`)
    const data = Array.from(Buffer.from(fileData, 'binary'));
    const file = new Parse.File('character', data, "image/png");
    await file.save({
        useMasterKey: true
    }).catch((error) => console.log(error));
    return file;
}

module.exports = getRandomLocalImage