import React from 'react';

//@Hooks
import UseDeliveryAdd from '../UseDeliveryAdd';

//@Styles
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface AddFormProps {
    setFormSubmitted: (value: boolean) => void;
}

const NavButtons: React.FC<AddFormProps> = ({ setFormSubmitted }) => {
    const {
        serwerResData,
        setFormData
    } = UseDeliveryAdd();

    return (
        <div className={styles.orderAddNotification}>
            <h2>Dodano dostawę {serwerResData}</h2>
            <button
                className={styles.btn}
                onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                        number: '',
                        clientName: '',
                        typeOfMaterial: ''
                    });
                }}>Dodaj kolejną dostawę</button>
            <Link
                className={styles.aBtn}
                to='/listorder'
            >
                Przejdź do listy dostaw
            </Link>
            <Link
                className={styles.aBtn}
                to={`/deliverymanagement/${serwerResData}`}
                onClick={() => {
                    sessionStorage.setItem('orderId', serwerResData || '');
                }}
            >
                Przejdź do zamówienia
            </Link>
        </div>
    )
}
export default NavButtons;
