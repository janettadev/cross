import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addToBasket} from "../redux/cross/crossSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from '@mui/icons-material/Check';

const Cards = ({ el }) => {
	const dispatch = useDispatch();
	function handleAddToBasket(e) {
		return dispatch(addToBasket(el));
	}
	return (
		<React.Fragment>
			<CardContent
				sx={{
					border: "1.5px solid #F3F3F3",
					borderRadius: "40px",
					padding: "25px 25px 35px 30px",
					position: "relative",
				}}>
					<Button sx={{
							maxWidth: "32px",
							maxHeight: "32px",
							minWidth: "32px",
							minHeight: "32px",
							border: "1.5px solid #F2F2F2",
							borderRadius: "8px",
							position: "absolute"
						}}>
					<FavoriteBorderIcon sx={{ color: "rgb(211, 211, 211)" }} />
				</Button>
				<img
					src={el.image}
					alt=""
					style={{ width: "133px", height: "112px" }}
				/>

				<Typography
					sx={{
						color: "#000",
						fontSize: "14px",
						fontWeight: "400",
						margin: "14px 0",
						width: "150px",
					}}>
					{el.name}
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "space-between",
					}}>
					<Box>
						<Typography
							sx={{
								color: "rgb(189, 189, 189)",
								fontSize: "11px",
								fontWeight: "500",
							}}>
							Цена:
						</Typography>
						<Typography
							sx={{
								color: "#000",
								fontSize: "14px",
								fontWeight: "700",
							}}>
							{el.price}
						</Typography>
					</Box>
					<Button
						onClick={handleAddToBasket}
						sx={{
							maxWidth: "32px",
							maxHeight: "32px",
							minWidth: "32px",
							minHeight: "32px",
							border: "1.5px solid #F2F2F2",
							borderRadius: "8px",
						}}>
						<AddIcon sx={{ color: "#D3D3D3" }} />
					</Button> 
					
				</Box>
			</CardContent>
		</React.Fragment>
	);
};

export default Cards;
