import {
	Box,
	InputBase,
	styled,
	Typography,
	CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { fetchCross } from "../redux/cross/crossSlice";
import Cards from "./Cards";

const Product = () => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.cross);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(fetchCross());
	}, []);

	const SearchIconWrapper = styled("div")(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: "inherit",
		"& .MuiInputBase-input": {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("md")]: {
				width: "20ch",
			},
			border: "1px solid #5C5C5C",
			borderRadius: "10px",
		},
	}));

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	
		const filteredData= data.filter((el) =>
			el?.name?.toLowerCase().includes(searchTerm.toLowerCase())
		);


	return (
		<Box sx={{ marginTop: "170px", width: "100%" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					margin: "70px 0",
					width: "960px",
				}}>
				<Typography
					sx={{ color: "#000", fontSize: "32px", fontWeight: "700" }}>
					Все кроссовки
				</Typography>
				<Box
					sx={{
						position: "relative",
						display: "flex",
						alignItems: "center",
						marginTop: 2,
					}}>
					
          <input className="input" type="text" onChange={handleInputChange} />
				</Box>
			</Box>
			<Box>
				<Box
					sx={{
						display: "flex",
						gap: "40px",
						flexWrap: "wrap",
						width: "100%",
					}}>
					{filteredData.length > 0 ? (
						filteredData.map((el) => <Cards key={el.id} el={el} />)
					) : (
						<Typography>No products found</Typography>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Product;
