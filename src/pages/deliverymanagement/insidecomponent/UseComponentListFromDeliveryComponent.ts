import axios from 'axios';
import { DeliveryContext } from 'contexts/Delivery';
import { useContext, useEffect, useState } from 'react';

export default function UseOrderManagement() {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    //Pobieranie DataDelivery
    const {  setAddComponentForm, setAddSubcomponentsForm } = useContext(DeliveryContext)
    const [deliveryData, setDeliveryData] = useState([])
    const deliveryId = window.location.pathname.split('/').pop();
    const getDeliveryData = () => {
        axios.get(`${API_BASE_URL}/deliveries/${deliveryId}`)
            .then((res) => {
                setDeliveryData([res.data]);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }

    
    // Dodawanie komponentu do zamówienia
    const [formDataComponentAdd, setFormDataComponentAdd] = useState({
        deliveryId: deliveryId,
        productionDate: '', // Domyślnie ustawiona na obecną datę w formacie 'YYYY-MM-DD'
        controlDate: '', // Domyślnie ustawiona na obecną datę w formacie 'YYYY-MM-DD'
        nameOne: '',
        nameTwo: '',
        oldMonNumber: '', // Domyślnie ustawione na 0
        newMonNumber: '', // Domyślnie ustawione na 0
        size: '' // Domyślnie ustawione na 0
    });
    const handleInputAddComponentChange = (e: any) => {
        const target = e.target;
        const name = target.name;
        console.log(formDataComponentAdd);
        setFormDataComponentAdd({
            ...formDataComponentAdd,
            [name]: target.value
        });
    }

    const [componentFromDelivery, setComponentsFromDelivery] = useState([]);
    const getComponentsFromDelivery = () => {
        axios.get(`${API_BASE_URL}/components/byDeliveryId/${deliveryId}`)
            .then((res) => {
                console.log(res);
                setComponentsFromDelivery(res.data);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    // Status subcomponentów
    const [subComponentsStatus, setSubcomponentsStatus] = useState([])
    const handleSubmitAddComponent = (e: any) => {
        console.log(formDataComponentAdd);
        e.preventDefault();
        console.log(formDataComponentAdd);
        axios
            .post(`${API_BASE_URL}/components`, {
                deliveryId: parseInt(deliveryId),
                productionDate: formDataComponentAdd.productionDate,
                controlDate: formDataComponentAdd.productionDate,
                nameOne: formDataComponentAdd.nameOne,
                nameTwo: formDataComponentAdd.nameTwo,
                oldMonNumber: parseInt(formDataComponentAdd.oldMonNumber),
                newMonNumber: parseInt(formDataComponentAdd.newMonNumber),
                size: parseInt(formDataComponentAdd.size),
            })
            .then((res) => {
                console.log(res);
                setSubcomponentsStatus(res.data.componentSubcomponents)
                setAddComponentForm(false);
                setAddSubcomponentsForm(true);
                getComponentsFromDelivery();
                console.log(formDataComponentAdd);
                setFormDataComponentAdd({
                    deliveryId: deliveryId,
                    productionDate: '',
                    controlDate: '',
                    nameOne: '',
                    nameTwo: '',
                    oldMonNumber: '',
                    newMonNumber: '',
                    size: ''
                });
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            });
    }
    const [statusSubcomponentChange, setStatusSubcomponent] = useState({
        statusId: ''
    });

    const handleStatusSubcomponentChange = (e: any, id: any) => {
        const target = e;
        const name = 'statusId';
        console.log(id);
        console.log(target);
        console.log(statusSubcomponentChange);
        setStatusSubcomponent({
            ...statusSubcomponentChange,
            [name]: target
        })
        if (id && target) {
            axios
                .put(`${API_BASE_URL}/component-subcomponents/${id}`, {
                    statusId: parseInt(target, 10)
                }).then((res) => {
                    console.log(res)
                })
        }
    }

    useEffect(() => {
        getDeliveryData();
        getComponentsFromDelivery();
        console.log(subComponentsStatus)
    }, [subComponentsStatus]);
    return {
        //Pobieranie listy komponentow z dostawy
        deliveryData,
        // Dodawanie komponentu do zamówienia
        formDataComponentAdd,
        handleInputAddComponentChange,
        handleSubmitAddComponent,
        componentFromDelivery,
        subComponentsStatus,
        handleStatusSubcomponentChange
    };
}

// import axios from 'axios';
// import { useState } from 'react';

// export default function UseOrderManagement() {
//     //Pobieranie danych zamówienia, komponentów oraz aktywnosci
//     const [orderId, setOrderId] = useState(JSON.parse(sessionStorage.getItem('orderId')));
//     const [orderData, setOrderData] = useState([]);
//     const [orderComponents, setOrderComponents] = useState([]);
//     console.log(orderComponents);
//     const getOrderData = () => {
//         axios
//             .get('http://172.22.126.11:8080/getOrderData/' + orderId)
//             .then((res) => {
//                 console.log(res.data);
//                 const arrayOrderData = {
//                     clientName: res.data.clientName,
//                     creationDate: res.data.creationDate,
//                     id: res.data.id,
//                     isDeleted: res.data.isDeleted,
//                     lastModified: res.data.lastModified,
//                     number: res.data.number,
//                     status: res.data.status
//                 }
//                 setOrderData([arrayOrderData]);
//                 setOrderComponents(res.data.orderComponentList);
//             })
//             .catch((error) => {
//                 alert('Wystąpił błąd, spróbuj ponownie później');
//             })
//     }
//     // Obsługa formularza dodawania komponentu do zamówienia
//     const [showFormAddActivity, setShowFormAddActivity] = useState(false);
//     const [showFormAddComponent, setShowFormAddComponent] = useState(false);

//     const openFormAddActivity = () => {
//         setShowFormAddActivity(true);
//         setShowFormAddComponent(false); // Zamknij drugi formularz, jeśli jest otwarty
//     };

//     const closeFormAddActivity = () => {
//         setShowFormAddActivity(false);
//     };

//     const openFormAddComponent = () => {
//         setShowFormAddComponent(true);
//         setShowFormAddActivity(false); // Zamknij pierwszy formularz, jeśli jest otwarty
//     };

//     const closeFormAddComponent = () => {
//         setShowFormAddComponent(false);
//     };

//     const [formDataComponentAdd, setFormDataComponentAdd] = useState({
//         orderId: parseInt(orderId, 10),
//         componentName: ''
//     })
//     const handleFormComponentAddChange = (e) => {
//         const target = e.target;
//         const name = target.name;
//         setFormDataComponentAdd({
//             ...formDataComponentAdd,
//             [name]: target.value
//         })
//     }
//     const handleComponentAddSubmit = (e) => {
//         e.preventDefault();
//         axios
//             .post('http://172.22.126.11:8080/addComponentByOrdNumOrCompNum', {
//                 orderId: formDataComponentAdd.orderId,
//                 componentName: formDataComponentAdd.componentName,
//             })
//             .then((res) => {
//                 console.log(res);
//                 getOrderData();
//             })
//             .catch((error) => {
//                 console.log('error');
//             });
//     }

//     const [formDataActivityAdd, setFormDataActivityAdd] = useState({
//         activityName: '',
//         orderDetailsId: ''
//     })

//     const handleActivityAddChange = (e) => {
//         const target = e.target;
//         const name = target.name;
//         console.log(formDataActivityAdd);
//         setFormDataActivityAdd({
//             ...formDataActivityAdd,
//             [name]: target.value
//         })
//     }

//     const handleActivityAddSubmit = (e) => {
//         e.preventDefault();
//         axios
//             .post('http://172.22.126.11:8080/componentActivityAdd', {
//                 activityName: formDataActivityAdd.activityName,
//                 orderDetailsId: formDataActivityAdd.orderDetailsId
//             })
//             .then((res) => {
//                 console.log(res);
//                 getOrderData();
//             })
//             .catch((error) => {
//                 console.log('error');
//             });
//     }
//     //Obsługa tabel

//     const [selectedRow, setSelectedRow] = useState(null); // Stan śledzący wybrany wiersz

//     const handleRowClick = (index, dataComponentId) => {
//         if (selectedRow === index) {
//             setSelectedRow(null);
//         } else {
//             setSelectedRow(index);
//             setFormDataActivityAdd(({
//                 ...formDataActivityAdd,
//                 orderDetailsId: parseInt(dataComponentId, 10)
//             }));
//         }
//         console.log(selectedRow); // Sprawdź wartość w konsoli
//         console.log(formDataActivityAdd); // Sprawdź wartość w konsoli
//     };

//     // Obsługa zmiany statusu aktywności

//     const handleStatusChange = (dataActivityId, newStatus) => {
//         let mappedStatus;

//         // Mapowanie wartości newStatus na 1 lub 2
//         if (newStatus === 'OK') {
//             mappedStatus = 2;
//         } else if (newStatus === 'NOK') {
//             mappedStatus = 1;
//         } else {
//             console.log('Nieznany status:', newStatus);
//             return; // Zakończ funkcję, jeśli status jest nieznany
//         }

//         const dataToChangeStatusActivity = {
//             dataActivityId,
//             newStatus: mappedStatus // Ustaw wartość mappedStatus
//         };

//         console.log(dataToChangeStatusActivity);
//         axios
//             .post('http://172.22.126.11:8080/componentActivityChange', {
//                 componentsActivitiesId: parseInt(dataToChangeStatusActivity.dataActivityId, 10),
//                 newStatusId: parseInt(dataToChangeStatusActivity.newStatus, 10)
//             })
//             .then((res) => {
//                 console.log(res);
//                 getOrderData();  // Odśwież dane po zmianie statusu
//             })
//             .catch((error) => {
//                 console.log('error');
//             });
//     };

//     //formatowanie daty na normalną
//     function formatDate(dateString) {
//         const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     }

//     return {
//         //Pobieranie order data
//         getOrderData,
//         orderData,
//         //Pobieranie komponentów z zamówienia
//         orderComponents,
//         //formatopwanie na datę
//         formatDate,
//         //Obsługa formularza dodawania komponentu do zamówienia
//         showFormAddComponent,
//         openFormAddComponent,
//         closeFormAddComponent,
//         handleFormComponentAddChange,
//         handleComponentAddSubmit,
//         //Obsługa formularza dodawania aktywności do komponentu
//         showFormAddActivity,
//         openFormAddActivity,
//         closeFormAddActivity,
//         handleActivityAddChange,
//         handleActivityAddSubmit,
//         //Obsługa tabel
//         selectedRow,
//         handleRowClick,
//         //Obsługa zmiany aktywności
//         handleStatusChange,
//     };
// }







