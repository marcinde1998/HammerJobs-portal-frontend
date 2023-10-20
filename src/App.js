import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

// @components
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/navbar/NavBar';

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('loggedUser')));
  const [access, setAccess] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('loggedUser');
    setLoggedUser(null);
    navigate('/');
  }
  return (
    <div className="App">
      <NavBar 
      loggedUser={loggedUser}
      setLoggedUser={setLoggedUser}
      access={access}
      />
      <AppRoutes
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        access={access}
        setAccess={setAccess}
      />
    </div>
  );
}
export default App;
