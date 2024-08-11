const { Path } = require('./RoutePath');

require('dotenv').config();

const GOOGLE_AUTH_OPTIONS = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: Path.googleLoginCB,
};

module.exports = {
  GOOGLE_AUTH_OPTIONS,
};
