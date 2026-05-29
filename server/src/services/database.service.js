import prisma from "../config/prisma.js";

export const saveProfileData = async (
  profile,
  repositories,
  analytics
) => {
  // Save Profile
  const savedProfile = await prisma.profile.upsert({
    where: {
      githubId: profile.id,
    },

    update: {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      htmlUrl: profile.html_url,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
      githubCreatedAt: new Date(profile.created_at),
      lastAnalyzedAt: new Date(),
    },

    create: {
      githubId: profile.id,
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      htmlUrl: profile.html_url,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
      githubCreatedAt: new Date(profile.created_at),
      lastAnalyzedAt: new Date(),
    },
  });

  // delete old repos 
  await prisma.repository.deleteMany({
    where: {
      profileId: savedProfile.id,
    },
  });

  // 10 active repos 
  const activeRepositories = [...repositories]
    .sort(
      (a, b) =>
        new Date(b.pushed_at) - new Date(a.pushed_at)
    )
    .slice(0, 10);

  if (activeRepositories.length > 0) {
    await prisma.repository.createMany({
      data: activeRepositories.map((repo) => ({
        githubRepoId: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        htmlUrl: repo.html_url,
        pushedAt: repo.pushed_at
          ? new Date(repo.pushed_at)
          : null,
        profileId: savedProfile.id,
      })),
    });
  }

  // Save Analytics
  await prisma.profileAnalytics.upsert({
    where: {
      profileId: savedProfile.id,
    },

    update: {
      totalStars: analytics.totalStars,
      totalForks: analytics.totalForks,
      mostUsedLanguage: analytics.mostUsedLanguage,
      languageDistribution: analytics.languageDistribution,
      topRepository: analytics.topRepository,
      developerScore: analytics.developerScore,
      lastActiveAt: analytics.lastActiveAt,
    },

    create: {
      totalStars: analytics.totalStars,
      totalForks: analytics.totalForks,
      mostUsedLanguage: analytics.mostUsedLanguage,
      languageDistribution: analytics.languageDistribution,
      topRepository: analytics.topRepository,
      developerScore: analytics.developerScore,
      lastActiveAt: analytics.lastActiveAt,
      profileId: savedProfile.id,
    },
  });

  return savedProfile;
};