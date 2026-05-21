import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Container,
  Card,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const ItemManagement = () => {
  const [items, setItems] = useState([]);

  const [itemData, setItemData] = useState({
    itemName: "",
    quantity: "",
    price: "",
    itemImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  // ================= FETCH PRODUCTS =================
  const fetchItems = async () => {
    try {
      const res = await axios.get("https://lucky-collection.onrender.com/api/items");

      setItems(res.data.items || []);
    } catch (error) {
      alert("Failed to fetch products ❌");
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "itemImage") {
      setItemData({
        ...itemData,
        itemImage: files[0],
      });

      if (files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
    } else {
      setItemData({
        ...itemData,
        [name]: value,
      });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again ❌");
        return;
      }

      const formData = new FormData();

      formData.append("itemName", itemData.itemName);
      formData.append("quantity", itemData.quantity);
      formData.append("price", itemData.price);

      if (itemData.itemImage) {
        formData.append("itemImage", itemData.itemImage);
      }

      let res;

      if (isEditMode) {
        res = await axios.put(
          `https://lucky-collection.onrender.com/api/items/${itemId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        res = await axios.post(
          "https://lucky-collection.onrender.com/api/items/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert(res.data.message);

      setItemData({
        itemName: "",
        quantity: "",
        price: "",
        itemImage: null,
      });

      setPreviewImage(null);
      setIsEditMode(false);
      setItemId(null);

      fetchItems();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong ❌"
      );
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setItemData({
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
      itemImage: null,
    });

    setPreviewImage(
      `https://lucky-collection.onrender.com/uploads/${item.itemImage}`
    );

    setItemId(item._id);

    setIsEditMode(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://lucky-collection.onrender.com/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchItems();
    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  // ================= FILTER =================
  const filteredItems = items.filter((item) => {
    const matchName = item.itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      filterCategory === "" ||
      item.category === filterCategory;

    return matchName && matchCategory;
  });

  const categories = [
    ...new Set(items.map((item) => item.category)),
  ];

  return (
    <>
      <style>
        {`
        body{
          background:#050505;
        }

        .lux-input{
          background:#0f0f0f !important;
          border:1px solid #3a2f12 !important;
          color:white !important;
          padding:12px;
        }

        .lux-input:focus{
          background:#111 !important;
          color:white !important;
          border:1px solid #d4af37 !important;
          box-shadow:0 0 10px rgba(212,175,55,0.4) !important;
        }

        .lux-input::placeholder{
          color:#888;
        }

        .lux-table{
          background:#111;
          color:white;
        }

        .lux-table thead{
          background:linear-gradient(135deg,#d4af37,#f5d76e);
          color:black;
        }

        .lux-table tbody tr{
          background:#141414;
          color:white;
        }

        .lux-table tbody tr:hover{
          background:#1c1c1c;
        }

        .gold-tag{
          background:linear-gradient(135deg,#d4af37,#f5d76e);
          color:black;
          padding:4px 10px;
          border-radius:8px;
          margin-right:5px;
          font-size:12px;
          display:inline-block;
          margin-bottom:5px;
          font-weight:700;
        }

        .gold-btn{
          background:linear-gradient(135deg,#d4af37,#f5d76e) !important;
          border:none !important;
          color:black !important;
          font-weight:800 !important;
        }

        .gold-btn:hover{
          transform:translateY(-2px);
          opacity:0.95;
        }
        `}
      </style>

      <Container className="mt-4 mb-5">

        {/* ================= ADD PRODUCT ================= */}
        <Card
          className="shadow-lg p-4"
          style={{
            borderRadius: "20px",
            background: "#111",
            border: "1px solid #2c2c2c",
            color: "white",
          }}
        >
          <h2
            style={{
              color: "#d4af37",
              fontWeight: "900",
            }}
          >
            {isEditMode
              ? "Update Product"
              : "AI Product Upload"}
          </h2>

          <Form onSubmit={handleSubmit} className="mt-3">
            <Row>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label
                    style={{ fontWeight: "700" }}
                  >
                    Product Name
                  </Form.Label>

                  <Form.Control
                    className="lux-input"
                    type="text"
                    name="itemName"
                    value={itemData.itemName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group>
                  <Form.Label
                    style={{ fontWeight: "700" }}
                  >
                    Quantity
                  </Form.Label>

                  <Form.Control
                    className="lux-input"
                    type="number"
                    name="quantity"
                    value={itemData.quantity}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={4}>
                <Form.Group>
                  <Form.Label
                    style={{ fontWeight: "700" }}
                  >
                    Price (₹)
                  </Form.Label>

                  <Form.Control
                    className="lux-input"
                    type="number"
                    name="price"
                    value={itemData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* IMAGE */}
            <Row className="mt-3">
              <Col sm={12}>
                <Form.Group>
                  <Form.Label
                    style={{ fontWeight: "700" }}
                  >
                    Product Image
                  </Form.Label>

                  <Form.Control
                    className="lux-input"
                    type="file"
                    name="itemImage"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* AI MESSAGE */}
            <div className="mt-4">
              <p
                style={{
                  color: "#d4af37",
                  fontWeight: "700",
                  fontSize: "17px",
                }}
              >
                🤖 AI will automatically generate:
              </p>

              <ul style={{ color: "#ccc" }}>
                <li>Category</li>
                <li>Description</li>
                <li>Tags</li>
              </ul>
            </div>

            {/* IMAGE PREVIEW */}
            {previewImage && (
              <div className="mt-3 text-center">
                <img
                  src={previewImage}
                  alt="preview"
                  style={{
                    width: "170px",
                    height: "170px",
                    objectFit: "cover",
                    borderRadius: "15px",
                    border: "3px solid #d4af37",
                  }}
                />
              </div>
            )}

            <Button
              className="mt-4 gold-btn"
              type="submit"
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
              }}
            >
              {isEditMode
                ? "Update Product"
                : "Add AI Product"}
            </Button>
          </Form>
        </Card>

        {/* ================= PRODUCT LIST ================= */}
        <Card
          className="shadow-lg p-4 mt-5"
          style={{
            borderRadius: "20px",
            background: "#111",
            border: "1px solid #2c2c2c",
            color: "white",
          }}
        >
          <h3
            style={{
              color: "#d4af37",
              fontWeight: "900",
            }}
          >
            Product List
          </h3>

          {/* SEARCH + FILTER */}
          <Row className="mt-3 mb-4">
            <Col md={5}>
              <Form.Control
                className="lux-input"
                type="text"
                placeholder="Search Product Name..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </Col>

            <Col md={4}>
              <Form.Select
                className="lux-input"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(e.target.value)
                }
              >
                <option value="">
                  -- Filter by Category --
                </option>

                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Button
                className="gold-btn w-100"
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("");
                }}
              >
                Reset Filter
              </Button>
            </Col>
          </Row>

          {/* TABLE */}
          <Table
            bordered
            hover
            responsive
            className="lux-table align-middle text-center"
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Tags</th>
                <th>AI</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="9">
                    No Products Found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>

                    <td>{item.quantity}</td>

                    <td
                      style={{
                        color: "#d4af37",
                        fontWeight: "700",
                      }}
                    >
                      ₹ {item.price}
                    </td>

                    <td>{item.category}</td>

                    <td style={{ maxWidth: "250px" }}>
                      {item.description}
                    </td>

                    <td>
                      {item.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="gold-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>

                    <td>
                      {item.aiRecommended ? "✅" : "❌"}
                    </td>

                    <td>
                      <img
                        src={`https://lucky-collection.onrender.com/uploads/${item.itemImage}`}
                        alt="product"
                        width="85"
                        height="85"
                        style={{
                          objectFit: "cover",
                          borderRadius: "12px",
                          border:
                            "2px solid #d4af37",
                        }}
                      />
                    </td>

                    <td>
                      <Button
                        className="gold-btn me-2"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        <MdEdit />
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDelete(item._id)
                        }
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default ItemManagement;