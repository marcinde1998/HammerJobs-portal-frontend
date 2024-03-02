import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";

//@Styles
import styles from './styles.module.scss';

//@Components
import LoadingComponent from "../../components/shared/loadingcomponent/LoadingComponent";
import AddForm from "./insidecomponent/AddForm";
import NavButtons from "./insidecomponent/NavButtons";

//Hooks 
import UseDeliveryAdd from "./UseDeliveryAdd";

//@Types shared
import { IAccess } from '../../types/shared/access';

const DeliveryAdd: React.FC<IAccess> = ({ access }) => {

    const {
        formSubmitted,
        setFormSubmitted
    } = UseDeliveryAdd();
    useEffect(() => {
        console.log(formSubmitted)
    }, [formSubmitted])

    return (
        <div className={styles.wrapper}>
            {formSubmitted ? (
                <NavButtons setFormSubmitted={setFormSubmitted} />
            ) : (
                <AddForm setFormSubmitted={setFormSubmitted} />
            )}
        </div>
    )
}

export default DeliveryAdd;