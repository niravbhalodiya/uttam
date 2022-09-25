import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../utils/Axios";
import { ACCESS_TOKEN, USER_ID } from "../../utils/constants";
import state from "./state";

export const SignInApi = createAsyncThunk('SignInApi', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post('/auth/login', payload)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }

        return rejectWithValue(error.response.data)
    }
})

export const SignUpApi = createAsyncThunk('SignUpApi', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post('/auth/signup', payload)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }

        return rejectWithValue(error.response.data)
    }
})


const AuthReducer = createSlice({
    name: "authReducer",
    initialState: state,
    extraReducers: {
        // SignIn
        [SignInApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SIGN_IN_API'
        },
        [SignInApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.user = action.payload.data
            state.type = 'SIGN_IN_API'
        },
        [SignInApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            state.type = 'SIGN_IN_API'
        },

        // SignUp
        [SignUpApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SIGN_UP_API'
        },
        [SignUpApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.user = action.payload.data
            state.type = 'SIGN_UP_API'
        },
        [SignUpApi.rejected]: (state, action) => {
            console.log(action);
            state.status = 'failed'
            state.error = action.payload.message
            state.type = 'SIGN_UP_API'
        },
    },
    reducers: {
        setAuth: (state, action) => {
            state.status = null
            state.type = null
        }
    }
})

export const { setAuth } = AuthReducer.actions
const { reducer } = AuthReducer
export default reducer