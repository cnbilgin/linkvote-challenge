import React, { useState } from "react";
import classes from "./LinkPage.module.css";
import BigIconButton from "../../components/BigIconButton/BigIconButton";
import Select from "../../components/Select/Select";
import LinkList from "../../components/LinkList/LinkList";
import Pagination from "../../components/Pagination/Pagination";
import ConfirmationDialogBox from "../../components/ConfirmationDialogBox/ConfirmationDialogBox";
import Toast from "../../components/Toast/Toast";

export default function LinkPage() {
	const [page, setPage] = useState(2);
	const [showDialog, setShowDialog] = useState(false);

	return (
		<div className={classes.linkPage}>
			<div className={`${classes.toolbar} ${classes.container}`}>
				<BigIconButton />
			</div>
			<div className={`${classes.filter} ${classes.container}`}>
				<Select />
			</div>
			<LinkList />
			<Pagination totalPage={5} page={page} changePage={setPage} />

			<ConfirmationDialogBox
				title="Remove Link"
				show={showDialog}
				onClose={() => setShowDialog(false)}
				onConfirm={() => {}}
			>
				<p style={{ margin: 0 }}>Do you want to remove</p>
				<h2 style={{ margin: 0 }}> </h2>
			</ConfirmationDialogBox>
			<Toast type="success">
				<strong>REDDIT</strong> removed.
			</Toast>
		</div>
	);
}
