import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../actions/toasts";
import classes from "./Toast.module.css";

export default function Toast({ timer = 3000, type, children, id }) {
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch(removeToast(id));
		}, timer);
	}, [dispatch, id, timer]);

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

	return <div className={toastClasses.join(" ")}>{children}</div>;
}
