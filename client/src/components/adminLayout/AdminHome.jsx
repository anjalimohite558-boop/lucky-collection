import React from "react";

const AdminHome = () => {
  const cards = [
    {
      title: "Total Products",
      number: "45",
    },
    {
      title: "Total Orders",
      number: "18",
    },
    {
      title: "Pending Orders",
      number: "6",
    },
    {
      title: "Total Customers",
      number: "120",
    },
  ];

  return (
    <>
      <style>
        {`
        .admin-home {
          min-height: 90vh;
          background:
            linear-gradient(to bottom right,#0f0f0f,#1a1a1a);
          padding: 40px;
          color: white;
        }

        .admin-title {
          font-size: 42px;
          font-weight: 800;
          color: #d4af37;
        }

        .admin-subtitle {
          color: #bbb;
          font-size: 18px;
          margin-top: 10px;
        }

        .dashboard-card {
          background: #1b1b1b;
          border: 1px solid #2d2d2d;
          border-radius: 18px;
          padding: 30px;
          text-align: center;
          transition: 0.3s ease;
          height: 100%;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          border-color: #d4af37;
        }

        .dashboard-card h4 {
          color: white;
          margin-bottom: 15px;
        }

        .dashboard-number {
          font-size: 42px;
          font-weight: 900;
          color: #d4af37;
        }
        `}
      </style>

      <div className="admin-home">

        <h2 className="admin-title">
          ADMIN DASHBOARD
        </h2>

        <p className="admin-subtitle">
          Manage products, orders, customers,
          and store activities.
        </p>

        <div className="row mt-5">

          {cards.map((card, index) => (
            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >
              <div className="dashboard-card">

                <h4>{card.title}</h4>

                <div className="dashboard-number">
                  {card.number}
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default AdminHome;