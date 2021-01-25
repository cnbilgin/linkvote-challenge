import React from "react";
import { connect, useDispatch } from "react-redux";
import classes from "./Toast.module.css";
import Toast from "./Toast";
import { removeToast } from "../../actions/toasts";

function ToastManager({ toasts }) {
	const dispatch = useDispatch();

	const handleRemove = (id) => {
		return dispatch(removeToast(id));
	};

	const show = toasts.length > 0;
	return (
		<div className={`${classes.wrapper} ${show ? classes.show : ""}`}>
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					type={toast.type}
					id={toast.id}
					children={toast.body}
					onRemove={handleRemove}
				/>
			))}
		</div>
	);
}

export default connect((state) => ({ toasts: state.toasts }))(ToastManager);
