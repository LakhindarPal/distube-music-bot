import { Events } from "distube";
import Embeds from "../../utils/Embeds.js";

export const data = {
  name: Events.ERROR,
  type: "distube",
};
export async function execute(error, queue, song) {
  console.error(error);
  if (song) {
    await song.metadata.interaction?.followUp({
      embeds: [Embeds.Error(`Error: \`${error.message}\``)],
      ephemeral: true,
    });
  } else if (queue.textChannel) {
    await queue.textChannel.send({
      embeds: [Embeds.Error(`Error: \`${error.message}\``)],
    });
  }
}
