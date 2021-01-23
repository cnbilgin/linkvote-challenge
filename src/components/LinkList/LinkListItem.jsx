import React from "react";
import classes from "./LinkList.module.css";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function LinkListItem({ link, onVote, onRemove }) {
	return (
		<div className={classes.linkListItem}>
			<div className={classes.pointBox}>
				<strong>{link.points}</strong>
				POINT{Math.abs(link.points) > 1 ? "S" : ""}
			</div>
			<div className={classes.cont}>
				<div className={classes.info}>
					<h4>{link.name}</h4>
					<a href={link.link} rel="noreferrer" target="_blank">
						({link.link})
					</a>
				</div>
				<div className={classes.voting}>
					<div
						className={classes.voteItem}
						onClick={() => onVote(link.id, true)}
					>
						<FaArrowUp className={classes.icon} />
						<strong>Up Vote</strong>
					</div>
					<div
						className={classes.voteItem}
						onClick={() => onVote(link.id, false)}
					>
						<FaArrowDown className={classes.icon} />
						<strong>Down Vote</strong>
					</div>
				</div>
			</div>
			<div className={classes.remove} onClick={() => onRemove(link)}></div>
		</div>
	);
}
