import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/LoggedUser";
import { DeliveryContext } from "../../contexts/Delivery";

//@Styles
import styles from './styles.module.scss';

//@Components
import LoadingComponent from "../../components/shared/loadingcomponent/LoadingComponent";
import AddForm from "./insidecomponent/AddForm";
import NavButtons from "./insidecomponent/NavButtons";
import AccessDenied from "components/shared/accessDenied/AccessDenied";

// @Utils
import { checkUserRole } from "utils/authUtils";


const DeliveryAdd: React.FC = () => {
    //Zabezpieczenie strony
    const { loggedUser } = useContext(UserContext);
    const allowedRoles = ["admin", "manager"];
    const isAuthorized = checkUserRole(loggedUser, allowedRoles);
    const { formSubmitted } = useContext(DeliveryContext);

    if (!isAuthorized) {
        return (<AccessDenied />)
    } else if (isAuthorized) {
        return (
            <div className={styles.wrapper}>
                {formSubmitted ? (
                     <NavButtons />
                ) : (
                    <AddForm />
                )}
            </div>
        )
    } else {
        return (<LoadingComponent />)
    }
}

export default DeliveryAdd;