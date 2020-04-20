const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      iat: timestamp,
    },
    config.secret
  );
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });

  User.findOne({ email }, (err, user) => {
    if (err) next(err);

    if (user) return res.status(422).send({ error: 'Email taken' });

    const newUser = new User({ email, password });
    newUser.save((err) => {
      if (err) return next(err);

      res.json({ token: tokenForUser(newUser) });
    });
  });
};
