import { useState } from 'react';
import './App.css';

// @components
import AppRoutes from './routes/AppRoutes';


function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('loggedUser')));
  const [loggedUsername, setLoggedUsername] = useState(JSON.parse(sessionStorage.getItem('loggedUserName')));
  const [userRights, setUserRights] = useState(null);

  return (
    <div className="App">
      <AppRoutes
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        loggedUsername={loggedUsername}
        setLoggedUsername={setLoggedUsername}
      />
    </div>
  );
}

export default App;
