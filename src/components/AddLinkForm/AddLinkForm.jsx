import React, { useState } from "react";
import classes from "./AddLinkForm.module.css";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAddLink } from "../../actions/links";

export default function AddLinkForm() {
	const dispatch = useDispatch();

	const [data, setData] = useState({
		name: "",
		link: "",
	});

	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		const newData = { ...data };
		newData[name] = value;

		setData(newData);
	};

	const history = useHistory();
	const redirect = () => {
		history.push("/");
	};

	const handleAdd = () => {
		let isValid = true;
		const { name, link } = data;
		let errMessage = null;

		if (!(isValid = isValid && name.length > 0))
			errMessage = "Please type a name";
		else if (!(isValid = isValid && link.length > 0))
			errMessage = "Please type a link";
		else if (
			!(isValid = isValid && /^(ftp|http|https):\/\/[^ "]+$/.test(link))
		)
			errMessage = "Please type a valid link";

		if (errMessage) alert(errMessage);
		else {
			dispatch(
				handleAddLink({
					name,
					link,
				})
			).then(() => {
				redirect();
			});
		}
	};

	return (
		<div className={classes.addForm}>
			<div className={classes.formItem}>
				<label>Link Name:</label>
				<input
					name="name"
					type="text"
					placeholder="e.g. Alphabet"
					onChange={handleOnChange}
					value={data.name}
				/>
			</div>
			<div className={classes.formItem}>
				<label>Link URL:</label>
				<input
					name="link"
					type="text"
					placeholder="e.g. http://abc.xyz"
					onChange={handleOnChange}
					value={data.link}
				/>
			</div>
			<div className={classes.buttons}>
				<Button onClick={handleAdd}>ADD</Button>
			</div>
		</div>
	);
}
