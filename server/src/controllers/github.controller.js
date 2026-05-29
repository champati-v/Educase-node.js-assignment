import { fetchGitHubProfile, fetchGitHubRepositories } from "../services/github.service.js";
import { saveProfileData } from "../services/database.service.js";
import { generateProfileAnalytics } from "../utils/analytics.js";

export const analyzeGitHubProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch GitHub Data
    const profile = await fetchGitHubProfile(username);

    const repositories = await fetchGitHubRepositories(username);

    // Analytics
    const analytics = generateProfileAnalytics(repositories);

    // Save To Database
    await saveProfileData(profile, repositories, analytics);

    res.status(200).json({
      success: true,
      data: {
        profile,
        repositories,
        analytics,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};