import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import type { HistoryProfile } from './types'

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
        <div className="flex h-screen bg-background text-foreground">
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
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </Router>
    </QueryClientProvider>
  )
}
