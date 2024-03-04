import React from 'react';

//@Hooks
import UseDeliveryAdd from '../UseDeliveryAdd';

//@Styles
import styles from './styles.module.scss';

interface AddFormProps {
    setFormSubmitted: (value: boolean) => void;
}

const AddForm: React.FC<AddFormProps> = ({ setFormSubmitted }) => {

    const {
        formData,
        handleSubmit,
        handleInputChange,
        // Pobieranie do ustawienia listy wybieranej typów komponentów
        componentTypesList,
        // Pobieranie do ustawienia listy wybieranej klientów
        customersList
    } = UseDeliveryAdd();

    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                handleSubmit(e);
                setFormSubmitted(true);
            }}
            method='POST'
        >
            <h2>Dodaj Zamówienie</h2>
            <label htmlFor='customerId'>Klient: </label>
            <select
                id='customerId'
                name='customerId'
                value={formData.customerId}
                onChange={handleInputChange}
                required
            >
                <option value=""></option>
                {customersList.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
            </select>
            <label htmlFor='componentTypeId'>Typ materiału: </label>
            <select
                id='componentTypeId'
                name='componentTypeId'
                value={formData.componentTypeId}
                onChange={handleInputChange}
                required
            >
                <option value=""></option>
                {componentTypesList.map((componentType) => (
                    <option key={componentType.id} value={componentType.id}>{componentType.name}</option>
                ))}
            </select>
            <input
                type="submit"
                value="Dodaj"
                className={styles.btn}
            />
        </form>
    )
}
export default AddForm;