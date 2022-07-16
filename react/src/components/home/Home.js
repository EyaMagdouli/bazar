import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import Slider from "react-slick"
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//pic
import feature1 from "../../assets/images/feature-img-1.png";
import feature2 from "../../assets/images/feature-img-2.png";
import feature3 from "../../assets/images/feature-img-3.png";
import "../../assets/css/home.css";
import axios from "axios";

const Home = React.forwardRef((p, prodsRef) => {

  var settingsMarketplace = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3
  };
  var settingsProduct = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 6
};

  const [marketplaces, setMarketplaces] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);

  const productsCount = productsByCategory  .length;

  const getAllProducts = async ()=>{
    axios.get(`/api/products`).then((res) => {
      if (res.data.status === 200) {
        //console.log(res.data.products)
        setProducts(res.data.products);
      }
    });

  }

  const getProductsByCat = async cat =>{
    axios.get(`/api/productbycategory/${cat}`).then((res) => {
      const {status, productbycategory} = res.data
      if(status === 200) {
        setProductsByCategory(productbycategory.map(z=>({
          ...z,
          associatedCategory: cat
        })));
      }
      else if (status === 404) {

      }
    });
  }

  const { category_id } = useParams();

  useEffect(() => {
    axios.get(`/api/marketplaces`).then((res) => {
      if (res.data.status === 200) {
        //console.log(res.data.marketplaces)
        setMarketplaces(res.data.marketplaces);
      }
    });
    
    axios.get(`/api/categories`).then((res) => {
      if (res.data.status === 200) {
        setCategories(res.data.category);
      }
    });

    (async()=>await getAllProducts())()

  }, []);

  const [byCategory, setByCategory] = useState(false);
  const [fetchedCats,setfetchedCats] = useState([])
  const handleByCategory = async (id) => {
    setByCategory(id !== "all");
    if(id!== "all" && !fetchedCats.includes(id)){
      await getProductsByCat(id)
      setfetchedCats(prev=>[...prev,id])
    }
    // else getAllProd
  };
  const ref = useRef()
  return (
    <div style={{ top: "900px " }}>
      <section className="home" id="home">
       
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
            <p>We offer a wide range of conventional, organic, exotic fresh Fruits &amp;  Vegetables through direct farm sourcing and distribution.</p>
          </div>
          <div className="box">
            <img src={feature2} alt="Feature" />
            <h3>Delivery </h3>
            <p>You shop, We drop!

              we deliver your purchases anywhere you want by picking the delivery company depending on your localisation 
            </p>
          </div>
          <div className="box">
            <img src={feature3} alt="Feature" />
            <h3>Negotiation in chat </h3>
            <p>In this plateforme you have the ability to discuss the trade to reach an agreement that both parties find acceptable </p>
          </div>
        </div>
      </section>

      {/* Marketplaces section  */}
      <section
        ref={(e) =>
          (prodsRef.current = prodsRef?.current.map((x) =>
            x === "mrktplc" ? e : x
          ))
        }
        className="marketplaces"
        id="marketplaces"
      >
        <h1 className="heading">
          <span>Marketplaces</span>{" "}
        </h1>
        <Slider {...settingsMarketplace} className="box-container">
          {marketplaces.map((item, i) => {
            return (
              <div key={i} className="box">
                <img
                  src={`http://127.0.0.1:8000/uploads/marketplace/${item.image}`}
                  alt={item.name}
                />
                <div className="content">
                  <div className="icons">
                    <a>
                      <i className="fas fa-user"></i> by {item.user.name}{" "}
                    </a>
                  </div>
                  <a href="#" style={{ textDecoration: "none" }}>
                    <h3>{item.name}</h3>{" "}
                  </a>

                  <p> {item.description} </p>
                  <Link to={`/marketplace/${item.id}`}>
                    <button className="button">Explore</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </section>

      {/* Products section  */}

      <section
        ref={(e) =>
          (prodsRef.current = prodsRef?.current.map((x) =>
            x === "prdcts" ? e : x
          ))
        }
        className="products"
        id="products"
      >
        <h1 className="heading">
          <span>Products </span>
          <select
            className="select"
            ref={ref}
            onChange={(e) => handleByCategory(e.target.value)}
          >
            <option value="all" className="select-content">
              All categories
            </option>
            {categories.map((item) => (
              <option value={item.id} key={item.id} className="select-content">
                {" "}
                {item.name}{" "}
              </option>
            ))}
            {}
          </select>
        </h1>
        <div /* {...settingsProduct}  */ className="box-container">
          {[...(byCategory ? productsByCategory : products)]
          .filter(e=> !byCategory ? true : e.associatedCategory == ref?.current?.value)
          .map((item, i) => {
            return(
              <div key={i} className="box">
              <img
                src={`http://127.0.0.1:8000/uploads/product/${item.image}`}
                alt={item.name}
              />
              <div className="content">
                <div className="icons">
                  <a>by {item.marketplace.name} </a>
                </div>
                <h3> {item.name} </h3>
                {/* <h5>
                  {" "}
                  Price: <span>{item.price} </span>{" "}
                </h5> */}
                {/* <p> {item.description} </p> */}
                <Link to={`/product/${item.id}`} className="button">
                  Details
                </Link>
              </div>
            </div>
            )
         
       
          })}
              {/* {console.log(productsCount)} */}

        </div>
      </section>
    </div>
  );
});
export default Home;
