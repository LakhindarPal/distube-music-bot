import "dotenv/config";

import { Client, Collection, GatewayIntentBits } from "discord.js";

import { AppleMusicPlugin } from "distube-apple-music";
import { DeezerPlugin } from "@distube/deezer";
import { DirectLinkPlugin } from "@distube/direct-link";
import { DisTube } from "distube";
import { FilePlugin } from "@distube/file";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import { TidalPlugin } from "distube-tidal";
import { YouTubePlugin } from "@distube/youtube";

import { loadEvents } from "./handlers/event.js";

class DisTubeClient extends Client {
  distube = new DisTube(this, {
    plugins: [
      new AppleMusicPlugin(),
      new DeezerPlugin(),
      new DirectLinkPlugin(),
      new FilePlugin(),
      new SoundCloudPlugin(),
      new SpotifyPlugin(),
      new TidalPlugin(),
      new YouTubePlugin(),
    ],
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: true,
  });

  commands = new Collection();
  cooldowns = new Collection();

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
