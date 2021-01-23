import React from "react";
import { connect } from "react-redux";
import classes from "./Toast.module.css";
import Toast from "./Toast";

function ToastManager({ toasts }) {
	const show = toasts.length > 0;
	return (
		<div className={`${classes.wrapper} ${show ? classes.show : ""}`}>
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					type={toast.type}
					id={toast.id}
					children={toast.body}
				/>
			))}
		</div>
	);
}

export default connect((state) => ({ toasts: state.toasts }))(ToastManager);
