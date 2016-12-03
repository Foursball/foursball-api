module.exports = {

  attributes: {
    dateCreated: { type: 'datetime' },
    message: { type: 'text' },

    league: { model: 'league' }
  }
};
