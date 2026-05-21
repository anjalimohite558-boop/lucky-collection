import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage(null);

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        payload
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setMessage({
        text: res.data.message || "Login Successful",
        type: "success",
      });

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Login Failed",
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
          .login-page {
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

          .login-card {
            width: 420px;
            background: #1b1b1b;
            border-radius: 20px;
            border: 1px solid #2d2d2d;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            color: white;
          }

          .login-title {
            color: #d4af37;
            font-weight: 800;
            text-align: center;
            margin-bottom: 10px;
          }

          .login-subtitle {
            text-align: center;
            color: #aaa;
            margin-bottom: 25px;
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

          .login-btn {
            width: 100%;
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
            font-size: 16px;
            transition: 0.3s ease;
          }

          .login-btn:hover {
            transform: translateY(-2px);
            opacity: 0.95;
          }
        `}
      </style>

      <Container fluid className="login-page">
        <Card className="login-card p-4">

          <h2 className="login-title">
            LUXE COLLECTION
          </h2>

          <p className="login-subtitle">
            Login to continue shopping
          </p>

          {message && (
            <Alert variant={message.type}>
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading
                ? "Please Wait..."
                : "Login"}
            </Button>

          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Login;