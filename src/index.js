import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import reducers from "./reducers";
import middlewares from "./middlewares";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducers, middlewares);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
