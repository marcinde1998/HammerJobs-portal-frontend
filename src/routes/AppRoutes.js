import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";

// @Pages
import HomeLogin from '../pages/homelogin/HomeLogin';
import ListComponent from "../pages/listcomponent/ListComponent";
import DeliveryList from "../pages/deliverylist/DelivetyList";
import DeliveryManagement from "../pages/deliverymanagement/DeliveryManagement";
import MainMenu from '../pages/mainmenu/MainMenu';
import AdminPanel from "../pages/adminpanel/AdminPanel";
import WarehouseManagement from "../pages/warehousemanagement/WarehouseManagement"
import DeliveryAdd from '../pages/deliveryadd/DeliveryAdd'

export const routesData = [
    { path: '/', element: <HomeLogin />},
    { path: '/componentlist', element: <ListComponent /> },
    { path: '/deliverylist', element: <DeliveryList /> },
    { path: '/deliverymanagement/:id', element: <DeliveryManagement /> },
    { path: '/mainmenu', element: <MainMenu /> },
    { path: '/adminpanel', element: <AdminPanel /> },
    { path: '/warehousemanagement', element: <WarehouseManagement /> },
    { path: '/deliveryadd', element: <DeliveryAdd /> },
];

const AppRoutes = (props) => {
    const navigate = useNavigate();

    // const setAccess = () => {
    //     if (props.loggedUser) {
    //         console.log("minęła 1 minuta")
    //         axios
    //             .post('http://172.22.126.11:8080/decodeToken', {
    //                 token: props.loggedUser
    //             })
    //             .then((res) => {
    //                 if (res.data.newToken) {
    //                     const newToken = res.data.newToken;
    //                     sessionStorage.setItem('loggedUser', JSON.stringify(newToken));
    //                     props.setLoggedUser(newToken);
    //                 } else {
    //                     props.setLoggedUser(JSON.parse(sessionStorage.getItem('loggedUser')));
    //                     console.log(props.access)
    //                 }
    //                 props.setAccess(res.data.userRole);
    //             })
    //             .catch((error) => {
    //                 sessionStorage.removeItem('loggedUser');
    //                 props.setLoggedUser(null);
    //                 props.setAccess(null);
    //                 navigate('/');
    //             });
    //     } else if (!props.loggedUser) {
    //         return (navigate('/'));
    //     }
    // };

    // useEffect(() => {
    //     setAccess();
    //     const intervalId = setInterval(() => {
    //         setAccess();
    //     }, 60000);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [props.loggedUser, navigate, props.access, props.setLoggedUser, props.setAccess]);

    return (
        <Routes>
            {routesData.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={React.cloneElement(route.element, {
                        setLoggedUser: props.setLoggedUser,
                        loggedUser: props.loggedUser,
                        access: props.access,
                    })}
                />
            ))}
        </Routes>
    );
};

export default AppRoutes;
