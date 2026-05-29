import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Skeleton } from '../components/ui/skeleton'
import { githubAPI } from '../service/api'
import type { HistoryProfile } from '../types'
import { getTimeAgo, getDeveloperScoreColor, getDeveloperScoreLabel } from '../lib/utils'

interface HistoryPageProps {
  recentProfiles: HistoryProfile[]
}

export default function History({ recentProfiles }: HistoryPageProps) {
  const navigate = useNavigate()
  const [allProfiles, setAllProfiles] = useState<HistoryProfile[]>(recentProfiles)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      try {
        const response = await githubAPI.getHistory()
        if (response.success && response.data) {
          setAllProfiles(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleRowClick = (username: string) => {
    navigate('/', { state: { username } })
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground mt-2">
            View all analyzed profiles and their metrics
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Analyzed Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : allProfiles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No profiles analyzed yet. Start analyzing on the Dashboard!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Developer Score</TableHead>
                      <TableHead>Last Analyzed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProfiles.map((profile) => (
                      <TableRow
                        key={profile.login}
                        onClick={() => handleRowClick(profile.login)}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={profile.avatarUrl}
                                alt={profile.login}
                              />
                              <AvatarFallback>
                                {profile.login.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{profile.login}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getDeveloperScoreColor(profile.developerScore)}`}>
                              {profile.developerScore.toFixed(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {getDeveloperScoreLabel(profile.developerScore)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {getTimeAgo(profile.lastAnalyzedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
