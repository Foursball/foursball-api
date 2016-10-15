module.exports.policies = {

  '*': true,

  'TeamController': {
    '*': 'isAuthenticated'
  },
  'GameController': {
    '*': 'isAuthenticated'
  },
  'UserController': {
    '*': 'isAuthenticated'
  },
  'PlayerController': {
    '*': 'isAuthenticated'
  }
};
