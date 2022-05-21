import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import "../../assets/css/home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = React.forwardRef((p, prodsRef) => {
  const [profile, setProfile] = useState([]);

  const [count, setCount] = useState()

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
  }, []);

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

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    axios
      .get(`api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setCart(res.data.cart);
        }
      });
  }, []);


  const deleteCartItem = (e, cart_id) => {
    e.preventDefault()

    const token = localStorage.getItem("auth_token");
    
    axios.delete(`/api/deleteCartItem/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if(res.data.status === 200){
        swal("Success", res.data.message, "success")
        location.reload();

        }
      else if(res.data.status === 404) {
        swal("Error", res.data.message, "error")


      }
    })
  }
  

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
        <div className="dashboard">
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <div> Dashboard</div>
          </Link>
        </div>
        <div className="icons" style={{ margin_left: "50%" }}>
          <div
            className="fa fa-search "
            id="search-btn"
            onClick={handleToggleSearch}
            style={{ marginRight: "10px" }}
          ></div>
          <Link to={"/chat/"} >
          <div
            className="fa fa-comments"
            id="cart-btn"
            style={{ marginRight: 10 }}
          >
          </div>
          </Link>

            
            <div
            className="fas fa-shopping-cart"
            id="cart-btn"
            style={{ marginRight: 10 }}
            onClick={handleToggleCart}
          ></div>

          <div
            className="fas fa-user"
            id="login-btn"
            onClick={handleToggleProfile}
          ></div>
        </div>
        <div className={`profile${isActiveProfile ? " active" : ""}`}>
          <h3>Profile</h3>
          <h4 className="box">
            Name: <span> {profile.name} </span>{" "}
          </h4>
          <h4 className="box">
            email: <span> {profile.email} </span>{" "}
          </h4>
          <h4 className="box">
            Phone Number: <span>{profile.phone_number} </span>{" "}
          </h4>
          <h4 className="box">
            Kind: <span>{profile.kind} </span>
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
          {(cart.length > 0) ? (
            cart.map((citem, j) => {
              return (

                (cart.length > 0) ? (
                
                  <div key={j}>
                    <h3 style={{marginTop:10}}>{citem[0].product.marketplace.name}</h3>
                    {
                      citem.map((item, i) => {
                        return (
                          <div key={i} className="box"  >
                            <i className="fas fa-trash" onClick={ (e)=> deleteCartItem(e, item.id) } ></i>
                            <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} />
            
                            <div className="content">
                              <span> {item.product.name} </span>
                              <br></br>
                              <span className="price">{item.product.price}</span>
                              <span className="quantity">{item.product.qty}</span>
                            </div>
                          </div>
                        )

                      })

                    }

                      <Link to={`/chat/`+citem[0].product.marketplace.id} className="chat-button">
                        Go to Chat 
                      </Link>
                  </div>
                ):(<></>)

              )
            })
          ):(
            <div className="box">
              <h4>Your shopping cart is empty</h4>
            </div>
          )}
          

          {/* <div className="total">total :</div> */}
          
        </div>

        {isActiveSearch ? (
          <form action="" className="search-form">
            <input type="search" id="search-box" placeholder="Search here..." />
            <label htmlFor="search-box" className="fas fa-search"></label>
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
