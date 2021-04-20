const Parse = require('../../../config/parse-js-config')

async function updateRoleSchema() {
  const roleSchema = new Parse.Schema("_Role");

  const clp = {
    "find": {
      "*": true,
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    },
    "get": {
      "*": true,
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    },
    "count": {
      "*": true,
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    },
    "create": {
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    },
    "update": {
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    },
    "delete": {
      "role:Administrateur": true,
      "role:DO": true,
      "role:Restaurant": true,
    }
  }

  roleSchema.setCLP(clp);

  return roleSchema.update(null, {
    useMasterKey: true
  }).then(() => {
    console.info("✔️  Role Schema updated")
  }).catch(error =>
    console.log(error));
}

module.exports = updateRoleSchema
