export default function MagnitudeFilter({ value, onChange }) {
  return (
    <div>
      {/* Filter title */}
      <h2 className="font-semibold text-slate-800 mb-2">Filter by Magnitude</h2>
      <div className="flex items-center gap-3">
        {/* Range slider for magnitude selection */}
        <input
          type="range"
          min="0" max="7" step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
        {/* Current value display */}
        <span className="w-12 text-right tabular-nums font-mono">{value.toFixed(1)}</span>
      </div>
      {/* Help text explaining the filter */}
      <p className="mt-1 text-xs text-slate-500">Showing earthquakes with magnitude ≥ {value.toFixed(1)}</p>
    </div>
  )
}
