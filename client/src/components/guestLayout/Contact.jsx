import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "https://lucky-collection.onrender.com/api/contact",
        formData
      );

      alert("Message Sent Successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        .contact-section{
          padding:90px 0;
          background:#111;
          color:white;
        }

        .contact-title{
          text-align:center;
          color:#d4af37;
          font-size:42px;
          font-weight:800;
          margin-bottom:20px;
        }

        .contact-subtitle{
          text-align:center;
          color:#bbb;
          margin-bottom:50px;
        }

        .contact-form{
          background:#1b1b1b;
          border:1px solid #2d2d2d;
          border-radius:20px;
          padding:40px;
        }

        .form-group{
          margin-bottom:20px;
        }

        .form-group label{
          color:#d4af37;
          font-weight:600;
          margin-bottom:10px;
          display:block;
        }

        .form-control{
          background:#111 !important;
          border:1px solid #333 !important;
          color:white !important;
          padding:12px;
          border-radius:10px;
        }

        .submit-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:12px;
          background:linear-gradient(45deg,#d4af37,#f5d76e);
          color:black;
          font-weight:700;
        }

        .contact-info{
          text-align:center;
          margin-top:50px;
        }

        .contact-info h3{
          color:#d4af37;
          margin-bottom:20px;
        }

        .contact-details{
          list-style:none;
          padding:0;
        }

        .contact-details li{
          margin-bottom:12px;
          color:#bbb;
        }
        `}
      </style>

      <section className="contact-section">
        <div className="container">

          <h2 className="contact-title">
            CONTACT US
          </h2>

          <p className="contact-subtitle">
            Get in touch for orders and enquiries
          </p>

          <div className="row">
            <div className="col-lg-8 offset-lg-2">

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="row">

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Name</label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Email</label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>

                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send Message"}
                </button>
              </form>

              <div className="contact-info">
                <h3>STORE DETAILS</h3>

                <ul className="contact-details">
                  <li>📧 lucky.collection@gmail.com</li>
                  <li>📞 +91 9665105725</li>
                  <li>📍 Koregaon, Maharashtra</li>
                  <li>🛍️ Wholesale & Retail Available</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;