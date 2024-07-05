import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: "np",
  description: "Show the currently playing song",
  category: "music",
  queueOnly: true,
};

export function execute(interaction, queue) {
  const song = queue.songs[0];
  const songDuration = song.stream.playFromSource
    ? song.duration
    : song.stream.song?.duration;
  const formattedSongDuration = song.stream.playFromSource
    ? song.formattedDuration
    : song.stream.song?.formattedDuration;

  const size = 15;
  const line = "▬";
  const slider = "🔘";
  const percentage = Math.min(queue.currentTime / songDuration, 1);
  const progress = Math.round(size * percentage);
  const emptyProgress = size - progress;

  const progressbar =
    line.repeat(progress).slice(0, -1) + slider + line.repeat(emptyProgress);

  const embed = BaseEmbed()
    .setAuthor({ name: "Now Playing" })
    .setTitle(song.name)
    .setURL(song.url)
    .setDescription(
      `**Progress**: ${queue.formattedCurrentTime} / ${formattedSongDuration}\n${progressbar}`
    )
    .setThumbnail(song.thumbnail)
    .setFooter({
      text: `Played by: ${song.user.tag}`,
      iconURL: song.user.displayAvatarURL(),
    });

  return interaction.reply({ embeds: [embed] });
}
