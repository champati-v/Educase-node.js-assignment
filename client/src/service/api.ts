import axios from 'axios'
import type { GitHubAnalysisResponse, HistoryResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const githubAPI = {
  analyzeProfile: async (username: string): Promise<GitHubAnalysisResponse> => {
    const response = await apiClient.get<GitHubAnalysisResponse>(
      `/github/analyze/${encodeURIComponent(username)}`
    )
    return response.data
  },

  getHistory: async (): Promise<HistoryResponse> => {
    const response = await apiClient.get<HistoryResponse>('/profiles')
    return response.data
  },
}

export default apiClient
