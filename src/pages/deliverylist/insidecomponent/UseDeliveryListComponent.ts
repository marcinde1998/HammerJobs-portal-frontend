import { useState } from "react";

//@lib
import { DeliveryList } from '../../../lib/data/DataOrders';

//@components
import formatDate from "../../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

export default function UseDeliveryListComponent() {
    //Filtrowanie
    const [filters, setFilters] = useState({
        deliveryNumber: '',
        typeOfMaterial: '',
        status: '',
        clientName: '',
        creationDate: '',
        lastModified: '',
    });

    const filteredList = DeliveryList.filter(fPosition => {
        const isDeliveryNumberMatch = !filters.deliveryNumber || (fPosition.deliveryNumber !== null && fPosition.deliveryNumber.toLowerCase().startsWith(filters.deliveryNumber.toLowerCase()));
        const isTypeOfMaterialMatch = !filters.typeOfMaterial || (fPosition.typeOfMaterial !== null && fPosition.typeOfMaterial.toLowerCase().startsWith(filters.typeOfMaterial.toLowerCase()));
        const isStatusMatch = !filters.status || (fPosition.status !== null && fPosition.status.toLowerCase().startsWith(filters.status.toLowerCase()));
        const isClientNameMatch = !filters.clientName || (fPosition.clientName !== null && fPosition.clientName.toLowerCase().startsWith(filters.clientName.toLowerCase()));
        const isCreationDateMatch = !filters.creationDate || (fPosition.creationDate !== null && formatDate(fPosition.creationDate).includes(filters.creationDate.toLowerCase()));
        const isLastModifiedMatch = !filters.lastModified || (fPosition.lastModified !== null && formatDate(fPosition.lastModified).includes(filters.lastModified.toLowerCase()));

        return (
            isDeliveryNumberMatch &&
            isTypeOfMaterialMatch &&
            isStatusMatch &&
            isClientNameMatch &&
            isCreationDateMatch &&
            isLastModifiedMatch
        );
    });

    //Pobieranie danych dostawy
    const reverseList = [...filteredList].reverse();

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