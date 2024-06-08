import { RepeatMode } from "distube";
import { BaseEmbed } from "../utils/Embeds.js";
import { getSongDurationInfo } from "../utils/songDuration.js";

export const data = {
  name: "status",
  description: "Show the status of the queue",
};
export function execute(interaction, queue) {
  if (!queue) return;

  const current = queue.songs[0];
  const Progress = `${queue.formattedCurrentTime} / ${getSongDurationInfo(current).formattedDuration}`;

  const status = `**Now ${queue.paused ? "Paused" : "Playing"}**: [${current.name}](${current.url})
**Progress**: ${Progress}
**Repeat**: ${queue.repeatMode === RepeatMode.QUEUE ? "Queue" : queue.repeatMode === RepeatMode.SONG ? "Song" : "Off"}
**Autoplay**: ${queue.autoplay ? "On" : "Off"}
**Volume**: ${queue.volume}%
**Filters**: ${queue.filters.names.join(", ") || "None"}`;

  const embed = BaseEmbed().setDescription(status);

  return interaction.reply({ embeds: [embed] });
}
