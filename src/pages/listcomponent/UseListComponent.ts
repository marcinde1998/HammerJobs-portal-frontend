import axios from 'axios';
import { useEffect, useState } from 'react';

// @lib	
import { ComponentList } from '../../lib/data/DataToMap';

export default function UseListComponent() {
	//Zmienne środowiskowe
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	const [componentList, setComponentList] = useState([]);
	const reverseList = [...componentList].reverse();
	const [componentListChoiced, setComponentListChoiced] = useState([]);
	const [showListDetails, setShowListDetails] = useState(false);
	const [showListSubcomponents, setShowListSubcomponents] = useState(false);
	const getComponentList = () => {
		axios.get(`${API_BASE_URL}/components`)
		.then((res) => {
			console.log(res.data)
			setComponentList(res.data);
		})
	}
	useEffect(() => {
		getComponentList();
	}, [])
	const [listChoice, setListChoice] = useState(null);
	const choiceClicked = (choice) => {
		setListChoice(choice)
		console.log(choice)
		const filteredComponents = reverseList.filter(item => item.componentType.name === choice.choice);
		setComponentListChoiced(filteredComponents);
		console.log(filteredComponents)
	}

	return {
		componentList,
		listChoice,
		setListChoice,
		choiceClicked,
		componentListChoiced,
		showListDetails,
		showListSubcomponents,
		setShowListDetails,
		setShowListSubcomponents
	};
}