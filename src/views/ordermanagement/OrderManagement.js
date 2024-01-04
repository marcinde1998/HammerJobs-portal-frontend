import { useEffect } from "react";

// @styles
import styles from './styles.module.scss';

import React from 'react';

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
    } = UseOrderManagement();
    useEffect(() => {
        getOrderData();
    }, [])
    return (
        <div className={styles.wrapper}>
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
                    <button onClick={openFormAddActivity}>Dodaj Aktywność</button>
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
                {showFormAddActivity && (
                    <div className={styles.formBox}>
                        <form
                            onSubmit={handleActivityAddSubmit}
                            action='http://172.22.126.11:8080/activityAdd'
                            method="POST"
                        >
                            <input type="text" placeholder="Nazwa aktywności" name="name" onChange={handleActivityAddChange} />
                            <input
                                type="submit"
                                value="Dodaj"
                            />
                        </form>
                        <button onClick={closeFormAddActivity}>Zamknij</button>
                    </div>
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numer wewnętrzny</th>
                        <th>Nazwa komponentu</th>
                        <th>Data dodania</th>
                        <th>Ostatnia modyfikacja</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderComponents && orderComponents.map((dataComponent, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => handleRowClick(index)}>
                                <td>{dataComponent.id}</td>
                                <td>{dataComponent.componentId}</td>
                                <td>{formatDate(dataComponent.creationDate)}</td>
                                <td>{dataComponent.lastModified !== null ? dataComponent.lastModified : 'brak'}</td>
                                <td>{dataComponent.status}</td>
                            </tr>
                            {selectedRow === index && dataComponent.componentActivitiesList && dataComponent.componentActivitiesList.length > 0 && (
                                <tr>
                                    <td colSpan="5"> {/* Używamy colSpan, aby wypełnić cały wiersz */}
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nazwa aktywności</th>
                                                    <th>Data dodania</th>
                                                    <th>Ostatnia modyfikacja</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataComponent.componentActivitiesList.map((dataActivity, activityIndex) => (
                                                    <tr key={activityIndex}>
                                                        <td>{dataActivity.activityName}</td>
                                                        <td>{formatDate(dataActivity.creationDate)}</td>
                                                        <td>{dataActivity.lastModified !== null ? dataActivity.lastModified : 'brak'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default OrderManagement;