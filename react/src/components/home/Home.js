import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

//pic
import feature1 from "../../assets/images/feature-img-1.png";
import feature2 from "../../assets/images/feature-img-2.png";
import feature3 from "../../assets/images/feature-img-3.png";
import "../../assets/css/home.css";
import axios from "axios";

const Home = React.forwardRef((p, prodsRef) => {
  const [marketplaces, setMarketplaces] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);

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
        }
        className="marketplaces"
        id="marketplaces"
      >
        <h1 className="heading">
          <span>Marketplaces</span>{" "}
        </h1>
        <div className="box-container">
          {marketplaces.map((item, i) => {
            return (
              <div key={i} className="box">
                <img
                  src={`http://127.0.0.1:8000/${item.image}`}
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
        </div>
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

        <div className="box-container">
          {[...(byCategory ? productsByCategory : products)]
          .filter(e=> !byCategory ? true : e.associatedCategory == ref?.current?.value)
          .map((item, i) => {
            return (
              <div key={i} className="box">
                <img
                  src={`http://127.0.0.1:8000/${item.image}`}
                  alt={item.name}
                />
                <div className="content">
                  <div className="icons">
                    <a>by {item.marketplace.name} </a>
                  </div>
                  <h3> {item.name} </h3>
                  <h5>
                    {" "}
                    Price: <span>{item.price} </span>{" "}
                  </h5>
                  <p> {item.description} </p>
                  <a href="#" className="button">
                    Chat
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
});
export default Home;