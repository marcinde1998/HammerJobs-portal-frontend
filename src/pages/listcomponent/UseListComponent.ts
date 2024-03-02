import axios from 'axios';
import { useState } from 'react';

// @lib	
import { ComponentList } from '../../lib/data/DataToMap';

export default function UseListComponent() {
	const [componentList, setComponentList] = useState(ComponentList);
	const reverseList = [...componentList].reverse();
    const [componentListChoiced, setComponentListChoiced] = useState([]);
	const [showListDetails, setShowListDetails] = useState(false);
	const [showListSubcomponents, setShowListSubcomponents] = useState(false);
	const getComponentList = () => {
		// po dodaniu api uzupełnić
	}

	const [listChoice, setListChoice] = useState(null);
	const choiceClicked = (choice) => {
		setListChoice(choice)
		console.log(choice)
		console.log(listChoice)
		const filteredComponents = reverseList.filter(item => item.componentTypeName === choice.choice);
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