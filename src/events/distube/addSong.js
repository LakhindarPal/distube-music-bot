import { Events } from "distube";
import { BaseEmbed } from "../../utils/Embeds.js";

export const data = {
  name: Events.ADD_SONG,
  type: "distube",
};
export async function execute(queue, song) {
  const embed = BaseEmbed()
    .setAuthor({ name: `Song added - Position ${queue.songs.indexOf(song)}` })
    .setTitle(song.name)
    .setURL(song.url)
    .setFooter({
      text: `Requested by: ${song.user.tag}`,
      iconURL: song.member.displayAvatarURL(),
    });

  return song.metadata.interaction
    .editReply({ embeds: [embed] })
    .catch(console.error);
}
