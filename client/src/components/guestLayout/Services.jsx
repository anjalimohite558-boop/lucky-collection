import React from "react";

const Services = () => {
  const services = [
    {
      icon: "👗",
      title: "Designer Sarees",
      text: "Elegant premium sarees for weddings and occasions.",
    },
    {
      icon: "🧥",
      title: "Luxury Fashion",
      text: "Premium modern outfits with trendy styles.",
    },
    {
      icon: "🛍️",
      title: "Wholesale Orders",
      text: "Bulk fashion products at affordable pricing.",
    },
    {
      icon: "💎",
      title: "Premium Collection",
      text: "Exclusive collections for luxury fashion lovers.",
    },
  ];

  return (
    <>
      <style>
        {`
        .services-section{
          padding:90px 0;
          background:#0f0f0f;
        }

        .service-title{
          color:#d4af37;
          text-align:center;
          font-size:42px;
          font-weight:800;
          margin-bottom:20px;
        }

        .service-subtitle{
          text-align:center;
          color:#bbb;
          margin-bottom:60px;
          font-size:18px;
        }

        .service-card{
          background:#1b1b1b;
          border:1px solid #2d2d2d;
          border-radius:18px;
          padding:35px;
          text-align:center;
          transition:0.3s ease;
          height:100%;
        }

        .service-card:hover{
          transform:translateY(-8px);
          border-color:#d4af37;
        }

        .service-icon{
          font-size:50px;
          margin-bottom:20px;
        }

        .service-card h3{
          color:#d4af37;
          margin-bottom:15px;
          font-weight:700;
        }

        .service-card p{
          color:#bbb;
          line-height:1.8;
        }
        `}
      </style>

      <section className="services-section">
        <div className="container">

          <h2 className="service-title">
            OUR PRODUCTS
          </h2>

          <p className="service-subtitle">
            Explore our luxury fashion collections
          </p>

          <div className="row">
            {services.map((service, index) => (
              <div
                className="col-lg-3 col-md-6 mb-4"
                key={index}
              >
                <div className="service-card">
                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;