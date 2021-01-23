import { SHOW_TOAST, REMOVE_TOAST } from "../actions/toasts";

export default function toasts(state = [], action) {
	switch (action.type) {
		case SHOW_TOAST:
			return state.concat([action.toast]);
		case REMOVE_TOAST:
			return state.filter((toast) => toast.id !== action.id);
		default:
			return state;
	}
}
