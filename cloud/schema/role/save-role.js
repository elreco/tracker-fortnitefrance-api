const Parse = require('../../../config/parse-js-config')

// il faut créer un nouveau js pour mettre à jour le schema
async function saveRoleSchema() {
  const roleSchema = new Parse.Schema("_Role");

  const roleSchemaExists = await roleSchema.get().catch(() => {});

  if (roleSchemaExists) {
    console.info("⚠️  Role Schema already exists.")
    return
  }

  roleSchema.addArray('ability');

  const clp = {
    "find": {
      "requiresAuthentication": true,
      "role:Administrateur": true
    },
    "get": {
      "requiresAuthentication": true,
      "role:Administrateur": true
    },
    "create": {
      "role:Administrateur": true
    },
    "update": {
      "role:Administrateur": true
    },
    "delete": {
      "role:Administrateur": true
    }
  }

  roleSchema.setCLP(clp);

  return roleSchema.save(null, {
    useMasterKey: true
  }).then(() => {
    console.info("✔️  Role Schema created")
  }).catch(error =>
    console.log(error));

}

module.exports = saveRoleSchema
