const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { catchError } = require('../utils/catchError');
const { Path } = require('../configs/RoutePath');
const passport = require('passport');

router.post(Path.signup, catchError(authController.register));
router.get(Path.activate, catchError(authController.activate));
router.post(Path.login, catchError(authController.login));

router.post(
  Path.googleLoginFireBase,
  catchError(authController.googleAuthFireBase),
);

router.get(
  Path.googleLogin,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  Path.googleLoginCB,
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  catchError(authController.googleAuthCallback),
);

router.get(Path.refresh, catchError(authController.refresh));
router.post(Path.logout, catchError(authController.logout));
router.post(Path.restore, catchError(authController.forgotPassword));
router.post(Path.reset, catchError(authController.resetPassword));

module.exports = router;
