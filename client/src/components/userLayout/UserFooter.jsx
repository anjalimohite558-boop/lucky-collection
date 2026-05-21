import React from "react";

const UserFooter = () => {
  return (
    <>
      <style>
        {`
          .user-footer {
            background: #111;
            border-top: 1px solid #2d2d2d;
            color: #aaa;
            text-align: center;
            padding: 18px 0;
            margin-top: 40px;
          }

          .user-footer span {
            color: #d4af37;
            font-weight: 700;
          }
        `}
      </style>

      <footer className="user-footer">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()}{" "}
          <span>Lucky Collection</span>
        </p>
      </footer>
    </>
  );
};

export default UserFooter;