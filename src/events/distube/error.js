import { Events } from "distube";
import { ErrorEmbed } from "../../modules/embeds.js";

export const data = {
  name: Events.ERROR,
  type: "distube",
};

export async function execute(error, queue, song) {
  console.error(error);

  if (song) {
    await song.metadata?.followUp({
      ephemeral: true,
      embeds: [ErrorEmbed(`Error: \`${error.message}\``)],
    });
  } else if (queue.textChannel) {
    await queue.textChannel.send({
      embeds: [ErrorEmbed(`Error: \`${error.message}\``)],
    });
  }
}
