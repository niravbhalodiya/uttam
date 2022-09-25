import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../utils/Axios";
import state from "./state";

export const getAllChallenges = createAsyncThunk('getAllChallenges', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get('/user/get-all-posts')
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})
// get single post
export const getSingleChallenge = createAsyncThunk('getSingleChallenge', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/user/getpost/${id}`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})
// post sol
export const postSolution = createAsyncThunk('postSolution', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/user/solution`,payload)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


const ChallengeReducer = createSlice({
    name: "challengeReducer",
    initialState: state,
    extraReducers: {
        // Get All Challenges
        [getAllChallenges.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_CHALLENGES'
        },
        [getAllChallenges.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.allChallenges = action.payload.data.data
            state.type = 'GET_ALL_CHALLENGES'
        },
        [getAllChallenges.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            state.type = 'GET_ALL_CHALLENGES'
        },

        // Get Single Challenge
        [getSingleChallenge.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SINGLE_CHALLENGES'
        },
        [getSingleChallenge.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.challenge = action.payload.data.data
            state.type = 'GET_SINGLE_CHALLENGES'
        },
        [getSingleChallenge.rejected]: (state, action) => {
            console.log(action);
            state.status = 'failed'
            // state.error = action.payload.message
            state.type = 'GET_SINGLE_CHALLENGES'
        },

        // Post Solution
        [postSolution.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_SOLUTION'
        },
        [postSolution.fulfilled]: (state, action) => {
            state.status = 'succeed'
            // state.challenge = action.payload.data.data
            state.type = 'POST_SOLUTION'
        },
        [postSolution.rejected]: (state, action) => {
            console.log(action);
            state.status = 'failed'
            // state.error = action.payload.message
            state.type = 'POST_SOLUTION'
        },
    },
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