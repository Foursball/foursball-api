const Promise = require('bluebird');
const uuid = require('uuid');
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
  let allPromises = [];
  let uuidMap = {};

  let userPromises = Object.keys(FoosballersJson).map((f) => {
    let newUuid = uuid.v4();
    let U = FoosballersJson[f];

    uuidMap[f] = newUuid;
    console.log(`${f} is now ${newUuid}`);

    return User.create({
      firstName: f.split('-')[0],
      lastName: f.split('-')[1],
      slack: U.slack,
      retired: U.retired === "true" ? true : false,
      isAdmin: U.isAdmin ? true : false,
      isGlobalAdmin: U.isGlobalAdmin ? true : false,
      profileImageURL: U.profileImageURL,
      id: newUuid
    }).then(thenHandler)
    .catch((e) => console.log(e));
  });

  let teamsPromises = Object.keys(TeamsJson).map((t) => {
    let T = TeamsJson[t];
    let newUuid = uuid.v4();

    uuidMap[t] = newUuid;

    if (!uuidMap[T.player1]) {
      console.log(`${T.player1} not found`);
    }
    if (!uuidMap[T.player2]) {
      console.log(`${T.player2} not found`);
    }

    return Team.create({
      id: newUuid,
      users: [
        uuidMap[T.player1], uuidMap[T.player2]
      ]
    }).then(thenHandler)
    .catch((e) => console.log(e));
  });

  let netuitiveId = uuid.v4();
  let season1Id = uuid.v4();
  let season2Id = uuid.v4();

  let rulesPromises = Object.keys(RulesJson).map((r) => {
    let R = RulesJson[r];
    let newUuid = uuid.v4();

    uuidMap[r] = newUuid;

    return Rule.create({
      id: newUuid,
      dateCreated: R.date,
      message: R.message,
      league: netuitiveId
    }).then(thenHandler)
    .catch((e) => console.log(e));
  });

  let seasonPromises = [
    Season.create({
      id: season1Id,
      name: 'Season-0',
      league: netuitiveId
    }).then(thenHandler)
    .catch((e) => console.log(e)),
    Season.create({
      id: season2Id,
      name: 'Season-1',
      league: netuitiveId
    }).then(thenHandler)
    .catch((e) => console.log(e))
  ];

  let leaguePromises = [
    League.create({
      id: netuitiveId,
      name: 'Netuitive',
      seasons: [season1Id, season2Id],
      rules: [uuidMap['rule-1'], uuidMap['rule-2']]
    }).then(thenHandler)
    .catch((e) => console.log(e))
  ];

  let gamePromises = Object.keys(GamesJson).map((g) => {
    let G = GamesJson[g];
    let newUuid = uuid.v4();

    uuidMap[g] = newUuid;

    return Game.create({
      dateCreated: G.time,
      id: newUuid
    }).then(thenHandler)
    .catch((e) => console.log(e));
  });

  let teamGamesPromises = Object.keys(GamesJson).reduce((prev, g) => {
    let G = GamesJson[g];

    let id = uuidMap[g];
    let team1Id = uuidMap[G.team1];
    let team2Id = uuidMap[G.team2];

    if (!team1Id) {
      console.log(`${G.team1} not found`);
    }
    if (!team2Id) {
      console.log(`${G.team2} not found`);
    }

    prev.push(TeamGame.create({
      team: team1Id,
      wins: G.team1Wins,
      game: id
    }).then(thenHandler)
    .catch((e) => console.log(e)));

    prev.push(TeamGame.create({
      team: team2Id,
      wins: G.team2Wins,
      game: id
    }).then(thenHandler)
    .catch((e) => console.log(e)));

    return prev;
  }, []);

  let userLeaguesPromises = Object.keys(FoosballersJson).map((f) => {
    return UserLeague.create({
      user: uuidMap[f],
      league: netuitiveId
    }).then(thenHandler)
    .catch((e) => console.log(e));
  });

  allPromises.push(...gamePromises);
  allPromises.push(...leaguePromises);
  allPromises.push(...seasonPromises);
  allPromises.push(...rulesPromises);
  allPromises.push(...teamsPromises);
  allPromises.push(...teamGamesPromises);
  allPromises.push(...userPromises);
  allPromises.push(...userLeaguesPromises);

  return Promise.all(allPromises);
}

function thenHandler(model) {
  // logger.info(`Created ${model.id}`);
}
