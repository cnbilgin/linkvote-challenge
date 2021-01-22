import React from "react";
import classes from "./Button.module.css";

export default function Button({ className, ...props }) {
	let classNames = [classes.button];
	if (className) classNames.push(className);

	return <button className={classNames.join(" ")} {...props}></button>;
}
