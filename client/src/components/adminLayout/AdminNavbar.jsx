import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    alert("Logout Successful");

    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .admin-navbar {
            background: rgba(15,15,15,0.96) !important;
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #2d2d2d;
            padding: 14px 0;
          }

          .admin-brand {
            font-size: 28px;
            font-weight: 800;
            color: #d4af37 !important;
            letter-spacing: 1px;
          }

          .admin-link {
            color: white !important;
            font-weight: 500;
            margin-right: 10px;
            transition: 0.3s ease;
          }

          .admin-link:hover {
            color: #d4af37 !important;
          }

          .logout-btn {
            background: linear-gradient(
              45deg,
              #d4af37,
              #f5d76e
            ) !important;

            border: none !important;
            color: black !important;
            font-weight: 700;
            padding: 8px 18px;
            border-radius: 10px;
          }

          .logout-btn:hover {
            opacity: 0.9;
          }
        `}
      </style>

      <Navbar
        expand="lg"
        variant="dark"
        className="admin-navbar"
        sticky="top"
      >
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/admin"
            className="admin-brand"
          >
            Lucky Collection
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/admin"
                className="admin-link"
              >
                Dashboard
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/admin/item"
                className="admin-link"
              >
                Products
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/admin/orders"
                className="admin-link"
              >
                Orders
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/admin/change-password"
                className="admin-link"
              >
                Password
              </Nav.Link>
            </Nav>

            <Button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;