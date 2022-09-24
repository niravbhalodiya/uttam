import { createSlice } from "@reduxjs/toolkit";
import state from "./state";


const initialReducer = createSlice({
    name: "initialReducer",
    initialState: state,
    extraReducers: {},
    reducers: {}
})


const { reducer } = initialReducer

export default reducer