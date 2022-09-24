import { configureStore } from '@reduxjs/toolkit'

// reducers
import initialReducer from './initialReducer/slice'

export const store = configureStore({
    reducer: {
        initial: initialReducer
    }
})
