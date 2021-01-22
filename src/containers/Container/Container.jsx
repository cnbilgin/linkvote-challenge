import classes from "./Container.module.css";
import React from "react";
import LinkPage from "../LinkPage/LinkPage";

export default function Container() {
	return (
		<div className={classes.container}>
			<LinkPage />
		</div>
	);
}
