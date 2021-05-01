Parse.Cloud.beforeSave(Parse.User, () => { },

{
    fields: {
        password: {
            required: true,
            options: val => {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(val)
            },
            error: 'Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un caractère spécial'
          }
      }
});

module.exports = Parse

/* Parse.Cloud.beforeSave(Parse.User, () => { },

{
    fields: {
        password: {
            required: true,
            options: val => {
                return val >= 1;
            },
            error: 'Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un caractère spécial'
          }
      }
});

module.exports = Parse */