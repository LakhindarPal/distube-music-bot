import { Colors, EmbedBuilder } from "discord.js";

export const data = {
  name: "now",
  description: "Show the current playing song",
};
export function execute(interaction, queue) {
  const song = queue.songs[0];
  const formattedDuration = song.stream.playFromSource
    ? song.formattedDuration
    : song.stream.song?.formattedDuration;

  const embed = new EmbedBuilder()
    .setTitle("Now Playing")
    .setDescription(`${song.name} - ${formattedDuration}`)
    .setThumbnail(song.thumbnail)
    .setFooter({
      text: `Requested by ${song.user.tag}`,
      iconURL: song.member.displayAvatarURL(),
    })
    .setColor(Colors.Blurple);

  interaction.reply({ embeds: [embed] });
}
