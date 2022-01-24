import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Header.module.scss";

import logo from "../images/logo.png";

const Header = () => {
	const navigate = useNavigate();
	const toAddAnAdPage = () => navigate("/add-an-ad");

	return (
		<header>
			<div className={`${styles.wrapper} ${styles.container}`}>
				<NavLink to="/">
					<img src={logo} alt="logo" className={styles.logo} />
				</NavLink>
				<div className={styles.navigation}>
					<ul className={styles.menu}>
						<li>
							<NavLink to="/" className={styles.link}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" className={styles.link}>
								About
							</NavLink>
						</li>
						<li className={styles.link}>Login / Register</li>
					</ul>
					<div>
						<Button label="Post an Ad" onClick={toAddAnAdPage} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
