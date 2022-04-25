import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/marketplace.css";

const Marketplace = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)


  const [marketplace, setMarketplace] = useState([]);

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("auth_token");
    axios
      .get(`/api/viewMarket`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.marketplace);
          setMarketplace(res.data.marketplace);
          setLoading(false)
        }
      });
  }, []);

  return (
    <div className="container mt-5">
       { (loading) ? <h2 style={{ marginLeft: "80px", marginTop: "40px" }}>Loading..</h2>:

      
      <div className="row d-flex justify-content-center">
        <div className="col-md-7" >
          {marketplace.map((item, i) => {
            return (
              <div key={i} className="card p-3 py-4">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <div className="about-text go-to">
                      <h3 className="dark-color"> {item.name} </h3>
                      <h6 className="theme-color lead">{item.slug}</h6>
                      <p>
                        <mark> By {item.user.name} </mark>
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-avatar">
                      <img
                        src={`http://127.0.0.1:8000/${item.image}`}
                        alt={item.name}
                      />
                    </div>
                  </div>
                  <div className="buttons">
                    <Link to="/dashboard/marketplace/edit">
                    <button
                      className="btn btn-outline-success px-4"
                      style={{
                        fontSize: "20px",
                        height: "40px",
                        marginLeft: "300px",
                        width:"300px"
                      }}
                    >
                      Edit Marketplace
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      }
    </div>
  );
};

export default Marketplace;
