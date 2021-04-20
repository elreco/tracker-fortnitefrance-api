require('dotenv').config()
const yargs = require('yargs/yargs')
const {
    hideBin
} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// functions
const saveRole = require('../cloud/function/role/save-role')
const saveAdmin = require('../cloud/function/user/save-admin')
const roles = require('../cloud/function/role/get-roles')
// schemas
const saveRoleSchema = require('../cloud/schema/role/save-role')
// update schemas
const updateRoleSchema = require('../cloud/schema/role/update-role')

// create admin account
if (argv['create-admin']) {
    saveAdmin(argv);
}
// init tracker
else if (argv['init-tracker']) {
    saveRoleSchema().then(async () => {
        roles.forEach(async role => {
            await saveRole(role)
        })
    })

} else if (argv['save-roles']) {
    roles.forEach(role => {
        saveRole(role)
    })
} else if (argv['update-schemas']) {
    updateRoleSchema();
} else {
    console.log("❌ Please use at least one flag. Available flags: --init-tracker, --create-admin, --save-roles, --update-schemas")
}