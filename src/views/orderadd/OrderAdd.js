import { Link, Navigate } from "react-router-dom";

//@Hooks
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

    if (props.access === null) {
        return (
            <div>Loading...</div>
        )
    } else if (props.access === 'administrator' || props.access === 'kierownik') {
        return (
            <div className={styles.wrapper}>
                {formSubmitted ? (
                    <div className={styles.orderAddNotification}>
                        <h2>Dodano zamówienie nr: {serwerResData}</h2>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                setFormSubmitted(false);
                                setFormData({
                                    number: '',
                                    clientName: ''
                                });
                            }}>Dodaj kolejne zamówienie</button>
                        <Link
                            className={styles.aBtn}
                            to='/listorder'
                        >
                            Przejdź do listy zamówień
                        </Link>
                        <Link
                            className={styles.aBtn}
                            to={`http://localhost:3000/ordermanagement/${serwerResData}`}
                            onClick={() => {
                                sessionStorage.setItem('orderId', serwerResData);
                            }}
                        >
                            Przejdź do zamówienia {serwerResData}
                        </Link>
                    </div>
                ) : (
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        action='http://172.22.126.11:8080/orderAdd'
                        method='POST'
                    >
                        <h2>Dodaj Zamówienie</h2>
                        <div className={styles.numberInput}>
                            <label htmlFor='number'>Numer Zamówienia:</label>
                            <input
                                type='text'
                                id='number'
                                name='number'
                                value={formData.number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={styles.clientInput}>
                            <label htmlFor='clientName'>Klient:</label>
                            <input
                                type='text'
                                id='clientName'
                                name='clientName'
                                value={formData.clientName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            value="Dodaj"
                            className={styles.btn}
                        />
                    </form>
                )}
            </div>
        )
    } else if (props.access === 'lider' || props.access === 'pracownik') {
        return (<Navigate to="/mainmenu" />)
    }
}
export default OrderAdd;