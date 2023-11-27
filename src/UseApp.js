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

// setLoggedUser(JSON.parse(sessionStorage.getItem('loggedUser')));
// axios
//     .post('http://localhost:8080/decodeToken', {
//         token: JSON.parse(sessionStorage.getItem('loggedUser'))
//     })
//     .then((res) => {
//         setAccess(res.data.userRole);
//         console.log('Kod dostępu: ' + res.data.userRole);
//         console.log('Oto zalogowany użytkownik: ' + props.loggedUser)
//         console.log('test');
//     })
//     .catch((error) => {
//         alert('Wystąpił błąd spróbuj ponownie później');
//     });

// const [loggedUser, setLoggedUser] = useState(null);
// const [access, setAccess] = useState(null);

// setLoggedUser,
// setAccess,
// access,
// loggedUser