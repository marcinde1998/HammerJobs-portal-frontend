import { useEffect } from "react";

function AdministatorPage(props) {
	const rights = 'administrator';
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
					<h2>Administrator</h2>
				</div>
			)
		}
	}
}
export default AdministatorPage;