import axios from "axios";
import { useEffect, useState } from "react";

export default function UseDeliveryAdd() {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({
        customerId: 0,
        componentTypeId: 0
    })
    const handleInputChange = (e: { target: any; }) => {
        const target = e.target;
        const name = target.name;
        console.log(formData);
        setFormData({
            ...formData,
            [name]: target.value
        })
    }
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [serwerResData, setSerwerResData] = useState<string>('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/deliveries`, {
                customerId: formData.customerId,
                componentTypeId: formData.componentTypeId
            })
                .then((res) => {
                    console.log(res);
                    console.log(formSubmitted);
                    setFormSubmitted(true);
                    setSerwerResData(res.data.id);
                })
        } catch (error) {
            console.error('Błąd podczas wysyłania danych: ', error);
        }
    };
    // Pobieranie do ustawienia listy wybieranej typów komponentów
    const [componentTypesList, setComponentTypesList] = useState([]);
    const getComponentTypeList = () => {
        axios.get(`${API_BASE_URL}/component-types`)
            .then((res) => {
                console.log(res);
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
                console.log(res);
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
        serwerResData,
        handleSubmit,
        handleInputChange,
        // Pobieranie do ustawienia listy wybieranej typów komponentów
        componentTypesList,
        // Pobieranie do ustawienia listy wybieranej klientów
        customersList
    };
}