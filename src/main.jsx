import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import { isFigmaCapture } from '@/lib/figmaCapture'

// Dev-only Figma capture mode (`#figmacapture=…` URLs from the Figma MCP): load Figma's capture
// script and freeze scroll-reveal animations in their final state so off-screen sections are visible.
if (isFigmaCapture) {
  document.documentElement.classList.add('figma-capture')
  const script = document.createElement('script')
  script.src = 'https://mcp.figma.com/mcp/html-to-design/capture.js'
  script.async = true
  document.head.appendChild(script)
}

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
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
