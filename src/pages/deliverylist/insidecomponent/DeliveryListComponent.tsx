import React, { useContext } from 'react';
import { DeliveryContext } from 'contexts/Delivery';

//@Styles
import styles from './styles.module.scss';

//@utils
import formatDate from '../../../utils/dateUtils';

//@components
import UseDeliveryListComponent from './UseDeliveryListComponent';


export default function DeliveryListComponent() {
    const { setDeliveryId } = useContext(DeliveryContext)
    
    const {
        //Filtrowanie
        reverseList,
        filters,
        setFilters,
        //Przekierowanie do widoku zarządzania dostawą
        redirectToDetailView
    } = UseDeliveryListComponent();
    console.log(reverseList);

    return (
        <div className={styles.wrapper}>
            <table className={styles.tableDeliveryWrapper}>
                <thead>
                    <tr>
                        <th>ID<br />
                            <input
                                type="text"
                                value={filters.id}
                                onChange={e => setFilters({ ...filters, id: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Klient <br />
                            <input
                                type="text"
                                value={filters.customerName}
                                onChange={e => setFilters({ ...filters, customerName: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Numer Dostawy <br />
                            <input
                                type="text"
                                value={filters.number}
                                onChange={e => setFilters({ ...filters, number: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Status<br />
                            <input
                                type="text"
                                value={filters.statusName}
                                onChange={e => setFilters({ ...filters, statusName: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Typ Komponentu <br />
                            <input
                                type="text"
                                value={filters.componentTypeId}
                                onChange={e => setFilters({ ...filters, componentTypeId: e.target.value })}
                                placeholder="Filtruj..."
                            />
                        </th>
                        <th>Data Dodania
                            <br />
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
                        <th>id użytkownika
                            <br />
                            <input
                                type="text"
                                value={filters.createdByUserId}
                                onChange={e => setFilters({ ...filters, createdByUserId: e.target.value })}
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
                                setDeliveryId(list.id);
                            }}
                        >
                            <td>{list.id}</td>
                            <td>{list.customer.name}</td>
                            <td>{list.number}</td>
                            <td>{list.status.name}</td>
                            <td>{list.componentTypeId}</td>
                            <td>{formatDate(list.creationDate)}</td>
                            <td>{formatDate(list.lastModified)}</td>
                            <td>{list.createdByUserId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}