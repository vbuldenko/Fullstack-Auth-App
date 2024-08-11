const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_AUTH_OPTIONS } = require('../constants/GoogleAuth');
const UserService = require('./user.service'); // Your user service file

passport.use(
  new GoogleStrategy(
    GOOGLE_AUTH_OPTIONS,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserService.findOrCreateGoogleUser(profile);

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.findById(id);

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
