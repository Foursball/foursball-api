module.exports = {

  attributes: {
    name: { type: 'string' },

    users: {
      collection: 'user',
      via: 'teams'
    },

    teamGames: {
      collection: 'teamGame',
      via: 'team'
    }
  }
};
