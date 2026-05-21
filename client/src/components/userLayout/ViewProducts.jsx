import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Form } from "react-bootstrap";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { trackActivity } from "../../api/trackActivity";

const ViewProducts = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length > 2) {
        semanticSearch();
      } else {
        filterProducts();
      }
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [search, category, sortOption, items]);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data.items || []);
      setFilteredItems(res.data.items || []);
    } catch (error) {
      alert("Failed to fetch products ❌");
    }
  };

  // =========================
  // SEMANTIC SEARCH (AI)
  // =========================
  const semanticSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/items/semantic-search?q=${search}`
      );

      let resultItems = res.data.items || [];

      // Category filter
      if (category !== "All") {
        resultItems = resultItems.filter((item) => item.category === category);
      }

      // Sorting
      if (sortOption === "lowToHigh") {
        resultItems.sort((a, b) => a.price - b.price);
      }

      if (sortOption === "highToLow") {
        resultItems.sort((a, b) => b.price - a.price);
      }

      if (sortOption === "latest") {
        resultItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setFilteredItems(resultItems);
    } catch (error) {
      console.log("Semantic search failed:", error);
      filterProducts();
    }
  };

  // =========================
  // NORMAL FILTER SEARCH
  // =========================
  const filterProducts = () => {
    let updatedItems = [...items];

    if (search.trim()) {
      updatedItems = updatedItems.filter(
        (item) =>
          item.itemName.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      updatedItems = updatedItems.filter((item) => item.category === category);
    }

    if (sortOption === "lowToHigh") {
      updatedItems.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "highToLow") {
      updatedItems.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "latest") {
      updatedItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredItems(updatedItems);
  };

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  return (
    <Container fluid className="py-4">
      <h2 className="text-center fw-bold mb-5" style={{ color: "#d4af37" }}>
        Lucky Collection Products ✨
      </h2>

      {/* ================= FILTER SECTION ================= */}
      <Row className="mb-5">
        {/* SEARCH */}
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search products (AI semantic search)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "#111",
              color: "white",
              border: "1px solid #d4af37",
              padding: "12px",
            }}
          />
        </Col>

        {/* CATEGORY */}
        <Col md={4} className="mb-3">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              background: "#111",
              color: "white",
              border: "1px solid #d4af37",
              padding: "12px",
            }}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* SORT */}
        <Col md={4} className="mb-3">
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              background: "#111",
              color: "white",
              border: "1px solid #d4af37",
              padding: "12px",
            }}
          >
            <option value="">Sort Products</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="latest">Latest Products</option>
          </Form.Select>
        </Col>
      </Row>

      {/* ================= PRODUCTS ================= */}
      <Row>
        {filteredItems.length === 0 ? (
          <h5 className="text-center text-light">No Products Found</h5>
        ) : (
          filteredItems.map((item) => (
            <Col key={item._id} md={6} lg={4} className="mb-4">
              <Card
                className="shadow-lg h-100"
                style={{
                  borderRadius: "18px",
                  border: "1px solid #2d2d2d",
                  background: "#1b1b1b",
                  overflow: "hidden",
                }}
              >
                {/* IMAGE SECTION */}
                <div style={{ position: "relative", backgroundColor: "#000" }}>
                  {/* AI RECOMMENDED */}
                  {item.aiRecommended && (
                    <Badge
                      bg="warning"
                      text="dark"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: "10",
                        padding: "8px",
                        fontWeight: "700",
                      }}
                    >
                      AI Recommended
                    </Badge>
                  )}

                  {/* IMAGE FIXED */}
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/uploads/${item.itemImage}`}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "contain",
                      backgroundColor: "#000",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold" style={{ color: "#d4af37" }}>
                    {item.itemName}
                  </Card.Title>

                  <Card.Text style={{ color: "#ccc" }}>
                    {item.description}
                  </Card.Text>

                  <Card.Text>
                    <Badge bg="warning" text="dark">
                      {item.category}
                    </Badge>
                  </Card.Text>

                  {/* TAGS */}
                  <div className="mb-3">
                    {item.tags?.map((tag, index) => (
                      <Badge key={index} bg="secondary" className="me-2">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Card.Text
                    className="fw-bold"
                    style={{ color: "#d4af37", fontSize: "20px" }}
                  >
                    ₹ {item.price}
                  </Card.Text>

                  <Card.Text>
                    <strong>Stock:</strong>{" "}
                    <span style={{ color: "#d4af37", fontWeight: "bold" }}>
                      {item.quantity}
                    </span>
                  </Card.Text>

                  {/* BUTTON AT BOTTOM */}
                  <Button
                    className="w-100 mt-auto"
                    style={{
                      background: "linear-gradient(45deg,#d4af37,#f5d76e)",
                      border: "none",
                      color: "black",
                      fontWeight: "700",
                    }}
                    onClick={() => {
                      addToCart(item);
                      trackActivity(item._id, "cart");
                    }}
                  >
                    Add to Cart 🛒
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ViewProducts;