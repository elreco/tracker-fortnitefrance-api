const {
  getStatFromApi,
  setLadder
} = require('./fortniteapi-io/stat.js')

Parse.Cloud.beforeFind("Stat", async (req) => {
  if (!req.master && req.query._where && req.query._where.name_lowercase) {
    const name = req.query._where.name_lowercase
    if (name) {
      await getStatFromApi(name);
    }
  }

  return req
}, {
  requireMaster: false,
  requireUser: false
});

Parse.Cloud.job("ladder", async (req) => {
  const {
    message
  } = req;
  message("Ladder update started");
  await setLadder()
  message("Ladder update finished");
});