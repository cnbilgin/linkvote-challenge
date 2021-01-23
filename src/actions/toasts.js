import { v4 as uuidv4 } from "uuid";

export const SHOW_TOAST = "SHOW_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

export function showToast(toast) {
	return {
		type: SHOW_TOAST,
		toast: { ...toast, id: uuidv4() },
	};
}

export function removeToast(id) {
	return {
		type: REMOVE_TOAST,
		id,
	};
}
