import { Route, Routes } from "react-router-dom";

//@components
import HomeLogin from '../components/homelogin/HomeLogin';

//@subpages
import AdministatorPage from '../subpages/administrator/AdministatorPage';
import ManagerPage from '../subpages/manager/ManagerPage';
import LeaderPage from '../subpages/leader/LeaderPage';
import EmployeePage from '../subpages/employee/EmployeePage';
import AddOrder from "../components/addorder/AddOrder";


const AppRoutes = (props) => {
    return (
        <Routes>
            {/* //@components */}
            <Route
                path='/'
                element={<HomeLogin
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />}
            />
            <Route
                path='/addorder'
                element={<AddOrder
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />}
            />
            {/* //@subpages */}
            <Route
                path='/administratorpage'
                element={<AdministatorPage
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />} />
            <Route
                path='/managerpage'
                element={<ManagerPage
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />} />
            <Route
                path='/leaderpage'
                element={<LeaderPage
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />} />
            <Route
                path='/employeepage'
                element={<EmployeePage
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />} />
        </Routes>
    );
}
export default AppRoutes;