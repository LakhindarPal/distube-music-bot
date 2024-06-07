import { Events } from "distube";
import { ErrorEmbed } from "../../utils/Embeds.js";

export const data = {
  name: Events.ERROR,
  type: "distube",
};
export async function execute(error, queue, song) {
  console.error(error);
  if (song) {
    await song.metadata.interaction?.followUp({
      embeds: [ErrorEmbed(`Error: \`${error.message}\``)],
      ephemeral: true,
    });
  } else if (queue.textChannel) {
    await queue.textChannel.send({
      embeds: [ErrorEmbed(`Error: \`${error.message}\``)],
    });
  }
}
