import React from "react";

import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import NewArrivals from "./NewArrivals";
import RecommendedProducts from "../userLayout/RecommendedProducts";

// Single Hero Image
import heroImage from "../../assets/home.jpg";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#000",
        }}
      >
        <img
          src={heroImage}
          alt="Hero Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.25)",
          }}
        ></div>
      </div>

      {/* Other Sections */}
      <div style={{ marginTop: "60px" }}>
        <NewArrivals />

        {/* AI Recommendation */}
        <RecommendedProducts />

        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Home;