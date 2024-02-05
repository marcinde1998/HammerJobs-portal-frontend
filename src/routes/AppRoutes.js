import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

//@views
import HomeLogin from '../pages/homelogin/HomeLogin';
import OrderAdd from "../pages/orderadd/OrderAdd";
import ListComponent from "../pages/listcomponent/ListComponent";
import DeliveryList from "../pages/deliverylist/DelivetyList";
import DeliveryManagement from "../pages/deliverymanagement/DeliveryManagement";
import MainMenu from '../pages/mainmenu/MainMenu';
import AdminPanel from "../pages/adminpanel/AdminPanel";
import WarehouseManagement from "../pages/warehousemanagement/WarehouseManagement"

const AppRoutes = (props) => {

    const navigate = useNavigate();
    const setAccess = () => {
        if (props.loggedUser) {
            console.log("minęła 1 minuta")
            axios
                .post('http://172.22.126.11:8080/decodeToken', {
                    token: props.loggedUser
                })
                .then((res) => {
                    if (res.data.newToken) {
                        const newToken = res.data.newToken;
                        sessionStorage.setItem('loggedUser', JSON.stringify(newToken));
                        props.setLoggedUser(newToken);
                    } else {
                        props.setLoggedUser(JSON.parse(sessionStorage.getItem('loggedUser')));
                       
                    }
                    props.setAccess(res.data.userRole);
                })
                .catch((error) => {
                    sessionStorage.removeItem('loggedUser');
                    props.setLoggedUser(null);
                    props.setAccess(null);
                    navigate('/')
                });
        } else if (!props.loggedUser) {
            return (navigate('/'))
        }
    }
    
    useEffect(() => {
        setAccess();
        const intervalId = setInterval(() => {
            setAccess();
        }, 60000); 
        return () => {
            clearInterval(intervalId);
        };
    }, [props.loggedUser, navigate, props.access, props.setLoggedUser, props.setAccess]);
    return (
        <Routes>
            {/* //@views */}
            {/*Widok Logowania*/}
            <Route
                path='/'
                element={<HomeLogin
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                />}
            />
            {/*Widok Dodawania Zamówienia*/}
            <Route
                path='/orderadd'
                element={<OrderAdd
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            {/*Widok wyświetlania Listy Komponentów*/}
            <Route
                path='/componentlist'
                element={<ListComponent
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            {/*Widok wyświetlania Listy Zamówień*/}
            <Route
                path='/listorder'
                element={<DeliveryList
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            {/*Widok zarządzania dostawą*/}
            <Route
                path='/deliverymanagement/:id'
                element={<DeliveryManagement
                    loggedUser={props.loggedUser}
                    access={props.access}
                />}
            />
            {/*Widok głównego menu*/}
            <Route
                path='/mainmenu'
                element={<MainMenu
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
            {/*Widok panelu administratora*/}
            <Route
                path='/adminpanel'
                element={<AdminPanel
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
            {/*Widok magazynu*/}
            <Route
                path='/warehouseManagement'
                element={<WarehouseManagement
                    loggedUser={props.loggedUser}
                    access={props.access}
                />} />
        </Routes>
    );
}
export default AppRoutes;