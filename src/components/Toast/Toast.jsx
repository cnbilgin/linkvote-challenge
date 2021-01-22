import React, { useEffect, useState } from "react";
import classes from "./Toast.module.css";

export default function Toast({ timer = 3000, type, children }) {
	const [show, setShow] = useState(true);
	let toastClasses = [classes.toast];

	switch (type) {
		case "success":
			toastClasses.push(classes.toastSuccess);
			break;
		case "error":
			toastClasses.push(classes.toastError);
			break;
		default:
			break;
	}

	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, timer);
	}, [timer]);

	return (
		<div className={`${classes.wrapper} ${show ? classes.show : ""}`}>
			<div className={toastClasses.join(" ")}>{children}</div>
		</div>
	);
}
