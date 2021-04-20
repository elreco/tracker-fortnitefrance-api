const Parse = require('../../../config/parse-js-config')

async function getUserRole(userData) {
  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("objectId", userData.id);
  userQuery.include("role");
  const user = await userQuery.first({
    useMasterKey: true
  })
  const Role = user.get('role');
  const rolesQuery = new Parse.Query(Parse.Role);

  rolesQuery.equalTo('objectId', Role.id);
  const role = await rolesQuery.first({
    useMasterKey: true
  })
  return role;
}

module.exports = getUserRole
