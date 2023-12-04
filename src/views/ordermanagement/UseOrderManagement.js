import axios from 'axios';
import { useState } from 'react';

export default function UseOrderManagement() {
    //Pobieranie order details
    const [orderId, setOrderId] = useState(JSON.parse(sessionStorage.getItem('orderId')));
    const [orderData, setOrderData] = useState([]);

    const getOrderDetails = () => {
            axios
                .get('http://172.22.126.11:8080/orderById/' + orderId)
                .then((res) => {
                    setOrderData([res.data]);
                })
                .catch((error) => {
                    alert('Wystąpił błąd, spróbuj ponownie później');
                })
    }
    //formatowanie daty na normalną
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return {
        //Pobieranie order details
        getOrderDetails,
        //Dane zamówienia
        orderData,
        //formatopwanie na datę
        formatDate,
    };
}