import { Events } from "distube";
import Embeds from "../../utils/Embeds.js";

export const data = {
  name: Events.ADD_SONG,
  type: "distube",
};
export async function execute(_queue, song) {
  return await song.metadata.interaction.editReply({
    embeds: [Embeds.Info(`Added \`${song.name}\` to the queue.`)],
  });
}
