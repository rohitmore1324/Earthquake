// Router component for rendering nested routes
import { Outlet } from 'react-router-dom'
// Header component with navigation
import Header from '../components/Header'
// Footer component
import Footer from '../components/Footer'
// Redux hook for dispatching actions
import { useDispatch } from 'react-redux'
// Action to fetch earthquake data
import { fetchEarthquakes } from '../store/earthquakesSlice'

export default function RootLayout() {
    // Get dispatch function to send actions to Redux store
    const dispatch = useDispatch()
    return (
        // Main layout container with full height and offset classes
        <div className="min-h-screen flex flex-col app-offset-top app-offset-bottom">
            {/* Header with refresh functionality */}
            <Header onRefresh={() => dispatch(fetchEarthquakes())} />
            {/* Main content area that grows to fill available space */}
            <div className="flex-1">
                <Outlet />
            </div>
            {/* Footer at bottom */}
            <Footer />
        </div>
    )
}

