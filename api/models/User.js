module.exports = {

  attributes: {
    provider: 'String',
    uid: 'String',
    name: 'String',
    email: 'String',
    firstname: 'String',
    lastname: 'String',
    slack : { type: 'String' },
    profileImageUrl : { type: 'String' },
    retired : { type: 'Boolean' },

    userLeagues: {
      collection: 'userLeague',
      via: 'user'
    },

    teams: {
      collection: 'team',
      via: 'users'
    }
  }
};
