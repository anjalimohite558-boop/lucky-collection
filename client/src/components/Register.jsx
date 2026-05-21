import React, { useState } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Alert,
  Card,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const [validated, setValidated] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);

      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),

        email: formData.email
          .trim()
          .toLowerCase(),

        contact: formData.contact.trim(),

        password: formData.password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        payload
      );

      setMessage({
        text:
          res.data.message ||
          "Registered successfully!",

        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
      });

      setValidated(false);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          "Something went wrong",

        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .register-page {
            min-height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(
              135deg,
              #0f0f0f,
              #1a1a1a,
              #111
            );
            padding: 40px 20px;
          }

          .register-card {
            background: #1b1b1b;
            border-radius: 20px;
            border: 1px solid #2d2d2d;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            color: white;
          }

          .register-title {
            color: #d4af37;
            font-weight: 800;
          }

          .register-subtitle {
            color: #999;
          }

          .form-label {
            color: #f5f5f5;
            font-weight: 600;
          }

          .form-control {
            background: #111 !important;
            border: 1px solid #333 !important;
            color: white !important;
            padding: 12px;
          }

          .form-control:focus {
            background: #111 !important;
            border-color: #d4af37 !important;
            box-shadow: 0 0 10px rgba(212,175,55,0.3) !important;
            color: white !important;
          }

          .form-control::placeholder {
            color: #777 !important;
          }

          .register-btn {
            background: linear-gradient(
              135deg,
              #d4af37,
              #f5d76e
            ) !important;

            border: none !important;

            color: #000 !important;

            font-weight: 700;

            padding: 12px;

            border-radius: 10px;

            transition: 0.3s ease;
          }

          .register-btn:hover {
            transform: translateY(-2px);
            opacity: 0.95;
          }

          .login-link {
            color: #d4af37;
            font-weight: 700;
            text-decoration: none;
          }

          .login-link:hover {
            color: #f5d76e;
          }
        `}
      </style>

      <Container fluid className="register-page">
        <Row className="justify-content-center w-100">
          <Col md={6} lg={5}>

            <Card className="register-card shadow-lg rounded-4 p-3">
              <Card.Body>

                <div className="text-center mb-4">

                  <h2 className="register-title">
                    LUXE COLLECTION
                  </h2>

                  <p className="register-subtitle">
                    Create your premium account
                  </p>

                </div>

                {message && (
                  <Alert variant={message.type}>
                    {message.text}
                  </Alert>
                )}

                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email Address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Contact Number
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="contact"
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={10}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="register-btn"
                    >
                      {isLoading
                        ? "Creating..."
                        : "Register"}
                    </Button>
                  </div>

                </Form>

                <div className="text-center mt-3">
                  <p className="text-secondary">

                    Already have an account?{" "}

                    <Link
                      to="/login"
                      className="login-link"
                    >
                      Login
                    </Link>

                  </p>
                </div>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;