import { httpClient } from "../http/httpClient.js";

function getAll() {
  return httpClient.get("/users");
}

// function update(user) {
//   return authClient.patch(`/update`, user);
// }

function updateName(user) {
  return httpClient.patch(`/users/profile/name`, user);
}

function changeAuthPassword({
  id,
  email,
  oldPassword,
  newPassword,
  newPasswordConfirmation,
}) {
  return httpClient.post("/changeAuthPassword", {
    id,
    email,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  });
}

function confirmChangeEmail(user) {
  return httpClient.patch("/confirmChangeEmail", { user });
}

export const userService = {
  getAll,
  updateName,
  changeAuthPassword,
  confirmChangeEmail,
};
