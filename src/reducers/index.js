import { combineReducers } from "redux";

import links from "./links";
import toasts from "./toasts";

export default combineReducers({
	links,
	toasts,
});
