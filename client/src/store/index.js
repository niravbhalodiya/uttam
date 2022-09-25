import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

// reducers
import AuthReducer from './auth/slice'
import ChallengeReducer from './challenge/slice'

const rootReducer = {
    auth: AuthReducer,
    challenge: ChallengeReducer,
}

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
})
