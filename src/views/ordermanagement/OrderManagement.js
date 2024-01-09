import { useEffect } from "react";
import React from 'react';
import { Navigate } from "react-router-dom";

// @styles
import styles from './styles.module.scss';

//Hooks
import UseOrderManagement from "./UseOrderManagement";


function OrderManagement(props) {
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
        //Obsługa zmiany aktywności
        handleStatusChange,
    } = UseOrderManagement();

    useEffect(() => {
        getOrderData();
    }, [])
    if (props.access === 'administrator' || props.access === 'kierownik' || props.access === 'lider') {
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
                            <span>Ostatnia modyfikacja: {formatDate(dataOrder.lastModified !== null ? dataOrder.lastModified : 'brak')}</span>
                            <span>Numer klienta: {dataOrder.number}</span>
                            <span>status: {dataOrder.status}</span>
                        </div>
                    ))}
                    <div className={styles.btnBox}>
                        <button onClick={openFormAddComponent} className={styles.btn}>Dodaj Komponent</button>
                        <button
                            onClick={selectedRow === null ? null : openFormAddActivity}
                            className={selectedRow === null ? styles.nBtn : styles.btn}
                        >
                            Dodaj Aktywność
                        </button>
                    </div>
                    {showFormAddComponent && (
                        <div className={styles.formBox}>
                            <form
                                onSubmit={handleComponentAddSubmit}
                                action='http://172.22.126.11:8080/addComponentByOrdNumOrCompNum'
                                method="POST"
                            >
                                <input type="text" placeholder="Nazwa komponentu" name="componentName" onChange={handleFormComponentAddChange} required />
                                <input
                                    type="submit"
                                    value="Dodaj"
                                />
                            </form>
                            <button onClick={closeFormAddComponent} className={styles.btn}>Zamknij</button>
                        </div>
                    )}
                    {showFormAddActivity && (
                        <div className={styles.formBox}>
                            <form
                                onSubmit={handleActivityAddSubmit}
                                action='http://172.22.126.11:8080/componentActivityAdd'
                                method="POST"
                            >
                                <input type="text" placeholder="Nazwa aktywności" name="activityName" onChange={handleActivityAddChange} required />
                                <input
                                    type="submit"
                                    value="Dodaj"
                                />
                            </form>
                            <button onClick={closeFormAddActivity} className={styles.btn}>Zamknij</button>
                        </div>
                    )}
                </div>
                <table className={styles.componentTable}>
                    <thead>
                        <tr>
                            <th>Numer wewnętrzny</th>
                            <th>Nazwa komponentu</th>
                            <th>Data dodania</th>
                            <th>Lokalizacja</th>
                            <th>Ostatnia modyfikacja</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderComponents && orderComponents.map((dataComponent, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    onClick={() => handleRowClick(index, dataComponent.id)}
                                    className={`${dataComponent.status === 'OK' ? styles.ok : styles.nok} ${selectedRow === index ? styles.componentTrIsActive : ''}`}
                                >
                                    <td>{dataComponent.id}</td>
                                    <td>{dataComponent.componentName}</td>
                                    <td>{formatDate(dataComponent.creationDate)}</td>
                                    <td>{dataComponent.locationName}</td>
                                    <td>{dataComponent.lastModified !== null ? dataComponent.lastModified : 'brak'}</td>
                                    <td>{dataComponent.status}</td>
                                </tr>
                                {selectedRow === index && dataComponent.componentActivitiesList && dataComponent.componentActivitiesList.length > 0 && (
                                    <tr>
                                        <td colSpan="5">
                                            <table className={styles.activityTable}>
                                                <thead>
                                                    <tr>
                                                        <th>Nazwa aktywności</th>
                                                        <th>Data dodania</th>
                                                        <th>Ostatnia modyfikacja</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataComponent.componentActivitiesList.map((dataActivity, activityIndex) => (
                                                        <tr
                                                            key={activityIndex}
                                                            className={`${dataActivity.activityStatus === 'OK' ? styles.ok : styles.nok}`}
                                                        >
                                                            <td>{dataActivity.activityName}</td>
                                                            <td>{formatDate(dataActivity.creationDate)}</td>
                                                            <td>{dataActivity.lastModified !== null ? dataActivity.lastModified : 'brak'}</td>
                                                            <td className={styles.selectBox}>
                                                                <select
                                                                    className={`${dataActivity.activityStatus === 'OK' ? styles.ok : styles.nok}`}
                                                                    value={dataActivity.activityStatus}
                                                                    onChange={(e) => handleStatusChange(dataActivity.activityId, e.target.value)}
                                                                >
                                                                    <option value="OK" className={styles.ok}>OK</option>
                                                                    <option value="NOK" className={styles.nok}>NOK</option>
                                                                </select>
                                                            </td>
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
    } else if (props.access === 'pracownik') {
        return (<div>Brak dostepu... Wróć do menu</div>)
    }
}
export default OrderManagement;