// Testing library imports for React component testing
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
// Component to test
import SidebarList from './SidebarList'

// Helper function to create mock earthquake data for testing
const feature = (id, { place = 'Somewhere', mag = 4.2, time = 1717171717, lat = 10, lon = 20 } = {}) => ({
  id,
  properties: { place, mag, time },
  geometry: { type: 'Point', coordinates: [lon, lat] },
})

describe('SidebarList', () => {
  // Test loading state display
  it('shows loading state', () => {
    render(<SidebarList loading items={[]} />)
    expect(screen.getByText(/Loading recent earthquakes/i)).toBeInTheDocument()
  })

  // Test error state display
  it('shows error state', () => {
    render(<SidebarList error={{ message: 'nope' }} items={[]} />)
    expect(screen.getByText(/Unable to fetch earthquake data/i)).toBeInTheDocument()
  })

  // Test empty state display
  it('shows empty state', () => {
    render(<SidebarList items={[]} />)
    expect(screen.getByText(/No earthquake activity/i)).toBeInTheDocument()
  })

  // Test rendering items and click functionality
  it('renders items and dispatches zoomTo on click', () => {
    const items = [feature('a1'), feature('a2', { place: 'Elsewhere', mag: 5.1, lat: 1, lon: 2 })]
    const spy = vi.spyOn(window, 'dispatchEvent')
    render(<SidebarList items={items} />)

    // Check if items are rendered
    expect(screen.getByText('Somewhere')).toBeInTheDocument()
    expect(screen.getByText('Elsewhere')).toBeInTheDocument()

    // Test click event and zoomTo dispatch
    fireEvent.click(screen.getByText('Elsewhere'))
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})
