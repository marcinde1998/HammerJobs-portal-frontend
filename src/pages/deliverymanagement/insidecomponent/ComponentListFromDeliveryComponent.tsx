import React from 'react';

//@hooks
import UseComponentListFromDeliveryComponent from './UseComponentListFromDeliveryComponent';

//@Styles
import styles from './styles.module.scss';

//@components
import formatDate from '../../../utils/dateUtils';

//@ types
interface IDeliveryData {
    id: string,
    typeOfMaterial: string,
    clientName: string,
    creationDate: string,
    lastModified: string,
    deliveryNumber: string,
    status: string,

} export type TDeliveryData = IDeliveryData;

interface IDeliveryListComponents {
    id: string,
    deliveryId: string,
    componentNumber: string,
    status: string,
    typeOfMaterial: string,
    dateOfProduction: string,
    dateOfControl: string,
    typeOfComponent: string,
    nrIndex: string,
    nrMonOld: string,
    nrMonNew: string,
    dimensions: string,
    creationDate: string,
    lastModified: string,
    subComponentsStatus: [
        {
            //OPRÓCZ OK I NOK
            boczekLewy: string, //NAPRAWIONO
            boczekPrawy: string, //NAPRAWIONO
            srebrnaListwaFront: string, //NAPRAWIONO
            szklanyKlosz: string, //WYMIANA
            plastikowyKlosz: string, //WYMIANA
            wiazka: string, //WYMIANA
            oswietlenie: string, //WYMIANA
            bialaListwaCentralna: string; //NAPRAWIONO
        }
    ]
} export type TDeliveryListComponents = IDeliveryListComponents;

export default function DeliveryListComponent() {
    const {
        //Pobieranie listy komponentow z dostawy
        dataDelivery,
        reverseList
    } = UseComponentListFromDeliveryComponent();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {dataDelivery && dataDelivery.map(deliveryData => (
                    <div
                        key={deliveryData.id}
                        className={styles.dataDelivery}
                    >
                        <div className={styles.col1}>
                            <div>Typ Materiału: {deliveryData.typeOfMaterial}</div>
                            <div>Nazwa Klienta: {deliveryData.clientName}</div>
                            <div>Dostawa: {deliveryData.deliveryNumber}</div>
                        </div>
                        <div className={styles.col2}>
                            <div>Status: {deliveryData.status}</div>
                            <div>Data dodania: {formatDate(deliveryData.creationDate)}</div>
                            <div>Data Modyfikacji: {formatDate(deliveryData.lastModified)}</div>
                        </div>
                    </div>
                ))}
                <div className={styles.buttons}>
                    <button>Dodaj Komponent</button>
                    <button>Modyfikuj Zamówienie</button>
                    <button>Modyfikuj Zamówienie</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numer komponentu</th>
                        <th>Typ</th>
                        <th>Nr Indexu</th>
                    </tr>
                </thead>
                <tbody>
                    {reverseList && reverseList.map(componentsList => (
                        <tr
                            key={componentsList.id}
                        >
                            <td>{componentsList.componentNumber}</td>
                            <td>{componentsList.typeOfComponent}</td>
                            <td>{componentsList.nrIndex}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}