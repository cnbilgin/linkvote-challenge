import { linkService } from "../utilities/link.service";
import { orderTypes } from "../utilities/order-types";

export const ADD_LINK = "ADD_LINK";
export const REMOVE_LINK = "REMOVE_LINK";
export const UPVOTE_LINK = "UPVOTE_LINK";
export const DOWNVOTE_LINK = "DOWNVOTE_LINK";
export const LOAD_LINKS = "LOAD_LINKS";
export const ORDER_LINKS = "ORDER_LINKS";

const addLink = (link) => ({
	type: ADD_LINK,
	link,
});

const removeLink = (id) => ({
	type: REMOVE_LINK,
	id,
});

const upvoteLink = (id) => ({
	type: UPVOTE_LINK,
	id,
});

const downvoteLink = (id) => ({
	type: DOWNVOTE_LINK,
	id,
});

const loadLinks = (links) => ({
	type: LOAD_LINKS,
	links,
});

const orderLinks = (links) => ({
	type: ORDER_LINKS,
	links,
});

export const handleOrderLinks = (orderBy) => (dispatch) =>
	linkService.get().then((links) => {
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

export const handleLoadLinks = () => (dispatch) =>
	linkService.get().then((links) => {
		dispatch(loadLinks(links.reverse()));
	});

export const handleAddLink = (link) => (dispatch) =>
	linkService.add(link).then((newLink) => {
		dispatch(addLink(newLink));
	});

export const handleRemoveLink = (id) => (dispatch) =>
	linkService.remove(id).then(() => {
		dispatch(removeLink(id));
	});

export const handleUpvoteLink = (id) => (dispatch) =>
	linkService.vote(id, true).then(() => {
		dispatch(upvoteLink(id));
	});

export const handleDownvoteLink = (id) => (dispatch) =>
	linkService.vote(id, false).then(() => {
		dispatch(downvoteLink(id));
	});
