import { Events } from "distube";
import { BaseEmbed } from "../../utils/Embeds.js";

export const data = {
  name: Events.ADD_LIST,
  type: "distube",
};
export async function execute(_queue, playlist) {
  const embed = BaseEmbed()
    .setAuthor({ name: `${playlist.songs.length} songs added from playlist` })
    .setTitle(playlist.name)
    .setURL(playlist.url)
    .setFooter({
      text: `Requested by: ${playlist.user.tag}`,
      iconURL: playlist.member.displayAvatarURL(),
    });

  return playlist.metadata.interaction
    .editReply({ embeds: [embed] })
    .catch(console.error);
}
