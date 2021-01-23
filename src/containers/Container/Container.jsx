import classes from "./Container.module.css";
import React from "react";
import LinkListContainer from "../LinkListContainer/LinkListContainer";
import LinkAddContainer from "../LinkAddContainer/LinkAddContainer";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

export default function Container() {
	return (
		<div className={classes.container}>
			<Router>
				<Switch>
					<Route path="/add" exact component={LinkAddContainer} />
					<Route path="/" component={LinkListContainer} />
				</Switch>
			</Router>
		</div>
	);
}
