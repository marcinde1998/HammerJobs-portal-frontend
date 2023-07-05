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

    const authUser = () => {
        const token = props.loggedUser;
        if (token) {

            axios
                .post('http://localhost:8080/decodingAuthorization', {}, {
                    headers: {
                        Authorization: props.loggedUser.jwt
                    }
                })
                .then((response) => {
                    if (response.data.success === true) {
                        const loggedUsername = response.data.user._id;
                        axios
                            .get('http://localhost:8080/user/' + loggedUsername).then((res) => {
                                const loggedUsernameRights = res.data.rights;
                                if (loggedUsernameRights === 'administrator') {
                                    console.log('administrator')
                                } else if (loggedUsernameRights === 'kierownik') {
                                    console.log('kierownik')
                                } else if (loggedUsernameRights === 'lider') {
                                    console.log('lider')
                                } else if (loggedUsernameRights === 'pracownik') {
                                    console.log('pracownik')
                                } else {
                                    console.log('tu bedzie funkcja else')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    useEffect(() => {
        getPeopleList();
        authUser();
    }, []);

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
                    authUser={authUser}
                />}
            />

            {/* //@subpages */}
            <Route path='/administratorpage' element={<AdministatorPage authUser={authUser} />} />
            <Route path='/managerpage' element={<ManagerPage authUser={authUser} />} />
            <Route path='/leaderpage' element={<LeaderPage authUser={authUser} />} />
            <Route path='/employeepage' element={<EmployeePage authUser={authUser} />} />
        </Routes>
    );
}

export default AppRoutes;