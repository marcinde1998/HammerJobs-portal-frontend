import React, { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

//Hooks
import UseHomeLogin from './UseHomeLogin';

// @styles
import styles from './styles.module.scss';

function HomeLogin(props) {
	const {
		//Obsługa logowania
		formData,
		handleInputChange,
		//Obsługa błędnego logowania
		error,
		setError
	} = UseHomeLogin();
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://172.22.126.11:8080/userLogin', {
				username: formData.username,
				password: formData.password
			})
			.then((res) => {
				props.setLoggedUser(res.data.jwt);
				sessionStorage.setItem('loggedUser', JSON.stringify(res.data.jwt));

				if (res.data.jwt) {
					navigate('/mainmenu');
				}
			})
			.catch((error) => {
				console.log(error.response.status);
				if (error.response.status === 401) {
					setError("Podane błędny Login lub Hasło.");
				}
				if (error.response.status === 404) {
					setError("Wystąpił nieoczekiwany błąd, proszę spróbować później.");
				}
			});
	}
	if (!props.loggedUser) {
		return (
			<div className={styles.wrapper}>
				<div className={styles.ksaLogoBox}>
					<span className={styles.ksaText}>KSA</span>
					<span className={styles.solutionsText}>Solutions</span>
				</div>
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
		);
	} else if (props.loggedUser) {
		return <Navigate to='/mainmenu' />
	}
}
export default HomeLogin;