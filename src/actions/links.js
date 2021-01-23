import { linkService } from "../utilities/link.service";
import { orderTypes } from "../utilities/order-types";

export const ADD_LINK = "ADD_LINK";
export const REMOVE_LINK = "REMOVE_LINK";
export const UPVOTE_LINK = "UPVOTE_LINK";
export const DOWNVOTE_LINK = "DOWNVOTE_LINK";
export const LOAD_LINKS = "LOAD_LINKS";
export const ORDER_LINKS = "ORDER_LINKS";

function addLink(link) {
	return {
		type: ADD_LINK,
		link,
	};
}

function removeLink(id) {
	return {
		type: REMOVE_LINK,
		id,
	};
}

function upvoteLink(id) {
	return {
		type: UPVOTE_LINK,
		id,
	};
}

function downvoteLink(id) {
	return {
		type: DOWNVOTE_LINK,
		id,
	};
}

function loadLinks(links) {
	return {
		type: LOAD_LINKS,
		links,
	};
}

function orderLinks(links) {
	return {
		type: ORDER_LINKS,
		links,
	};
}

export function handleOrderLinks(orderBy) {
	return (dispatch) => {
		return linkService.get().then((links) => {
			let compareValue = 1;
			if (orderBy === orderTypes.ASC) compareValue = -1;
			else if (orderBy === orderTypes.DESC) compareValue = 1;

			links.reverse().sort((a, b) => {
				if (b.points > a.points) return 1 * compareValue;
				else if (b.points < a.points) return -1 * compareValue;
				else {
					let dateB = new Date(b.lastUpdate);
					let dateA = new Date(a.lastUpdate);
					if (dateB > dateA) return 1;
					else if (dateB < dateA) return -1;

					return 0;
				}
			});

			dispatch(orderLinks(links));
		});
	};
}

export function handleLoadLinks() {
	return (dispatch) => {
		return linkService.get().then((links) => {
			dispatch(loadLinks(links.reverse()));
		});
	};
}

export function handleAddLink(link) {
	return (dispatch) => {
		return linkService.add(link).then((newLink) => {
			dispatch(addLink(newLink));
		});
	};
}

export function handleRemoveLink(id) {
	return (dispatch) => {
		return linkService.remove(id).then(() => {
			dispatch(removeLink(id));
		});
	};
}

export function handleUpvoteLink(id) {
	return (dispatch) => {
		return linkService.vote(id, true).then((link) => {
			dispatch(upvoteLink(id));
		});
	};
}

export function handleDownvoteLink(id) {
	return (dispatch) => {
		return linkService.vote(id, false).then((link) => {
			dispatch(downvoteLink(id));
		});
	};
}
