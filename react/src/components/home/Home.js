import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//pic
import feature1 from "../../assets/images/feature-img-1.png";
import feature2 from "../../assets/images/feature-img-2.png";
import feature3 from "../../assets/images/feature-img-3.png";

//css files
import "../../assets/css/home.css";
import axios from "axios";

//js files

const Home = React.forwardRef((p, prodsRef) => {
const [marketplaces, setMarketplaces] = useState([]);
const [products, setProducts] = useState([])


  useEffect(() => {
    axios.get(`/api/marketplaces`).then((res) => {
      if (res.data.status === 200) {
        //console.log(res.data.marketplaces)
        setMarketplaces(res.data.marketplaces);
      }
    });
  },[]);


useEffect(() => {
  axios.get(`/api/products`).then((res) => {
    if (res.data.status === 200) {
      //console.log(res.data.products)
      setProducts(res.data.products);
    }
  });
},[]);

  return (
    <div style={{ top: "900px " }}>
      <section className="home" id="home">
        <div className="content">
          <h3>
            fresh and <span>organic</span> products for you{" "}
          </h3>
          <h3>
            In different <span>Marketplaces</span>{" "}
          </h3>
        </div>
      </section>

      {/* Features section */}
      <section
        ref={(e) =>
          (prodsRef.current = prodsRef?.current.map((x) =>
            x === "ftrs" ? e : x
          ))
        }
        className="features"
        id="features"
      >
        <h1 className="heading">
          {" "}
          <span>Features</span>
        </h1>
        <div className="box-container">
          <div className="box">
            <img src={feature1} alt="Feature" />
            <h3>fresh and organic </h3>
            <p>Lorem ipsum</p>
          </div>
          <div className="box">
            <img src={feature2} alt="Feature" />
            <h3>Delivery </h3>
            <p>Lorem ipsum</p>
          </div>
          <div className="box">
            <img src={feature3} alt="Feature" />
            <h3>Negotiation in chat </h3>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </section>

      {/* Marketplaces section  */}
      <section
        ref={(e) =>
          (prodsRef.current = prodsRef?.current.map((x) =>
            x === "mrktplc" ? e : x
          ))
        } className="marketplaces" id="marketplaces">
        <h1 className="heading">
          <span>Marketplaces</span>{" "}
        </h1>
        <div className="box-container">
          {marketplaces.map((item,i) => {
            return (
              <div key={i} className="box">
                <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>   
                <div className="content">
                  <div className="icons">
                   <a><i className="fas fa-user"></i> by {item.user.name} </a> 
                  </div>
                  <a href="#" style={{textDecoration: "none"}}><h3 >{item.name}</h3> </a> 

                  <p> {item.description} </p>
                  <Link to={`/marketplace/${item.id}`}>
                     <button className="button">
                       Explore
                     </button>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Products section  */}

      <section
        ref={(e) =>
          (prodsRef.current = prodsRef?.current.map((x) =>
            x === "prdcts" ? e : x
          ))
        } className="products" id="products">
        <h1 className="heading"><span>Products</span></h1>

        <div className="box-container">
        {products.map((item,i) => {
            return (
          <div key={i} className="box">
            <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>
            <div className="content">
            <div className="icons">
              <a><i className="fas fa-user"></i> by {item.marketplace.name} </a> 
            </div>
            <h3> {item.name} </h3>
            <h5> Price: <span>{item.price} </span>  </h5>
            <p> {item.description} </p>
            <a href="#" className="button">Chat</a>
            </div>
          </div>
           );
          })}
        </div>
      </section>

      {/* footer section  */}
    </div>
  );
});
export default Home;
