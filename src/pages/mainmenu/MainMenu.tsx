import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/LoggedUser";

//@Styles
import styles from './styles.module.scss';

// @lib
import { listMainMenu } from '../../lib/data/DataMainMenuList';


function MainMenu() {
	const { loggedUser } = useContext(UserContext);
	const userRolesArray = Array.isArray(loggedUser.role) ? loggedUser.role : [loggedUser.role];
	return (
		<div className={styles.wrapper}>
			<h2>MENU</h2>
			<ul className={styles.linkList}>
				{listMainMenu.map((menuItem, index) => {
					// Sprawdzamy czy przynajmniej jedna z ról użytkownika pasuje do ról określonych dla danego elementu menu
					if (menuItem.visible && userRolesArray.some((role: string) => menuItem.roles.includes(role))) {
						return (
							<li key={index}>
								<Link to={menuItem.destinationURL}>{menuItem.label}</Link>
							</li>
						);
					} else {
						return null; // Jeśli rola nie pasuje lub visible jest false, zwracamy null aby element nie był renderowany
					}
				})}
			</ul>
		</div>
	);
}
export default MainMenu;