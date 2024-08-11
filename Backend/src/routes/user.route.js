const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { catchError } = require('../utils/catchError');
const { Path } = require('../constants/RoutePath');

router.get(Path.users, catchError(userController.getAllActive));
router.get(Path.profile, catchError(userController.getProfile));
router.patch(Path.updateName, catchError(userController.updateName));
router.patch(Path.updateEmail, catchError(userController.updateEmail));
router.patch(Path.updatePassword, catchError(userController.updatePassword));

module.exports = router;
