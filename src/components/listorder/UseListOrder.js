import axios from "axios";
import { useState } from "react";

export default function UseListOrder() {

    const [ordersList, setOrdersList] = useState();

    const getOrdersList = () => {
        axios
            .get('http://localhost:8080/ordersList')
            .then((res) => {
                setOrdersList(res.data);
            })
            .catch((error) => {
                alert('Wystąpił błąd, spróbuj ponownie później');
            });
    }
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    //Filtrowanie
    const [filterId, setFilterId] = useState("");
    const [filterNumber, setFilterNumber] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterClientName, setFilterClientName] = useState("");
    const [filterCreationDate, setFilterCreationDate] = useState("");
    const [localOrdersList, setLocalOrdersList] = useState([]);
    
    const handleFilterIdChange = (e) => {
        setFilterId(e.target.value);
    };

    const handleFilterNumberChange = (e) => {
        setFilterNumber(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleFilterClientNameChange = (e) => {
        setFilterClientName(e.target.value);
    };

    const handleFilterCreationDateChange = (e) => {
        setFilterCreationDate(e.target.value);
    };

    const filteredOrders = localOrdersList.filter(order => {
        const idCondition = order.id.toString().includes(filterId);
        const numberCondition = order.number.toString().includes(filterNumber);
        const statusCondition = order.status.toString().includes(filterStatus);
        const clientNameCondition = order.clientName.toLowerCase().includes(filterClientName.toLowerCase());
        const creationDateCondition = formatDate(order.creationDate).includes(filterCreationDate);

        return idCondition && numberCondition && statusCondition && clientNameCondition && creationDateCondition;
    });

    // Paginacja
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return {
        //pobieranie listy zamówień
        ordersList,
        getOrdersList,
        //formatopwanie na datę
        formatDate,
        //filtrowanie
        filterId,
        filterNumber,
        filterStatus,
        filterClientName,
        filterCreationDate,
        setLocalOrdersList,
        handleFilterIdChange,
        handleFilterNumberChange,
        handleFilterStatusChange,
        handleFilterClientNameChange,
        handleFilterCreationDateChange,
        // filteredOrders,
        currentItems,
        itemsPerPage,
        totalItems: filteredOrders.length,
        currentPage,
        paginate,
    };
}