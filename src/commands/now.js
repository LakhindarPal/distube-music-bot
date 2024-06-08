import ProgressBar from "../utils/ProgressBar.js";
import { BaseEmbed } from "../utils/Embeds.js";
import { getSongDurationInfo } from "../utils/songDuration.js";

export const data = {
  name: "now",
  description: "Show the currently playing song",
};
export function execute(interaction, queue) {
  const song = queue.songs[0];
  const durationInfo = getSongDurationInfo(song);
  const bar = ProgressBar({
    current: queue.currentTime,
    total: durationInfo.duration,
  });

  const embed = BaseEmbed()
    .setAuthor({ name: "Now Playing" })
    .setTitle(song.name)
    .setURL(song.url)
    .setDescription(
      `**Progress**: ${queue.formattedCurrentTime} / ${durationInfo.formattedDuration}\n${bar}`
    )
    .setThumbnail(song.thumbnail)
    .setFooter({
      text: `Played by ${song.user.tag}`,
      iconURL: song.member.displayAvatarURL(),
    });

  return interaction.reply({ embeds: [embed] });
}
