import React from "react";
import { Link } from "react-router-dom";
import classes from "./LinkAddContainer.module.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import AddLinkForm from "../../components/AddLinkForm/AddLinkForm";

export default function LinkAddContainer() {
	return (
		<div className={classes.linkAddContainer}>
			<Link to="/" className={classes.returnLink}>
				<FaLongArrowAltLeft />
				Return to List
			</Link>
			<h1 className={classes.title}>Add New Link</h1>
			<AddLinkForm />
		</div>
	);
}
