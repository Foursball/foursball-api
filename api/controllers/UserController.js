const log4js = require('log4js');
const logger = log4js.getLogger('config/bootstrap');

module.exports = {
  current(req, res) {
    User.findOne({ id: req.session.passport.user }, (err, user) => {
      if (!err) {
        res.json({ user });
      } else {
        res.status(404);
      }
    });
  }
};
