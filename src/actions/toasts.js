import { v4 as uuidv4 } from "uuid";

export const SHOW_TOAST = "SHOW_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

export const showToast = (toast) => ({
	type: SHOW_TOAST,
	toast: { ...toast, id: uuidv4() },
});

export const removeToast = (id) => ({
	type: REMOVE_TOAST,
	id,
});
