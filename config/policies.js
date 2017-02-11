module.exports.policies = {

  '*': true,

  'GameController': {
    '*': 'isAuthenticated'
  },
  'LeagueController': {
    '*': 'isAuthenticated'
  },
  'RuleController': {
    '*': 'isAuthenticated'
  },
  'SeasonController': {
    '*': 'isAuthenticated'
  },
  'TeamController': {
    '*': 'isAuthenticated'
  },
  'TeamGameController': {
    '*': 'isAuthenticated'
  },
  'UserController': {
    '*': 'isAuthenticated'
  },
  'UserLeagueController': {
    '*': 'isAuthenticated'
  }
};
