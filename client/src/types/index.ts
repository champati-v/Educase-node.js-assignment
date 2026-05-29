export interface Profile {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  location: string
  created_at: string
}

export interface Repository {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  html_url: string
  pushedAt: string
}

export interface Analytics {
  totalStars: number
  totalForks: number
  mostUsedLanguage: string
  languageDistribution: Record<string, number>
  developerScore: number
  topRepository: string
  lastActiveAt: string
}

export interface GitHubAnalysisResponse {
  success: boolean
  data: {
    profile: Profile
    repositories: Repository[]
    analytics: Analytics
  }
}

export interface HistoryProfile {
  login: string
  avatarUrl: string
  developerScore: number
  lastAnalyzedAt: string
}

export interface HistoryResponse {
  success: boolean
  count: number
  data: HistoryProfile[]
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}
