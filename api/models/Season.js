module.exports = {

  attributes: {

    name: { type: 'string' },
    startDate: { type: 'datetime' },
    endDate: { type: 'datetime' },

    league: { model: 'league' }
  }
};
