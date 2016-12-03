module.exports = {

  attributes: {

    wins: { type: 'integer' },

    team: { model: 'team' },

    game: { model: 'game' }
  }
};
