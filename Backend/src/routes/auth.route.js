const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { catchError } = require('../utils/catchError');
const { Path } = require('../constants/RoutePath');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oidc');

router.post(Path.signup, catchError(authController.register));
router.get(Path.activate, catchError(authController.activate));
router.post(Path.login, catchError(authController.login));
// router.get(Path.googleLogin, catchError(passport.authenticate('google')));
router.get(Path.googleLogin, catchError(authController.googleAuth));

router.get(
  Path.googleLoginCB,
  catchError(
    passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleCallback,
  ),
);
router.get(Path.refresh, catchError(authController.refresh));
router.post(Path.logout, catchError(authController.logout));
router.post(Path.restore, catchError(authController.forgotPassword));
router.post(Path.reset, catchError(authController.resetPassword));

module.exports = router;
