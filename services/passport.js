const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtratctJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const User = require('../models/user');
const LocalStratey = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStratey(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtratctJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) return done(err, false);

    if (user) done(null, user);
    else done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
