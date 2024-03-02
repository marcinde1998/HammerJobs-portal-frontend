import React, { useState, FormEvent, useContext } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/LoggedUser';

//Hooks
import UseHomeLogin from './UseHomeLogin';

// @styles
import styles from './styles.module.scss';

//@assets
import hjLogoHomeLogin from '../../assets/logo/hjLogoHomeLogin.png';

interface FormData {
    username: string;
    password: string;
}

function HomeLogin() {
    const {
        //Obsługa logowania
        formData,
        handleInputChange,
        //Obsługa błędnego logowania
        error,
        setError
    } = UseHomeLogin();

    const { setLoggedInUserFromToken, loggedUser, login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/auth/login', {
                username: formData.username,
                password: formData.password
            });
            login({ tokenJWT: res.data.access_token, username: formData.username });
            if (res.data.access_token) {
                setLoggedInUserFromToken();
                navigate('/mainmenu');
            }
        } catch (error) {
            console.log(error);
            setError("Wystąpił nieoczekiwany błąd, proszę spróbować później.");
        }
    }

    if (loggedUser) {
        return <Navigate to='/mainmenu' />;
    } else {
        return (
            <div className={styles.wrapper}>
                <div className={styles.formLoginWrapper}>
                    <div className={styles.logoBox}><img className={styles.logo} src={hjLogoHomeLogin} alt="Logo HJ" /></div>
                    <form
                        className={styles.loginFormBox}
                        onSubmit={handleSubmit}
                        action="http://172.22.126.11:8080/userLogin"
                        method="POST"
                    >
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="password">Hasło:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className={styles.btn}
                            type="submit"
                            value="Zaloguj"
                        />
                        {error && <div className={styles.error}>{error}</div>}
                    </form>
                </div>
            </div>
        );
    }
}

export default HomeLogin;
