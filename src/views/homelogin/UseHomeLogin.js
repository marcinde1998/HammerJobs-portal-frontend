import { useState } from 'react';
import axios from 'axios';

export default function UseNavigation(props) {
	//Obsługa logowania
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
		console.log (formData);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
		.post('http://172.22.126.11:8080/userLogin', {
			username: formData.username,
			password: formData.password
		})
		.then((res) => {
			props.setLoggedUser(res.data);
			localStorage.setItem('loggedUser', JSON.stringify(res.data))
		})
		.catch((error) => {
			console.log(error);
		})
	}
	//Obsługa błędnego logowania
	const [error, setError] = useState(null);

	return {
		// formData,
		// setFormData,
		// handleInputChange,
		// handleSubmit
		//Obsługa błędnego logowania
		error,
		setError
	};
}