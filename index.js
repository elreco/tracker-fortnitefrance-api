require('dotenv').config()
const express = require('express');
const cors = require('cors');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const appName = process.env.APP_NAME || "Parse App";
const dashboardAuth = process.env.DASHBOARD_AUTH || "user:password";
const mountPath = process.env.PARSE_MOUNT || '/parse';
const config = require('./config/parse-config');

const app = express();

app.use(cors());

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const api = new ParseServer(config);
app.use(mountPath, api);
// Parse Dashboard
const [user, pass] = dashboardAuth.split(':');
const users = [{
  user,
  pass
}];
const dashboard = new ParseDashboard({
  apps: [{
    serverURL: config.serverURL,
    appId: config.appId,
    masterKey: config.masterKey,
    appName: appName,
  }],
  users,
}, {
  allowInsecureHTTP: true
});
app.use("/dashboard", dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.redirect('/dashboard');
});

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('becquetance parse-server running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);


module.exports = {
  app,
  config
};
