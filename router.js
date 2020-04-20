const auth = require('./controllers/Auth');

module.exports = function (app) {
  app.post('/signup', auth.signup);
};
