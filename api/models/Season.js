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

    name: { type: 'string' },
    startDate: { type: 'datetime' },
    endDate: { type: 'datetime' },

    league: { model: 'league' }
  }
};
