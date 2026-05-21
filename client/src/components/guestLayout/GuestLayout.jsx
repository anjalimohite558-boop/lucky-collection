// ========================== src/components/guestLayout/GuestLayout.jsx ==========================

import React from "react";
import { Outlet } from "react-router-dom";

import GuestNavbar from "./GuestNavbar";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => {
  return (
    <div style={styles.layout}>
      <GuestNavbar />

      <main style={styles.content}>
        <Outlet />
      </main>

      <GuestFooter />
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    color: "white",
  },

  content: {
    flex: 1,
    background:
      "linear-gradient(to bottom right, #0f0f0f, #1a1a1a)",
  },
};

export default GuestLayout;