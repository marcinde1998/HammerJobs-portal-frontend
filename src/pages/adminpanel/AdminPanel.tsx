import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from "../../contexts/LoggedUser";

// @components
import AccessDenied from 'components/shared/accessDenied/AccessDenied';
import LoadingComponent from 'components/shared/loadingcomponent/LoadingComponent';

//Hooks
import UseAdminPanel from './UseAdminPanel';

// @styles
import styles from './styles.module.scss';

// @utils
import { checkUserRole } from '../../utils/authUtils';
import formatDate from '../../utils/dateUtils';


const AdminPanel: React.FC = () => {
    //Zabezpieczenie strony
    const { loggedUser } = useContext(UserContext);
    const allowedRoles = ["admin"];
    const isAuthorized = checkUserRole(loggedUser, allowedRoles);
    //Hook
    const {
        //Ustawianie formData
        formData,
        handleInputChange,
        //Obsługa wysyłania
        handleSubmit,
        //Pobieranie listy użytkowników
        getUserList,
        userList,
    } = UseAdminPanel();
    useEffect(() => {
        getUserList();
    }, []);
    if (!isAuthorized) {
        return (<AccessDenied />);
    }else if (isAuthorized) {
        return (
            <div className={styles.wrapper}>
                <form
                    className={styles.addUserFormBox}
                    onSubmit={handleSubmit}
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
    } else {
        return (<LoadingComponent /> )
    }
}
export default AdminPanel;