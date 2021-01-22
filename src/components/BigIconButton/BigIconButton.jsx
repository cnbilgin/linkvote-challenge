import React from "react";
import { FaPlus } from "react-icons/fa";

import classes from "./BigIconButton.module.css";

export default function BigIconButton({ className, ...props }) {
	return (
		<div className={[classes.bigIconButton, className].join(" ")} {...props}>
			<div className={classes.icon}>
				<FaPlus />
			</div>
			<div className={classes.text}>SUBMIT A LINK</div>
		</div>
	);
}
