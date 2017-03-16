const uuid = require('uuid');

module.exports = {
  autoPK: false,

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      index: true,
      uuidv4: true,
      defaultsTo: function (){ return uuid.v4(); },
    },
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
