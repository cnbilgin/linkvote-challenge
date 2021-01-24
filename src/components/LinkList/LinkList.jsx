import React from "react";
import LinkListItem from "./LinkListItem";
import classes from "./LinkList.module.css";

export default function LinkList({ links, onVote, onRemove }) {
	return (
		<div data-testid="cont">
			{links && links.length > 0 ? (
				links.map((link) => (
					<LinkListItem
						onVote={onVote}
						key={link.id}
						onRemove={onRemove}
						link={link}
					/>
				))
			) : (
				<div className={classes.emptyWarning}>There is no link in list</div>
			)}
		</div>
	);
}
