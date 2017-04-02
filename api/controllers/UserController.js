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
