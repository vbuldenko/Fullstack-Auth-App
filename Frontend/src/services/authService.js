import { authClient } from "../http/authClient.js";

function register({ name, email, password }) {
  return authClient.post("/registration", { name, email, password });
}

function login({ name, email, password }) {
  return authClient.post("/login", { name, email, password });
}
function loginGoogle() {
  window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
}

function loginGoogleFBase(idToken) {
  return authClient.post("/api/auth/google", { idToken });
}

function logout() {
  return authClient.post("/logout");
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get("/refresh");
}

function reset({ email }) {
  return authClient.post("/forgotPassword", { email });
}

function resetPassword({ newPassword, newPasswordConfirmation, resetToken }) {
  return authClient.post(`/resetPassword/${resetToken}`, {
    password: newPassword,
    passwordConfirm: newPasswordConfirmation,
  });
}

export const authService = {
  register,
  login,
  loginGoogle,
  loginGoogleFBase,
  logout,
  activate,
  refresh,
  reset,
  resetPassword,
};
