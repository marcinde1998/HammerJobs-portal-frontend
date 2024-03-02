import axios from "axios";
import { useState } from "react";

// @types
import { TUser } from "../../types/shared/user";

export default function UseAdminPanel() {
    //Zmienne środowiskowe
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const STOCK_PASSWORD = process.env.REACT_APP_STOCK_PASSWORD_FOR_USER;
    //Ustawianie formData
    const [formData, setFormData] = useState({
        username: '',
        password: STOCK_PASSWORD,
    });
    const handleInputChange = (e: { target: any; }) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        })
        console.log(formData);
    }
    //Obsługa wysyłania
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        console.log(formData);
        e.preventDefault();
        
        axios
            .post(`${API_BASE_URL}/users`, {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                getUserList();
            })
            .catch((error) => {
                //DODAJ OBSŁUGE BŁĘDÓW
            });
    }
    //Pobieranie listy użytkowników
    const [userList, setUserList] = useState<TUser[] | null>(null);
    const getUserList = () => {
        axios
            .get(`${API_BASE_URL}/users`)
            .then((res) => {
                setUserList(res.data)
                console.log(res.data);
            })
            .catch(() => {
                //DODAJ OBSŁUGE BŁĘDÓW
            })
    }
    // //formatowanie daty na normalną
    // function formatDate(dateString: string | number | Date) {
    //     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // }

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
        // formatDate
    };
}