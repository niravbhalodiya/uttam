import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../utils/Axios";
import { ACCESS_TOKEN, USER_ID } from "../../utils/constants";
import state from "./state";
import { toast } from 'react-toastify'

export const SignInApi = createAsyncThunk('SignInApi', async (payload, { rejectWithValue }) => {
    try {
        const res = axiosApi.post('/auth/login', payload)
        return res
    } catch (error) {
        console.log(error);
    }
})

export const SignUpApi = createAsyncThunk('SignUpApi', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post('/auth/signup', payload)
        const { token, userId } = res
        sessionStorage.setItem(ACCESS_TOKEN, token)
        sessionStorage.setItem(USER_ID, userId)
        navigate('/challenges')
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
            toast.success('Sign up successfully')
        },
        [SignUpApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.message
            state.type = 'SIGN_UP_API'
            toast.error(action.payload.message)
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