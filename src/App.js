import { useState } from 'react';
import './App.css';

// @components
import AppRoutes from './routes/AppRoutes';

function App() {
  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('loggedUser')));
  return (
    <div className="App">
        <AppRoutes
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
    </div>
  );
}
export default App;
