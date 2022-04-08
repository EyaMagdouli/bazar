import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';


function Header(props)
{   
    const navigate = useNavigate();
    
    const logoutSubmit = (e) => {
        localStorage.clear();
        window.location.href = '/';
        
        // axios.post('api/logout').then(res => {
        //     console.log(res)
        //         localStorage.removeItem('auth_token');
		// 		localStorage.removeItem('auth_name');
		// 		swal('hiiiiiiiiii',res.data.message,"success");
		// 		navigate('/'); 
        // });
    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token')){
        AuthButtons =(
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/ChooseKind"}>Register</Link>
                </li>
            </ul>
        );
    }
    else {
        AuthButtons = (
            <ul>
                <li className='nav-item'>
                    <button type='button' onClick={logoutSubmit} className='nav-link btn btn-danger btn-sm text-white'>
                        Logout
                    </button> 
                </li>
            </ul>
        );
    }

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
                            {AuthButtons} 
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