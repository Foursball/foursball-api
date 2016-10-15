module.exports = {

  attributes: {
    players: {
      collection: 'player',
      via: 'teams',
      dominant: true
    }
  }
};
