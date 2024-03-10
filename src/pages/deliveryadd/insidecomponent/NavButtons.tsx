import React, { useContext, useEffect } from 'react';
import { DeliveryContext } from 'contexts/Delivery';

//@Hooks
import UseDeliveryAdd from '../UseDeliveryAdd';

//@Styles
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const NavButtons: React.FC = () => {
    const { deliveryNumber, setDeliveryNumber, setFormSubmitted, deliveryId } = useContext(DeliveryContext);

    const {
        setFormData
    } = UseDeliveryAdd();
    
    return (
        <div className={styles.orderAddNotification}>
            <h2>Dodano dostawę {deliveryNumber}</h2>
            <button
                className={styles.btn}
                onClick={() => {
                    setDeliveryNumber(null)
                    setFormSubmitted(false);
                    setFormData({
                        customerId: 0,
                        componentTypeId: 0
                    });
                }}>Dodaj kolejną dostawę</button>
            <Link
                className={styles.aBtn}
                to='/deliverylist'
                onClick={() => {
                    setFormSubmitted(false);
                    setDeliveryNumber(null)
                }}
            >
                Przejdź do listy dostaw
            </Link>
            <Link
                className={styles.aBtn}
                to={`/deliverymanagement/${deliveryId}`}
                onClick={() => {
                    setFormSubmitted(false);
                    setDeliveryNumber(null)
                }}
            >
                Przejdź do dostawy
            </Link>
        </div>
    )
}
export default NavButtons;
