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
					<h4 className={classes.title}>{title}</h4>
					<button
						aria-label="close"
						className={classes.close}
						onClick={onClose}
					>
						<FaTimes />
					</button>
				</div>
				<div className={classes.cont}>
					{children}
					<div className={classes.options}>
						<Button
							aria-label="confirm"
							className={classes.button}
							onClick={onConfirm}
						>
							OK
						</Button>
						<Button
							aria-label="cancel"
							className={classes.button}
							onClick={onClose}
						>
							CANCEL
						</Button>
					</div>
				</div>
			</div>
			<div
				data-testid="backdrop"
				className={classes.backdrop}
				onClick={onClose}
			></div>
		</div>
	);
}
