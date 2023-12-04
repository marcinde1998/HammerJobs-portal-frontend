import { Link, useNavigate } from "react-router-dom";

// @styles
import styles from './styles.module.scss';

function NavBar(props) {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('loggedUser');
        props.setLoggedUser(null);
        props.setAccess(null);
        navigate('/');
    }
    return (
        <div className={styles.wrapper}>
            <Link to='/'><span className={styles.ksaText}>KSA</span><span className={styles.solutionsText}>Solutions</span></Link>
            {props.loggedUser && <button className={styles.btn} onClick={handleLogout}>Wyloguj</button>}
        </div>
    )
}
export default NavBar;