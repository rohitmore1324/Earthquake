// Utility functions for formatting data
import { fmtMag, fmtTime } from '../utils/format'

export default function SidebarList({ items, loading, error }) {
  // Show loading state
  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading recent earthquakes…</div>
  }
  // Show error state
  if (error) {
    return <div className="p-4 text-sm text-red-600">Unable to fetch earthquake data. Please try again later.</div>
  }
  // Show empty state
  if (!items || items.length === 0) {
    return <div className="p-4 text-sm text-slate-500">No earthquake activity recorded in the past 24 hours.</div>
  }

  return (
    <ul className="divide-y">
      {items.map((f) => {
        const id = f.id
        const p = f.properties || {}
        const g = f.geometry || {}
        const [lon, lat] = g.coordinates || []
        return (
          <li key={id} className="p-3 hover:bg-slate-50">
            {/* Clickable earthquake item */}
            <a
              className="block cursor-pointer"
              onClick={() => {
                // Dispatch custom event to zoom map to this location
                const ev = new CustomEvent('zoomTo', { detail: { lat, lon, id } })
                window.dispatchEvent(ev)
              }}
            >
              <div className="flex items-center justify-between">
                {/* Location name */}
                <div className="font-medium text-slate-800">{p.place || 'Unknown location'}</div>
                {/* Magnitude badge */}
                <div className="text-xs px-2 py-0.5 rounded bg-slate-100">M {fmtMag(p.mag)}</div>
              </div>
              {/* Formatted time */}
              <div className="mt-1 text-xs text-slate-500">{fmtTime(p.time)}</div>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
