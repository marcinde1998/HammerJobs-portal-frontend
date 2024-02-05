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
	const [serwerResData, setSerwerResData] = useState();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://172.22.126.11:8080/orderAdd', {
				number: formData.number,
				clientName: formData.clientName
			})
				.then((res) => {
					setFormSubmitted(true);
					setSerwerResData(res.data.id);
				})
		} catch (error) {
			console.error('Błąd podczas wysyłania danych: ', error);
		}
	};
	
	return {
		formData,
		formSubmitted,
		serwerResData,
		handleInputChange,
		handleSubmit,
		setFormSubmitted,
		setFormData
	};
}