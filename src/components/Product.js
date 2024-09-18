import { Box, InputBase, styled, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCross } from "../redux/cross/crossSlice";
import Cards from "./Cards";

const Product = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.cross);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    dispatch(fetchCross());
  }, [dispatch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((el) =>
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
        }}
      >
        <Typography sx={{ color: "#000", fontSize: "32px", fontWeight: "700" }}>
          Все кроссовки
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#E4E4E4" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
      <Box>
        {loading ? (
          <div
            className="foods--loader"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <div className="loader"></div>
          </div>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : (
          <Box sx={{ display: "flex", gap: "40px", flexWrap: "wrap", width: "960px" }}>
            {filteredData.map((el) => <Cards key={el.id} el={el} />)}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Product;
