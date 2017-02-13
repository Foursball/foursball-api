var Promise = require('bluebird');
var shuffle = require('shuffle-array');

var log4js = require('log4js');
var logger = log4js.getLogger('api/services/DataGeneratorService');

module.exports = {
  generateDemoData
};

function generateDemoData(dataCounts) {
  var data = {};
  return generateLeagues(dataCounts.leagues, data).then(function(leagues) {
    logger.info('Created ' + leagues.length + ' leagues');
    data.leagues = leagues;
    return generateRules(dataCounts.rules, data);
  }).then(function(rules) {
    logger.info('Created ' + rules.length + ' rules');
    data.rules = rules;
    return generateSeasons(dataCounts.seasons, data);
  }).then(function(seasons) {
    logger.info('Created ' + seasons.length + ' seasons');
    data.seasons = seasons;
    return generateUsers(dataCounts.users, data);
  }).then(function(users) {
    logger.info('Created ' + users.length + ' users');
    data.users = users;
    return generateTeams(dataCounts.teams, data);
  }).then(function(teams) {
    logger.info('Created ' + teams.length + ' teams');
    data.teams = teams;
    return generateGames(dataCounts.games, data);
  }).then(function(games) {
    logger.info('Created ' + games.length + ' games');
    data.games = games;
    return generateTeamGames(data);
  }).then(function(teamGames) {
    logger.info('Created ' + teamGames.length + ' team games');
    data.teamGames = teamGames;
    return generateUserLeagues(data);
  }).then(function(userLeagues) {
    logger.info('Created ' + userLeagues.length + ' user leagues');
    data.userLeagues = userLeagues;
    return;
  }).then(function() {
    return logger.info('Generating data');
  });
}

function generateLeagues(count) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return League.create({
      name: 'League ' + i,
      minimumGames: 10
    });
  }));
}

function generateRules(count, data) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return Rule.create({
      message: 'Rule ' + i,
      league: randomId(data.leagues)
    });
  }));
}

function generateSeasons(count, data) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return Season.create({
      name: 'Season ' + i,
      league: randomId(data.leagues)
    });
  }));
}

function generateUsers(count, data) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return User.create({
      name: 'User ' + i
    });
  }));
}

function generateTeams(count, data) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return Team.create({
      name: 'Team ' + i,
      users: randomDistinctId(data.users, 2)
    });
  }));
}

function generateGames(count, data) {
  return Promise.all(Array.apply(null, Array(count)).map(function(item, i) {
    return Game.create();
  }));
}

function generateTeamGames(data) {
  return Promise.all([].concat.apply([], data.games.map(function(game) {
    return randomDistinctId(data.teams, 2).map(teamId => TeamGame.create({
      wins: Math.floor(3 * Math.random()),
      team: teamId,
      game: game
    }));
  })));
}

function generateUserLeagues(data) {
  return Promise.all([].concat.apply([], data.leagues.map(league => {
    return data.users.map(user => UserLeague.create({
      user,
      league
    }));
  })));
}

function randomId(items) {
  var ids = items.map(item => item.id);
  return ids[Math.floor(ids.length * Math.random())];
}

function randomDistinctId(items, count) {
  var ids = items.map(item => item.id);
  return shuffle(ids).slice(0, count);
}
