import React, { useEffect } from "react";
import classes from "./Toast.module.css";

export default function Toast({
	timer = 3000,
	type,
	children,
	id,
	onRemove = null,
}) {
	useEffect(() => {
		if (onRemove) {
			const timeout = setTimeout(() => {
				onRemove(id);
			}, timer);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [id, onRemove, timer]);

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

	return (
		<div aria-label="toast" className={toastClasses.join(" ")}>
			{children}
		</div>
	);
}
