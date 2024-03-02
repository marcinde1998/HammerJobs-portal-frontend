import { useState } from 'react';

export default function UseNavigation() {
	//Obsługa logowania

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const handleInputChange = (e: { target: any; }) => {
		const target = e.target;
		const name = target.name;

		setFormData({
			...formData,
			[name]: target.value
		})
	}
	//Obsługa błędnego logowania
	const [error, setError] = useState(null);

	return {
		//Obsługa logowania
		formData,
		handleInputChange,
		//Obsługa błędnego logowania
		error,
		setError
	};
}