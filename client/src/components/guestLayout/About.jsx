import React from "react";
import aboutImg from "../../assets/about/about.jpg";

const About = () => {
  return (
    <>
      <style>
        {`
        .about-section {
          padding: 90px 0;
          background: #111;
          color: white;
        }

        .section-title h2 {
          font-size: 42px;
          font-weight: 800;
          color: #d4af37;
          text-align: center;
          margin-bottom: 20px;
        }

        .f-para {
          font-size: 18px;
          color: #bbb;
          text-align: center;
          max-width: 850px;
          margin: auto;
          line-height: 1.8;
        }

        .about-video {
          position: relative;
          height: 450px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #2d2d2d;
        }

        .about-video::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url(${aboutImg});
          background-size: cover;
          background-position: center;
          filter: blur(10px);
          transform: scale(1.2);
        }

        .about-video::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
        }

        .about-video img {
          position: relative;
          z-index: 5;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .about-text {
          padding-left: 30px;
        }

        .about-text h3 {
          color: #d4af37;
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .about-text p {
          color: #ccc;
          line-height: 1.9;
          font-size: 17px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }

        .features-list li {
          margin-bottom: 12px;
          color: white;
          font-weight: 500;
        }

        .features-list li::before {
          content: "✦";
          color: #d4af37;
          margin-right: 10px;
        }

        .cta-button {
          display: inline-block;
          padding: 14px 30px;
          background: linear-gradient(
            45deg,
            #d4af37,
            #f5d76e
          );

          color: #000 !important;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          margin-top: 30px;
          transition: 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(212,175,55,0.3);
          color: #000 !important;
        }

        @media(max-width:768px){
          .about-text{
            padding-left:0;
            margin-top:30px;
          }

          .about-video{
            height:300px;
          }
        }
        `}
      </style>

      <section className="about-section">
        <div className="container">
          <div className="section-title">

            <h2>ABOUT LUCKY COLLECTION</h2>

            <p className="f-para">
              Lucky Collection offers premium fashion
              products with modern style, elegant designs,
              and luxury quality for every occasion.
            </p>

          </div>

          <div className="row align-items-center mt-5">

            <div className="col-lg-6">
              <div className="about-video">
                <img src={aboutImg} alt="about" />
              </div>
            </div>

            <div className="col-lg-6">

              <div className="about-text">

                <h3>Luxury Fashion Experience</h3>

                <p>
                  We believe fashion represents confidence
                  and personality. Our premium collections
                  are designed with elegance, comfort, and
                  modern trends to give customers a luxury
                  shopping experience.
                </p>

                <ul className="features-list">
                  <li>Premium Fashion Collection</li>
                  <li>Luxury Quality Fabrics</li>
                  <li>Affordable Premium Designs</li>
                  <li>Modern Trendy Styles</li>
                </ul>

                <a
                  href="/contact"
                  className="cta-button"
                >
                  Contact Us
                </a>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;