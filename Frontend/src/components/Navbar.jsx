import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { usePageError } from "../hooks/usePageError";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [, setError] = usePageError();

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>
        {user && (
          <>
            <NavLink to="/profile" className="navbar-item">
              Profile
            </NavLink>
            <NavLink to="/users" className="navbar-item">
              Users
            </NavLink>
          </>
        )}
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {user ? (
              <button
                className="button is-light has-text-weight-bold"
                onClick={() => {
                  logout()
                    .then(() => {
                      navigate("/");
                    })
                    .catch((error) => {
                      setError(error.response?.data?.message);
                    });
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  className="button is-light has-text-weight-bold"
                >
                  Sign up
                </Link>

                <Link
                  to="/login"
                  className="button is-success has-text-weight-bold"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
