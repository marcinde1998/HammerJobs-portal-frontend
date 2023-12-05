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
            <div className={styles.orderHeaderBox}>
                {orderData && orderData.map(data => (
                    <div
                        key={data.id}
                        className={styles.orderDataBox}
                    >
                        <span>Nr wewnętrzny: {data.id}</span>
                        <span>Nr klienta: {data.number}</span>
                        <span>Status: {data.status}</span>
                        <span>Nazwa klienta: {data.clientName}</span>
                        <span>Data wprowadzenia: {formatDate(data.creationDate)}</span>
                    </div>
                ))}
                <div className={styles.btnBox}>
                    <button>Dodaj Komponent</button>
                    <button>Dodaj Aktywność</button>
                </div>
            </div>
            <div className={styles.componentBox}>

            </div>
            <div className={styles.activitiesBox}>

            </div>
        </div>
    );
}
export default OrderManagement;