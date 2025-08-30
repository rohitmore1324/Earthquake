// React core library
import React from 'react'
// React DOM for rendering
import ReactDOM from 'react-dom/client'
// Redux provider for state management
import { Provider } from 'react-redux'
// Router components for navigation
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Redux store configuration
import store from './store/index.js'
// Main app component
import App from './App.jsx'
// Search page component
import SearchPage from './pages/Search.jsx'
// Global styles
import './index.css'
// Leaflet map styles
import 'leaflet/dist/leaflet.css'
// Root layout wrapper
import RootLayout from './layouts/RootLayout.jsx'

// Define application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <App /> }, // Home page
      { path: 'search', element: <SearchPage /> }, // Search page
    ],
  },
])

// Render the app to the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
