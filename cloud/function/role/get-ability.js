function getAbility(roleName) {
  switch (roleName) {
    case 'Utilisateur':
      return [
        {
          action: 'read',
          subject: 'Front'
        }
      ]
    default:
      return [
        {
          action: 'manage',
          subject: 'all'
        }
      ]
  }
}

module.exports = getAbility
