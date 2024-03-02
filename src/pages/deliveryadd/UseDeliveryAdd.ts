import axios from "axios";
import { useState } from "react";


export default function UseDeliveryAdd() {

    const [formData, setFormData] = useState({
        number: '',
        clientName: '',
        typeOfMaterial: ''
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
            await axios.post('http://172.22.126.11:8080/orderAdd', {
                number: formData.number,
                clientName: formData.clientName
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

    return {
        formData,
        setFormData,
        formSubmitted,
        setFormSubmitted,
        serwerResData,
        handleSubmit,
        handleInputChange
    };
}