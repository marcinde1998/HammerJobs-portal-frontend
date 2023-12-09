//Hooks
import { useState } from 'react';
import UseAdminPanel from './UseAdminPanel';

// @styles
import styles from './styles.module.scss';
import axios from 'axios';

function AdminPanel(props) {
    const {
        //Ustawianie formData
        formData,
        handleInputChange,
        //Obsługa wysyłania
        handleSubmit
    } = UseAdminPanel();



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
            </div>
        </div>
    );
}
export default AdminPanel;