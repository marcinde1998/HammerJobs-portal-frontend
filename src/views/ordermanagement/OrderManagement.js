import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Hooks
import UseOrderManagement from "./UseOrderManagement";

function OrderManagement(props) {
    // useEffect(() => {
	// 	if (props.access === null || props.access !== rights) {
	// 		const timeoutId = setTimeout(() => {
	// 			window.location.reload();
	// 		}, 3000);
	// 		return () => clearTimeout(timeoutId);
	// 	}
	// }, [props.access]);

    const {
        getIdFromSessionStorage,
        getOrderDetails,
        orderIdFromSessionStorage
    } = UseOrderManagement();

    useEffect(() => {
        getIdFromSessionStorage();
    }, [])

    useEffect(() => {
        if (orderIdFromSessionStorage) {
            getOrderDetails();
        }
    }, [orderIdFromSessionStorage])
    const navigate = useNavigate();

    if (props.currentOrderIdInOrderManagement) {
        return (
            <div>
                <h2>Zamówienie nr: {props.currentOrderIdInOrderManagement}</h2>
            </div>
        )
    }
    else if (!props.currentOrderIdInOrderManagement) {
        // return (navigate('/listorder'));
    }
}
export default OrderManagement;