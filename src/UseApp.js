import { useState } from 'react';

export default function UseApp() {
     //Sprawdzanie zalogowanego użytkownika
    const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('loggedUser')));
    //Sprawdzanie dostepu
    const [access, setAccess] = useState(null);
    return {
        //Sprawdzanie zalogowanego użytkownika
        loggedUser,
        setLoggedUser,
        //Sprawdzanie dostepu
        access,
        setAccess
    };
}