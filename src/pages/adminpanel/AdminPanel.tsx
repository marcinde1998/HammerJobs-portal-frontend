import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// @components
import formatDate from '../../utils/dateUtils';

//Hooks
import UseAdminPanel from './UseAdminPanel';

// @styles
import styles from './styles.module.scss';

//@Types shared
import { IAccess } from '../../types/shared/access';



const AdminPanel: React.FC<IAccess> = ({ access }) => {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const {
        //Ustawianie formData
        formData,
        handleInputChange,
        //Obsługa wysyłania
        handleSubmit,
        //Pobieranie listy użytkowników
        getUserList,
        userList,
        //formatowanie na datę
    } = UseAdminPanel();

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div className={styles.wrapper}>
            <form
                className={styles.addUserFormBox}
                onSubmit={handleSubmit}
                action={`${API_BASE_URL}/users`}
                method="POST"
            >
                <div className={styles.formHeader}>
                    <h3>Dodaj użytkownika</h3>
                </div>
                <div className={styles.formContent}>
                    <label htmlFor="username">Nazwa użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className={styles.btn}
                        type="submit"
                        value="Dodaj"
                    />
                </div>
            </form>
            <div className={styles.userList}>
                <h4>Lista Użytkowników</h4>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.id}>Numer użytkownika</th>
                            <th>Login</th>
                            <th>Data dodania</th>
                            <th>Data zmiany</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList && userList.map(users => (
                            <tr
                                key={users.id}
                            >
                                <td className={styles.id}>{users.id}</td>
                                <td>{users.username}</td>
                                <td>{users.creationDate === null ? 'BRAK' : formatDate(users.creationDate)}</td>
                                <td>{users.lastModified === null ? 'BRAK' : formatDate(users.lastModified)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AdminPanel;