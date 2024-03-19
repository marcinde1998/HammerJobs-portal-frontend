import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UseListComponent() {
	//Zmienne środowiskowe
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

	const [componentList, setComponentList] = useState([]);
	const reverseList = [...componentList].reverse();
	const [componentListChoiced, setComponentListChoiced] = useState([]);
	const [sortedReverseList, setSortedReverseList] = useState([])
	// useEffect(() => {
	// 	const sortedList = componentListChoiced.sort((a, b) => b.insideNumber - a.insideNumber)
	// 		.map(obj => ({
	// 			...obj,
	// 			componentSubcomponents: obj.componentSubcomponents.sort((a, b) => a.id - b.id)
	// 		}));
	// 	setSortedReverseList(sortedList);
	// }, [componentList]);


	const [choicedList, setChoicedList] = useState([])
	const [insideNumber, setInsideNumber] = useState();
	const setStatuseForSubcomponents = (list: any, insideNumber) => {
		console.log(list)
		setShowChangeStatus(true)
		setChoicedList(list)
		setInsideNumber(insideNumber);
	}
	const [showListDetails, setShowListDetails] = useState(false);
	const [showListSubcomponents, setShowListSubcomponents] = useState(false);
	const [listChoice, setListChoice] = useState(null);
	const choiceClicked = (choice: { choice: any; }) => {
		setListChoice(choice)
		console.log(choice)
		getComponentList(choice.choice);
	}

	const getComponentList = (choice) => {
		axios.get(`${API_BASE_URL}/components`)
			.then((res) => {
				console.log(res.data);
				const reversedData = res.data.reverse();
				const sortedData = reversedData.sort((a, b) => b.insideNumber - a.insideNumber)
					.map(obj => ({
						...obj,
						componentSubcomponents: obj.componentSubcomponents.sort((a, b) => a.id - b.id)
					}));
				const filteredAndSortedData = sortedData.filter(item => item.componentType.name === choice);
				setComponentList(filteredAndSortedData);
			})
	}
	const [showChangeStatus, setShowChangeStatus] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	// useEffect(() => {
	// 	getComponentList();
	// }, [])



	const changeSubcomponentStatus = (subcomponentId, statusId) => {
		console.log(subcomponentId)
		console.log(statusId)
		axios
			.put(`${API_BASE_URL}/component-subcomponents/${subcomponentId}`, {
				statusId: statusId,
			}).then((res) => {
				console.log(res);
				choiceClicked(listChoice);
			})
	}

	// useEffect(() => {
	// 	console.log(componentListChoiced)
	// }, [componentListChoiced])

	return {
		getComponentList,
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
		insideNumber,
		selectedRow,
		setSelectedRow,
	};
}