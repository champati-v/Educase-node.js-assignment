import { GitPullRequestArrow } from 'lucide-react'
import { Card, CardContent } from '../ui/card'

export default function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <GitPullRequestArrow className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Profile Analyzed Yet
        </h3>
        <p className="text-muted-foreground text-center max-w-xs">
          Search a GitHub profile to begin analysis and view detailed analytics
        </p>
      </CardContent>
    </Card>
  )
}
