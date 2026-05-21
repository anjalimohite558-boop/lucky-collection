import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      fetchRecommendations();
    }
    // eslint-disable-next-line
  }, [user?._id]);

  const fetchRecommendations = async () => {
    try {
      const res = await API.get(`/items/recommend/${user._id}`);
      setItems(res.data.items || []);
    } catch (error) {
      console.log("Recommendation error:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="mt-4">
      <h3 style={{ color: "#d4af37" }}>Recommended For You</h3>

      <Row className="mt-3">
        {items.length === 0 ? (
          <p className="text-light">No recommendations available yet.</p>
        ) : (
          items.map((item) => (
            <Col md={3} key={item._id} className="mb-4">
              <Card style={{ background: "#1b1b1b", border: "1px solid #333" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${item.itemImage}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title style={{ color: "#d4af37" }}>
                    {item.itemName}
                  </Card.Title>

                  <Card.Text style={{ color: "white" }}>
                    ₹ {item.price}
                  </Card.Text>

                  <Button
                    variant="warning"
                    onClick={() => navigate(`/user/view-products`)}
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default RecommendedProducts;