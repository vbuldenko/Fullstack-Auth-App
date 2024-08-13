const Path = {
  googleLogin: '/auth/google',
  googleLoginCB: '/auth/google/callback',
  signup: '/registration',
  activate: '/activation/:activationToken',
  login: '/login',
  logout: '/logout',
  refresh: '/refresh',
  restore: '/forgotPassword',
  reset: '/resetPassword/:resetToken',
  users: '/',
  profile: '/profile',
  updateName: '/profile/name',
  updateEmail: '/profile/email',
  updatePassword: '/profile/password',
};

module.exports = { Path };
