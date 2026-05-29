import { ExternalLink } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import type { Repository } from '../../types'

interface RepositoriesTableProps {
  repositories: Repository[]
  profileUrl: string
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-500/20 text-blue-300',
    JavaScript: 'bg-yellow-500/20 text-yellow-300',
    Python: 'bg-green-500/20 text-green-300',
    Java: 'bg-orange-500/20 text-orange-300',
    Go: 'bg-cyan-500/20 text-cyan-300',
    Rust: 'bg-red-500/20 text-red-300',
    CSS: 'bg-pink-500/20 text-pink-300',
    HTML: 'bg-orange-500/20 text-orange-300',
    Shell: 'bg-gray-500/20 text-gray-300',
  }
  return colors[language] || 'bg-muted text-muted-foreground'
}

export default function RepositoriesTable({
  repositories,
  profileUrl,
}: RepositoriesTableProps) {
  const displayedRepos = repositories.slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Active Repositories (Top 10)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRepos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No repositories found</p>
                  </TableCell>
                </TableRow>
              ) : (
                displayedRepos.map((repo) => (
                  <TableRow key={repo.name}>
                    <TableCell className="font-medium text-primary">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {repo.name}
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-xs truncate">
                      {repo.description || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getLanguageColor(repo.language)}
                      >
                        {repo.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          window.open(repo.html_url, '_blank', 'noopener,noreferrer')
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {repositories.length > 10 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-muted-foreground underline"
              onClick={() => window.open(profileUrl, '_blank', 'noopener,noreferrer')}
            >
              View All Repositories
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
