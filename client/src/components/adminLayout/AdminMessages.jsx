import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Reply form state
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://lucky-collection.onrender.com/api/contact");
      setMessages(res.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
      alert("Failed to load messages!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Message
  const deleteMessage = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this message?"
      );

      if (!confirmDelete) return;

      await axios.delete(`https://lucky-collection.onrender.com/api/contact/${id}`);
      alert("Message Deleted Successfully!");
      fetchMessages();
    } catch (error) {
      console.log("Error deleting message:", error);
      alert("Failed to delete message!");
    }
  };

  // View Full Message Modal
  const viewMessage = (msg) => {
    setSelectedMessage(msg);
    setReplyText(""); // clear old reply
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  // Send Reply to Backend API
  const sendReply = async () => {
    if (!replyText.trim()) {
      alert("Please write a reply message!");
      return;
    }

    try {
      setSendingReply(true);

      const replyData = {
        to: selectedMessage.email,
        subject: "Re: " + selectedMessage.subject,
        message: replyText,
      };

      const res = await axios.post(
        "https://lucky-collection.onrender.com/api/contact/reply",
        replyData
      );

      alert(res.data.message || "Reply Sent Successfully!");
      setReplyText("");
    } catch (error) {
      console.log("Reply Error:", error);
      alert("Failed to send reply. Check backend Nodemailer setup!");
    } finally {
      setSendingReply(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#cc0066" }}>
        📩 Customer Contact Messages
      </h2>

      {loading ? (
        <h4 className="text-center text-secondary">Loading messages...</h4>
      ) : messages.length === 0 ? (
        <h4 className="text-center text-danger">No messages found!</h4>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id}>
                  <td>{index + 1}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>

                  <td style={{ maxWidth: "250px" }}>
                    {msg.message.length > 40
                      ? msg.message.substring(0, 40) + "..."
                      : msg.message}
                  </td>

                  <td>{new Date(msg.createdAt).toLocaleString()}</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => viewMessage(msg)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Modal Popup */}
      {showModal && selectedMessage && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">📩 Message Details</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedMessage.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedMessage.email}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>

                <hr />

                <p style={{ whiteSpace: "pre-wrap" }}>
                  <strong>Customer Message:</strong> <br />
                  {selectedMessage.message}
                </p>

                <hr />

                {/* ✅ Reply Form */}
                <h5 className="text-success fw-bold">✉️ Reply to Customer</h5>

                <textarea
                  className="form-control mt-2"
                  rows="5"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={sendReply}
                  disabled={sendingReply}
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </button>

                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;