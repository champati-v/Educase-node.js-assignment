import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import SearchBar from '../components/dashboard/SearchBar'
import ProfileHeader from '../components/dashboard/ProfileHeader'
import MetricCards from '../components/dashboard/MetricCards'
import LanguageChart from '../components/dashboard/LanguageChart'
import RepositoriesTable from '../components/dashboard/RepositoriesTable'
import EmptyState from '../components/dashboard/EmptyState'
import LoadingState from '../components/dashboard/LoadingState'
import { Alert, AlertDescription } from '../components/ui/alert'
import { githubAPI } from '../service/api'
import type { GitHubAnalysisResponse, HistoryProfile } from '../types'

interface DashboardProps {
  onProfileAnalyzed: (profile: HistoryProfile) => void
}

export default function Dashboard({ onProfileAnalyzed }: DashboardProps) {
  const [data, setData] = useState<GitHubAnalysisResponse['data'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  const state = location.state as { username?: string } | null

  useEffect(() => {
    if (state?.username) {
      handleSearch(state.username)
    }
  }, [state?.username])

  const handleSearch = async (username: string) => {
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await githubAPI.analyzeProfile(username)

      if (response.success && response.data) {
        setData(response.data)
        
        // Add to history
        const historyProfile: HistoryProfile = {
          login: response.data.profile.login,
          avatarUrl: response.data.profile.avatar_url,
          developerScore: response.data.analytics.developerScore,
          lastAnalyzedAt: new Date().toISOString(),
        }
        onProfileAnalyzed(historyProfile)

        toast.success(`Successfully analyzed ${username}'s profile!`)
      } else {
        setError('Failed to analyze profile')
        toast.error('Failed to analyze profile')
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'User not found or API error'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      <div className="p-6 space-y-6">
        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Empty State */}
        {!loading && !data && !error && <EmptyState />}

        {/* Loaded State */}
        {!loading && data && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <ProfileHeader profile={data.profile} />
            <MetricCards analytics={data.analytics} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <LanguageChart analytics={data.analytics} />
              </div>
              <div className="lg:col-span-2">
                <RepositoriesTable
                  repositories={data.repositories}
                  profileUrl={data.profile.html_url}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
