import { Events } from "distube";
import Embeds from "../../utils/Embeds.js";

export const data = {
  name: Events.ADD_LIST,
  type: "distube",
};
export async function execute(_queue, playlist) {
  return await playlist.metadata.interaction.editReply({
    embeds: [
      Embeds.Info(
        `Added \`${playlist.name}\` (${playlist.songs.length} songs) to the queue.`
      ),
    ],
  });
}
