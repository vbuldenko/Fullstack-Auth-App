import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.scss";

import { AccountActivationPage } from "./pages/AccountActivationPage";
import { useAuthContext } from "./components/AuthContext";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { PasswordResetPage } from "./pages/PasswordResetPage.jsx";
import { LoginPage } from "./pages/LoginPage";
import { RequireAuth } from "./components/RequireAuth";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { UsersPage } from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { Loader } from "./components/Loader.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { usePageError } from "./hooks/usePageError.js";

function App() {
  const [error] = usePageError();
  const { isChecked, checkAuth } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="section">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="reset" element={<ForgotPasswordPage />} />
            <Route path="reset/:resetToken" element={<PasswordResetPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<RequireAuth />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>

        {error && <p className="notification is-danger is-light">{error}</p>}
      </main>
    </>
  );
}

export default App;
