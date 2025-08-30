export default function Footer() {
  return (
    // Fixed footer at bottom of page
    <footer className="border-t border-slate-200 bg-white fixed bottom-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-slate-500 flex flex-wrap items-center gap-x-4">
        {/* Data source information */}
        <span>Data: USGS (past 24h, updated periodically)</span>
        <span>•</span>
        {/* Technology stack information */}
        <span>Built with React, Leaflet, Tailwind</span>
      </div>
    </footer>
  )
}
