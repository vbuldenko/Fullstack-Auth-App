import { authClient } from "../http/authClient.js";

function register({ name, email, password }) {
  return authClient.post("/registration", { name, email, password });
}

function login({ name, email, password }) {
  return authClient.post("/login", { name, email, password });
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
  return authClient.post("/reset", { email });
}

function changePassword({ newPassword, newPasswordConfirmation, resetToken }) {
  return authClient.post(`/changePassword`, {
    newPassword,
    newPasswordConfirmation,
    resetToken,
  });
}

function validateToken(resetToken) {
  return authClient.get(`/reset/${resetToken}`);
}

function updateInformation(user) {
  return authClient.patch(`/update`, user);
}

function changeAuthPassword({
  id,
  email,
  oldPassword,
  newPassword,
  newPasswordConfirmation,
}) {
  return authClient.post("/changeAuthPassword", {
    id,
    email,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  });
}

function confirmChangeEmail(user) {
  return authClient.patch("/confirmChangeEmail", { user });
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
  reset,
  changePassword,
  validateToken,
  updateInformation,
  changeAuthPassword,
  confirmChangeEmail,
};
