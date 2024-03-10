import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Biblioteka do dekodowania tokenów JWT
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Tworzenie kontekstu
export const UserContext = createContext();

// Tworzenie dostawcy kontekstu
export const LoggedUserProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token')); // Zalogowany użytkownik
  // Dekodowanie danych z tokenu JWT
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();
  const setLoggedInUserFromToken = () => {
    const token = sessionStorage.getItem('token'); // Pobranie tokenu z sessionStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedUser({ userId: decodedToken.id, username: decodedToken.username, roles: decodedToken.roles });
      } 
      catch (error) {
        console.error('Error decoding JWT token:', error);
        sessionStorage.removeItem('token');
        navigate('/'); // Przekierowanie użytkownika do innej strony w przypadku błędu
      }
    } else {
      navigate('/'); // Przekierowanie użytkownika do innej strony, jeśli nie ma tokenu
    }
  };
  useEffect(() => {
    setLoggedInUserFromToken();
  }, []);
  // Ustawienie domyślnego nagłówka dla postów
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : "";
  // Funkcja do ustawiania zalogowanego użytkownika
  const login = (userData) => {
    setToken(userData);
    console.log(userData);
    sessionStorage.setItem('token', userData.tokenJWT)
  };
  // Funkcja do wylogowywania użytkownika
  const logout = () => {
    setLoggedUser(null);
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };
  return (
    <UserContext.Provider value={{ loggedUser, login, logout, setLoggedInUserFromToken }}>
      {children}
    </UserContext.Provider>
  );
};
