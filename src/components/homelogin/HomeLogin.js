import React, { useEffect, useState } from "react";
import axios from 'axios';

// @styles
import styles from './styles.module.scss';
import { Navigate } from "react-router-dom";

function HomeLogin(props) {
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
				props.setLoggedUser(res.data);
				sessionStorage.setItem('loggedUser', JSON.stringify(res.data));
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			})
	}
	return (
		<div className={styles.wrapper}>
			{props.rule === 'aruleakitel' && <Navigate to="/administratorpage" />}
			{props.rule === 'krulekkitel' && <Navigate to="/managerpage" />}
			{props.rule === 'lrulelkitel' && <Navigate to="/leaderpage" />}
			{props.rule === 'prulepkitel' && <Navigate to="/employeepage" />}
			<form
				className={styles.loginFormWrapper}
				onSubmit={handleSubmit}
				action="http://localhost:8080/userLogin"
				method="POST"
			>
				<label
					htmlFor="username"
				>
					Nazwa użytkownika:
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={handleInputChange}
					required
				/>

				<label
					htmlFor="password"
				>
					Hasło:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					required
				/>
				<input
					type="submit"
					value="Zaloguj"
				/>
			</form>
		</div>
	);
}

export default HomeLogin;