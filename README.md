# GitHub Profile Analyzer

A backend service built with Node.js and Express that analyzes GitHub profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Tech Stack

* Node.js
* Express.js
* MySQL
* Prisma ORM
* GitHub REST API

## Features

* Analyze any public GitHub profile using a username
* Fetch profile and repository data from GitHub
* Generate developer insights such as:

  * Total Stars
  * Total Forks
  * Most Used Language
  * Developer Score
  * Last Active Date
* Store analyzed profiles in MySQL
* Maintain analysis history
* Store only the top 10 most active repositories to keep the database optimized

## API Endpoints

### Analyze a GitHub Profile

```http
GET /api/github/analyze/:username
```

Fetches data from GitHub, generates analytics, stores the results, and returns the complete profile analysis.

### Get Analyzed Profiles

```http
GET /api/profiles
```

Returns all previously analyzed profiles.

### Get Recent Profiles

```http
GET /api/profiles?limit=5
```

Returns the most recently analyzed profiles.

## Running Locally

Clone the repo:

```bash
https://github.com/champati-v/Educase-node.js-assignment.git
```

Switch to server folder
```bash
cd server
```

Add .env file following the .env.example file
```bash
DATABASE_URL='your_mysql_database_url_here'
PORT=5000
GITHUB_BASE_URL='https://api.github.com'
GITHUB_ACCESS_TOKEN='your_github_access_token_here' 
# API requests with access token will allow to have higher rate limits.
```

Install dependencies:

```bash
npm install
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

## Extra Feature Added

A simple React dashboard is included to fetch user profile and visualize the data, my primary focus of this project is the backend API design, GitHub integration, and database management.

## Running Frontend Locally

Clone the repo:

```bash
https://github.com/champati-v/Educase-node.js-assignment.git
```

Switch to client folder
```bash
cd client
```

Add .env file following the .env.example file
```bash
VITE_API_BASE_URL=https://educase-node-js-assignment-hvha.onrender.com/api

# For running in local
# VITE_API_BASE_URL=http://localhost:5000/api
```

Install dependencies:

```bash
npm install
```
Start the server:

```bash
npm run dev
```

Open http://localhost:5173 in browser

