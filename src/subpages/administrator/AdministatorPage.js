import { useEffect } from "react";
import { Link } from "react-router-dom";

//@Styles
import styles from './styles.module.scss';

function AdministatorPage(props) {
	const rights = 'administrator';
	useEffect(() => {
		if (props.access === null || props.access !== rights) {
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
				<div className={styles.wrapper}>
					<h2>Administrator</h2>
					<ul className={styles.linkList}>
						<li>
							<Link to="/orderadd">Dodaj Zamówienie</Link>
						</li>
						<li>
							<Link to="/componentadd">Dodaj Komponent</Link>
						</li>
						<li>
							<Link to="/listorder">Lista Zamówień</Link>
						</li>
						<li>
							<Link to="/componentlist">Lista Komponentów</Link>
						</li>
					</ul>
				</div>
			)
		}
	}
}
export default AdministatorPage;