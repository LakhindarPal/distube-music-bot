import { Events } from "distube";
import { BaseEmbed } from "../../utils/Embeds.js";

export const data = {
  name: Events.PLAY_SONG,
  type: "distube",
};
export function execute(queue, song) {
  const embed = BaseEmbed()
    .setAuthor({ name: "Now playing" })
    .setTitle(song.name)
    .setURL(song.url)
    .setThumbnail(song.thumbnail)
    .setFooter({
      text: `Played by: ${song.user.tag}`,
      iconURL: `${song.member.displayAvatarURL()}`,
    });

  return queue.textChannel?.send({ embeds: [embed] }).catch(console.error);
}
