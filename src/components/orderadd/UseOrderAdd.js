import { useState } from 'react';
import axios from 'axios';

export default function UseOrderAdd() {

	const [formData, setFormData] = useState({
		number: '',
		clientName: ''
	})
	const handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;
		console.log(formData);
		setFormData({
			...formData,
			[name]: target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:8080/orderAdd', { // <- dodaj adres pod który wysyłamy record dod bazy danych
				number: formData.number,
				clientName: formData.clientName
			})
			.then((res) => {
				console.log('Dodano pozycję w bazie danych: ' + res.data);
			})
			.catch((error) => {
				console.log(error);
			})

	}

	return {
		formData,
		handleInputChange,
		handleSubmit
	};
}