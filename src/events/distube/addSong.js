import { Events } from "distube";
import { BaseEmbed } from "../../modules/embeds.js";

export const data = {
  name: Events.ADD_SONG,
  type: "distube",
};

export async function execute(queue, song) {
  // custom event for editing playing message
  queue.emit("modifyQueue", queue);

  const embed = BaseEmbed()
    .setAuthor({
      name: `Song added - Position ${queue.songs.indexOf(song)}`,
      iconURL: song.thumbnail,
    })
    .setTitle(song.name)
    .setURL(song.url);

  return song.metadata.editReply({ embeds: [embed] }).catch(console.error);
}
