// React hooks for effects, memoization, and refs
import { useEffect, useMemo, useRef } from 'react'
// Leaflet map components for React
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet'
// Leaflet CSS is imported in src/index.css
import { fmtDepth, fmtMag, fmtTime } from '../utils/format'

// Optional cluster import – requires `react-leaflet-cluster`
// import MarkerClusterGroup from 'react-leaflet-cluster'

// Component to listen for zoom-to events from other components
function ZoomToListener() {
  const map = useMap()
  useEffect(() => {
    // Handle custom zoom-to events
    function handler(e) {
      const { lat, lon } = e.detail
      if (typeof lat === 'number' && typeof lon === 'number') {
        map.flyTo([lat, lon], 6, { duration: 0.75 })
      }
    }
    window.addEventListener('zoomTo', handler)
    return () => window.removeEventListener('zoomTo', handler)
  }, [map])
  return null
}

export default function MapView({ items, loading, error }) {
  // Reference to the map instance
  const mapRef = useRef(null)

  // Create map markers from earthquake data (memoized for performance)
  const markers = useMemo(() => {
    return (items || []).map((f) => {
      const id = f.id
      const p = f.properties || {}
      const g = f.geometry || {}
      const [lon, lat, depthKm] = g.coordinates || []
      const mag = p.mag ?? 0

      // Style size by magnitude
      const radius = Math.max(4, mag * 2.5)

      // Color scale by magnitude (red for high, green for low)
      const color = mag >= 6 ? '#b91c1c' : mag >= 5 ? '#dc2626' : mag >= 4 ? '#f97316' : mag >= 3 ? '#f59e0b' : '#10b981'

      return (
        <CircleMarker
          key={id}
          center={[lat, lon]}
          radius={radius}
          pathOptions={{ color, fillOpacity: 0.7 }}
        >
          <Popup>
            <div className="space-y-1 text-sm">
              <div className="font-semibold">{p.place || 'Unknown location'}</div>
              <div><span className="font-medium">Magnitude:</span> {fmtMag(mag)}</div>
              <div><span className="font-medium">Time:</span> {fmtTime(p.time)}</div>
              <div><span className="font-medium">Depth:</span> {fmtDepth(depthKm)}</div>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className="text-brand-600 underline">Event details</a>
              )}
            </div>
          </Popup>
        </CircleMarker>
      )
    })
  }, [items])

  // Default map center (equatorial view)
  const center = [20, 0] // roughly equatorial view
  // Check if device is mobile for responsive zoom
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Show loading state
  if (loading) {
    return <div className="h-full grid place-items-center text-slate-500">Loading map…</div>
  }
  // Show error state
  if (error) {
    return <div className="h-full grid place-items-center text-red-600 text-sm">Unable to fetch earthquake data. Please try again later.</div>
  }
  // Show empty state
  if (!items || items.length === 0) {
    return <div className="h-full grid place-items-center text-slate-500 text-sm">No earthquake activity recorded in the past 24 hours.</div>
  }

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={isMobile ? 1 : 2}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
      dragging={true}
      tap={true}
      scrollWheelZoom={false}
      touchZoom={true}
      className="h-full"
    >
      <ZoomToListener />
      <ZoomControl position="bottomright" />
      {/* OpenStreetMap tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Simple markers */}
      {markers}

      {/* Optional clustering: wrap markers inside MarkerClusterGroup if installed */}
      {/** 
      <MarkerClusterGroup chunkedLoading removeOutsideVisibleBounds>
        {markers}
      </MarkerClusterGroup>
      */}
    </MapContainer>
  )
}
