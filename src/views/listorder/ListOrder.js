import React, { useEffect } from "react";

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

    
    return (
        <div className={styles.wrapper}>
            <table className={styles.tableWrapper}>
                <thead>
                    <tr>
                        <th>Numer wewnętrzny<br />
                            <input
                                type="text"
                                value={filterId}
                                onChange={handleFilterIdChange}
                            />
                        </th>
                        <th>Numer zamówienia<br />
                            <input
                                type="text"
                                value={filterNumber}
                                onChange={handleFilterNumberChange}
                            />
                        </th>
                        <th>Status<br />
                            <input
                                type="text"
                                value={filterStatus}
                                onChange={handleFilterStatusChange}
                            />
                        </th>
                        <th>Nazwa klienta<br />
                            <input
                                type="text"
                                value={filterClientName}
                                onChange={handleFilterClientNameChange}
                            />
                        </th>
                        <th>Data utworzenia<br />
                            <input
                                type="text"
                                value={filterCreationDate}
                                onChange={handleFilterCreationDateChange}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems && currentItems.map(order => (
                        <tr
                            key={order.id}
                            className={`${styles.orderStatus} ${order.status === 'OK' ? styles.ok : styles.nok}`}
                            onClick={() => {
                                redirectToDetailView(order.id);
                                sessionStorage.setItem('orderId', JSON.stringify(order.id));
                            }}
                        >
                            <td>{order.id}</td>
                            <td>{order.number}</td>
                            <td>
                                {order.status}
                            </td>
                            <td>{order.clientName}</td>
                            <td>{formatDate(order.creationDate)}</td>
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





