import axios from "axios";
import { DeliveryContext } from "../../contexts/Delivery";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function UseDeliveryAdd() {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { setDeliveryNumber, formSubmitted, setFormSubmitted, setDeliveryId } = useContext(DeliveryContext);
    const [formData, setFormData] = useState({
        customerId: 0,
        componentTypeId: 0
    })
    const handleInputChange = (e: { target: any; }) => {
        const target = e.target;
        const name = target.name;
        const value = parseInt(target.value);
        console.log(formData);
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // useEffect(() => {
    //     console.log(deliveryNumber);
    //     console.log(formSubmitted);
    // }, [deliveryNumber, formSubmitted])

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios
            .post(`${API_BASE_URL}/deliveries`, {
                customerId: formData.customerId,
                componentTypeId: formData.componentTypeId
            })
            .then((res) => {
                console.log(res)
                setFormSubmitted(true)
                setDeliveryNumber(res.data.number)
                setDeliveryId(res.data.id)
            })
            .catch((error) => {
                console.error('Błąd podczas wysyłania danych: ', error);
            });
    };
    // Pobieranie do ustawienia listy wybieranej typów komponentów
    const [componentTypesList, setComponentTypesList] = useState([]);
    const getComponentTypeList = () => {
        axios.get(`${API_BASE_URL}/component-types`)
            .then((res) => {
                setComponentTypesList(res.data);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    // Pobieranie do ustawienia listy wybieranej klientów
    const [customersList, setCustomersList] = useState([]);
    const getCustomersList = () => {
        axios.get(`${API_BASE_URL}/customers`)
            .then((res) => {
                setCustomersList(res.data);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    useEffect(() => {
        getComponentTypeList();
        getCustomersList();
    }, []);

    return {
        formData,
        setFormData,
        formSubmitted,
        setFormSubmitted,
        handleSubmit,
        handleInputChange,
        // Pobieranie do ustawienia listy wybieranej typów komponentów
        componentTypesList,
        // Pobieranie do ustawienia listy wybieranej klientów
        customersList
    };
}