import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL;

export const fetchGitHubProfile = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_BASE_URL}/users/${username}`,
      {
        headers:{
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch GitHub profile"
    );
  }
};

export const fetchGitHubRepositories = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_BASE_URL}/users/${username}/repos`,
      {
        headers:{
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        params: {
          per_page: 100,
          sort: "updated",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("GitHub Repo Fetch Error:", error.response?.data);

    throw new Error(
      error.response?.data?.message || "Failed to fetch repositories"
    );
  }
};