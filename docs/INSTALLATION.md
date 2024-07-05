# Installation

## Prerequisites

Ensure you have the following before setup:

- **Discord Token**: Obtain from the [Discord Developer Portal](https://discord.com/developers/applications).
- **Node.js**: Version 20 or higher. Download [here](https://nodejs.org/en/download/).
- **NPM**: Comes with Node.js.
- **FFmpeg or Avconv**: Required for media transcoding. Download [FFmpeg](https://ffmpeg.org/download.html) or install via npm: `npm i ffmpeg-static`

## Configuration

1. **DISCORD_TOKEN**: Bot token for Discord API.
2. **CLIENT_ID**: Bot application ID to register slash commands.
3. **DEV_GUILD**: ID of the development server.
4. **DEV_IDS**: Comma-separated list of developer IDs.

### Setup Steps

1. **Create `.env` File**: In the root directory, create `.env`.
2. **Use `.env.sample`**: Copy and replace placeholders with your values.
3. **Save as `.env`**: Ensure all variables are correctly filled.

## Local Installation

1. **Clone the Repository**: `git clone https://github.com/LakhindarPal/distube-music-bot && cd distube-music-bot`
2. **Install Dependencies**: `npm install`
3. **Fill the `.env` File**: Ensure all configurations are set as describe above.
4. **Register Slash Commands**: `npm run register`
5. **Run the Bot**: `npm start`

## Docker Installation

1. **Fill the `.env` File**: Ensure all configurations are set as described above.
2. **Pull Docker Image**: `docker pull lakhindarpal/distube-music-bot:latest`
3. **Run Docker Container**: `docker run --env-file .env lakhindarpal/distube-music-bot:latest`
4. **Register Slash Commands**: `docker exec -it <container_id> npm run register`
