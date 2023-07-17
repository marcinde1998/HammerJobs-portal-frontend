import { useState } from 'react';
import './App.css';

// @components
import AppRoutes from './routes/AppRoutes';


function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('loggedUser')));
  const [rule, setRule] = useState(JSON.parse(sessionStorage.getItem('rule')));

  return (
    <div className="App">
      <AppRoutes
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        rule={rule}
        setRule={setRule}
      />
    </div>
  );
}

export default App;
