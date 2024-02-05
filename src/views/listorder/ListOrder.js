import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';

//@Hooks
import UseListOrder from "./UseListOrder";

//@Styles
import styles from './styles.module.scss';

function ListOrder(props) {
    const {
        //pobieranie listy zamówień
        ordersList,
        getOrdersList,
        //formatopwanie na datę
        formatDate,
        //filtrowanie
        filterId,
        filterNumber,
        filterStatus,
        filterClientName,
        filterCreationDate,
        setLocalOrdersList,
        handleFilterIdChange,
        handleFilterNumberChange,
        handleFilterStatusChange,
        handleFilterClientNameChange,
        handleFilterCreationDateChange,
        currentItems,
        itemsPerPage,
        totalItems,
        currentPage,
        paginate,
        //Przekierowanie widok zarzadzanie zamówienia
        redirectToDetailView
    } = UseListOrder();

    useEffect(() => {
        getOrdersList();
    }, []);

    useEffect(() => {
        setLocalOrdersList(ordersList || []);
    }, [ordersList, setLocalOrdersList]);

    if (props.access === 'administrator' || props.access === 'kierownik' || props.access === 'lider') {
        return (
            <div className={styles.wrapper}>
                <table className={styles.tableWrapper}>
                    <thead className={styles.orderListTheadWrapper}>
                        <tr className={styles.orderListTrWrapper}>
                            <th className={styles.insideNumber}>Numer wewnętrzny<br />
                                <input
                                    type="text"
                                    value={filterId}
                                    onChange={handleFilterIdChange}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th className={styles.orderNumber}>Numer zamówienia<br />
                                <input
                                    type="text"
                                    value={filterNumber}
                                    onChange={handleFilterNumberChange}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th className={styles.status}>Status<br />
                                <input
                                    type="text"
                                    value={filterStatus}
                                    onChange={handleFilterStatusChange}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th className={styles.clientName}>Nazwa klienta<br />
                                <input
                                    type="text"
                                    value={filterClientName}
                                    onChange={handleFilterClientNameChange}
                                    placeholder="Filtruj..."
                                />
                            </th>
                            <th className={styles.date}>Data utworzenia<br />
                                <input
                                    type="text"
                                    value={filterCreationDate}
                                    onChange={handleFilterCreationDateChange}
                                    placeholder="Filtruj..."
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.map(order => (
                            <tr
                                key={order.id}
                                className={`${order.status === 'OK' ? styles.ok : styles.nok}`}
                                onClick={() => {
                                    redirectToDetailView(order.id);
                                    sessionStorage.setItem('orderId', JSON.stringify(order.id));
                                }}
                            >
                                <td className={styles.insideNumber}>{order.id}</td>
                                <td>{order.number}</td>
                                <td>{order.status}</td>
                                <td className={styles.clientName}>{order.clientName}</td>
                                <td className={styles.date}>{formatDate(order.creationDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
    if (props.access === 'pracownik') {
        return (<Navigate to ="/mainmenu"/>)
    }
}

export default ListOrder;

// Komponent paginacji
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? styles.active : ''}>
                        <a onClick={() => paginate(number)} href="#!">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};