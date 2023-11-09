//@Hooks
import { useEffect } from 'react';
import UseOrderAdd from '../orderadd/UseOrderAdd';

//@Styles
import styles from './styles.module.scss';

function OrderAdd(props) {
    const {
        formData,
        setFormData,
        handleInputChange,
        handleSubmit
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
                <h2>Dodaj Zamówienie</h2>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    action='' //do wypełnienia
                    method='POST'
                >
                    <label htmlFor='orderNumber'>Numer Zamówienia:</label>
                    <input
                        type='text'
                        id='orderNumber'
                        name='orderNumber'
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                    ></input><br />
                    <label htmlFor='clientName'>Klient</label>
                    <input
                        type='text'
                        id='clientName'
                        name='clientName'
                        value={formData.clientName}
                        onChange={handleInputChange}
                    ></input><br />
                    <input
                        type="submit"
                        value="Zapisz"
                    />
                </form>
            </div>
        )
    }

}
export default OrderAdd;