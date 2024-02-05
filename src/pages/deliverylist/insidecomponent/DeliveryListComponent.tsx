import React from 'react';

//@Styles
import styles from './styles.module.scss';

//@utils
import formatDate from '../../../utils/dateUtils';

//@components
import UseDeliveryListComponent from './UseDeliveryListComponent';

//@ types
interface IDelivery {
    id: string;
    typeOfMaterial: string;
    clientName: string;
    creationDate: string;
    lastModified: string | null;
    deliveryNumber: string;
    status: string;
}
export type TDelivery = IDelivery;

export default function DeliveryListComponent() {
    const {
        //Filtrowanie
        reverseList,
        filters,
        setFilters,
        //Przekierowanie do widoku zarządzania dostawą
        redirectToDetailView
    } = UseDeliveryListComponent();

    return (
        <div className={styles.wrapper}>
            <table className={styles.tableDeliveryWrapper}>
                <thead>
                    <tr>
                        <th>Dostawa<br />
                            <input
                                type="text"
                                value={filters.deliveryNumber}
                                onChange={e => setFilters({ ...filters, deliveryNumber: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Typ Materiału <br />
                            <input
                                type="text"
                                value={filters.typeOfMaterial}
                                onChange={e => setFilters({ ...filters, typeOfMaterial: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Status <br />
                            <input
                                type="text"
                                value={filters.status}
                                onChange={e => setFilters({ ...filters, status: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Nazwa Klienta<br />
                            <input
                                type="text"
                                value={filters.clientName}
                                onChange={e => setFilters({ ...filters, clientName: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Data Dodania <br />
                            <input
                                type="text"
                                value={filters.creationDate}
                                onChange={e => setFilters({ ...filters, creationDate: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Data Modyfikacji
                            <br />
                            <input
                                type="text"
                                value={filters.lastModified}
                                onChange={e => setFilters({ ...filters, lastModified: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reverseList && reverseList.map(list => (
                        <tr
                            key={list.id}
                            className={list.status === 'Zrealizowano' ? styles.realised : styles.tRealised}
                            onClick={() => {
                                redirectToDetailView(list.id);
                                sessionStorage.setItem('deliveryId', JSON.stringify(list.id));
                            }}
                        >
                            <td>{list.deliveryNumber}</td>
                            <td>{list.typeOfMaterial}</td>
                            <td>{list.status}</td>
                            <td>{list.clientName}</td>
                            <td>{formatDate(list.creationDate)}</td>
                            <td>{list.lastModified !== null ? formatDate(list.lastModified) : 'BRAK'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}