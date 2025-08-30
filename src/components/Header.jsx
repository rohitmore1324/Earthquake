// Router component for navigation
import { Link } from 'react-router-dom'

export default function Header({ onRefresh }) {
  return (
    // Fixed header at top of page
    <header className="bg-white border-b border-slate-200 fixed top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-wrap items-center gap-2 justify-between">
        {/* App title with responsive text sizing */}
        <h1 className="text-base sm:text-xl md:text-2xl font-semibold text-slate-800 leading-tight">
          Earthquake Visualizer <span className="hidden sm:inline">– <span className="text-brand-600">Recent Global Seismic Activity</span></span>
        </h1>
        {/* Navigation menu */}
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
          {/* Home page link */}
          <Link to="/" className="px-3 py-2 rounded-lg border text-sm text-slate-700 hover:bg-slate-50">Home</Link>
          {/* Search page link */}
          <Link to="/search" className="px-3 py-2 rounded-lg border text-sm text-slate-700 hover:bg-slate-50">Search</Link>
          {/* Refresh button */}
          <button onClick={onRefresh} className="px-3 py-2 rounded-lg bg-brand-600 text-white text-sm hover:bg-brand-700">
            Refresh
          </button>
          {/* External USGS link */}
          <a
            href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php"
            target="_blank" rel="noreferrer"
            className="px-3 py-2 rounded-lg border text-sm text-slate-700 hover:bg-slate-50"
          >USGS</a>
        </nav>
      </div>
    </header>
  )
}
