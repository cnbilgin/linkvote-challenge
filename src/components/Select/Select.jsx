import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import classes from "./Select.module.css";

export default function Select({ options, placeholder, value, onChange }) {
	const [show, setShow] = useState(false);
	const text =
		value != null ? options.find((p) => p.value === value).text : placeholder;

	let classNames = [classes.select];
	if (show) classNames.push(classes.active);

	const handleSelectionClick = () => {
		setShow(!show);
	};

	const handleChange = (val) => {
		const selectedOption = options.find((p) => p.value === val);
		onChange(selectedOption);
		setShow(false);
	};

	return (
		<div className={classNames.join(" ")}>
			<div className={classes.selection} onClick={handleSelectionClick}>
				<div className={classes.displayValue}>{text}</div>
				<div className={classes.dropdownIcon}>
					<FaChevronDown />
				</div>
			</div>
			<div className={classes.options}>
				{options.map((option) => (
					<div
						key={option.value}
						className={`${classes.optionItem} ${
							option.value === value ? classes.active : ""
						}`}
						onClick={() => handleChange(option.value)}
					>
						{option.text}
					</div>
				))}
			</div>
		</div>
	);
}
