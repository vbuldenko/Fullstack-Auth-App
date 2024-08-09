import { httpClient } from "../http/httpClient.js";

function getAll() {
  return httpClient.get("/users");
}

function updateName(user) {
  return httpClient.patch("/users/profile/name", user);
}

function updateEmail(user) {
  return httpClient.patch("/users/profile/email", user);
}

function updatePassword(user) {
  return httpClient.patch("/users/profile/password", user);
}

export const userService = {
  getAll,
  updateName,
  updateEmail,
  updatePassword,
};
