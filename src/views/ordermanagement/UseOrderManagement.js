import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UseOrderManagement() {
    //Zapisywanie id zamówienia w sessionstorage
    const [orderIdFromSessionStorage, setOrderIdFromSessionStorage] = useState();
    const getIdFromSessionStorage = () => {
        const orderId = sessionStorage.getItem('orderId');
        console.log('OrderId from sessionStorage:', orderId)
        setOrderIdFromSessionStorage(orderId);
    }
    const getOrderDetails = () => {
        if (orderIdFromSessionStorage) {
            axios
                .get('http://localhost:8080/orderById/' + orderIdFromSessionStorage)
                .then((res) => {
                    // sessionStorage.setItem('orderId', JSON.stringify(res.data.id));
                    console.log(res.data);
                })
                .catch((error) => {
                    alert('Wystąpił błąd, spróbuj ponownie później');
                });
        }
    }
    return {
        getIdFromSessionStorage,
        getOrderDetails,
        orderIdFromSessionStorage
    };
}