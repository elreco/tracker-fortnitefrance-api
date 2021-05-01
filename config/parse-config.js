const databaseUri = process.env.DATABASE_URI || process.env.MONGO_URL;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || `${__dirname}/../cloud/main.js`,
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api', // Don't forget to change to https if needed
  restAPIKey: process.env.REST_API_KEY || '',
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  verifyUserEmails: true,
  preventLoginWithUnverifiedEmail: true,
  publicServerURL: process.env.SERVER_URL || 'http://localhost:1337/api',
  appName: process.env.APP_NAME || 'Parse App',
  emailAdapter: {
    module: 'parse-server-mailjet-adapter',
    options: {
      apiKey: process.env.MAILJET_API_KEY || '',
      apiSecret: process.env.MAILJET_API_SECRET || '',
      apiErrorEmail: process.env.MAILJET_ERROR_MAIL || '',
      fromEmail: process.env.MAILJET_FROM_EMAIL || '',
      fromName: process.env.APP_NAME || 'Parse App',

      passwordResetSubject: "Réinitialisez votre mot de passe",
      // passwordResetTemplateId: 12345,
      passwordResetTextPart: "Bonjour,\n\nVous avez demandé la réinitialisation de votre mot de passe pour {{var:appName}}.\n\nVeuillez cliquer ici pour définir un nouveau mot de passe : {{var:link}}",
      passwordResetHtmlPart: "Bonjour,<p>Vous avez demandé la réinitialisation de votre mot de passe pour <b>{{var:appName}}</b>.</p><p>Veuillez cliquer ici pour définir un nouveau mot de passe : <a href='{{var:link}}'>Définir mon nouveau mot de passe</a></p>",

      verificationEmailSubject: "Vérifiez votre email",
      // verificationEmailTemplateId: 67890,
      verificationEmailTextPart: "Bonjour,\n\nVous êtes invité(e) à confirmer l'adresse e-mail {{var:email}} pour {{var:appName}}\n\nCliquez ici pour la confirmer : {{var:link}}",
      verificationEmailHtmlPart: "Bonjour,<p>Vous êtes invité(e) à confirmer l'adresse e-mail {{var:email}} pour <b>{{var:appName}}</b></p><p>Cliquez ici pour la confirmer : <a href='{{var:link}}'>Confirmer mon adresse Email</a></p>",
    }
  },
  customPages: {
    passwordResetSuccess: `${process.env.FRONT_URL}/user/password-reset-success`,
    verifyEmailSuccess: `${process.env.FRONT_URL}/user/verify-email-success`,
    choosePassword: `${process.env.FRONT_URL}/user/choose-password`
  }
};

module.exports = config