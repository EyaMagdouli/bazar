import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams } from "react-router";
import "../../assets/css/home.css";


const Marketplace = () => {
  const [loading, setLoading] = useState(false);

  const [marketplace, setMarketplace] = useState([]);

  const [products, setProducts] = useState([]);

  const { marketplace_id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`api/marketplace/${marketplace_id}`).then((res) => {
      if (res.data.status === 200) {
        setMarketplace(res.data.marketplace);
        console.log(res.data.marketplace)
        setProducts(res.data.products);
        setLoading(false);
      }
    });
  }, [marketplace_id]);

  return (
    <section className="section about-section gray-bg" id="about">
      {loading ? (
        <h2 style={{ marginLeft: "80px", marginTop: "-20px" }}>Loading..</h2>
      ) : (
        marketplace.map((item, i) => {
          return (
            <div key={i} className="row align-items-center flex-row-reverse">
              <div className="col-lg-6">
                <div
                  className="about-text go-to"
                  style={{ marginLeft: "150px" }}
                >
                  <h3 className="dark-color"> {item.name} </h3>
                  <h6 className="theme-color lead"> {item.slug} </h6>
                  <p>
                    <mark> By {item.user.name} </mark>
                  </p>
                  <p>{item.description}</p>
                  <div className="row about-list">
                    <div className="col-md-6">
                      <div className="col-md-6">
                        <div className="media">
                          <label>E-mail</label>
                          <p> {item.user.email} </p>
                        </div>
                        <div className="media">
                          <label>Phone</label>
                          <p> {item.user.phone_number} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="about-avatar"
                  style={{ marginLeft: "200px", marginTop: "-40px" }}
                >
                  <img
                    src={`http://127.0.0.1:8000/${item.image}`}
                    alt={item.name}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className="counter" >
          <div className="box-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20}}>
              
        {products.map((item, i) => {
          return (
              <div key={i} className="row box" >
                  <div className="col-6 col-lg-3" >
            <ul>
               <li>       
            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>
            <div className="content">
            <div className="icons">
              <a><i className="fas fa-user"></i> by {item.marketplace.name} </a> 
            </div>
            <h3> {item.name} </h3>
            <h5> Price: <span>{item.price} </span>  </h5>
            <p> {item.description} </p>
            <br>
            </br>
            <a href="#" className="button">Chat</a>
            </div>
            </li>
            </ul>
          </div>
          </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default Marketplace;
