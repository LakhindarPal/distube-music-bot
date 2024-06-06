import { Colors, EmbedBuilder } from "discord.js";
import { RepeatMode } from "distube";

export const data = {
  name: "queue",
  description: "Show the current queue",
};
export async function execute(interaction, queue) {
  if (!queue) return;
  const formattedSongDuration = (song) =>
    song.stream.playFromSource
      ? song.formattedDuration
      : song.stream.song?.formattedDuration;

  const current = queue.songs[0];
  const upcoming = queue.songs
    .slice(1, 10)
    .map(
      (song, i) =>
        `**${i}.** ${[song.name](song.url)} - \`${formattedSongDuration(song)}\``
    )
    .join("\n");

  return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setColor(Colors.Blurple)
        .setDescription(
          `**Current:** ${[current.name](current.url)} - \`${queue.formattedCurrentTime}\`/\`${formattedSongDuration(current)}\n\n**Upcoming:**\n${upcoming}`
        )
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
            value: `${queue.filters.names.join(", ") || "Off"}`,
            inline: false,
          }
        ),
    ],
  });
}
