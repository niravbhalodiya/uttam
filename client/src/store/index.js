import { configureStore } from '@reduxjs/toolkit'

// reducers
import AuthReducer from './auth/slice'
import ChallengeReducer from './challenge/slice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        challenge: ChallengeReducer,
    }
})
