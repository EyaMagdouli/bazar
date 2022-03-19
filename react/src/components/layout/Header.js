import { Link } from 'react-router-dom';
import logo from './logo.png';
function Header({title})
{
    return (
        <div>
            <div id="bazarHome">
                <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                    <div className="container">
                        <Link className="navbar-brand" to="/" >
                            <img src={logo} alt="logo" width="150"  />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">                   
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/register"}>Register</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    username
                                </a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="{{ route('logout') }}">
                                        logout
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" className="d-none">
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    </div>
    )
}

Header.defaultProps = {
    title: 'Bazar'
}
export default Header