// @components
import AppRoutes from './routes/AppRoutes';
import NavBar from './componetns/navbar/NavBar';


// @styles
import styles from './styles.module.scss';

// @Hooks
import UseApp from './UseApp';

function App() {
  const {
    //Sprawdzanie zalogowanego użytkownika
    loggedUser,
    setLoggedUser,
    //Sprawdzanie dostepu
    access,
    setAccess
  } = UseApp();
  return (
    <div className="App">
      <NavBar
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        setAccess={setAccess}
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
