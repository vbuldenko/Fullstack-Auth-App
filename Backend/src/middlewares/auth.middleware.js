const { ApiError } = require('../exceptions/api.error');
const tokenService = require('../services/token.service');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const [, accessToken] = authHeader.split(' ');

  if (!authHeader || !accessToken) {
    throw ApiError.Unauthorized();
  }

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  next();
}

module.exports = {
  authMiddleware,
};
