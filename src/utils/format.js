// Format timestamp to human-readable date string
export const fmtTime = (ms) => new Date(ms).toLocaleString()
// Format magnitude to 1 decimal place, show 'N/A' if null/undefined
export const fmtMag = (m) => (m === null || m === undefined ? 'N/A' : Number(m).toFixed(1))
// Format depth to 1 decimal place with 'km' unit, show '—' if null/undefined
export const fmtDepth = (km) => (km === null || km === undefined ? '—' : `${Number(km).toFixed(1)} km`)
