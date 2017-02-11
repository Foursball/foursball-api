module.exports = {

  attributes: {
    name: { type: 'string' },
    minimumGames: { type: 'integer' },

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
