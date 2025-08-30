// Redux Toolkit functions for async actions and state management
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// HTTP client for API requests
import axios from 'axios'

// USGS earthquake data API endpoint (past 24 hours)
const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

// Async thunk to fetch earthquake data from USGS API
export const fetchEarthquakes = createAsyncThunk('earthquakes/fetch', async () => {
    const res = await axios.get(URL, { timeout: 15000 })
    return res.data
})

// Redux slice for earthquake state management
const earthquakesSlice = createSlice({
    name: 'earthquakes',
    // Initial state structure
    initialState: {
        data: null,        // Earthquake data from API
        loading: false,    // Loading state indicator
        error: null,       // Error message if fetch fails
        minMag: 0,         // Minimum magnitude filter
    },
    // Synchronous reducers for state updates
    reducers: {
        // Update minimum magnitude filter
        setMinMag(state, action) {
            state.minMag = action.payload ?? 0
        },
    },
    // Handle async action states
    extraReducers: (builder) => {
        builder
            // Set loading state when fetch starts
            .addCase(fetchEarthquakes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            // Update state with fetched data when successful
            .addCase(fetchEarthquakes.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            // Handle errors when fetch fails
            .addCase(fetchEarthquakes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || { message: 'Failed to fetch' }
                state.data = null
            })
    },
})

// Export actions and reducer
export const { setMinMag } = earthquakesSlice.actions
export default earthquakesSlice.reducer

