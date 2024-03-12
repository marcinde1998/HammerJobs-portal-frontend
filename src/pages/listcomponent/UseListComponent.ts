import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UseListComponent() {
	//Zmienne środowiskowe
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	const [componentList, setComponentList] = useState([]);
	const reverseList = [...componentList].reverse();

	const sortedReverseList = reverseList.sort((a, b) => b.insideNumber - a.insideNumber)
    .map(obj => ({
        ...obj,
        componentSubcomponents: obj.componentSubcomponents.sort((a, b) => a.id - b.id)
    }));

	const [componentListChoiced, setComponentListChoiced] = useState([]);
	const [choicedList, setChoicedList] = useState([])
	const [insideNumber, setInsideNumber] = useState();
	// const sortedList = choicedList.sort((a, b) => a.id - b.id);
	const setStatuseForSubcomponents = (list: any, insideNumber) => {
		// console.log(list)
		setShowChangeStatus(true)
		setChoicedList(list)
		setInsideNumber(insideNumber);
	}
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
	const choiceClicked = (choice: { choice: any; }) => {
		setListChoice(choice)
		// console.log(choice)
		const filteredComponents = reverseList.filter(item => item.componentType.name === choice.choice);
		setComponentListChoiced(filteredComponents);
		// console.log(filteredComponents)
	}
	const [showChangeStatus, setShowChangeStatus] = useState(false)
	
	const changeSubcomponentStatus = (subcomponentId, statusId) => {
		console.log(subcomponentId)
		console.log(statusId)
		axios
		.put(`${API_BASE_URL}/component-subcomponents/${subcomponentId}`, {
			statusId: statusId,
		}). then((res) => {
			console.log(res);
			getComponentList();
			choiceClicked(listChoice);
		})
	}


	// useEffect(() => {
	// 	console.log(choicedList)
	// 	console.log(sortedList)

	// }, [choicedList, sortedList])

	return {
		componentList,
		listChoice,
		setListChoice,
		choiceClicked,
		componentListChoiced,
		showListDetails,
		showListSubcomponents,
		setShowListDetails,
		setShowListSubcomponents,
		showChangeStatus,
		setShowChangeStatus,
		setStatuseForSubcomponents,
		choicedList,
		changeSubcomponentStatus,
		sortedReverseList,
		insideNumber
	};
}