// React hooks for state management and side effects
import { useCallback, useEffect, useState } from 'react'
// HTTP client for API requests
import axios from 'axios'

// USGS earthquake data API endpoint (past 24 hours)
const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

// Custom hook for managing earthquake data state
export default function useEarthquakes() {
  // State for earthquake data, loading status, and errors
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to fetch earthquake data from API
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(URL, { timeout: 15000 })
      setData(res.data)
    } catch (e) {
      setError(e)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch data when component mounts
  useEffect(() => { fetchData() }, [fetchData])

  // Return state and refetch function
  return { data, loading, error, refetch: fetchData }
}
