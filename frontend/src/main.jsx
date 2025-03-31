import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateCampaignPage from './pages/createCampaignPage.jsx'
import DonatePage from './pages/donatePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/homePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/homepage',
    element: <HomePage />
  },
  {
    path: '/create-campaign',
    element: <CreateCampaignPage />
  },
  {
    path: '/donate/:campaignID',
    element: <DonatePage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
