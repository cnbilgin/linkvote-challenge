import reducers from "../reducers";
import middlewares from "../middlewares";
import { createStore } from "redux";

export const store = createStore(reducers, middlewares);
