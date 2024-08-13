const jwt = require('jsonwebtoken');
const { ApiError } = require('../exceptions/api.error');
const { Token } = require('../models/Token');
const userService = require('./user.service');

require('dotenv').config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '60s' });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
}

function generateResetToken(user) {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
}

function validateAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

function validateResetToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    return null;
  }
}

const save = async (userId, refreshToken) => {
  const user = await userService.findById(userId);

  if (!user) {
    throw ApiError.NotFound();
  }

  const token = await Token.findOne({ where: { userId } });

  if (!token) {
    await Token.create({ userId, refreshToken });

    return;
  }

  token.refreshToken = refreshToken;

  await token.save();
};

const getByToken = (refreshToken) => {
  return Token.findOne({ where: { refreshToken } });
};

const removeByUserId = (userId) => {
  return Token.destroy({ where: { userId } });
};

async function generateTokensData(user) {
  const userData = userService.normalize(user);
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  await save(userData.id, refreshToken);

  return { accessToken, refreshToken, userData };
}

module.exports = {
  save,
  getByToken,
  removeByUserId,
  generateTokensData,
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  validateAccessToken,
  validateRefreshToken,
  validateResetToken,
};
