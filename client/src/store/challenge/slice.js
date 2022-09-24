import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../utils/Axios";
import state from "./state";

export const getAllChallenges = createAsyncThunk('getAllChallenges',async (payload, {rejectWithValue}) => {
    try {
        const res = axiosApi.post('/user/login', payload)
        return res
    } catch (error) {
        console.log(error);
    }
})


const ChallengeReducer = createSlice({
    name: "challengeReducer",
    initialState: state,
    extraReducers: {},
    reducers: {
        setChallange: (state, action) => {
            state.status = null
            state.type = null
        }
    }
})

export const { setChallange } = ChallengeReducer.actions
const { reducer } = ChallengeReducer
export default reducer