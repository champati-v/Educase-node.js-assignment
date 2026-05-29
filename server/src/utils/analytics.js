export const generateProfileAnalytics = (repositories) => {
  let totalStars = 0;
  let totalForks = 0;

  const languageDistribution = {};

  let topRepository = null;
  let lastActiveAt = null;

  repositories.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    // Language Distribution
    if (repo.language) {
      languageDistribution[repo.language] =
        (languageDistribution[repo.language] || 0) + 1;
    }

    // Most Starred Repository
    if (
      !topRepository ||
      repo.stargazers_count > topRepository.stargazers_count
    ) {
      topRepository = repo;
    }

    // Most Recent Activity
    if (!lastActiveAt || new Date(repo.pushed_at) > new Date(lastActiveAt)) {
      lastActiveAt = repo.pushed_at;
    }
  });

  // Most Used Language
  let mostUsedLanguage = null;
  let maxCount = 0;

  Object.entries(languageDistribution).forEach(([language, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostUsedLanguage = language;
    }
  });

  // Developer Score
  const developerScore = Math.min(
    100,
    Math.round(totalStars * 0.3 + totalForks * 0.5 + repositories.length * 1.5),
  );

  return {
    totalStars,
    totalForks,
    mostUsedLanguage,
    languageDistribution,
    developerScore,
    topRepository: topRepository?.name || null,
    lastActiveAt: lastActiveAt ? new Date(lastActiveAt) : null,
  };
};
