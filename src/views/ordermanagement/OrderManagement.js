import { useEffect } from "react";

// @styles
import styles from './styles.module.scss';

//Hooks
import UseOrderManagement from "./UseOrderManagement";

function OrderManagement() {
    const {
        //Pobieranie order details
        getOrderDetails,
        //Dane zamówienia
        orderData,
        //formatopwanie na datę
        formatDate,
    } = UseOrderManagement();

    useEffect(() => {
        getOrderDetails();
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className={styles.orderDataBox}>
                {orderData && orderData.map(data => (
                    <div
                    key={data.id}
                    >
                    <span>Nr wewnętrzny: {data.id}</span>
                    <span>Nr klienta: {data.number}</span>
                    <span>Status: {data.status}</span>
                    <span>Nazwa klienta: {data.clientName}</span>
                    <span>Data wprowadzenia: {formatDate(data.creationDate)}</span>
                    </div> 
               ))}
            </div>
        </div>
    );
}
export default OrderManagement;