import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ManagerPage(props) {
	useEffect(() => {
		props.authUser();
	}, []);
	return (
		<>
			{props.rule !== 'krulekkitel' && <Navigate to="/" />}
			<h1>ManagerPage</h1>
		</>
	);
}
export default ManagerPage;