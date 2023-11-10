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
	const [formSubmitted, setFormSubmitted] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  await axios.post('http://localhost:8080/orderAdd', {
			number: formData.number,
			clientName: formData.clientName
		  });
		  setFormSubmitted(true);
		  console.log('Dodano pozycję w bazie danych');
		} catch (error) {
		  console.error('Błąd podczas wysyłania danych: ', error);
		}
	  };
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	axios
	// 		.post('http://localhost:8080/orderAdd', {
	// 			number: formData.number,
	// 			clientName: formData.clientName
	// 		})
	// 		.then((res) => {
	// 			console.log('Dodano pozycję w bazie danych: ' + res.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		})

	// }

	return {
		formData,
		formSubmitted,
		handleInputChange,
		handleSubmit,
		setFormSubmitted,
		setFormData
	};
}

