import React from "react";
import classes from "./Header.module.css";

import logo from "../../images/logo.png";

export default function Header() {
	return (
		<div className={classes.header}>
			<div className={classes.logo}>
				<img src={logo} alt="Hepsiburada" />
			</div>
			<div className={classes.title}>
				<strong>Link</strong>
				<span>VOTE</span> Challenge
			</div>
		</div>
	);
}
