import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  Badge,
  Card,
} from "react-bootstrap";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://lucky-collection.onrender.com/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://lucky-collection.onrender.com/api/orders/status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchOrders();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Status update failed"
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          background: "#8a6d1f",
          color: "white",
        };

      case "Approved":
        return {
          background: "#b8860b",
          color: "black",
        };

      case "Delivered":
        return {
          background: "#d4af37",
          color: "black",
        };

      case "Cancelled":
        return {
          background: "#5c1f1f",
          color: "white",
        };

      default:
        return {
          background: "#333",
          color: "white",
        };
    }
  };

  return (
    <>
      <style>
        {`
        .order-table tbody tr:hover {
          background: #222 !important;
        }

        .gold-select {
          background: #111 !important;
          color: white !important;
          border: 1px solid #d4af37 !important;
          box-shadow: none !important;
        }

        .gold-select:focus {
          border-color: #d4af37 !important;
          box-shadow: 0 0 8px #d4af37 !important;
        }
        `}
      </style>

      <Container fluid className="py-4">

        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#d4af37",
            letterSpacing: "1px",
          }}
        >
          ORDER MANAGEMENT
        </h2>

        {orders.length === 0 ? (
          <h5 className="text-center text-light">
            No Orders Found
          </h5>
        ) : (
          <div
            style={{
              background: "#1b1b1b",
              padding: "20px",
              borderRadius: "18px",
              border: "1px solid #2d2d2d",
            }}
          >
            <Table
              bordered
              responsive
              className="text-center align-middle order-table"
              style={{
                background: "#111",
                color: "white",
              }}
            >
              <thead
                style={{
                  background: "#d4af37",
                  color: "black",
                }}
              >
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      {order._id}
                    </td>

                    <td>{order.user?.name}</td>

                    <td>{order.user?.email}</td>

                    <td>{order.totalItems}</td>

                    <td>
                      <Badge
                        style={{
                          ...getStatusStyle(order.status),
                          padding: "8px 12px",
                          borderRadius: "8px",
                        }}
                      >
                        {order.status}
                      </Badge>
                    </td>

                    <td>
                      <Form.Select
                        className="gold-select"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Approved">
                          Approved
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </Form.Select>
                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <h3
          className="mt-5 mb-4 fw-bold"
          style={{ color: "#d4af37" }}
        >
          ORDER DETAILS
        </h3>

        {orders.map((order) => (
          <Card
            key={order._id}
            className="mb-4"
            style={{
              background: "#1b1b1b",
              color: "white",
              border: "1px solid #2d2d2d",
              borderRadius: "18px",
            }}
          >
            <Card.Body>

              <h6
                className="fw-bold"
                style={{ color: "#d4af37" }}
              >
                ORDER ID : {order._id}
              </h6>

              <p className="mb-3">
                <strong>User :</strong>{" "}
                {order.user?.name}
                {" | "}
                <strong>Email :</strong>{" "}
                {order.user?.email}
              </p>

              <Table
                bordered
                responsive
                className="text-center align-middle order-table"
                style={{
                  background: "#111",
                  color: "white",
                }}
              >
                <thead
                  style={{
                    background: "#d4af37",
                    color: "black",
                  }}
                >
                  <tr>
                    <th>Image</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>

                      <td>
                        <img
                          src={`https://lucky-collection.onrender.com/uploads/${item.itemImage}`}
                          alt="item"
                          width="70"
                          height="70"
                          style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                            border:
                              "1px solid #d4af37",
                          }}
                        />
                      </td>

                      <td>{item.itemName}</td>

                      <td>{item.category}</td>

                      <td>{item.quantity}</td>

                      <td>₹ {item.price}</td>

                      <td>
                        ₹{" "}
                        {item.price *
                          item.quantity}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>

              <h5
                className="text-end fw-bold mt-3"
                style={{ color: "#d4af37" }}
              >
                Total Amount : ₹ {order.totalAmount}
              </h5>

            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default OrderManagement;