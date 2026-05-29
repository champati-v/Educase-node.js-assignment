import { ExternalLink, MapPin, Link as LinkIcon, Calendar } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import type { Profile } from '../../types'
import { formatDate } from '../../lib/utils'

interface ProfileHeaderProps {
  profile: Profile
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={profile.avatar_url} alt={profile.name} />
            <AvatarFallback>{profile.login.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{profile.name}</h1>
                  <Badge variant="secondary" className="h-fit">
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">@{profile.login}</p>
              </div>
              <Button
                onClick={() => window.open(profile.html_url, '_blank')}
                className="gap-2 w-fit"
              >
                View on GitHub <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-foreground mb-4">{profile.bio}</p>
            )}

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {profile.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </div>
              )}
              {profile.html_url && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    {profile.html_url.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Joined {formatDate(profile.created_at)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {profile.public_repos}
                </p>
                <p className="text-sm text-muted-foreground">Public Repos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {profile.followers.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">
                  {profile.following.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">4</p>
                <p className="text-sm text-muted-foreground">Gists</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
