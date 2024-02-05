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
                rights: formData.rights
            })
            .then((res) => {
                getUserList();
            })
            .catch((error) => {
                //DODAJ OBSŁUGE BŁĘDÓW
            });
    }
    //Pobieranie listy użytkowników
    const [userList, setUserList] = useState();
    const getUserList = () => {
        axios
            .get('http://172.22.126.11:8080/userList')
            .then((res) => {
                setUserList(res.data)
                console.log(res.data);
            })
            .catch (() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    //formatowanie daty na normalną
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return {
        //Ustawianie formData
        formData,
        handleInputChange,
        //Obsługa wysyłania
        handleSubmit,
        //Pobieranie listy użytkowników
        getUserList,
        userList,
        //formatowanie na datę
        formatDate
    };
}