import { Link } from "react-router-dom";

//@Styles
import styles from './styles.module.scss';

function MainMenu(props) {

	if (props.access === null) {
		return (<div>Loading...</div>)
	} else if (props.access === 'administrator' || props.access === 'kierownik' || props.access === 'lider' || props.access === 'pracownik') {
		return (
			<div className={styles.wrapper}>
				<h2>Menu</h2>
				<ul className={styles.linkList}>
					{
						props.access === 'administrator' && (
							<li>
								<Link to="/adminpanel">Panel Administratora</Link>
							</li>
						)}
					{
						(props.access === 'administrator' ||
							props.access === 'kierownik') && (
							<li>
								<Link to="/orderadd">Dodaj Zamówienie</Link>
							</li>
						)}
					{
						(props.access === 'administrator' ||
							props.access === 'kierownik' ||
							props.access === 'lider') && (
							<li>
								<Link to="/listorder">Lista Zamówień</Link>
							</li>
						)}
					{/* {
						(props.access === 'administrator' ||
							props.access === 'kierownik' ||
							props.access === 'lider' ||
							props.access === 'pracownik') && (
							<li>
								<Link to="/componentlist">Lista Komponentów</Link>
							</li>
						)} */}
					{
						(props.access === 'administrator' ||
							props.access === 'kierownik' ||
							props.access === 'lider' ||
							props.access === 'pracownik') && (
							<li>
								<Link to="/warehousemanagement">Magazyn</Link>
							</li>
						)}
				</ul>
			</div>
		)
	}
}

export default MainMenu;