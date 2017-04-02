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

    provider: 'String',
    uid: 'String',
    name: 'String',
    email: 'String',
    firstName: 'String',
    lastName: 'String',
    slack : { type: 'String' },
    profileImageUrl : { type: 'String' },
    retired : { type: 'Boolean' },
    isAdmin: { type: 'Boolean' },
    isGlobalAdmin: { type: 'Boolean' },

    userLeagues: {
      collection: 'userLeague',
      via: 'user'
    },

    teams: {
      collection: 'team',
      via: 'users'
    }
  }
};
