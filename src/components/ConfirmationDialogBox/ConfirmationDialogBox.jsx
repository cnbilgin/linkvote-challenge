import React from "react";
import classes from "./ConfirmationDialogBox.module.css";

import { FaTimes } from "react-icons/fa";
import Button from "../Button/Button";
export default function ConfirmationDialogBox({
	title,
	children,
	show,
	onClose,
	onConfirm,
}) {
	let wrapperClasses = [classes.wrapper];
	if (show) wrapperClasses.push(classes.show);

	return (
		<div className={wrapperClasses.join(" ")}>
			<div className={classes.dialog}>
				<div className={classes.header}>
					<div className={classes.title}>{title}</div>
					<div className={classes.close} onClick={onClose}>
						<FaTimes />
					</div>
				</div>
				<div className={classes.cont}>
					{children}
					<div className={classes.options}>
						<Button className={classes.button} onClick={onConfirm}>
							OK
						</Button>
						<Button className={classes.button} onClick={onClose}>
							CANCEL
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.backdrop} onClick={onClose}></div>
		</div>
	);
}
