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
				axios
					.post('http://localhost:8080/logAdd', {
						log: 'Użytkownik: ' + formData.username + ' zalogował się'
					})
				if (res.data.rights === 'administrator') {
					navigate('/administratorpage');
				} else if (res.data.rights === 'kierownik') {
					navigate('/managerpage');
				} else if (res.data.rights === 'lider') {
					navigate('/leaderpage');
				} else if (res.data.rights === 'pracownik') {
					navigate('/employeepage');
				}
			})
			.catch((error) => {
				alert('Nie udało się zalogować. Sprawdź poprawność nazwy użytkownika i hasła.');
			});
	}
	const [rights, setRights] = useState(null);
	if (!props.loggedUser) {
		return (
			<div className={styles.wrapper}>
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
	} else if(props.loggedUser) {
		axios
			.post('http://localhost:8080/decodeToken', {
				token: props.loggedUser
			})
			.then((res) => {
				setRights(res.data.userRole)
			})
			.catch((error) => {
				alert('Wystąpił błąd spróbuj ponownie później');
			});
		if (rights === 'administrator') {
			return <Navigate to='/administratorpage' />
		} else if (rights === 'kierownik') {
			return <Navigate to='/managerpage' />
		} else if (rights === 'lider') {
			return <Navigate to='/leaderpage' />
		} else if (rights === 'pracownik') {
			return <Navigate to='/employeepage' />
		}
	}
}
export default HomeLogin;