const axios = require('axios')
const qs = require('qs')

async function epicLogin(code) {
  // https://www.epicgames.com/id/authorize?client_id=xyza789123ZPu9rJ8NLZO7WQpV5FzH9v&response_type=code&scope=basic_profile&redirect_uri=https://192.168.1.5:1337/callback?userId=6FXRVVOCFd
  const data = qs.stringify({
    'grant_type': 'authorization_code',
    'code': code
  });
  return await axios.post('https://api.epicgames.dev/epic/oauth/v1/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: process.env.EPIC_CLIENT_ID,
      password: process.env.EPIC_CLIENT_SECRET
    },
  }).then(function (response) {
    return response.data;
  })
    .catch(() => {
      return null;
    });
}

module.exports = epicLogin;
