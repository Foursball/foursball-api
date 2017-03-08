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
  let FoosballersJson = require(path.join(cwd, 'restore', 'foosballers.json'));
  let userPromises = Object.keys(FoosballersJson).map((f) => {
    let U = FoosballersJson[f];

    return User.create({
      firstname: f.split('-')[0],
      lastname: f.split('-')[1],
      slack: U.slack,
      retired: U.retired,
      isAdmin: U.isAdmin ? true : false,
      isGlobalAdmin: U.isGlobalAdmin ? true : false,
      profileImageURL: U.profileImageURL
    });
  });

  let GamesJson = require(path.join(cwd, 'restore', 'games.json'));
  let gamePromises = Object.keys(GamesJson).map((g) => {
    let G = GamesJson[g];

    return Game.create({
      dateCreated: G.time,
      teamGames: [{

      }];
    });
  });
}
