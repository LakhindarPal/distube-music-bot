import "dotenv/config";

import { Client, Collection, GatewayIntentBits } from "discord.js";

import { AppleMusicPlugin } from "distube-apple-music";
import { DeezerPlugin } from "@distube/deezer";
import { DirectLinkPlugin } from "@distube/direct-link";
import { DisTube } from "distube";
import { FilePlugin } from "@distube/file";
// import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import { TidalPlugin } from "distube-tidal";
import { YouTubePlugin } from "@distube/youtube";

import { loadEvents } from "./handlers/event.js";

class DisTubeClient extends Client {
  distube = new DisTube(this, {
    plugins: [
      new YouTubePlugin(),
      // new SoundCloudPlugin(),
      new DirectLinkPlugin(),
      new FilePlugin(),
      new AppleMusicPlugin(),
      new DeezerPlugin(),
      new SpotifyPlugin(),
      new TidalPlugin(),
    ],
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
  });

  commands = new Collection();
  components = new Collection();
  cooldowns = new Collection();
  playingMessages = new Collection();

  constructor(options) {
    super(options);
  }
}

const client = new DisTubeClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

await loadEvents(client);

await client.login(process.env.DISCORD_TOKEN);

// prevent crash on unhandled promise rejection
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

// prevent crash on uncaught exception
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});
