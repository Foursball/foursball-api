module.exports = {

  attributes: {
    name: { type: 'string' },
    minimumGames: { type: 'number' },

    seasons: {
      collection: 'season',
      via: 'league'
    },

    rules: {
      collection: 'rule',
      via: 'league'
    }
  }
};
