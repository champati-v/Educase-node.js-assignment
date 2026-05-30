import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import { Button } from './components/ui/button'
import type { HistoryProfile } from './types'
import { inject } from "@vercel/analytics"

// Initialize Vercel Analytics
inject()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

export default function App() {
  const [recentProfiles, setRecentProfiles] = useState<HistoryProfile[]>([])
  const [showRenderNotice, setShowRenderNotice] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Load recent profiles from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('github-analyzer-recent')
    if (stored) {
      try {
        setRecentProfiles(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored profiles:', e)
      }
    }
  }, [])

  const handleProfileAnalyzed = (profile: HistoryProfile) => {
    setRecentProfiles((prev) => {
      const filtered = prev.filter((p) => p.login !== profile.login)
      const updated = [profile, ...filtered].slice(0, 5)
      localStorage.setItem('github-analyzer-recent', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="relative flex h-screen bg-background text-foreground">
          <Sidebar recentProfiles={recentProfiles} />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard onProfileAnalyzed={handleProfileAnalyzed} />
              }
            />
            <Route
              path="/history"
              element={<History recentProfiles={recentProfiles} />}
            />
          </Routes>

          {showRenderNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl">
                <p className="text-sm leading-relaxed sm:text-base">
                  I&apos;m using a free instance of Render to deploy the backend service. It will spin down with inactivity, which can delay API requests by 50 seconds or more. So please wait for some time for the response.
                </p>
                <div className="mt-5 flex justify-end">
                  <Button onClick={() => setShowRenderNotice(false)}>
                    Understood
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </Router>
    </QueryClientProvider>
  )
}
