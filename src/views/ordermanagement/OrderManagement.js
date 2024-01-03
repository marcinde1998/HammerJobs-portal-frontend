import { useEffect } from "react";

// @styles
import styles from './styles.module.scss';



//Hooks
import UseOrderManagement from "./UseOrderManagement";

function OrderManagement() {
    const {
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
        handleComponentAddSubmit
    } = UseOrderManagement();
    useEffect(() => {
        getOrderData();
    }, [])
    return (
        <div className={styles.wrapper}>
            {/* //działające */}
            <div className={styles.orderHeaderBox}>
                {orderData && orderData.map(dataOrder => (
                    <div
                        key={dataOrder.id}
                        className={styles.orderDataBox}
                    >
                        <span>Nazwa klienta: {dataOrder.clientName}</span>
                        <span>Data dodania: {formatDate(dataOrder.creationDate)}</span>
                        <span>Numer wewnętrzny: {dataOrder.id}</span>
                        <span>Ostatnia modyfikacja: {dataOrder.lastModified !== null ? dataOrder.lastModified : 'brak'}</span>
                        <span>Numer klienta: {dataOrder.number}</span>
                        <span>status: {dataOrder.status}</span>
                    </div>
                ))}
                <div className={styles.btnBox}>
                    <button onClick={openFormAddComponent}>Dodaj Komponent</button>
                    <button>Dodaj Aktywność</button>
                </div>
                {showFormAddComponent && (
                    <div className={styles.formBox}>
                        <form
                            onSubmit={handleComponentAddSubmit}
                            action='http://172.22.126.11:8080/addComponentByOrdNumOrCompNum'
                            method="POST"
                        >
                            <input type="text" placeholder="Nazwa komponentu" name="componentName" onChange={handleFormComponentAddChange} />
                            <input
                                type="submit"
                                value="Dodaj"
                            />
                        </form>
                        <button onClick={closeFormAddComponent}>Zamknij</button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default OrderManagement;