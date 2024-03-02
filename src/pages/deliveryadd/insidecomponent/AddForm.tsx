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
    } = UseDeliveryAdd();

    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                handleSubmit(e);
                setFormSubmitted(true);
            }}
            action='http://172.22.126.11:8080/orderAdd'
            method='POST'
        >
            <h2>Dodaj Zamówienie</h2>
            <div className={styles.numberInput}>
                <label htmlFor='number'>Numer Zamówienia: </label>
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
                <label htmlFor='clientName'>Klient: </label>
                <input
                    type='text'
                    id='clientName'
                    name='clientName'
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <label htmlFor='typeOfMaterial'>Typ materiału: </label>
            <select
                id='typeOfMaterial'
                name='typeOfMaterial'
                value={formData.typeOfMaterial}
                onChange={handleInputChange}
                required
            >
                <option value=""></option>
                <option value="1">PÓŁKI WISZĄCE</option>
                <option value="2">PÓŁKI STOJĄCE</option>
                <option value="3">SKRZYNIE DACHOWE</option>
                <option value="4">KRATKI WENTYLACYJNE</option>
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