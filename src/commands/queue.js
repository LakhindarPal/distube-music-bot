import { RepeatMode } from "distube";
import { getSongDurationInfo } from "../utils/songDuration.js";
import { BaseEmbed } from "../utils/Embeds.js";

export const data = {
  name: "queue",
  description: "Show the current queue",
};
export async function execute(interaction, queue) {
  if (!queue) return;

  const current = queue.songs[0];
  const upcoming = queue.songs
    .slice(1, 11)
    .map(
      (song, i) =>
        `**${i + 1}.** [${song.name}](${song.url}) - \`${getSongDurationInfo(song).formattedDuration}\``
    )
    .join("\n");
  const Progress = `${queue.formattedCurrentTime} / ${getSongDurationInfo(current).formattedDuration}`;
  const formattedQueueSongs = `**Current:**\n[${current.name}](${current.url}) - ${Progress}\n\n**Upcoming:**\n${upcoming}`;

  return interaction.reply({
    embeds: [
      BaseEmbed()
        .setDescription(formattedQueueSongs)
        .addFields(
          {
            name: "Volume",
            value: `${queue.volume}%`,
            inline: true,
          },
          {
            name: "Autoplay",
            value: `${queue.autoplay ? "On" : "Off"}`,
            inline: true,
          },
          {
            name: "Repeat",
            value: `${
              queue.repeatMode === RepeatMode.QUEUE
                ? "Queue"
                : queue.repeatMode === RepeatMode.SONG
                  ? "Song"
                  : "Off"
            }`,
            inline: true,
          },
          {
            name: "Filters",
            value: `${queue.filters.names.join(", ") || "None"}`,
            inline: false,
          }
        ),
    ],
  });
}
