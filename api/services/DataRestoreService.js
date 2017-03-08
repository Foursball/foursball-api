var Promise = require('bluebird');
var shuffle = require('shuffle-array');

var log4js = require('log4js');
var logger = log4js.getLogger('api/services/DataRestoreService');
const cwd = process.cwd();
const path = require('path');

module.exports = {
  restore
};

function restore() {
  let LeaguesJson = require(path.join(cwd, 'restore', 'leagues.json'));
  let FoosballersJson = require(path.join(cwd, 'restore', 'foosballers.json'));
  let GamesJson = require(path.join(cwd, 'restore', 'games.json'));
  let RulesJson = require(path.join(cwd, 'restore', 'rules.json'));
  let TeamsJson = require(path.join(cwd, 'restore', 'teams.json'));
  let NetuitiveLeage = LeagueJson.netuitive;
  let leaguePromises = Object.keys(LeagueJson).map((l) => {
    let L = LeaguesJson[l];

    return League.create({
      id: l,
      name: L.name,
      seasons: Object.keys(L.seasons),
      rules: Object.keys(rules)
    });
  });

  let userPromises = Object.keys(FoosballersJson).map((f) => {
    let U = FoosballersJson[f];

    return User.create({
      firstname: f.split('-')[0],
      lastname: f.split('-')[1],
      slack: U.slack,
      retired: U.retired,
      isAdmin: U.isAdmin ? true : false,
      isGlobalAdmin: U.isGlobalAdmin ? true : false,
      profileImageURL: U.profileImageURL,
      id: f
    });
  });

  let gamePromises = Object.keys(GamesJson).map((g) => {
    let G = GamesJson[g];

    return Game.create({
      dateCreated: G.time,
      id: g
    });
  });

  let rulesPromises = Object.keys(RulesJson).map((r) => {
    let R = RulesJson[r];

    return Rule.create({
      id: r,
      dateCreated: R.date,
      message: R.message,
      league: R.tenant
    });
  });

  let teamsPromises = Object.keys(TeamsJson).map((t) => {
    let T = TeamsJson[t];

    return Team.create({
      id: t,
      users: [
        T.player1, T.player2
      ]
    });

    // let teamGamesPromises = 
  });
}
