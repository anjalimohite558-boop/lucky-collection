import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {

    try {

      const res = await axios.get(
        "https://lucky-collection.onrender.com/api/items"
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.items;

      setItems(data?.slice(0, 6) || []);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom,#0f0f0f,#1a1a1a)",
        padding: "80px 0",
      }}
    >
      <Container>

        {/* TITLE */}
        <h2
          className="text-center fw-bold mb-5"
          style={{
            color: "#d4af37",
            fontSize: "42px",
            letterSpacing: "1px",
          }}
        >
          NEW ARRIVALS
        </h2>

        <Row>

          {items.length === 0 ? (

            <h5 className="text-center text-light">
              No Products Found
            </h5>

          ) : (

            items.map((item) => (

              <Col
                key={item._id}
                md={6}
                lg={4}
                className="mb-4"
              >

                <Card
                  className="shadow-lg h-100"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "#1b1b1b",
                    border: "1px solid #2d2d2d",
                    color: "white",
                    transition: "0.3s ease",
                  }}
                >

                  {/* IMAGE CONTAINER */}
                  <div
                    style={{
                      width: "100%",
                      height: "420px",
                      background: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: "10px",
                    }}
                  >

                    <Card.Img
                      variant="top"
                      src={`https://lucky-collection.onrender.com/uploads/${item.itemImage}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />

                  </div>

                  {/* CARD BODY */}
                  <Card.Body className="d-flex flex-column">

                    <Card.Title
                      className="fw-bold"
                      style={{
                        color: "#d4af37",
                        fontSize: "22px",
                        minHeight: "60px",
                      }}
                    >
                      {item.itemName}
                    </Card.Title>

                    <Card.Text
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: "24px",
                      }}
                    >
                      ₹ {item.price}
                    </Card.Text>

                    <Button
                      className="w-100 mt-auto"
                      style={{
                        background:
                          "linear-gradient(45deg,#d4af37,#f5d76e)",
                        border: "none",
                        color: "black",
                        fontWeight: "700",
                        padding: "12px",
                        borderRadius: "12px",
                      }}
                      onClick={() =>
                        navigate("/login")
                      }
                    >
                      Login to Buy
                    </Button>

                  </Card.Body>

                </Card>

              </Col>
            ))
          )}
        </Row>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-4">

          <Button
            style={{
              background:
                "linear-gradient(45deg,#d4af37,#f5d76e)",
              border: "none",
              color: "black",
              fontWeight: "700",
              padding: "12px 35px",
              borderRadius: "12px",
            }}
            onClick={() =>
              navigate("/login")
            }
          >
            View All Products
          </Button>

        </div>

      </Container>
    </div>
  );
};

export default NewArrivals;