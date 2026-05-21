import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/user">
          Lucky Collection
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user/view-products">
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/user/cart">
              Cart
            </Nav.Link>

            <Nav.Link as={Link} to="/user/myorders">
              My Orders
            </Nav.Link>

            <Nav.Link as={Link} to="/user/search">
              AI Search
            </Nav.Link>
          </Nav>

          <Button variant="warning" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;