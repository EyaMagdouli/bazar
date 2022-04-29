import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import "../../assets/css/home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = React.forwardRef((p, prodsRef) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    axios
      .get(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          const {profile: [p]} = (res.data)
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

  const logoutSubmit = () => {
    localStorage.clear();
    navigate("/");
  };

  // var searchForm = document.querySelector('.search-form')
  // document.querySelector('#search-btn').onClick = () => {
  //   searchForm.classList.toggle('active');
  // }

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
            style={{ marginRight: "20px" }}
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
    <nav className="navbar navbar-nav ms-auto" style={{left:"80px"}}>
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
          <ul className="navbar navbar-nav ms-auto" style={{left:"70px"}} >{AuthButtons}</ul>
        </div>
      </div>
    </div>
  );
});
export default Header;
