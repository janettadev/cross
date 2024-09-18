	import { Container } from "@mui/material";
	import "./App.css";
	import Header from "./components/Header";
	import Product from "./components/Product";
	import Cards from "./components/Cards";

	function App() {
		return (
			<div className="App">
				<Container sx={{width:"1080px"}}>
					<Header />
					<Product/>
				</Container>
			</div>
		);
	}

	export default App;
