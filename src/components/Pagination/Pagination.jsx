import React from "react";
import classes from "./Pagination.module.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
	totalPage = 0,
	page = 0,
	changePage = (newPage) => {},
}) {
	const renderPages = () => {
		const pages = [];

		for (let i = 1; i <= totalPage; i++)
			pages.push(
				<li
					key={i}
					className={i === page ? classes.active : null}
					onClick={() => {
						if (i !== page) changePage(i);
					}}
					aria-label={`page-${i}`}
				>
					{i}
				</li>
			);

		return pages;
	};
	return (
		<div className={classes.pagination}>
			<ul>
				{page !== 1 ? (
					<li
						aria-label="previous-page"
						className={classes.prevPage}
						onClick={() => changePage(page - 1)}
					>
						<FaChevronLeft />
					</li>
				) : null}
				{renderPages()}
				{page !== totalPage ? (
					<li
						aria-label="next-page"
						className={classes.nextPage}
						onClick={() => changePage(page + 1)}
					>
						<FaChevronRight />
					</li>
				) : null}
			</ul>
		</div>
	);
}
