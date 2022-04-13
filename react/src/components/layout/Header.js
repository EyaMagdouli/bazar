import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../../assets/css/home.css";

function Header() {
  const navigate = useNavigate();

  const logoutSubmit = () => {
    localStorage.clear();
    navigate("/")
  };

  const AuthButtons = !localStorage.getItem("auth_token") ? (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={"/login"}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/ChooseKind"}>
          Register
        </Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li className="nav-item" style={{display: "flex",flexDirection: "row-reverse"}}>
        <button
          type="button"
          onClick={logoutSubmit}
          className="nav-link btn btn-danger btn-sm text-white"
          style={{marginLeft: "16px", width: "80px", fontSize:"13px"}}
        >
          Logout
        </button>
        <div className="icons" style={{margin_left:"50%"}}>
          <div className="fas fa-user" id="login-btn"></div>
        </div>
      </li>
    </ul>
  );

  return (
    <div id="bazarHome" style={{height: "wrap-content"}}>
      <div className="header navbar navbar-expand-md position-relative">
        <div className="container">
          <Link className="logo" to="/">
            <img src={logo} alt="logo" width="150" />
          </Link>
          <nav className="navbar navbar-nav ms-auto">
            <Link to="#features">Features</Link>
            <Link to="#marketplaces">Marketplaces</Link>
            <Link to="#products">Products</Link>
          </nav>
          <ul className="navbar navbar-nav ms-auto">{AuthButtons}</ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
