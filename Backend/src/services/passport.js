const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_AUTH_OPTIONS } = require('../constants/GoogleAuth');
const userService = require('./user.service'); // Your user service file
const jwtService = require('./jwt.service');
const tokenService = require('./token.service');

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, processingCallback));

async function processingCallback(accessToken, refreshToken, profile, done) {
  try {
    const user = await userService.findOrCreateGoogleUser(profile);
    const userData = userService.normalize(user);

    // const newAccessToken = await jwtService.generateAccessToken(userData);
    const newRefreshToken = await jwtService.generateRefreshToken(userData);

    await tokenService.save(user.id, newRefreshToken);

    return done(null, {
      // userData,
      // accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return done(error, null);
  }
}

//Used with session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser(async (user, done) => {
//   done(null, user);
// });

module.exports = { passport };
