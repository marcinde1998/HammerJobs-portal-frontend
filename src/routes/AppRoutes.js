import { Route, Routes } from "react-router-dom";

//@components
import HomeLogin from '../components/homelogin/HomeLogin';

//@subpages
import AdministatorPage from '../subpages/administrator/AdministatorPage';
import ManagerPage from '../subpages/manager/ManagerPage';
import LeaderPage from '../subpages/leader/LeaderPage';
import EmployeePage from '../subpages/employee/EmployeePage';
import AddOrder from "../components/addorder/AddOrder";
import { useEffect } from "react";
import axios from "axios";

const AppRoutes = (props) => {
    const checkAccess = () => {
        if (props.loggedUser) {
            axios
                .post('http://localhost:8080/decodeToken', {
                    token: props.loggedUser
                })
                .then((res) => {
                    props.setAccess(res.data.userRole);
                })
                .catch((error) => {
                    alert('Wystąpił błąd spróbuj ponownie później');
                });
        }
    }
    useEffect(() => {
        checkAccess();
    }, []);
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
                />}
            />
            {/* //@subpages */}
            <Route
                path='/administratorpage'
                element={<AdministatorPage
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
            <Route
                path='/managerpage'
                element={<ManagerPage
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
            <Route
                path='/leaderpage'
                element={<LeaderPage
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
            <Route
                path='/employeepage'
                element={<EmployeePage
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
        </Routes>
    );
}
export default AppRoutes;