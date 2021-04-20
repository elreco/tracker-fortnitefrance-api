const Parse = require('../../../config/parse-js-config')

function addRoleToUser(user, roleName) {
  const Role = new Parse.Query(Parse.Role);
  Role.equalTo("name", roleName);
  Role.first({
    useMasterKey: true
  }).then(async (role) => {
    if (role) {
      role.getUsers().add(user);
      await role.save(null, {
        useMasterKey: true
      })
      return user.save(null, {
        useMasterKey: true
      });
    }
  })
}

module.exports = addRoleToUser
