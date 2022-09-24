import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../utils/Axios";
import state from "./state";

export const SignInApi = createAsyncThunk('SignInApi', async (payload, { rejectWithValue }) => {
    try {
        const res = axiosApi.post('/user/login', payload)
        return res
    } catch (error) {
        console.log(error);
    }
})

export const SignUpApi = createAsyncThunk('SignUpApi', async (payload, { rejectWithValue }) => {
    try {
        const res = axiosApi.post('/user/signup', payload)
        return res
    } catch (error) {
        console.log(error);
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
            state.user = action.payload
            state.type = 'SIGN_IN_API'
        },
        [SignInApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'SIGN_IN_API'
        },

        // SignUp
        [SignUpApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SIGN_UP_API'
        },
        [SignUpApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.user = action.payload
            state.type = 'SIGN_UP_API'
        },
        [SignUpApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
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