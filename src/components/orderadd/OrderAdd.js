import { Link } from "react-router-dom";

//@Hooks
import { useEffect } from 'react';
import UseOrderAdd from '../orderadd/UseOrderAdd';

//@Styles
import styles from './styles.module.scss';

function OrderAdd(props) {
    const {
        formData,
        formSubmitted,
        serwerResData,
        handleInputChange,
        handleSubmit,
        setFormSubmitted,
        setFormData
    } = UseOrderAdd();
    const rights = 'administrator';
    useEffect(() => {
        if (props.access === null || props.access !== rights) {
            const timeoutId = setTimeout(() => {
                window.location.reload();
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [props.access]);
    if (rights !== props.access) {
        return (
            <div>Brak dostępu...</div>
        )
    } else if (rights === props.access) {
        return (
            <div className={styles.wrapper}>
                {formSubmitted ? (
                    <div>
                        <h2>Dodano zamówienie {serwerResData}</h2>
                        <button onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                                number: '',
                                clientName: ''
                            });
                        }}>Dodaj kolejne zamówienie</button>
                        <Link>Przejdź do listy zamówień</Link>
                    </div>
                ) : (

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        action='http://localhost:8080/orderAdd'
                        method='POST'
                    >
                        <h2>Dodaj Zamówienie</h2>
                        <label htmlFor='number'>Numer Zamówienia:</label>
                        <input
                            type='text'
                            id='number'
                            name='number'
                            value={formData.number}
                            onChange={handleInputChange}
                        /><br />
                        <label htmlFor='clientName'>Klient</label>
                        <input
                            type='text'
                            id='clientName'
                            name='clientName'
                            value={formData.clientName}
                            onChange={handleInputChange}
                        /><br />
                        <input
                            type="submit"
                            value="Zapisz"
                        />
                    </form>
                )}
            </div>
        )
    }

}
export default OrderAdd;