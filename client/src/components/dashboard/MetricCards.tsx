import {
  TrendingUp,
  Star,
  GitFork,
  Code2,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { Analytics } from '../../types'
import {
  getDeveloperScoreColor,
  getDeveloperScoreLabel,
  formatNumber,
  getTimeAgo,
} from '../../lib/utils'

interface MetricCardsProps {
  analytics: Analytics
}

// Generate mock trend data for charts
const generateTrendData = (value: number) => {
  const baseValue = Math.floor(value / 20)
  return Array.from({ length: 10 }, (_) => ({
    value: baseValue + Math.floor(Math.random() * baseValue * 0.5),
  }))
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: {
  title: string
  value: string | number
  icon: React.ComponentType<{ className: string }>
  color: string
  trend?: any[]
  subtitle?: string
}) => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </CardContent>
  </Card>
)

export default function MetricCards({ analytics }: MetricCardsProps) {
  const metrics = [
    {
      title: 'Developer Score',
      value: analytics.developerScore.toFixed(1),
      icon: TrendingUp,
      color: getDeveloperScoreColor(analytics.developerScore),
      subtitle: getDeveloperScoreLabel(analytics.developerScore),
      trend: generateTrendData(analytics.developerScore),
    },
    {
      title: 'Total Stars',
      value: formatNumber(analytics.totalStars),
      icon: Star,
      color: 'text-yellow-400',
      trend: generateTrendData(analytics.totalStars),
    },
    {
      title: 'Total Forks',
      value: formatNumber(analytics.totalForks),
      icon: GitFork,
      color: 'text-purple-400',
      trend: generateTrendData(analytics.totalForks),
    },
    {
      title: 'Most Used Language',
      value: analytics.mostUsedLanguage,
      icon: Code2,
      color: 'text-blue-400',
      subtitle: `${analytics.languageDistribution[analytics.mostUsedLanguage] || 0} repositories`,
    },
    {
      title: 'Last Active',
      value: getTimeAgo(analytics.lastActiveAt),
      icon: Clock,
      color: 'text-red-400',
      subtitle: new Date(analytics.lastActiveAt).toLocaleDateString(),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
