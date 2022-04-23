import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import "../../assets/css/home.css";
import React from "react";

const Header = React.forwardRef((p, prodsRef) => {
  const navigate = useNavigate();

  const logoutSubmit = () => {
    localStorage.clear();
    navigate("/");
  };

  const AuthButtons = !localStorage.getItem("auth_token") ? (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={"/login"} style={{color:"green", fontSize:"20px"}}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/ChooseKind"} style={{color:"green", fontSize:"20px"}}>
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
          <Link to={"/buyer/dashboard"}style={{textDecoration: "none"}}>
            <div > Dashboard</div>
          </Link>
        </div>
        <div className="icons" style={{ margin_left: "50%" }}>
          <Link to={"/profile"}>
            <div className="fas fa-user" id="login-btn"></div>
          </Link>
        </div>
      </li>
    </ul>
  );
  const showOnlyInMain = (
    <nav className="navbar navbar-nav ms-auto">
      <ul>
        <li onClick={() => prodsRef?.current[2].scrollIntoView()}>Features</li>
        <li onClick={() => prodsRef?.current[1].scrollIntoView()}>Marketplaces</li>
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
          <ul className="navbar navbar-nav ms-auto">{AuthButtons}</ul>
        </div>
      </div>
    </div>
  );
});
export default Header;
