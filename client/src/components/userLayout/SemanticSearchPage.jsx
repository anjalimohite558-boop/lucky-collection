import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Badge } from "react-bootstrap";

const SemanticSearchPage = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================
  // FETCH RESULTS
  // ==========================
  const fetchResults = async (searchText) => {
    try {
      if (!searchText || searchText.trim() === "") {
        setItems([]);
        return;
      }

      setLoading(true);

      const res = await axios.get(
        `https://lucky-collection.onrender.com/api/items/semantic-search?q=${encodeURIComponent(
          searchText
        )}`
      );

      setItems(res.data.items || []);
    } catch (error) {
      console.log("Semantic search failed:", error);
      alert("Semantic search failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // AUTO SEARCH (Debounce)
  // ==========================
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchResults(query);
    }, 600);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Container fluid className="py-4">
      <h2
        className="text-center fw-bold mb-4"
        style={{ color: "#d4af37" }}
      >
        AI Semantic Search 🔍
      </h2>

      {/* Search Box */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search like: pink saree, wedding dress, party wear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: "#111",
              color: "white",
              border: "1px solid #d4af37",
              padding: "12px",
            }}
          />
        </Col>
      </Row>

      {/* Loading */}
      {loading && (
        <h5 className="text-center text-light">Searching... ⏳</h5>
      )}

      {/* Results */}
      <Row>
        {!loading && items.length === 0 && query.trim() !== "" ? (
          <h5 className="text-center text-light">No matching products ❌</h5>
        ) : (
          items.map((item) => (
            <Col key={item._id} md={6} lg={4} className="mb-4">
              <Card
                className="shadow-lg"
                style={{
                  borderRadius: "18px",
                  border: "1px solid #2d2d2d",
                  background: "#1b1b1b",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <Card.Img
                  variant="top"
                  src={`https://lucky-collection.onrender.com/uploads/${item.itemImage}`}
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>
                  <Card.Title
                    className="fw-bold"
                    style={{ color: "#d4af37" }}
                  >
                    {item.itemName}
                  </Card.Title>

                  <Card.Text style={{ color: "#ccc" }}>
                    {item.description}
                  </Card.Text>

                  {/* Category */}
                  <Badge bg="warning" text="dark" className="mb-2">
                    {item.category}
                  </Badge>

                  {/* Tags */}
                  <div className="mb-2">
                    {item.tags?.map((tag, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        className="me-2"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Price */}
                  <Card.Text
                    className="fw-bold"
                    style={{
                      color: "#d4af37",
                      fontSize: "20px",
                    }}
                  >
                    ₹ {item.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SemanticSearchPage;