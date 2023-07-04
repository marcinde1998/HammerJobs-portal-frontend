import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//@components
import HomeLogin from '../components/homelogin/HomeLogin';

//@subpages
import AdministatorPage from '../subpages/administrator/AdministatorPage';
import ManagerPage from '../subpages/manager/ManagerPage';
import LeaderPage from '../subpages/leader/LeaderPage';
import EmployeePage from '../subpages/employee/EmployeePage';

const AppRoutes = (props) => {

    const [usersBase, setPeopleBase] = useState([]);

    const getPeopleList = () => {
        axios.get('http://localhost:8080/userList').then((req) => {
            setPeopleBase(req.data);
        })
    }

    useEffect(() => {
        getPeopleList();
    }, []);

    console.log(usersBase);

    return (
        <Routes>
            {/* //@components */}
            <Route
                path='/'
                element={<HomeLogin
                    loggedUser={props.loggedUser}
                    setLoggedUser={props.setLoggedUser}
                    loggedUsername={props.loggedUsername}
                    setLoggedUsername={props.setLoggedUsername}
                />}
            />

            {/* //@subpages */}
            <Route path='/administratorpage' element={<AdministatorPage />} />
            <Route path='/managerpage' element={<ManagerPage />} />
            <Route path='/leaderpage' element={<LeaderPage />} />
            <Route path='/employeepage' element={<EmployeePage />} />
        </Routes>
    );
}

export default AppRoutes;