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

const GuestNavbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .guest-navbar {
            background: rgba(15,15,15,0.96) !important;
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #2d2d2d;
            padding: 14px 0;
          }

          .brandText {
            font-size: 28px;
            font-weight: 800;
            color: #d4af37 !important;
            letter-spacing: 1px;
          }

          .navLinkStyle {
            color: white !important;
            font-size: 17px;
            font-weight: 500;
            margin-right: 10px;
            transition: 0.3s ease;
          }

          .navLinkStyle:hover {
            color: #d4af37 !important;
          }

          .loginBtn {
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

          .loginBtn:hover {
            opacity: 0.9;
          }
        `}
      </style>

      <Navbar
        expand="lg"
        variant="dark"
        className="guest-navbar"
        sticky="top"
      >
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="brandText"
          >
            LUCKY COLLECTION
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/home"
                className="navLinkStyle"
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/about"
                className="navLinkStyle"
              >
                About
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/services"
                className="navLinkStyle"
              >
                Products
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/contact"
                className="navLinkStyle"
              >
                Contact
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/register"
                className="navLinkStyle"
              >
                Register
              </Nav.Link>
            </Nav>

            <Button
              className="loginBtn"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default GuestNavbar;