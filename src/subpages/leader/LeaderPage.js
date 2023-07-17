import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function LeaderPage(props) {

	useEffect(() => {
		props.authUser();
	}, []);
	return (
		<>
			{props.rule !== 'lrulelkitel' && <Navigate to="/" />}
			<h1>LeaderPage</h1>
		</>
	);
}
export default LeaderPage;