import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

const page = load => () => load().then(m => ({ Component: m.default }))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/work', lazy: page(() => import('@/pages/Work')) },
      { path: '/work/:slug', lazy: page(() => import('@/pages/ProjectDetail')) },
      { path: '/about', lazy: page(() => import('@/pages/About')) },
      { path: '*', lazy: page(() => import('@/pages/NotFound')) },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
