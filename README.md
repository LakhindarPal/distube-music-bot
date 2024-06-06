# DisTube Music Bot

A music bot for Discord built using DisTube and discord.js.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Discord.js Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/distube-music-bot/discord.js)
![DisTube Version](https://img.shields.io/github/package-json/dependency-version/LakhindarPal/distube-music-bot/distube)

## Description

DisTube Music Bot is a Discord bot that allows you to play music from various sources like YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, and direct links. It leverages the powerful DisTube library and discord.js to provide a seamless music experience on your Discord server.

## Features

- Play music from YouTube, Spotify, SoundCloud, Deezer, Tidal, Apple Music, and direct links.
- High-quality audio playback.
- Simple and easy-to-use commands.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LakhindarPal/distube-music-bot.git
   cd distube-music-bot
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Discord bot token:

   ```env
   DISCORD_TOKEN=your_bot_token_here
   ```

4. **Install FFmpeg:**

   Ensure that FFmpeg is installed on your system. You can download it from [here](https://ffmpeg.org/download.html).

5. **Start the bot:**

   ```bash
   npm start
   ```

## Usage

1. **Invite the bot to a Discord server:**

   Generate an invite link for your bot from the Discord Developer Portal and invite it to your server.

2. **Join a voice channel:**

   Connect to a voice channel where you want the bot to play music.

3. **Use the play command:**

   ```text
   /play <URL or search query>
   ```

   The bot will join the voice channel and start playing the requested music.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Contact

If you have any questions or need support, feel free to open an issue on GitHub.
