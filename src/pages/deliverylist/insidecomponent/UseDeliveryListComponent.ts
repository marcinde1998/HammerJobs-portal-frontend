import { useEffect, useState } from "react";

//@components
import formatDate from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UseDeliveryListComponent() {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    //Filtrowanie
    const [filters, setFilters] = useState({
        id: '',
        customerName: '',
        number: '',
        statusName: '',
        componentTypeId: '',
        creationDate: '',
        lastModified: '',
        createdByUserId: ''
    });

    //Pobieranie danych dostawy
    const [deliveriesList, setDeliveriesList] = useState([]);
    const getDeliveriesList = () => {
        axios.get(`${API_BASE_URL}/deliveries`)
            .then((res) => {
                console.log(res);
                setDeliveriesList(res.data);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    useEffect(() => {
        getDeliveriesList();
    }, []);

    const filteredList = deliveriesList.filter(fPosition => {
        const isIdMatch = !filters.id || (fPosition.id !== null && fPosition.id.startsWith(filters.id));
        const isCustomerNameMatch = !filters.customerName || (fPosition.customerName !== null && fPosition.customer.name.toLowerCase().startsWith(filters.customerName.toLowerCase()));
        const isNumberMatch = !filters.number || (fPosition.number !== null && fPosition.number.toLowerCase().startsWith(filters.number.toLowerCase()));
        const isStatusNameMatch = !filters.statusName || (fPosition.statusName !== null && fPosition.status.name.toLowerCase().startsWith(filters.statusName.toLowerCase()));
        const isComponentTypeIdMatch = !filters.componentTypeId || (fPosition.componentTypeId !== null && fPosition.componentTypeId.toLowerCase().startsWith(filters.componentTypeId.toLowerCase()));
        const isCreationDateMatch = !filters.creationDate || (fPosition.creationDate !== null && formatDate(fPosition.creationDate).includes(filters.creationDate.toLowerCase()));
        const isLastModifiedMatch = !filters.lastModified || (fPosition.lastModified !== null && formatDate(fPosition.lastModified).includes(filters.lastModified.toLowerCase()));
        const isCreatedByUserIdMatch = !filters.createdByUserId || (fPosition.createdByUserId !== null && fPosition.createdByUserId.toLowerCase().startsWith(filters.createdByUserId.toLowerCase()));
        return (
            isIdMatch &&
            isCustomerNameMatch &&
            isNumberMatch &&
            isStatusNameMatch &&
            isComponentTypeIdMatch &&
            isCreationDateMatch &&
            isLastModifiedMatch &&
            isCreatedByUserIdMatch
        );
    });


    const reverseList = [...filteredList].sort((a, b) => b.number - a.number);

    //Przekierowanie do widoku zarządzania dostawą
    const navigate = useNavigate();

    const redirectToDetailView = (idFromDeliveryList: string) => {
        navigate(`/deliverymanagement/${idFromDeliveryList}`);
    };

    return {
        //Filtrowanie
        reverseList,
        filters,
        setFilters,
        //Przekierowanie do widoku zarządzania dostawą
        redirectToDetailView
    };
}