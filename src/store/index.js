// Redux Toolkit store configuration function
import { configureStore } from '@reduxjs/toolkit'
// Earthquake state reducer
import earthquakesReducer from '../store/earthquakesSlice'

// Create and configure the Redux store
export const store = configureStore({
    // Combine all reducers into the store
    reducer: {
        earthquakes: earthquakesReducer,
    },
})

export default store

