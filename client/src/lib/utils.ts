import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatNumber(num?: number | null): string {
  if (num == null || Number.isNaN(num)) {
    return '0'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'

  return 'just now'
}

export function getDeveloperScoreColor(score: number): string {
  if (score >= 90) return 'text-green-400'
  if (score >= 75) return 'text-blue-400'
  if (score >= 60) return 'text-yellow-400'
  return 'text-orange-400'
}

export function getDeveloperScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Very Good'
  if (score >= 60) return 'Good'
  return 'Developing'
}

export function generateChartColor(index: number): string {
  const colors = [
    '#FFD700',
    '#3B82F6',
    '#A855F7',
    '#EC4899',
    '#F97316',
    '#10B981',
    '#06B6D4',
    '#8B5CF6',
    '#EF4444',
    '#F59E0B',
  ]
  return colors[index % colors.length]
}
