import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/LoggedUser';

// @styles
import styles from './styles.module.scss';

//@assets
import hjOutsoursingNav from '../../../assets/logo/hjOutsourcingNav.png'

function NavBar() {
    const navigate = useNavigate();
    const { loggedUser, logout } = useContext(UserContext);
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <div className={styles.wrapper}>
            <Link to='/'><img className={styles.hjOutsoursing} src={hjOutsoursingNav} alt="HJOutsourcing" /></Link>
            {/* {loggedUser && <div>{loggedUser.username}</div>} */}
            {loggedUser && <div className={styles.btnSegment}>
                <Link to='/' className={styles.aBtn}>Menu</Link>
                <button className={styles.btn} onClick={handleLogout}>Wyloguj</button>
            </div>}
        </div>
    )
}
export default NavBar;