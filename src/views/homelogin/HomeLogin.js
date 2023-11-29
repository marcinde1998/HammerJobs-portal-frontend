import React, { useState } from "react";
import axios from 'axios';

// @styles
import styles from './styles.module.scss';
import { Navigate, useNavigate } from "react-router-dom";

function HomeLogin(props) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;
		setFormData({
			...formData,
			[name]: target.value
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8080/userLogin', {
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
				alert('Nie udało się zalogować. Sprawdź poprawność nazwy użytkownika i hasła.');
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
					action="http://localhost:8080/userLogin"
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
				</form>
			</div>
		);
	} else if (props.loggedUser) {
		return <Navigate to='/mainmenu' />
	}
}
export default HomeLogin;