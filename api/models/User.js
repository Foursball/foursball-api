module.exports = {

  attributes: {
    provider: 'String',
    uid: 'String',
    name: 'String',
    email: 'String',
    firstname: 'String',
    lastname: 'String',

    players: {
      collection: 'player',
      via: 'user'
    }
  }
};
