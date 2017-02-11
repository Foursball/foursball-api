var log4js = require('log4js');
var logger = log4js.getLogger('api/services/DataGeneratorService');

module.exports = {
  generateDemoData
};

function generateDemoData() {
  logger.info('Generating data');
}
