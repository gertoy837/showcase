import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppRoutes from "./routes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const login = Cookies.get("login");
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("login");
    setIsAuthenticated(false);
    Navigate("/login", { replace: true });
  };
  return (
    <div style={{ backgroundColor: "#2C7865" }}>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#FF9800" }}
        data-bs-theme="dark"
      >
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            HOME
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {login ? (
              <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                <a
                  onClick={logout}
                  className="btn"
                  style={{ cursor: "pointer", backgroundColor: "#D9EDBF" }}
                >
                  Logout
                </a>
              </div>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li>
                  <Link
                    to="/register"
                    className="btn text-dark me-3"
                    style={{ backgroundColor: "#D9EDBF" }}
                  >
                    REGISTER
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="btn text-dark"
                    style={{ backgroundColor: "#D9EDBF" }}
                  >
                    LOGIN
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <AppRoutes />
      </div>

      <footer
        className="text-center text-white fs-5 fw-bold py-3"
        style={{ backgroundColor: "#FF9800" }}
      >
        <span>Created By ❤️</span>
      </footer>
    </div>
  );
}
