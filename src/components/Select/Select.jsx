import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import classes from "./Select.module.css";

export default function Select() {
	const [show, setShow] = useState(false);

	let classNames = [classes.select];
	if (show) classNames.push(classes.active);

	const handleSelectionClick = () => {
		setShow(!show);
	};

	return (
		<div className={classNames.join(" ")}>
			<div className={classes.selection} onClick={handleSelectionClick}>
				<div className={classes.displayValue}>Order by</div>
				<div className={classes.dropdownIcon}>
					<FaChevronDown />
				</div>
			</div>
			<div className={classes.options}>
				<div className={`${classes.optionItem} ${classes.active}`}>
					Most Voted (Z → A)
				</div>
				<div className={classes.optionItem}>Less Voted (A → Z)</div>
			</div>
		</div>
	);
}
