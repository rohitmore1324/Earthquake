// React hook for performance optimization
import { useMemo } from 'react'
// Redux hooks for state management
import { useDispatch, useSelector } from 'react-redux'
// Action to update minimum magnitude filter
import { setMinMag } from '../store/earthquakesSlice'
// Component for magnitude filtering
import MagnitudeFilter from '../components/MagnitudeFilter'
// Utility functions for formatting data
import { fmtMag, fmtTime } from '../utils/format'

export default function SearchPage() {
    // Get dispatch function to send actions to Redux store
    const dispatch = useDispatch()
    // Get earthquake data and state from Redux store
    const { data, loading, error, minMag } = useSelector((s) => s.earthquakes)

    // Filter earthquakes by minimum magnitude (memoized for performance)
    const items = useMemo(() => {
        return (data?.features ?? []).filter(f => (f.properties?.mag ?? -Infinity) >= minMag)
    }, [data, minMag])

    return (
        <div className="max-w-7xl w-full mx-auto p-2 sm:p-4">
            {/* Sticky filter section at top */}
            <div className="sticky top-14 z-20 bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4">
                <MagnitudeFilter value={minMag} onChange={(v) => dispatch(setMinMag(v))} />
            </div>

            <div className="mt-3 sm:mt-4">
                {/* Show loading state */}
                {loading && <div className="p-4 text-sm text-slate-500">Loading…</div>}
                {/* Show error state */}
                {error && <div className="p-4 text-sm text-red-600">Failed to load data.</div>}
                {/* Show empty state when no results */}
                {!loading && !error && items.length === 0 && (
                    <div className="p-4 text-sm text-slate-500">No results.</div>
                )}

                {/* Grid of earthquake cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {items.map((f) => {
                        // Extract earthquake properties and coordinates
                        const p = f.properties || {}
                        const g = f.geometry || {}
                        const [lon, lat] = g.coordinates || []
                        return (
                            <div key={f.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4">
                                {/* Location name */}
                                <div className="text-slate-800 font-semibold">{p.place || 'Unknown location'}</div>
                                {/* Magnitude with formatting */}
                                <div className="mt-1 text-sm text-slate-600">Magnitude: {fmtMag(p.mag)}</div>
                                {/* Time with formatting */}
                                <div className="text-sm text-slate-600">Time: {fmtTime(p.time)}</div>
                                {/* Coordinates */}
                                <div className="mt-2 text-xs text-slate-500">Lat {lat?.toFixed?.(2)}, Lon {lon?.toFixed?.(2)}</div>
                                {/* Link to details if available */}
                                {p.url && (
                                    <a href={p.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-brand-600 underline">Details</a>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}



