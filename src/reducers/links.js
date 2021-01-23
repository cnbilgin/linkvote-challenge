import {
	ADD_LINK,
	REMOVE_LINK,
	UPVOTE_LINK,
	DOWNVOTE_LINK,
	LOAD_LINKS,
	ORDER_LINKS,
} from "../actions/links";

export default function links(state = [], action) {
	switch (action.type) {
		case ADD_LINK:
			return state.concat([action.link]);
		case REMOVE_LINK:
			return state.filter((link) => link.id !== action.id);
		case UPVOTE_LINK:
			return state.map((link) => ({
				...link,
				points: link.points + (link.id === action.id ? 1 : 0),
			}));
		case DOWNVOTE_LINK:
			return state.map((link) => ({
				...link,
				points: link.points + (link.id === action.id ? -1 : 0),
			}));

		case ORDER_LINKS:
		case LOAD_LINKS:
			return [...action.links];

		default:
			return state;
	}
}
