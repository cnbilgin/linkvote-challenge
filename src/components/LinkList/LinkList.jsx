import React from "react";
import LinkListItem from "./LinkListItem";

export default function LinkList({ links, onVote, onRemove }) {
	return (
		<div>
			{links.map((link) => (
				<LinkListItem
					onVote={onVote}
					key={link.id}
					onRemove={onRemove}
					link={link}
				/>
			))}
		</div>
	);
}
