import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

//Hooks
import UseAdminPanel from './UseAdminPanel';

// @styles
import styles from './styles.module.scss';


function AdminPanel(props) {
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
        formatDate
    } = UseAdminPanel();

    useEffect(() => {
        getUserList();
    }, []);

    if (props.access === null) {   
        return (
            <div>Loading...</div>
        );
    } else if (props.access === 'administrator') {
        return (

            <div className={styles.wrapper}>
                <form
                    className={styles.addUserFormBox}
                    onSubmit={handleSubmit}
                    action="http://172.22.126.11:8080/userAdd"
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
                        <label htmlFor="rights">Uprawnienia:</label>
                        <select
                            id="rights"
                            name="rights"
                            value={formData.rights}
                            onChange={handleInputChange}
                            required
                        >
                            <option value=""></option>
                            <option value="administrator">Administrator</option>
                            <option value="kierownik">Kierownik</option>
                            <option value="lider">Lider</option>
                            <option value="pracownik">Pracownik</option>
                        </select>
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
                                <th>Numer użytkownika</th>
                                <th>Login</th>
                                <th>Uprawnienia</th>
                                <th>Data dodania</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList && userList.map(users => (
                                <tr
                                    key={users.id}
                                >
                                    <td>{users.id}</td>
                                    <td>{users.username}</td>
                                    <td>{users.rights}</td>
                                    <td>{formatDate(users.creationDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (props.access !== 'administrator'){
        return <Navigate to='/mainmenu' />
    }

}
export default AdminPanel;