import { useEffect } from "react";

function ManagerPage(props) {	
	const rights = 'kierownik';
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
					<h2>Kierownik</h2>
					<button>Faktury</button>
					<button>Komponenty</button>
					<button>Godziny pracownicze</button>
				</div>
			)
		}
	}
}
export default ManagerPage;