module.exports = {

  attributes: {
    slack : { type: 'String' },
    name : { type: 'String' },
    profileImageUrl : { type: 'String' },
    retired : { type: 'Boolean' },
    hasMinimumGames : { type: 'Boolean' },
    active : { type: 'Boolean' },

    user : { type: 'User' },

    teams: {
      collection: 'team',
      via: 'players'
    }
  }
};
