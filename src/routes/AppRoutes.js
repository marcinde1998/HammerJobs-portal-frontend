import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

//@components
import HomeLogin from '../components/homelogin/HomeLogin';
import ComponentAdd from "../components/componentadd/ComponentAdd";
import OrderAdd from "../components/orderadd/OrderAdd";
import ListComponent from "../components/listcomponent/ListComponent";
import ListOrder from "../components/listorder/ListOrder";

//@subpages
import AdministatorPage from '../subpages/administrator/AdministatorPage';
import ManagerPage from '../subpages/manager/ManagerPage';
import LeaderPage from '../subpages/leader/LeaderPage';
import EmployeePage from '../subpages/employee/EmployeePage';

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
                path='/orderadd'
                element={<OrderAdd
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            <Route
                path='/componentadd'
                element={<ComponentAdd
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            <Route
                path='/componentlist'
                element={<ListComponent
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            <Route
                path='/listorder'
                element={<ListOrder
                    loggedUser={props.loggedUser}
                    access={props.access}
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