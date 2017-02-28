module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    if (sails.config.globals.proxy) {
      return res.status(401).send();
    } else {
      return res.redirect('/');
    }
  }
};
