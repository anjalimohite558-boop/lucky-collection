import React from "react";

const AdminFooter = () => {
  return (
    <>
      <style>
        {`
          .admin-footer {
            background: #111;
            border-top: 1px solid #2d2d2d;
            color: #aaa;
            text-align: center;
            padding: 18px 0;
            margin-top: 40px;
          }

          .admin-footer span {
            color: #d4af37;
            font-weight: 700;
          }
        `}
      </style>

      <footer className="admin-footer">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()}{" "}
          <span>Lucky Collection</span>
          {" "}Admin Panel
        </p>
      </footer>
    </>
  );
};

export default AdminFooter;