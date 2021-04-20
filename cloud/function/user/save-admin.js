const Parse = require('../../../config/parse-js-config')
const addRoleToUser = require('../role/add-role-to-user')

async function saveAdmin(userData) {
  const user = new Parse.User()
  user.set("firstname", userData.firstname || "admin")
  user.set("lastname", userData.lastname || "user")
  user.set("fullname", `${userData.firstname} ${userData.lastname}` || "admin user")
  user.set("username", userData.username || "user")
  user.set("password", userData.password || "password")
  user.set("email", userData.email || "user@user.com")
  return user.signUp(null, {
    useMasterKey: true
  })
    .then((user) => {
      const userAcl = new Parse.ACL();
      userAcl.setPublicReadAccess(true);
      userAcl.setWriteAccess(user.id, true);
      user.setACL(userAcl)
      addRoleToUser(user, "Administrateur")
      console.info("✔️ User created :")
      console.log({
        firstname: userData.firstname || "admin",
        lastname: userData.lastname || "user",
        fullname: `${userData.firstname} ${userData.lastname}` || "admin user",
        username: userData.username || "user",
        password: userData.password || "password",
        email: userData.email || "user@user.com"
      })
    })
    .catch((error) => console.log(error))
}

module.exports = saveAdmin
