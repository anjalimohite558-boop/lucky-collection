import React, { useContext } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { trackActivity } from "../../api/trackActivity";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      const orderItems = cart.map((item) => ({
        itemId: item._id,
        itemName: item.itemName,
        itemImage: item.itemImage,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        subTotal: item.price * item.quantity,
      }));

      const res = await axios.post(
        "https://lucky-collection.onrender.com/api/orders/create",
        {
          items: orderItems,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // ✅ AI TRACKING: order activity
      for (let item of cart) {
        await trackActivity(item._id, "order");
      }

      clearCart();
      navigate("/user/myorders");
    } catch (error) {
      alert(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#d4af37" }}>
        MY CART
      </h2>

      {cart.length === 0 ? (
        <h5 className="text-center text-light">Cart is empty</h5>
      ) : (
        <>
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
                  <th>Image</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`https://lucky-collection.onrender.com/uploads/${item.itemImage}`}
                        alt="item"
                        width="70"
                        height="70"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px",
                          border: "1px solid #d4af37",
                        }}
                      />
                    </td>

                    <td>{item.itemName}</td>
                    <td>{item.category}</td>

                    <td style={{ color: "#d4af37", fontWeight: "700" }}>
                      ₹ {item.price}
                    </td>

                    <td>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => decreaseQty(item._id)}
                      >
                        -
                      </Button>

                      <span
                        style={{
                          margin: "0 10px",
                          fontWeight: "700",
                        }}
                      >
                        {item.quantity}
                      </span>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </Button>
                    </td>

                    <td>₹ {item.price * item.quantity}</td>

                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Card
            className="p-3 mt-4"
            style={{
              background: "#1b1b1b",
              border: "1px solid #2d2d2d",
            }}
          >
            <h4 className="text-end fw-bold">
              Total Amount :
              <span style={{ color: "#d4af37" }}> ₹ {totalAmount}</span>
            </h4>
          </Card>

          <Button
            className="w-100 mt-3"
            style={{
              background: "linear-gradient(45deg,#d4af37,#f5d76e)",
              border: "none",
              color: "black",
              fontWeight: "700",
              padding: "12px",
            }}
            onClick={placeOrder}
          >
            Place Order (₹ {totalAmount})
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;