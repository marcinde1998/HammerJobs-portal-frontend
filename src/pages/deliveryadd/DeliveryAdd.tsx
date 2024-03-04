import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/LoggedUser";

//@Styles
import styles from './styles.module.scss';

//@Components
import LoadingComponent from "../../components/shared/loadingcomponent/LoadingComponent";
import AddForm from "./insidecomponent/AddForm";
import NavButtons from "./insidecomponent/NavButtons";
import AccessDenied from "components/shared/accessDenied/AccessDenied";

// @Hooks 
import UseDeliveryAdd from "./UseDeliveryAdd";

// @Utils
import { checkUserRole } from "utils/authUtils";


const DeliveryAdd: React.FC = () => {
    //Zabezpieczenie strony
    const { loggedUser } = useContext(UserContext);
    const allowedRoles = ["admin", "manager"];
    const isAuthorized = checkUserRole(loggedUser, allowedRoles);
    const {
        formSubmitted,
        setFormSubmitted
    } = UseDeliveryAdd();
    useEffect(() => {
        console.log(formSubmitted)
    }, [formSubmitted])
    if (!isAuthorized) {
        return (<AccessDenied />)
    } else if (isAuthorized) {
        return (
            <div className={styles.wrapper}>
                {formSubmitted ? (
                    <NavButtons setFormSubmitted={setFormSubmitted} />
                ) : (
                    <AddForm setFormSubmitted={setFormSubmitted} />
                )}
            </div>
        )
    } else {
        return (<LoadingComponent />)
    }
}

export default DeliveryAdd;