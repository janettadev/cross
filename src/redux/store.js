import { configureStore } from "@reduxjs/toolkit";
import crossReducer from "./cross/crossSlice"

export const store = configureStore({
	reducer: {
		cross: crossReducer,
	},
});

