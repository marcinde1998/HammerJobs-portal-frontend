import { Link, useNavigate } from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate();	
    const handleLogout = () => {
        sessionStorage.removeItem('loggedUser');
        props.setLoggedUser(null);
        navigate('/');
      }
	return(
        <div>
            <Link>KSA Solutions </Link>
            {props.loggedUser && props.access && <button onClick={handleLogout}>Wyloguj</button>}
        </div>
    )
}
export default NavBar;