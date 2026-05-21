import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setType("danger");
      setMessage("New password and confirm password do not match ❌");
      return;
    }

    if (form.newPassword.length < 6) {
      setType("danger");
      setMessage("Password must be at least 6 characters ❌");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setType("danger");
        setMessage("Token missing. Please login again ❌");
        return;
      }

      const res = await axios.put(
        "https://lucky-collection.onrender.com/api/users/change-password",
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setType("success");
      setMessage(res.data.message || "Password changed successfully ✅");

      // ✅ Clear localStorage after success
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Password changed successfully! Please login again.");

      navigate("/login");
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR:", error);

      setType("danger");
      setMessage(error.response?.data?.message || "Password change failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "450px" }} className="shadow p-3">
        <Card.Body>
          <h3 className="text-center mb-4">Change Password</h3>

          {message && <Alert variant={type}>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChangePassword;