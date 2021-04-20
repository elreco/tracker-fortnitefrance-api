const Parse = require('../../../config/parse-js-config')
const getAbility = require('./get-ability')

async function saveRole(roleName) {
  const roleQuery = new Parse.Query(Parse.Role);
  roleQuery.equalTo("name", roleName);
  let role = await roleQuery.first({
    useMasterKey: true
  })

  let isNew = false;
  if (!role) {
    isNew = true;
    role = new Parse.Role();
  }

  const roleACL = new Parse.ACL();
  roleACL.setPublicReadAccess(true);
  roleACL.setRoleWriteAccess("Administrateur", true);
  role.set('name', roleName)
  role.set('ability', getAbility(roleName))
  role.setACL(roleACL)
  return role.save(null, {
    useMasterKey: true
  })
    .then((role) => {
      if (isNew) {
        console.info("✔️  Role created :")
      } else {
        console.info("✏️  Role updated :")
      }
      console.log(role)
    })
    .catch((error) => console.log(error));

}

module.exports = saveRole
