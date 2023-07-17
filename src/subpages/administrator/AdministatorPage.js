import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function AdministatorPage(props) {

	useEffect(() => {
		props.authUser();
	}, []); 

	return (
		<>
			{props.rule !== 'aruleakitel' && <Navigate to="/" />}
			<h1>AdministatorPage</h1>
		</>
	);
}
export default AdministatorPage;