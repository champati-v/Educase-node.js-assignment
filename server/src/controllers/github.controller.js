import {
  fetchGitHubProfile,
  fetchGitHubRepositories,
} from "../services/github.service.js";

export const analyzeGitHubProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await fetchGitHubProfile(username);

    const repositories = await fetchGitHubRepositories(username);

    res.status(200).json({
      success: true,
      data: {
        profile,
        repositories,
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