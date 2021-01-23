import React, { useEffect, useState } from "react";
import classes from "./LinkListContainer.module.css";
import BigIconButton from "../../components/BigIconButton/BigIconButton";
import Select from "../../components/Select/Select";
import LinkList from "../../components/LinkList/LinkList";
import Pagination from "../../components/Pagination/Pagination";
import ConfirmationDialogBox from "../../components/ConfirmationDialogBox/ConfirmationDialogBox";
import Toast from "../../components/Toast/Toast";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
	handleRemoveLink,
	handleUpvoteLink,
	handleDownvoteLink,
	handleLoadLinks,
	handleOrderLinks,
} from "../../actions/links";
import { orderTypes } from "../../utilities/order-types";

function LinkListContainer({ links }) {
	const [dialog, setDialog] = useState({ show: false, link: null });
	const [order, setOrder] = useState(null);
	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	const handleVoting = (id, positive) => {
		dispatch(positive ? handleUpvoteLink(id) : handleDownvoteLink(id)).then(
			() => {
				if (order != null) dispatch(handleOrderLinks(order));
			}
		);
	};
	const handleRemove = (id) => {
		dispatch(handleRemoveLink(id)).then(() => {
			setDialog({ show: false, link: null });
		});
	};
	const handleRemoveConfirmation = (link) => {
		setDialog({
			show: true,
			link,
		});
	};
	const handleSelectChange = (option) => {
		setOrder(option.value);
		dispatch(handleOrderLinks(option.value));
	};

	useEffect(() => {
		dispatch(handleLoadLinks());
	}, [dispatch]);

	const orderOptions = [
		{ text: "Most Voted (Z → A)", value: orderTypes.DESC },
		{ text: "Less Voted (A → Z)", value: orderTypes.ASC },
	];

	const createPaginationData = () => {
		const itemByPage = 5;
		const start = (page - 1) * itemByPage;
		const end = page * itemByPage;

		return {
			list: links.slice(start, end),
			totalPage: Math.ceil(links.length / itemByPage),
		};
	};
	const paginationData = createPaginationData();

	return (
		<div className={classes.linkPage}>
			<div className={`${classes.toolbar} ${classes.container}`}>
				<Link to="/add">
					<BigIconButton icon={<FaPlus />}>SUBMIT A LINK</BigIconButton>
				</Link>
			</div>
			<div className={`${classes.filter} ${classes.container}`}>
				<Select
					options={orderOptions}
					value={order}
					onChange={handleSelectChange}
					placeholder="Order by"
				/>
			</div>
			<LinkList
				links={paginationData.list}
				onVote={handleVoting}
				onRemove={handleRemoveConfirmation}
			/>
			{paginationData.totalPage > 1 ? (
				<Pagination
					totalPage={paginationData.totalPage}
					page={page}
					changePage={setPage}
				/>
			) : null}

			{dialog.show ? (
				<ConfirmationDialogBox
					title="Remove Link"
					show={dialog.show}
					onClose={() => setDialog({ show: false, link: null })}
					onConfirm={() => handleRemove(dialog.link.id)}
				>
					<p style={{ margin: 0 }}>Do you want to remove</p>
					<h2 style={{ margin: 0 }}>{dialog.link.name}</h2>
				</ConfirmationDialogBox>
			) : null}

			<Toast type="success">
				<strong>REDDIT</strong> removed.
			</Toast>
		</div>
	);
}

export default connect((state) => ({ links: state.links }))(LinkListContainer);
