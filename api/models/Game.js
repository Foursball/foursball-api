module.exports = {

  attributes: {
    dateCreated: { type: 'datetime' },

    teamGames: {
      collection: 'teamGame',
      via: 'game'
    }
  }
};
