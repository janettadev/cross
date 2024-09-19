import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASKET, API_CROSS } from "../../const"; 

export const fetchCross = createAsyncThunk("cross/fetchCross", async () => {
	const response = await axios.get(API_CROSS);
	return response.data;
});

export const fetchBasket = createAsyncThunk("cross/fetchBasket", async () => {
	const response = await axios.get(API_BASKET);
	return response.data;
});

export const addToBasket = createAsyncThunk(
	"cross/addToBasket",
	async (item, { rejectWithValue }) => {
		try {
			const response = await axios.post(API_BASKET, item);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data); 
		}
	}
);

export const deleteFromBasket = createAsyncThunk(
	"cross/deleteFromBasket",
	async (itemId, { rejectWithValue }) => {
		try {
			await axios.delete(`${API_BASKET}/${itemId}`);
			return itemId;
		} catch (error) {
			return rejectWithValue(error.response.data); 
		}
	}
);

const crossSlice = createSlice({
	name: "cross",
	initialState: {
		data: [],
		loading: false,
		error: null,
		basket: [],
		mark: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCross.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCross.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchCross.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Add to basket
			.addCase(addToBasket.pending, (state) => {
				state.loading = true;
			})
			.addCase(addToBasket.fulfilled, (state, action) => {
				state.loading = false;
				state.basket.push(action.payload);
			})
			.addCase(addToBasket.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})
			// Fetch Basket
			.addCase(fetchBasket.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBasket.fulfilled, (state, action) => {
				state.loading = false;
				state.basket = action.payload;
			})
			.addCase(fetchBasket.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Delete from basket
			.addCase(deleteFromBasket.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteFromBasket.fulfilled, (state, action) => {
				state.loading = false;
				state.basket = state.basket.filter(
					(item) => item.id !== action.payload
				);
			})
			.addCase(deleteFromBasket.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			});
	},
});

export default crossSlice.reducer;
