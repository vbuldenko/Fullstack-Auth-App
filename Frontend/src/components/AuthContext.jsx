import React, { useContext, useMemo, useState } from "react";
import { accessTokenService } from "../services/accessTokenService.js";
import { authService } from "../services/authService.js";
import { userService } from "../services/userService.js";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);

  async function activate(activationToken) {
    const { accessToken, user } = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      console.log("User is not authenticated");
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }) {
    const { accessToken, user } = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  async function reset() {
    await authService.reset();
  }

  async function changeName(user) {
    await userService.updateName(user);
    setUser(user);
  }

  async function changeEmail(user) {
    await userService.updateEmail(user);
    setUser((prev) => ({ ...prev, email: user.email }));
  }

  const value = useMemo(
    () => ({
      isChecked,
      user,
      checkAuth,
      activate,
      login,
      logout,
      reset,
      changeName,
      changeEmail,
    }),
    [user, isChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
