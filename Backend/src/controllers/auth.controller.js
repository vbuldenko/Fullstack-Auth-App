const { ApiError } = require('../exceptions/api.error');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const emailService = require('../services/email.service');
const {
  validateName,
  validateEmail,
  validatePassword,
  comparePasswords,
} = require('../utils');
const { admin } = require('../configs/firebase');

// const { Path } = require('../constants/RoutePath');
require('dotenv').config();

const sendAuthentication = async (res, user) => {
  const { accessToken, refreshToken, userData } =
    await tokenService.generateTokensData(user);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.send({
    user: userData,
    accessToken,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(errors).some((error) => error)) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  await userService.create(name, email, password);

  res.status(200).send({
    message: 'Further instructions were sent to your email',
  });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const user = await userService.findByToken(activationToken);

  if (!user) {
    throw ApiError.NotFound({ user: 'User does not exist' });
  }

  user.activationToken = null;

  await user.save();

  await sendAuthentication(res, user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(errors).some((error) => error)) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.NotFound({ user: 'Invalid email or password' });
  }

  if (user.activationToken) {
    throw ApiError.BadRequest('User not activated', {
      user: 'User not activated. Please check your email',
    });
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadRequest('Invalid credentials');
  }

  await sendAuthentication(res, user);
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || '';
  const userData = await tokenService.validateRefreshToken(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!userData || !token) {
    res.clearCookie('refreshToken');
    throw ApiError.Unauthorized();
  }

  const user = await userService.findById(userData.id);

  if (!user || token.userId !== user.id) {
    res.clearCookie('refreshToken');
    throw ApiError.Unauthorized();
  }
  await sendAuthentication(res, user);
};

const logout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || '';
  const userData = tokenService.validateRefreshToken(refreshToken);

  if (!userData || !refreshToken) {
    throw ApiError.Unauthorized();
  }

  await tokenService.removeByUserId(userData.id);

  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('Invalid email', {
      email: 'Incorrect email or user does not exist',
    });
  }

  const userData = userService.normalize(user);
  const resetToken = tokenService.generateResetToken(userData);

  await emailService.sendResetLink(user.name, user.email, resetToken);

  res.status(200).send({
    message: 'Instructions on password reset were sent to your email',
  });
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm) {
    throw ApiError.BadRequest('All fields are required.');
  }

  const validationError = validatePassword(password);

  if (validationError) {
    throw ApiError.BadRequest(validationError);
  }

  if (password !== passwordConfirm) {
    throw ApiError.BadRequest('Invalid input', {
      confirmation: `Passwords do not match`,
    });
  }

  const userData = await tokenService.validateResetToken(resetToken);

  if (!userData) {
    throw ApiError.BadRequest('Invalid token', {
      resetToken: 'Invalid or expired reset token',
    });
  }

  const user = await userService.findByEmail(userData.email);

  if (!user) {
    throw ApiError.NotFound;
  }

  if (userData.id !== user.id) {
    throw ApiError.Unauthorized();
  }

  await userService.updatePassword(user.id, password);

  res.status(200).send({ message: 'password reset successfully' });
};

const googleAuthCallback = (req, res) => {
  const { refreshToken } = req.user;

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.redirect(`${process.env.CLIENT_URL}/profile`);
};

const googleAuthFireBase = async (req, res) => {
  const { idToken } = req.body;

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const user = await userService.findOrCreateGoogleUser(decodedToken);

  await sendAuthentication(res, user);
};

module.exports = {
  register,
  activate,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  googleAuthCallback,
  googleAuthFireBase,
};
