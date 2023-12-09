import axios from "axios";
import { useState } from "react";

export default function UseAdminPanel() {
    //Ustawianie formData
    const [formData, setFormData] = useState({
        username: '',
        password: 'HJ2023',
        rights: ''
    });
    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        })
        console.log(formData);
    }
    //Obsługa wysyłania
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://172.22.126.11:8080/userAdd', {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                //DODAJ OBSŁUGE BŁĘDÓW
            });
    }
    //Pobieranie listy użytkowników

    return {
        //Ustawianie formData
        formData,
        handleInputChange,
         //Obsługa wysyłania
         handleSubmit
    };
}