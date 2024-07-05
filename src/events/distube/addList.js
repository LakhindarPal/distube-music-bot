import { Events } from "distube";
import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: Events.ADD_LIST,
  type: "distube",
};

export async function execute(queue, playlist) {
  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  const embed = BaseEmbed()
    .setAuthor({
      name: `Playlist added - ${playlist.songs.length} songs.`,
      iconURL: playlist.thumbnail,
    })
    .setTitle(playlist.name)
    .setURL(playlist.url);

  return playlist.metadata.editReply({ embeds: [embed] });
}
