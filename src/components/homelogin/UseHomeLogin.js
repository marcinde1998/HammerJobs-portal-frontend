import { useState } from 'react';
import axios from 'axios';

export default function UseNavigation(props) {

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
		.post('http://localhost:8080/userLogin', {
			username: formData.username,
			password: formData.password
		})
		.then((res) => {
			console.log(res.data);
			props.setLoggedUser(res.data);
			localStorage.setItem('loggedUser', JSON.stringify(res.data))
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return {
		formData,
		setFormData,
		handleInputChange,
		handleSubmit
	};
}