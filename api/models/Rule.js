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
      defaultsTo: uuid.v4,
    },

    dateCreated: { type: 'datetime' },
    message: { type: 'text' },

    league: { model: 'league' }
  }
};
