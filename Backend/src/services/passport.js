const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_AUTH_OPTIONS } = require('../configs/GoogleAuth');
const userService = require('./user.service'); // Your user service file
const tokenService = require('./token.service');

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, processingCallback));

async function processingCallback(accessToken, refreshToken, profile, done) {
  try {
    const user = await userService.findOrCreateGoogleUser(profile._json);
    const tokens = await tokenService.generateTokensData(user);

    return done(null, {
      // userData,
      // accessToken: newAccessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    return done(error, null);
  }
}

// Used with session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async (user, done) => {
//   done(null, user);
// });

module.exports = { passport };
