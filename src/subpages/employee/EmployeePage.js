import { useEffect } from "react";
import { Navigate } from "react-router-dom";



function EmployeePage(props) {

	useEffect(() => {
		props.authUser();
	}, []);
	return (
		<>
			{props.rule !== 'prulepkitel' && <Navigate to="/" />}
			<h1>EmployeePage</h1>
		</>
	);
}
export default EmployeePage;