import axios from 'axios';
import { useState } from 'react';

export default function UseWarehouseManagement() {
    // Pobieranie pozycji magazynowych i listy komponentów
    const [positionList, setPositionList] = useState([]);
    const [componentList, setComponentList] = useState([]);

    const getPositionList = () => {
        axios
            .get('http://172.22.126.11:8080/positionsList')
            .then((res) => {
                console.log(res.data.positions);
                setPositionList(res.data.positions)
                axios
                    .get('http://172.22.126.11:8080/componentsDetailsList')
                    .then((res) => {
                        console.log(res.data);
                        setComponentList(res.data);
                    })
                    .catch((error) => {
                        alert();
                    })
            })
            .catch((error) => {
                alert();
            })
    };

    // Obsługa dodawania pozycji magazynowej
    const [showFormAddPosition, setShowFormAddPosition] = useState(false);

    const openFormAddPosition = () => {
        if (showFormAddPosition === false) setShowFormAddPosition(!showFormAddPosition);
    };
    const closeFormAddPosition = () => {
        if (showFormAddPosition === true) setShowFormAddPosition(!showFormAddPosition);
    }

    const [formDataPositionAdd, setFormDataPositionAdd] = useState({
        name: '',
        locationId: ''
    })

    const handleFormAddPositionChange = (e) => {
        const target = e.target;
        const name = target.name;

        console.log(formDataPositionAdd)
        setFormDataPositionAdd({
            ...formDataPositionAdd,
            [name]: target.value
        });
    };
    const handleSelectAddPositionChange = (e) => {
        const target = e;
        const name = 'locationId';
        console.log(formDataPositionAdd)
        setFormDataPositionAdd({
            ...formDataPositionAdd,
            [name]: target
        });

    }

    const handlePositionAddSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://172.22.126.11:8080/positionAdd/', {
                name: formDataPositionAdd.name,
                locationId: parseInt(formDataPositionAdd.locationId, 10)
            })
            .then((res) => {
                console.log(res);
                getPositionList();
            })
            .catch((error) => {
                console.log('error');
            });
    }

    // Obsługa zmiany pozycji magazynowej dla komponentów

    const [showFormChangePosition, setShowFormChangePosition] = useState(false);

    const openFormChangePosition = () => {
        if (showFormChangePosition === false) setShowFormChangePosition(!showFormChangePosition);
    };
    const closeFormChangePosition = () => {
        if (showFormChangePosition === true) setShowFormChangePosition(!showFormChangePosition);
    }

    const [selectedInsideNumber, setSelectedInsideNumber] = useState(null);

    const handleTdClick = (id) => {
        if (selectedInsideNumber === id) {
            setSelectedInsideNumber(null); // Jeśli kliknięto ponownie, ustaw na null
        } else {
            setSelectedInsideNumber(id); // Ustaw nową wartość
        }

        const orderDetailsId = id; // Ustawiamy wybrany wiersz z tabeli
        const positionId = selectedPosition; // Ustawiamy wewnętrzny numer
        setChangePositionData({
            orderDetailsId,
            positionId
        });
    };

    const [selectedPosition, setSelectedPosition] = useState('');

    const handlePositionChange = (e) => {
        const positionId = e.target.value;  // Ustawienie wartości z listy rozwijanej
        setSelectedPosition(positionId);   // Aktualizacja selectedPosition
        const orderDetailsId = selectedInsideNumber;  // Ustawienie orderDetailsId
        setChangePositionData({
            orderDetailsId,
            positionId
        });
    };

    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const [changePositionData, setChangePositionData] = useState({
        orderDetailsId: null,
        positionId: null
    });

    const handleChangePositionSubmit = (e) => {
        console.log(changePositionData);
        e.preventDefault();
        axios
            .post('http://172.22.126.11:8080/changeComponentLocationAndPosition/', changePositionData)
            .then((res) => {
                console.log(res);
                // Dodatkowe akcje po udanej zmianie pozycji, np. odświeżenie listy
                getPositionList();
            })
            .catch((error) => {
                console.log('error');
            });
    };

    //Filtrowanie tabeli

    const [filters, setFilters] = useState({
        insideNumber: '',
        componentName: '',
        locationName: '',
        positionName: ''
    });

    const filteredComponents = componentList.filter(component =>
        component.insideNumber.toLowerCase().includes(filters.insideNumber.toLowerCase()) &&
        component.componentName.toLowerCase().includes(filters.componentName.toLowerCase()) &&
        component.locationName.toLowerCase().includes(filters.locationName.toLowerCase()) &&
        (component.positionName !== null ? component.positionName.toLowerCase().includes(filters.positionName.toLowerCase()) : true)
    );

    return {
        // Pobieranie pozycji magazynowych i listy komponentów
        getPositionList,
        positionList,
        componentList,
        // Obsługa dodawania pozycji magazynowej
        showFormAddPosition,
        openFormAddPosition,
        closeFormAddPosition,
        handleFormAddPositionChange,
        handleSelectAddPositionChange,
        handlePositionAddSubmit,
        // Obsługa zmiany pozycji magazynowej dla komponentów
        showFormChangePosition,
        openFormChangePosition,
        closeFormChangePosition,
        selectedInsideNumber,
        handleTdClick,
        selectedPosition,
        handlePositionChange,
        filterValue,
        handleFilterChange,
        handleChangePositionSubmit,
        //Fotrowanie tabeli
        filteredComponents,
        filters,
        setFilters
    };
}




