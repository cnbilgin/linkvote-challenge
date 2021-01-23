import React from "react";
import classes from "./BigIconButton.module.css";

export default function BigIconButton({ icon, children, className, ...props }) {
	return (
		<div className={[classes.bigIconButton, className].join(" ")} {...props}>
			<div className={classes.icon}>{icon}</div>
			<div className={classes.text}>{children}</div>
		</div>
	);
}
