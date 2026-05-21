import React from "react";

const GuestFooter = () => {
  return (
    <>
      <style>
        {`
          .guest-footer {
            background: #111;
            border-top: 1px solid #2d2d2d;
            color: #aaa;
            text-align: center;
            padding: 18px 0;
            margin-top: 40px;
          }

          .guest-footer span {
            color: #d4af37;
            font-weight: 700;
          }
        `}
      </style>

      <footer className="guest-footer">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()}{" "}
          <span>LUCKY COLLECTION</span>
        </p>
      </footer>
    </>
  );
};

export default GuestFooter;