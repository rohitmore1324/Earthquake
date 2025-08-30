// React hook for side effects
import { useEffect } from 'react'
// Map component to display earthquakes
import MapView from './components/MapView'
// Redux hooks for state management
import { useDispatch, useSelector } from 'react-redux'
// Action to fetch earthquake data
import { fetchEarthquakes } from './store/earthquakesSlice'

export default function App() {
  // Get dispatch function to send actions to Redux store
  const dispatch = useDispatch()
  // Get earthquake data and state from Redux store
  const { data, loading, error, minMag } = useSelector((s) => s.earthquakes)

  // Fetch earthquake data when component mounts
  useEffect(() => {
    dispatch(fetchEarthquakes())
  }, [dispatch])

  // Get all earthquake features for display
  const filtered = (data?.features ?? [])

  return (
    <div className="p-2 sm:p-4 max-w-7xl w-full mx-auto">
      {/* Main content area with responsive height */}
      <main className="h-[calc(100vh-160px)] sm:h-[calc(100vh-156px)]">
        {/* Map container with styling */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full overflow-hidden">
          <MapView loading={loading} error={error} items={filtered} />
        </div>
      </main>
    </div>
  )
}
