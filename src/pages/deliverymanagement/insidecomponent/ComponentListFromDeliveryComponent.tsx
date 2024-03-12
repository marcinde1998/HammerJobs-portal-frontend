import React, { useContext, useState } from 'react';
import { DeliveryContext } from 'contexts/Delivery';

// @styles
import styles from './styles.module.scss'

//@hooks
import UseComponentListFromDeliveryComponent from './UseComponentListFromDeliveryComponent';
import formatDate from 'utils/dateUtils';

export default function DeliveryListComponent() {
    const {
        //Pobieranie listy komponentow z dostawy
        deliveryData,
        // Dodawanie komponentu do zamówienia
        formDataComponentAdd,
        handleInputAddComponentChange,
        handleSubmitAddComponent,
        componentFromDelivery,
        subComponentsStatus,
        handleStatusSubcomponentChange
    } = UseComponentListFromDeliveryComponent();
    const { addComponentForm, setAddComponentForm, addSubcomponentsForm, setAddSubcomponentsForm } = useContext(DeliveryContext)
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {Array.isArray(deliveryData) && deliveryData.map(deliveryItem => (
                    <div
                        key={deliveryItem.id}
                    >
                        <div>
                            <div>id: {deliveryItem.id}</div>
                            <div>Numer: {deliveryItem.number}</div>
                            <div>StatusId: {deliveryItem.status.name}</div>
                            <div>componentTypeId: {deliveryItem.componentTypeId}</div>
                            <div>createdByUserId: {deliveryItem.createdByUserId}</div>
                            <div>customerId: {deliveryItem.customer.name}</div>
                            <div>creationDate: {deliveryItem.creationDate}</div>
                            <div>lastModified: {deliveryItem.lastModified}</div>
                        </div>
                    </div>
                ))}
                <div className={styles.buttons}>
                    <button onClick={(() => setAddComponentForm(true))}>Dodaj Komponent</button>
                    <button>Modyfikuj Zamówienie</button>
                    <button>Modyfikuj Zamówienie</button>
                </div>
                {addComponentForm &&
                    <div className={styles.addComponentForm}>
                        <div>
                            <h3>Dodaj Komponent</h3>
                            <form
                                className={styles.FormBox}
                                onSubmit={handleSubmitAddComponent}
                                method="POST">
                                <div>
                                    <label htmlFor="productionDate">Data Produkcji:</label>
                                    <input
                                        type="date"
                                        id="productionDate"
                                        name="productionDate"
                                        value={formDataComponentAdd.productionDate}
                                        onChange={handleInputAddComponentChange}
                                    // required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="controlDate">Data Kontroli:</label>
                                    <input
                                        type="date"
                                        id="controlDate"
                                        name="controlDate"
                                        value={formDataComponentAdd.controlDate}
                                        onChange={handleInputAddComponentChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="nameOne">Nr. ,,Gl":</label>
                                    <input
                                        type="text"
                                        id="nameOne"
                                        name="nameOne"
                                        value={formDataComponentAdd.nameOne}
                                        onChange={handleInputAddComponentChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="nameTwo">Nazwa:</label>
                                    <input
                                        type="text"
                                        id="nameTwo"
                                        name="nameTwo"
                                        value={formDataComponentAdd.nameTwo}
                                        onChange={handleInputAddComponentChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="oldMonNumber">Nr mon OLD:</label>
                                    <input
                                        type="text"
                                        id="oldMonNumber"
                                        name="oldMonNumber"
                                        value={formDataComponentAdd.oldMonNumber}
                                        onChange={handleInputAddComponentChange}
                                        minLength={6}
                                        maxLength={6}
                                        pattern="[^\s]+"
                                    // required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newMonNumber">Nr mon NEW:</label>
                                    <input
                                        type="text"
                                        id="newMonNumber"
                                        name="newMonNumber"
                                        value={formDataComponentAdd.newMonNumber}
                                        onChange={handleInputAddComponentChange}
                                        minLength={9}
                                        maxLength={9}
                                        pattern="[^\s]+"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="size">Stan Magazynu:</label>
                                    <input
                                        type="text"
                                        id="size"
                                        name="size"
                                        value={formDataComponentAdd.size}
                                        onChange={handleInputAddComponentChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        className={styles.btn}
                                        type='submit'
                                        value='Dodaj'
                                    />
                                    <button onClick={(() => setAddComponentForm(false))}>Zamknij</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                {addSubcomponentsForm &&
                    <div className={styles.selectStatus}>
                        <h3>Ustaw Status</h3>
                        <form
                            className={styles.setStatusForm}
                            onSubmit={(() =>setAddSubcomponentsForm(false))}
                        >
                            {subComponentsStatus && subComponentsStatus.map(list => (
                                <div
                                    key={list.id}
                                    className={styles.setStatusSelects}
                                >
                                    <label>{list.name}</label>
                                    <select onChange={((e) => handleStatusSubcomponentChange(e.target.value, list.id))} required>
                                        <option></option>
                                        <option value={3}>OK</option>
                                        <option value={2}>NOK</option>
                                    </select>
                                </div>
                            ))}
                            <div>
                            <input value='Ustaw Status' type='submit'></input>
                            </div>
                        </form>
                    </div>}
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Numer Wewnetrzny</th>
                            <th>Nr ,,GL"</th>
                            <th>Nazwa</th>
                            <th>Typ Komponentu</th>
                            <th>Dodane Przez</th>
                            <th>Data dodania</th>
                            <th>Data zmiany</th>
                            <th>Status</th>
                            <th>Magazyn</th>
                            <th>Pozycja</th>
                            <th>Numer mon OLD</th>
                            <th>Numer mon NEW</th>
                            <th>Data Produkcji</th>
                            <th>Data Kontroli</th>
                            <th>Rozmiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentFromDelivery && componentFromDelivery.map(componentItem => (
                            <tr
                                key={componentItem.id}
                            >
                                <td>{componentItem.insideNumber}</td>
                                <td>{componentItem.nameOne}</td>
                                <td>{componentItem.nameTwo}</td>
                                <td>{componentItem.componentType.name}</td>
                                <td>{componentItem.createdByUserId}</td>
                                <td>{formatDate(componentItem.creationDate)}</td>
                                <td>{formatDate(componentItem.lastModified)}</td>
                                <td>{componentItem.status.name}</td>
                                <td>{componentItem.warehouse.name}</td>
                                <td>{componentItem.warehousePosition.name}</td>
                                <td>{componentItem.oldMonNumber ? componentItem.oldMonNumber : 'BRAK'}</td>
                                <td>{componentItem.newMonNumber}</td>
                                <td>{formatDate(componentItem.productionDate)}</td>
                                <td>{formatDate(componentItem.controlDate)}</td>
                                <td>{componentItem.size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}