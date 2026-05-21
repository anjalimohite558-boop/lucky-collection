import React, { useEffect, useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://lucky-collection.onrender.com/api/orders/myorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      alert("Failed to fetch orders");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "warning";
    if (status === "Approved") return "info";
    if (status === "Delivered") return "success";
    if (status === "Cancelled") return "danger";

    return "secondary";
  };

  return (
    <Container fluid className="py-4">

      <h2
        className="text-center fw-bold mb-4"
        style={{ color: "#d4af37" }}
      >
        MY ORDERS
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
            hover
            responsive
            variant="dark"
            className="text-center align-middle"
          >
            <thead
              style={{
                background: "#d4af37",
                color: "black",
              }}
            >
              <tr>
                <th>Order ID</th>
                <th>Total Items</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                    }}
                  >
                    {order._id}
                  </td>

                  <td>{order.totalItems}</td>

                  <td>
                    <Badge bg={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
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
    </Container>
  );
};

export default MyOrders;