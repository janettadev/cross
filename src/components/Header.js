import {
	AppBar,
	Badge,
	Box,
	Button,
	CardContent,
	Modal,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../img/image 4.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromBasket, fetchBasket } from "../redux/cross/crossSlice";
import CloseIcon from "@mui/icons-material/Close";
import boxImage from "../img/image 8.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Header = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const basket = useSelector((state) => state.cross.basket || []);

	useEffect(() => {
		dispatch(fetchBasket());
	}, [dispatch]);


	function deleteBasket(itemId) {
		return dispatch(deleteFromBasket(itemId));
	}

	const arr = basket
		.map((el) => el.price)
		.map((value) => parseFloat(value.replace("€", "")));
	const price = arr.reduce((acc, curr) => acc + curr, 0).toPrecision(4);
	const percent = (price * 5) / 100;

	return (
		<Box>
			<AppBar sx={{ background: "#fff", padding: "15px" }}>
				<Toolbar>
					<img
						src={logo}
						alt=""
						style={{ width: "50px", height: "50px", marginTop: "10px" }}
					/>
					<Box mt={2} ml={2}>
						<Typography
							sx={{ fontSize: 20, fontWeight: 700, color: "#000000" }}>
							KROSS STORE
						</Typography>
						<Typography sx={{ fontSize: "14px", color: "#9D9D9D" }}>
							Магазин лучших кроссовок
						</Typography>
					</Box>
					<Box sx={{ display: "flex", gap: "40px", marginLeft: "auto" }}>
						<Box display="flex" alignItems="center">
							<Button onClick={handleOpen}>
								<Badge
									badgeContent={basket.length}
									color="error"
									sx={{
										"& .MuiBadge-badge": {
											fontSize: 9,
											height: 17,
											minWidth: 17,
										},
									}}>
									<ShoppingCartIcon
										sx={{ color: "#9B9B9B", width: 25, height: 25 }}
									/>
								</Badge>
								<Typography
									sx={{
										color: "#5C5C5C",
										marginLeft: "10px",
										fontSize: "14px",
									}}>
									€{price}
								</Typography>
							</Button>
						</Box>
						<Box display="flex" alignItems="center">
							<Badge
								badgeContent={0}
								color="error"
								sx={{
									"& .MuiBadge-badge": {
										fontSize: 9,
										height: 17,
										minWidth: 17,
									},
								}}>
								<FavoriteBorderIcon
									sx={{ color: "#9B9B9B", width: 25, height: 25 }}
								/>
							</Badge>
							<Typography
								sx={{
									color: "#5C5C5C",
									marginLeft: "10px",
									fontSize: "14px",
								}}>
								Закладки
							</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<AccountCircleIcon
								sx={{ color: "#9B9B9B", width: 25, height: 25 }}
							/>
							<Typography
								sx={{
									color: "#5C5C5C",
									marginLeft: "10px",
									fontSize: "14px",
								}}>
								Профиль
							</Typography>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Box
					sx={{
						background: "rgb(255, 255, 255)",
						width: "345px",
						padding: "30px 25px",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}>
					<Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
						Корзина
					</Typography>
					{basket.length !== 0 ? (
						<Box
							sx={{
								height: "100vh",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}>
							<Box
								className="scroll"
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column",
									gap: "20px",
									overflow: "hidden",
									overflowY: "scroll",
									height: "400px",
								}}>
								{basket.map((item) => (
									<Box>
										<React.Fragment>
											<CardContent
												sx={{
													border: "1px solid rgb(243, 243, 243)",
													borderRadius: "20px",
													padding: "20px",
													display: "flex",
													justifyContent: "space-between",
												}}>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														gap: "21px",
													}}>
													<img
														src={item.image}
														alt=""
														style={{
															width: "70px",
															height: "70px",
														}}
													/>

													<Box>
														<Typography
															sx={{
																color: "#000",
																fontSize: "14px",
																fontWeight: "400",
																width: "150px",
																lineHeight: "17px",
															}}>
															{item.name}
														</Typography>
														<Typography
															sx={{
																color: "#000",
																fontSize: "14px",
																fontWeight: "700",
															}}>
															{item.price}
														</Typography>
													</Box>
												</Box>
												<Button
													onClick={() => deleteBasket(item.id)}
													sx={{
														maxWidth: "32px",
														maxHeight: "32px",
														minWidth: "32px",
														minHeight: "32px",
														border: "1.5px solid #F2F2F2",
														borderRadius: "8px",
														marginTop: "auto",
													}}>
													<CloseIcon sx={{ color: "#D3D3D3" }} />
												</Button>
											</CardContent>
										</React.Fragment>
									</Box>
								))}
							</Box>
							<Box>
								<Box>
									<Typography
										sx={{
											fontSize: "16px",
											fontWeight: "400",
											width: "325px",
											display: "flex",
											justifyContent: "space-between",
										}}>
										Итого: ..........................................{" "}
										<span
											style={{
												fontSize: "16px",
												fontWeight: "600",
											}}>
											€{price}
										</span>
									</Typography>
									<Typography
										sx={{
											fontSize: "16px",
											fontWeight: "400",
											width: "325px",
											display: "flex",
											justifyContent: "space-between",
										}}>
										Налог 5%: ...................................{" "}
										<span
											style={{
												fontSize: "16px",
												fontWeight: "600",
											}}>
											€{percent}
										</span>
									</Typography>
									<Button
										sx={{
											background: "rgb(157, 212, 88)",
											color: "#ffff",
											display: "flex",
											alignItems: "center",
											padding: "17px",
											borderRadius: "18px",
											gap: "20px",
											width:"325px",
											marginTop:'20px'
										}}>
										Оформить заказ <ArrowForwardIcon />
									</Button>
								</Box>
							</Box>
						</Box>
					) : (
						<Box
							sx={{
								marginTop: "130px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}>
							<img
								src={boxImage}
								alt=""
								style={{ width: "120px", height: "120px" }}
							/>
							<Typography
								sx={{
									fontSize: "22px",
									fontWeight: "600",
									color: "#000",
								}}>
								Корзина пустая
							</Typography>
							<Typography
								sx={{
									fontSize: "16px",
									fontWeight: "400",
									color: "#000",
									textAlign: "center",
									margin: "9px 0 40px 0",
								}}>
								Добавьте хотя бы одну пару кроссовок, чтобы сделать
								заказ.
							</Typography>
							<Button
								sx={{
									background: "rgb(157, 212, 88)",
									color: "#ffff",
									display: "flex",
									alignItems: "center",
									padding: "17px",
									borderRadius: "18px",
									gap: "20px",
								}}
								onClick={handleClose}>
								<ArrowBackIcon /> Вернуться назад
							</Button>
						</Box>
					)}
				</Box>
			</Modal>
		</Box>
	);
};

export default Header;
