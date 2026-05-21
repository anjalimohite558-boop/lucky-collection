import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo and App Name */}
          <Link className="navbar-brand fw-bold text-danger" to="/">
            <img
              src="https://via.placeholder.com/40" // Replace with your logo
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top me-2"
            />
            Event <span className="text-info">Management</span>
          </Link>

          {/* Menu */}
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;