import { useEffect } from "react";

function EmployeePage(props) {
	const rights = 'pracownik';
	useEffect(() => {
		if (props.access === null || props.access !==rights) {
			const timeoutId = setTimeout(() => {
				window.location.reload();
			}, 3000);
			return () => clearTimeout(timeoutId);
		}
	}, [props.access]);

	if (props.access === null) {
		return (<div>Loading...</div>)
	} else {
		if (rights !== props.access) {
			return (<div>Brak dostępu</div>)
		} else if (rights === props.access) {
			return (
				<div>
					<h2>Pracownik</h2>
					
					<button>Komponenty</button>
					
				</div>
			)
		}
	}
}
export default EmployeePage;