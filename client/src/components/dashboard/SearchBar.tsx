import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface SearchBarProps {
  onSearch: (username: string) => void
  isLoading?: boolean
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSearch(username.trim())
      setUsername('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search any GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
