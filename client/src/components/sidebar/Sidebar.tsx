import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GitPullRequestArrow, BarChart3, History, Menu, X, Settings } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import type { HistoryProfile } from '../../types'

interface SidebarProps {
  recentProfiles: HistoryProfile[]
}

export default function Sidebar({ recentProfiles }: SidebarProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      href: '/',
    },
    {
      icon: History,
      label: 'History',
      href: '/history',
    },
  ]

  const handleProfileClick = (username: string) => {
    navigate('/', { state: { username } })
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 border-r border-border bg-background glass-effect z-40 transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/20">
            <GitPullRequestArrow className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">GITHUB ANALYZER</h1>
            <p className="text-xs text-muted-foreground">Developer Analytics</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2 mb-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Button
                  key={item.label}
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => {
                    navigate(item.href)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </div>

          {/* Recently Analyzed */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Recently Analyzed
            </h2>
            <div className="space-y-2">
              {recentProfiles.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4">
                  No analyzed profiles yet
                </p>
              ) : (
                recentProfiles.map((profile) => (
                  <button
                    key={profile.login}
                    onClick={() => handleProfileClick(profile.login)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={profile.avatarUrl} alt={profile.login} />
                      <AvatarFallback>{profile.login.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {profile.login}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {new Date(profile.lastAnalyzedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>

            {recentProfiles.length > 0 && (
              <Button
                variant="ghost"
                className="w-full mt-4 text-xs"
                onClick={() => {
                  navigate('/history')
                  setIsOpen(false)
                }}
              >
                View All History →
              </Button>
            )}
          </div>
        </nav>

        {/* Settings */}
        <div className="border-t border-border p-6">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main content offset on desktop */}
      <div className="hidden md:block md:w-64" />
    </>
  )
}
