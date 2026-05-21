import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
      }}
    >
      <AdminNavbar />

      <main
        style={{
          padding: "25px",
        }}
      >
        <Outlet />
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminLayout;