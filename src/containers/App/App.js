import Container from "../Container/Container";
import Header from "../Header/Header";
import classes from "./App.module.css";
function App() {
	return (
		<div className={classes.app}>
			<Header />
			<Container />
		</div>
	);
}

export default App;
