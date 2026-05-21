import React from "react";

const UserHome = () => {
  const cards = [
    {
      title: "View Products",
      text: "Explore latest premium fashion collections.",
      icon: "🛍️",
    },
    {
      title: "My Cart",
      text: "Manage selected products easily.",
      icon: "🛒",
    },
    {
      title: "My Orders",
      text: "Track your orders and delivery status.",
      icon: "📦",
    },
    {
      title: "Best Offers",
      text: "Enjoy premium deals and discounts.",
      icon: "💎",
    },
  ];

  return (
    <>
      <style>
        {`
        .user-home {
          min-height: 90vh;
          background:
            linear-gradient(to bottom right,#0f0f0f,#1a1a1a);
          padding: 40px;
          color: white;
        }

        .user-title {
          font-size: 42px;
          font-weight: 800;
          color: #d4af37;
        }

        .user-subtitle {
          color: #bbb;
          font-size: 18px;
          margin-top: 10px;
        }

        .user-card {
          background: #1b1b1b;
          border: 1px solid #2d2d2d;
          border-radius: 18px;
          padding: 30px;
          transition: 0.3s ease;
          height: 100%;
        }

        .user-card:hover {
          transform: translateY(-8px);
          border-color: #d4af37;
        }

        .user-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }

        .user-card h4 {
          color: #d4af37;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .user-card p {
          color: #bbb;
          line-height: 1.7;
        }
        `}
      </style>

      <div className="user-home">

        <h2 className="user-title">
          WELCOME TO LUXE COLLECTION
        </h2>

        <p className="user-subtitle">
          Discover luxury fashion with modern
          premium collections.
        </p>

        <div className="row mt-5">

          {cards.map((card, index) => (
            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >
              <div className="user-card">

                <div className="user-icon">
                  {card.icon}
                </div>

                <h4>{card.title}</h4>

                <p>{card.text}</p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default UserHome;