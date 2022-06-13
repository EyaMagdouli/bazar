import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import "../../assets/css/home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = React.forwardRef((p, prodsRef) => {
  const [profile, setProfile] = useState([]);

  const [count, setCount] = useState();

  const [conversation_id, setConversation_id] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    axios
      .get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 401) {
          console.log(res.data.message);
        } else if (res.data.status === 200) {
          const {
            profile: [p],
          } = res.data;
          setProfile(p);
        }
      });
    axios
      .get(`api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setConversation_id(res.data.conversation_id);
        }
        else if(res.data.status === 401) {
          console.log(res.data.message);
        }
      });
  }, []);

  const [searchDataProduct, setSearchDataProduct] = useState([])
  const [searchDataMarketplace, setSearchDataMarketplace] = useState([])

  async function search(key){
    axios.get(`/api/searchProduct/${key}`)
    .then((res) => {
      setSearchDataProduct(res.data.product)
      // setSearchDataProduct('')
    })

    axios.get(`api/searchMarketplace/${key}`)
    .then((res) => {
      setSearchDataMarketplace(res.data.marketplaces)
      // setSearchDataMarketplace('')
    })
    
  }

  const navigate = useNavigate();

  const [isActiveSearch, setActiveSearch] = useState(false);
  const handleToggleSearch = () => {
    setActiveSearch(!isActiveSearch);
  };
  const [isActiveProfile, setActiveProfile] = useState(false);
  const handleToggleProfile = () => {
    setActiveProfile(!isActiveProfile);
  };

  const [isActiveCart, setActiveCart] = useState(false);
  const handleToggleCart = () => {
    setActiveCart(!isActiveCart);
  };

  const logoutSubmit = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteCartItem = (e, cart_id) => {
    // e.preventDefault();

    const token = localStorage.getItem("auth_token");

    axios
      .delete(`/api/deleteCartItem/${cart_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          // location.reload();
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      });
  };

  // var searchForm = document.querySelector('.search-form')
  // document.querySelector('#search-btn').onClick = () => {
  //   searchForm.classList.toggle('active');
  // }

  if (!localStorage.getItem("auth_token")) {
    localStorage.clear();
  }

  const AuthButtons = !localStorage.getItem("auth_token") ? (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          className="nav-link"
          to={"/login"}
          style={{ color: "green", fontSize: "20px" }}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to={"/ChooseKind"}
          style={{ color: "green", fontSize: "20px" }}
        >
          Register
        </Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li
        className="nav-item"
        style={{ display: "flex", flexDirection: "row-reverse" }}
      >
        <button
          type="button"
          onClick={logoutSubmit}
          className="nav-link btn btn-danger btn-sm text-white"
          style={{ marginLeft: "16px", width: "80px", fontSize: "13px" }}
        >
          Logout
        </button>
        {
          (localStorage.getItem("kind") !== 'simpleUser') ? (
        <div className="dashboard">
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <div> Dashboard</div>
          </Link>
        </div>
          ) : (
            <></>
          )
        }
        
        <div className="icons" style={{ margin_left: "50%" }}>
          <div
            className="fa fa-search "
            id="search-btn"
            onClick={handleToggleSearch}
            style={{ marginRight: "10px" }}
          ></div>
          <Link to={"/chat/"}>
            <div
              className="fa fa-comments"
              id="cart-btn"
              style={{ marginRight: 10 }}
            ></div>
          </Link>
          {
            (localStorage.getItem("kind") !== 'planter') ? (
              <div
              className="fas fa-shopping-cart"
              id="cart-btn"
              style={{ marginRight: 10 }}
              onClick={handleToggleCart}
            ></div>
            ) : (
              <></>
            )
          }
       
          <div
            className="fas fa-user"
            id="login-btn"
            onClick={handleToggleProfile}
          ></div>
        </div>
        <div className={`profile${isActiveProfile ? " active" : ""}`}>
          <h3>Profile</h3>
          <h4 className="box">
            <strong>Name:</strong> <span> {profile.name} </span>{" "}
          </h4>
          <h4 className="box">
          <strong>email:</strong> <span> {profile.email} </span>{" "}
          </h4>
          <h4 className="box">
          <strong>Phone Number:</strong> <span>{profile.phone_number} </span>{" "}
          </h4>
          <h4 className="box">
          <strong>Kind:</strong> <span>{profile.kind} </span>
          </h4>

          <Link to="/profile/edit">
            <button
              className="btn btn-outline-success px-4"
              style={{ fontSize: "15px", height: "30px" }}
              onClick={handleToggleProfile}
            >
              Edit Profile
            </button>
          </Link>
        </div>

        <div className={`shopping-cart${isActiveCart ? " active" : ""}`}>
          {cart.length > 0 ? (
            cart.map((citem, j) => {
              return cart.length > 0 ? (
                <div key={j}>
                  <h3 style={{ marginTop: 10 }}>
                    {citem[0].product.marketplace.name}
                  </h3>
                  {citem.map((item, i) => {
                    return (
                      <div key={i} className="box">
                        <i
                          className="fas fa-trash"
                          onClick={(e) => deleteCartItem(e, item.id)}
                        ></i>
                        <img
                          src={`http://127.0.0.1:8000/uploads/product/${item.product.image}`}
                          alt={item.product.name}
                        />

                        <div className="content">
                          <span> {item.product.name} </span>
                          <br></br>
                          <span className="quantity">
                            {item.product.qty} {item.product.qtyUnity}{" "}
                            <strong> /</strong> {item.product.price}{" "}
                            {item.product.priceUnity}
                          </span>
                          <span className="price"></span>
                        </div>
                      </div>
                    );
                  })}
                  {/* {console.log(conversation_id)} */}
                  <Link
                    to={`/chat/` + conversation_id[j]}
                    className="chat-button"
                  >
                    Go to Chat
                  </Link>
                </div>
              ) : (
                <></>
              );
            })
          ) : (
            <div className="box">
              <h4>Your shopping cart is empty</h4>
            </div>
          )}

          {/* <div className="total">total :</div> */}
        </div>

        {isActiveSearch ? (
          <form action="" className="search-form">
            <input type="search" onChange={(e)=>search(e.target.value) } id="search-box" placeholder="Search here..." />
            <label htmlFor="search-box" className="fas fa-search"></label>
                <div className="wrap_searchng">
                  {searchDataProduct.map((item, i) => {
                    return (
                      <div key={i} className="searching">
                        <img className="img-searching"
                          src={`http://127.0.0.1:8000/uploads/product/${item.image}`}
                          alt={item.name}
                        />

                        <div className="content-searching">
                          <span> {item.name} </span>
                          <br></br>
                          
                        </div>
                        <Link style={{right: -180}} to={`/product/${item.id}`} className="button">
                            Details
                          </Link>
                      </div>
                    );
                  })
                  }
                  {
                  searchDataMarketplace.map((item,i) => {
                    return (
                      <div key={i} className="searching">
                      <img className="img-searching"
                        src={`http://127.0.0.1:8000/uploads/marketplace/${item.image}`}
                        alt={item.name}
                      />

                      <div className="content-searching">
                        <span> {item.name} </span>
                        <br></br>
                                            
                      </div>
                      <Link style={{right: -180}} to={`/marketplace/${item.id}`} className="button">
                          Explore
                        </Link>
                    </div>
                    )
                  })

                  }

                </div>
          </form>
        ) : (
          <></>
        )}
      </li>
    </ul>
  );
  const showOnlyInMain = (
    <nav className="navbar navbar-nav ms-auto" style={{ left: "80px" }}>
      <ul>
        <li onClick={() => prodsRef?.current[2].scrollIntoView()}>Features</li>
        <li onClick={() => prodsRef?.current[1].scrollIntoView()}>
          Marketplaces
        </li>
        <li onClick={() => prodsRef?.current[0].scrollIntoView()}>Products</li>
      </ul>
    </nav>
  );

  return (
    <div id="bazarHome">
      <div
        className="header navbar navbar-expand-md "
        style={{ height: 60, zIndex: 1000 }}
      >
        <div className="container">
          <Link className="logo" to="/">
            <i className="fas fa-shopping-basket"></i> Bazar
          </Link>
          <Routes>
            <Route path="/" element={showOnlyInMain} />
          </Routes>
          <ul className="navbar navbar-nav ms-auto" style={{ left: "70px" }}>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </div>
  );
});
export default Header;
