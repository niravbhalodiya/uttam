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
// get solutions
export const getSolutions = createAsyncThunk('getSolutions', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/user/solution/${id}`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// Add challenge
export const postChallenge = createAsyncThunk('postChallenge', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`user/add-post`, payload)
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
        const res = await axiosApi.post(`/user/solution`, payload)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// add comment
export const postComment = createAsyncThunk('postComment', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/user/comment`, payload)
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

        // Get Single Challenge
        [getSolutions.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SOLUTIONS'
        },
        [getSolutions.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.solutions = action.payload.data.data
            state.type = 'GET_SOLUTIONS'
        },
        [getSolutions.rejected]: (state, action) => {
            state.status = 'failed'
            // state.error = action.payload.message
            state.type = 'GET_SOLUTIONS'
        },

        // Get Single Challenge
        [postChallenge.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_CHALLENGE'
        },
        [postChallenge.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.solutions = action.payload.data.data
            state.type = 'POST_CHALLENGE'
        },
        [postChallenge.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_CHALLENGE'
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

        // Post comment
        [postComment.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_COMMENT'
        },
        [postComment.fulfilled]: (state, action) => {
            state.status = 'succeed'
            // state.challenge = action.payload.data.data
            state.type = 'POST_COMMENT'
        },
        [postComment.rejected]: (state, action) => {
            console.log(action);
            state.status = 'failed'
            // state.error = action.payload.message
            state.type = 'POST_COMMENT'
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