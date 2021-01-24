import React from "react";
import { Link } from "react-router-dom";
import classes from "./LinkAddContainer.module.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import AddLinkForm from "../../components/AddLinkForm/AddLinkForm";
import { useDispatch } from "react-redux";
import { handleAddLink } from "../../actions/links";
import { showToast } from "../../actions/toasts";

export default function LinkAddContainer() {
	const dispatch = useDispatch();

	const handleSubmit = (data) => {
		dispatch(handleAddLink(data)).then(() => {
			dispatch(
				showToast({
					type: "success",
					body: (
						<>
							<strong>{data.name}</strong> added.
						</>
					),
				})
			);
		});
	};

	const handleError = (errMessage) => {
		dispatch(showToast({ type: "error", body: errMessage }));
	};

	return (
		<div className={classes.linkAddContainer}>
			<Link to="/" className={classes.returnLink}>
				<FaLongArrowAltLeft />
				Return to List
			</Link>
			<h1 className={classes.title}>Add New Link</h1>
			<AddLinkForm onSuccess={handleSubmit} onError={handleError} />
		</div>
	);
}
