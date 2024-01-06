import axios from 'axios';
import { useState } from 'react';

export default function UseOrderManagement() {
    //Pobieranie danych zamówienia, komponentów oraz aktywnosci
    const [orderId, setOrderId] = useState(JSON.parse(sessionStorage.getItem('orderId')));
    const [orderData, setOrderData] = useState([]);
    const [orderComponents, setOrderComponents] = useState([]);
    console.log(orderComponents);
    const getOrderData = () => {
        axios
            .get('http://172.22.126.11:8080/getOrderData/' + orderId)
            .then((res) => {
                console.log(res.data);
                const arrayOrderData = {
                    clientName: res.data.clientName,
                    creationDate: res.data.creationDate,
                    id: res.data.id,
                    isDeleted: res.data.isDeleted,
                    lastModified: res.data.lastModified,
                    number: res.data.number,
                    status: res.data.status
                }
                setOrderData([arrayOrderData]);
                setOrderComponents(res.data.orderComponentList);
            })
            .catch((error) => {
                alert('Wystąpił błąd, spróbuj ponownie później');
            })
    }
    // Obsługa formularza dodawania komponentu do zamówienia
    const [showFormAddComponent, setShowFormAddComponent] = useState(false);

    const openFormAddComponent = () => {
        if (showFormAddComponent === false) setShowFormAddComponent(!showFormAddComponent);
    };
    const closeFormAddComponent = () => {
        if (showFormAddComponent === true) setShowFormAddComponent(!showFormAddComponent);
    }

    const [formDataComponentAdd, setFormDataComponentAdd] = useState({
        orderId: parseInt(orderId, 10),
        componentName: ''
    })
    const handleFormComponentAddChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormDataComponentAdd({
            ...formDataComponentAdd,
            [name]: target.value
        })
    }
    const handleComponentAddSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://172.22.126.11:8080/addComponentByOrdNumOrCompNum', {
                orderId: formDataComponentAdd.orderId,
                componentName: formDataComponentAdd.componentName,
            })
            .then((res) => {
                console.log(res);
                getOrderData();
            })
            .catch((error) => {
                console.log('error');
            });
    }

    // Obsługa formularza dodawania aktywności do komponentu
    const [showFormAddActivity, setShowFormAddActivity] = useState(false);

    const openFormAddActivity = () => {
        if (showFormAddActivity === false) setShowFormAddActivity(!showFormAddActivity);
    };
    const closeFormAddActivity = () => {
        if (showFormAddActivity === true) setShowFormAddActivity(!showFormAddActivity);
    }

    const [formDataActivityAdd, setFormDataActivityAdd] = useState({
        activityName: '',
        orderDetailsId: ''
    })

    const handleActivityAddChange = (e) => {
        const target = e.target;
        const name = target.name;
        console.log(formDataActivityAdd);
        setFormDataActivityAdd({
            ...formDataActivityAdd,
            [name]: target.value
        })
    }

    const handleActivityAddSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://172.22.126.11:8080/componentActivityAdd', {
                activityName: formDataActivityAdd.activityName,
                orderDetailsId: formDataActivityAdd.orderDetailsId
            })
            .then((res) => {
                console.log(res);
                getOrderData();
            })
            .catch((error) => {
                console.log('error');
            });
    }
    //Obsługa tabel

    const [selectedRow, setSelectedRow] = useState(null); // Stan śledzący wybrany wiersz

    const handleRowClick = (index, dataComponentId) => {
        if (selectedRow === index) {
            setSelectedRow(null);
        } else {
            setSelectedRow(index);
            setFormDataActivityAdd(({
                ...formDataActivityAdd,
                orderDetailsId: parseInt(dataComponentId, 10)
            }));
        }
        console.log(selectedRow); // Sprawdź wartość w konsoli
        console.log(formDataActivityAdd); // Sprawdź wartość w konsoli
    };

    // Obsługa zmiany statusu aktywności

    const handleStatusChange = (dataActivityId, newStatus) => {
        let mappedStatus;

        // Mapowanie wartości newStatus na 1 lub 2
        if (newStatus === 'OK') {
            mappedStatus = 2;
        } else if (newStatus === 'NOK') {
            mappedStatus = 1;
        } else {
            console.log('Nieznany status:', newStatus);
            return; // Zakończ funkcję, jeśli status jest nieznany
        }

        const dataToChangeStatusActivity = {
            dataActivityId,
            newStatus: mappedStatus // Ustaw wartość mappedStatus
        };

        console.log(dataToChangeStatusActivity);
        axios
            .post('http://172.22.126.11:8080/componentActivityChange', {
                componentsActivitiesId: parseInt(dataToChangeStatusActivity.dataActivityId, 10),
                newStatusId: parseInt(dataToChangeStatusActivity.newStatus, 10)
            })
            .then((res) => {
                console.log(res);
                getOrderData();  // Odśwież dane po zmianie statusu
            })
            .catch((error) => {
                console.log('error');
            });
    };

    //formatowanie daty na normalną
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return {
        //Pobieranie order data
        getOrderData,
        orderData,
        //Pobieranie komponentów z zamówienia
        orderComponents,
        //formatopwanie na datę
        formatDate,
        //Obsługa formularza dodawania komponentu do zamówienia
        showFormAddComponent,
        openFormAddComponent,
        closeFormAddComponent,
        handleFormComponentAddChange,
        handleComponentAddSubmit,
        //Obsługa formularza dodawania aktywności do komponentu
        showFormAddActivity,
        openFormAddActivity,
        closeFormAddActivity,
        handleActivityAddChange,
        handleActivityAddSubmit,
        //Obsługa tabel
        selectedRow,
        handleRowClick,
        //Obsługa zmiany aktywności
        handleStatusChange,
    };
}




