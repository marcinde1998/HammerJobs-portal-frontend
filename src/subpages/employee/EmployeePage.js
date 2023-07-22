import { Link } from "react-router-dom";

function EmployeePage(props) {
	return (
		<>
			<h1>EmployeePage</h1>
			<Link to='/addorder'>Dodaj Zamówienie</Link>
		</>
	);
}
export default EmployeePage;