import React, { useEffect, useState } from "react";
import classes from "./LinkListContainer.module.css";
import BigIconButton from "../../components/BigIconButton/BigIconButton";
import Select from "../../components/Select/Select";
import LinkList from "../../components/LinkList/LinkList";
import Pagination from "../../components/Pagination/Pagination";
import ConfirmationDialogBox from "../../components/ConfirmationDialogBox/ConfirmationDialogBox";
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
import { showToast } from "../../actions/toasts";

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
	const handleRemove = (link) => {
		dispatch(handleRemoveLink(link.id)).then(() => {
			setDialog({ show: false, link: null });
			dispatch(
				showToast({
					type: "success",
					body: (
						<>
							<strong>{link.name}</strong> removed.
						</>
					),
				})
			);
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
		const totalPage = Math.ceil(links.length / itemByPage);
		let pageValue = page;
		if (pageValue > totalPage) pageValue = totalPage;
		const start = (pageValue - 1) * itemByPage;
		const end = pageValue * itemByPage;

		return {
			list: links.slice(start, end),
			totalPage: totalPage,
		};
	};
	const paginationData = createPaginationData();

	return (
		<>
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
			</div>
			{dialog.show ? (
				<ConfirmationDialogBox
					title="Remove Link"
					show={dialog.show}
					onClose={() => setDialog({ show: false, link: null })}
					onConfirm={() => handleRemove(dialog.link)}
				>
					<p style={{ margin: 0 }}>Do you want to remove</p>
					<h2 style={{ margin: 0 }}>{dialog.link.name}</h2>
				</ConfirmationDialogBox>
			) : null}
		</>
	);
}

export default connect((state) => ({ links: state.links }))(LinkListContainer);
