// src/App.js

import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SemanticSearchPage from "./components/userLayout/SemanticSearchPage";

/* USER */
import Cart from "./components/userLayout/Cart";
import MyOrders from "./components/userLayout/MyOrders";

/* GUEST */
import GuestLayout from "./components/guestLayout/GuestLayout";
import Register from "./components/Register";
import Login from "./components/guestLayout/Login";
import Home from "./components/guestLayout/Home";
import About from "./components/guestLayout/About";
import Services from "./components/guestLayout/Services";
import Contact from "./components/guestLayout/Contact";

/* ADMIN */
import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminHome from "./components/adminLayout/AdminHome";
import ChangePassword from "./components/adminLayout/ChangePassword";
import Items from "./components/adminLayout/ItemManagement";
import OrderManagement from "./components/adminLayout/OrderManagement";

/* USER LAYOUT */
import UserLayout from "./components/userLayout/UserLayout";
import UserHome from "./components/userLayout/UserHome";
import ViewProducts from "./components/userLayout/ViewProducts";

/* PROTECTED */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* ================= GUEST ROUTES ================= */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="item" element={<Items />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="cart" element={<Cart />} />
          <Route path="myorders" element={<MyOrders />} />

          {/* ✅ FIXED (NO / before search) */}
          <Route path="search" element={<SemanticSearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;