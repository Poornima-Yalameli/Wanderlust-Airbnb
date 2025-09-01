import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setError }) {
  const navigate = useNavigate();

  const handleAddListing = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setError("You must logged in to create a listing! ");
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            airbnb
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  All-Listings
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/listings/new"
                  onClick={handleAddListing}
                >
                  Add-New-listings
                </Link>
              </li>

              {!isLoggedIn && (
                <>
                  <li className="nav-item me-2 mb-2 mb-lg-0">
                    <Link
                      type="button"
                      className="btn btn-success"
                      to="/signup"
                    >
                      Sign-Up
                    </Link>
                  </li>
                  <li className="nav-item me-2 mb-2 mb-lg-0">
                    <Link
                      type="button"
                      className="btn btn-secondary"
                      to="/login"
                    >
                      Log-In
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li className="nav-item mb-2 mb-lg-0">
                  <Link type="button" className="btn btn-danger" to="/logout">
                    Log-Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
