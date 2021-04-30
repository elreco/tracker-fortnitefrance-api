const Parse = require('../../../config/parse-js-config')

async function saveAdmin(userData) {
  const Role = new Parse.Query(Parse.Role);
  Role.equalTo("name", "Administrateur");
  const role = await Role.first({
    useMasterKey: true
  })
  const user = new Parse.User()
  user.set("pseudo", userData.pseudo || "elreco")
  user.set("username", userData.username || "user")
  user.set("password", userData.password || "password")
  user.set("email", userData.email || "user@user.com")
  user.set("role", role)
  return user.signUp(null, {
    useMasterKey: true
  })
    .then((user) => {
      const userAcl = new Parse.ACL();
      userAcl.setPublicReadAccess(true);
      userAcl.setWriteAccess(user.id, true);
      user.setACL(userAcl)
      console.info("✔️ User created :")
      console.log({
        pseudo: userData.pseudo || "admin user",
        username: userData.username || "user",
        password: userData.password || "password",
        email: userData.email || "user@user.com"
      })
    })
    .catch((error) => console.log(error))
}

module.exports = saveAdmin
